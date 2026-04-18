window.PostoSolutionAdvisor = window.PostoSolutionAdvisor || {};

(function registerEngine(namespace) {
  const DATA_PATHS = {
    products: "assets/solution-advisor/data/products.json",
    rules: "assets/solution-advisor/data/rules.json"
  };

  const TIER_RANK = {
    Essential: 1,
    Professional: 2,
    Premium: 3
  };

  const CATEGORY_ORDER = [
    "Education Display",
    "Display",
    "Video",
    "Audio",
    "Collaboration",
    "Compute",
    "Recording",
    "Writing Surface",
    "Control"
  ];

  const dataStore = {
    products: [],
    rules: []
  };

  function toBoolean(value) {
    if (typeof value === "boolean") return value;
    if (typeof value === "string") return value === "true";
    return Boolean(value);
  }

  function toNumber(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function deriveAttendeeBand(attendeeCount) {
    if (attendeeCount <= 12) return "compact";
    if (attendeeCount <= 35) return "standard";
    if (attendeeCount <= 80) return "large";
    return "extended";
  }

  function normalizeAnswers(rawAnswers) {
    const attendeeCount = Math.max(0, toNumber(rawAnswers.attendeeCount, 0));
    const roomType = rawAnswers.roomType;
    const isMeetingRoom = roomType === "meeting";

    return {
      roomType,
      sector: rawAnswers.sector || "education",
      roomSize: rawAnswers.roomSize,
      attendeeCount,
      attendeeBand: deriveAttendeeBand(attendeeCount),
      primaryUse: rawAnswers.primaryUse || "mixed",
      primaryPlatform: rawAnswers.primaryPlatform || "mixed",
      hybridRequired: toBoolean(rawAnswers.hybridRequired),
      recordingRequired: toBoolean(rawAnswers.recordingRequired),
      writingPanels: toBoolean(rawAnswers.writingPanels),
      // Meeting rooms use a single video bar that handles both presenter + audience coverage.
      audienceCamera: isMeetingRoom ? false : toBoolean(rawAnswers.audienceCamera),
      presenterTracking: isMeetingRoom ? false : toBoolean(rawAnswers.presenterTracking),
      wirelessPresentation: toBoolean(rawAnswers.wirelessPresentation),
      budgetOrientation: rawAnswers.budgetOrientation || "professional",
      priorityFocus: rawAnswers.priorityFocus || "performance"
    };
  }

  function normalizeTierLabel(value) {
    const normalized = String(value || "").toLowerCase();
    if (normalized === "essential") return "Essential";
    if (normalized === "premium") return "Premium";
    return "Professional";
  }

  function strongerTier(a, b) {
    const tierA = normalizeTierLabel(a);
    const tierB = normalizeTierLabel(b);
    return (TIER_RANK[tierA] || 0) >= (TIER_RANK[tierB] || 0) ? tierA : tierB;
  }

  function matchConditionValue(answerValue, conditionValue) {
    if (conditionValue === undefined || conditionValue === null) return true;

    if (Array.isArray(conditionValue)) {
      return conditionValue.includes(answerValue);
    }

    if (typeof conditionValue === "object") {
      if (conditionValue.equals !== undefined && answerValue !== conditionValue.equals) return false;
      if (conditionValue.notEquals !== undefined && answerValue === conditionValue.notEquals) return false;

      if (Array.isArray(conditionValue.in) && !conditionValue.in.includes(answerValue)) return false;
      if (Array.isArray(conditionValue.notIn) && conditionValue.notIn.includes(answerValue)) return false;

      if (conditionValue.min !== undefined && toNumber(answerValue, Number.NEGATIVE_INFINITY) < toNumber(conditionValue.min, Number.NEGATIVE_INFINITY)) return false;
      if (conditionValue.max !== undefined && toNumber(answerValue, Number.POSITIVE_INFINITY) > toNumber(conditionValue.max, Number.POSITIVE_INFINITY)) return false;

      if (conditionValue.truthy && !Boolean(answerValue)) return false;
      if (conditionValue.falsy && Boolean(answerValue)) return false;

      return true;
    }

    return answerValue === conditionValue;
  }

  function evaluateConditions(answers, conditions) {
    if (!conditions || (typeof conditions === "object" && !Object.keys(conditions).length)) return true;

    if (Array.isArray(conditions)) {
      return conditions.every((condition) => evaluateConditions(answers, condition));
    }

    if (conditions.all) {
      return conditions.all.every((condition) => evaluateConditions(answers, condition));
    }

    if (conditions.any) {
      return conditions.any.some((condition) => evaluateConditions(answers, condition));
    }

    if (conditions.not) {
      return !evaluateConditions(answers, conditions.not);
    }

    if (conditions.field) {
      return matchConditionValue(answers[conditions.field], conditions);
    }

    return Object.entries(conditions).every(([field, expected]) => matchConditionValue(answers[field], expected));
  }

  function deriveTierFromBudget(budgetOrientation) {
    return normalizeTierLabel(budgetOrientation);
  }

  function deriveRoomLabel(roomType) {
    const labels = {
      classroom: "Smart Classroom",
      meeting: "Meeting Room",
      training: "Training Room",
      boardroom: "Boardroom",
      seminar: "Seminar Room"
    };
    return labels[roomType] || "Collaboration Room";
  }

  function deriveSectorLabel(sector) {
    const labels = {
      education: "education",
      enterprise: "enterprise",
      government: "public-sector",
      training: "training-center"
    };
    return labels[sector] || "institutional";
  }

  function deriveUseModeLabel(primaryUse) {
    const labels = {
      teaching: "teaching-focused",
      meetings: "meeting-focused",
      presentation: "presentation-focused",
      mixed: "mixed-usage"
    };
    return labels[primaryUse] || "mixed-usage";
  }

  function derivePlatformLabel(primaryPlatform) {
    const labels = {
      teams: "Microsoft Teams",
      zoom: "Zoom",
      webex: "Webex",
      meet: "Google Meet",
      mixed: "multi-platform"
    };
    return labels[primaryPlatform] || "multi-platform";
  }

  function deriveBandLabel(attendeeBand) {
    const labels = {
      compact: "compact",
      standard: "standard",
      large: "large",
      extended: "extended"
    };
    return labels[attendeeBand] || "standard";
  }

  function buildSummary(answers, tierLabel) {
    const hybridLabel = answers.hybridRequired ? "hybrid-ready" : "in-room focused";
    const platformLabel = derivePlatformLabel(answers.primaryPlatform);
    const useModeLabel = deriveUseModeLabel(answers.primaryUse);
    const sectorLabel = deriveSectorLabel(answers.sector);
    const bandLabel = deriveBandLabel(answers.attendeeBand);

    return `Recommended ${tierLabel} ${deriveRoomLabel(answers.roomType)} bundle for ${answers.attendeeCount} attendees (${bandLabel} occupancy profile) in a ${sectorLabel} setting, ${hybridLabel}, optimized for ${platformLabel} and ${useModeLabel} workflows.`;
  }

  function isProductCompatible(product, answers) {
    const roomOk = !Array.isArray(product.supported_room_types) || product.supported_room_types.includes(answers.roomType);

    const platform = answers.primaryPlatform;
    const platformOk =
      !Array.isArray(product.supported_platforms) ||
      product.supported_platforms.includes("mixed") ||
      product.supported_platforms.includes(platform);

    return roomOk && platformOk;
  }

  function productSortComparator(a, b) {
    const categoryA = CATEGORY_ORDER.indexOf(a.category);
    const categoryB = CATEGORY_ORDER.indexOf(b.category);

    const orderA = categoryA === -1 ? CATEGORY_ORDER.length : categoryA;
    const orderB = categoryB === -1 ? CATEGORY_ORDER.length : categoryB;

    if (orderA !== orderB) return orderA - orderB;

    const tierDiff = (TIER_RANK[normalizeTierLabel(b.tier)] || 0) - (TIER_RANK[normalizeTierLabel(a.tier)] || 0);
    if (tierDiff !== 0) return tierDiff;

    return a.name.localeCompare(b.name);
  }

  function hasProductId(selectedProducts, productId) {
    return selectedProducts.some((product) => product.id === productId);
  }

  function hasCategory(selectedProducts, categories) {
    return selectedProducts.some((product) => categories.includes(product.category));
  }

  function selectLayoutTemplate(roomType) {
    if (roomType === "boardroom") return "boardroom";
    if (roomType === "meeting") return "conference";
    if (roomType === "seminar") return "theater";
    if (roomType === "training") return "training";
    return "classroom";
  }

  function buildSeatingConfig(answers, template) {
    const band = answers.attendeeBand;

    if (template === "conference") {
      const seatCountMap = {
        compact: 8,
        standard: 14,
        large: 20,
        extended: 28
      };

      return {
        kind: "table",
        count: seatCountMap[band] || 14,
        style: "conference"
      };
    }

    const gridByBand = {
      compact: { rows: 3, cols: 4 },
      standard: { rows: 4, cols: 6 },
      large: { rows: 5, cols: 8 },
      extended: { rows: 6, cols: 10 }
    };

    const grid = gridByBand[band] || gridByBand.standard;
    const style = template === "theater" ? "theater" : template === "training" ? "training" : "classroom";

    return {
      kind: "grid",
      rows: grid.rows,
      cols: grid.cols,
      style
    };
  }

  function buildZoneDescriptors(selectedProducts) {
    const hasDisplay = hasCategory(selectedProducts, ["Display", "Education Display"]);
    const hasAudio = hasCategory(selectedProducts, ["Audio"]);
    const hasVideo = hasCategory(selectedProducts, ["Video"]);
    const hasCollaboration = hasCategory(selectedProducts, ["Collaboration", "Compute", "Control"]);
    const hasRecording = hasCategory(selectedProducts, ["Recording"]);

    return [
      { id: "front_display", label: "Display Zone", active: hasDisplay },
      { id: "side_panels", label: "Writing Zone", active: hasProductId(selectedProducts, "side_writing_panels") },
      { id: "audio_zone", label: "Audio Zone", active: hasAudio },
      { id: "camera_front", label: "Front Camera Zone", active: hasVideo },
      { id: "camera_rear", label: "Audience Camera Zone", active: hasProductId(selectedProducts, "audience_camera") },
      { id: "recording_zone", label: "Capture / DSP Zone", active: hasRecording || hasProductId(selectedProducts, "audio_dsp_controller") },
      { id: "presenter_zone", label: "Presenter / Control Zone", active: hasCollaboration }
    ];
  }

  function buildLayoutConfig(selectedProducts, answers) {
    const template = selectLayoutTemplate(answers.roomType);
    const seating = buildSeatingConfig(answers, template);
    const zones = buildZoneDescriptors(selectedProducts);

    const notes = [
      `${deriveRoomLabel(answers.roomType)} • ${answers.roomSize} room`,
      `${answers.attendeeCount} attendees • ${answers.attendeeBand} occupancy profile`,
      answers.hybridRequired ? "Hybrid participation enabled" : "In-room participation focused"
    ];

    return {
      template,
      seating,
      notes,
      zones,
      products: selectedProducts.map((product) => ({
        id: product.id,
        name: product.name,
        zone: product.hotspot_zone,
        category: product.category,
        tier: normalizeTierLabel(product.tier)
      }))
    };
  }

  async function loadData() {
    if (dataStore.products.length && dataStore.rules.length) {
      return dataStore;
    }

    if (
      namespace.seedData &&
      Array.isArray(namespace.seedData.products) &&
      Array.isArray(namespace.seedData.rules)
    ) {
      dataStore.products = namespace.seedData.products;
      dataStore.rules = namespace.seedData.rules;
      return dataStore;
    }

    let productsResponse;
    let rulesResponse;
    try {
      [productsResponse, rulesResponse] = await Promise.all([
        fetch(DATA_PATHS.products),
        fetch(DATA_PATHS.rules)
      ]);
    } catch (error) {
      throw new Error("Could not load advisor data. Please open through a web server or include seed data.");
    }

    if (!productsResponse.ok || !rulesResponse.ok) {
      throw new Error("Could not load advisor data files.");
    }

    dataStore.products = await productsResponse.json();
    dataStore.rules = await rulesResponse.json();

    return dataStore;
  }

  function ensureDisplayFallback(selectedIds, products, answers) {
    const selectedProducts = products.filter((product) => selectedIds.has(product.id));
    const hasDisplay = selectedProducts.some((product) => ["Display", "Education Display"].includes(product.category));

    if (hasDisplay) return;

    if (answers.roomType === "classroom") {
      selectedIds.add("smart_eblackboard");
      return;
    }

    if (answers.roomSize === "small") {
      selectedIds.add("display_65_ifp");
      return;
    }

    if (answers.roomSize === "large") {
      selectedIds.add("display_86_ifp");
      return;
    }

    selectedIds.add("display_75_ifp");
  }

  function enforceMeetingVideoBar(selectedIds, answers) {
    if (answers.roomType !== "meeting") return;
    selectedIds.delete("audience_camera");
    selectedIds.delete("ai_tracking_camera");
    selectedIds.add("auto_framing_conference_camera");
  }

  async function evaluate(rawAnswers) {
    const answers = normalizeAnswers(rawAnswers);
    const { products, rules } = await loadData();

    const selectedIds = new Set();
    const appliedRules = [];
    let forcedTier = deriveTierFromBudget(answers.budgetOrientation);

    const sortedRules = [...rules].sort((a, b) => Number(b.priority || 0) - Number(a.priority || 0));

    sortedRules.forEach((rule) => {
      if (!evaluateConditions(answers, rule.conditions || {})) return;

      const actions = rule.actions || {};
      (actions.remove || []).forEach((id) => selectedIds.delete(id));
      (actions.add || []).forEach((id) => selectedIds.add(id));

      if (actions.setTier) {
        forcedTier = strongerTier(forcedTier, actions.setTier);
      }

      appliedRules.push({
        id: rule.id,
        rationale: rule.rationale,
        priority: Number(rule.priority || 0)
      });
    });

    enforceMeetingVideoBar(selectedIds, answers);
    ensureDisplayFallback(selectedIds, products, answers);

    const selectedProducts = products
      .filter((product) => selectedIds.has(product.id))
      .filter((product) => isProductCompatible(product, answers))
      .map((product) => {
        if (answers.roomType === "meeting" && product.id === "auto_framing_conference_camera") {
          return {
            ...product,
            name: "AI Video Bar (Presenter + Audience)",
            benefits: ["Covers presenter and audience with one bar", "Simplifies hybrid room operation"]
          };
        }
        return product;
      })
      .sort(productSortComparator);

    const solutionTier = forcedTier;

    return {
      answers,
      solutionTier,
      summary: buildSummary(answers, solutionTier),
      recommendedProducts: selectedProducts,
      explanations: appliedRules,
      layoutConfig: buildLayoutConfig(selectedProducts, answers),
      ctaVariant: answers.roomType === "classroom" ? "consultation" : "proposal",
      recommendationProfile: {
        roomType: answers.roomType,
        roomSize: answers.roomSize,
        attendeeBand: answers.attendeeBand,
        hybrid: answers.hybridRequired,
        budgetOrientation: answers.budgetOrientation
      }
    };
  }

  namespace.engine = {
    loadData,
    evaluate
  };
})(window.PostoSolutionAdvisor);
