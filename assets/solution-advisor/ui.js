window.PostoSolutionAdvisor = window.PostoSolutionAdvisor || {};

(function registerUI(namespace) {
  const STORAGE_KEY = "posto_solution_advisor_draft_v2";
  const EQUIPMENT_IMAGE_VERSION = "20260418a";

  const appState = {
    currentStep: 0,
    answers: {},
    result: null,
    activeHotspotId: null
  };

  const els = {};

  function byId(id) {
    return document.getElementById(id);
  }

  function safeLocalStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch (error) {
      // Keep silent if storage is blocked.
    }
  }

  function safeLocalStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch (error) {
      return null;
    }
  }

  function safeLocalStorageRemove(key) {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      // Ignore if storage is blocked.
    }
  }

  function allFields() {
    return namespace.steps.flatMap((step) => step.fields);
  }

  function fieldById(fieldId) {
    return allFields().find((field) => field.id === fieldId);
  }

  function parseValueByType(field, rawValue) {
    if (field.type === "boolean") {
      if (typeof rawValue === "boolean") return rawValue;
      if (typeof rawValue === "string") return rawValue === "true";
      return Boolean(rawValue);
    }

    if (field.type === "number") {
      if (rawValue === "" || rawValue === null || rawValue === undefined) return "";
      return Number(rawValue);
    }

    return rawValue;
  }

  function evaluateVisibilityRule(rule, answers) {
    if (!rule) return true;

    if (Array.isArray(rule.all)) {
      return rule.all.every((nestedRule) => evaluateVisibilityRule(nestedRule, answers));
    }

    if (Array.isArray(rule.any)) {
      return rule.any.some((nestedRule) => evaluateVisibilityRule(nestedRule, answers));
    }

    if (!rule.field) return true;

    const value = answers[rule.field];

    if (rule.equals !== undefined) return value === rule.equals;
    if (rule.notEquals !== undefined) return value !== rule.notEquals;
    if (Array.isArray(rule.in)) return rule.in.includes(value);
    if (rule.truthy) return Boolean(value);

    return true;
  }

  function isFieldVisible(field, answers) {
    if (!field.visibleWhen) return true;
    return evaluateVisibilityRule(field.visibleWhen, answers);
  }

  function getVisibleFields(step, answers) {
    return step.fields.filter((field) => isFieldVisible(field, answers));
  }

  function referencesField(rule, fieldId) {
    if (!rule) return false;
    if (Array.isArray(rule.all)) return rule.all.some((nestedRule) => referencesField(nestedRule, fieldId));
    if (Array.isArray(rule.any)) return rule.any.some((nestedRule) => referencesField(nestedRule, fieldId));
    return rule.field === fieldId;
  }

  function stepHasVisibilityDependency(step, fieldId) {
    return step.fields.some((field) => referencesField(field.visibleWhen, fieldId));
  }

  function getFieldValue(field) {
    if (field.type === "boolean") {
      const selected = document.querySelector(`input[name="${field.id}"]:checked`);
      return selected ? parseValueByType(field, selected.value) : "";
    }

    const input = byId(`field-${field.id}`);
    return input ? parseValueByType(field, input.value) : "";
  }

  function optionLabel(field, optionValue) {
    if (!Array.isArray(field.options)) return optionValue;
    const option = field.options.find((entry) => entry.value === optionValue);
    return option ? option.label : optionValue;
  }

  function formatSnapshotValue(field, value) {
    if (field.type === "boolean") return value ? "Yes" : "No";
    if (field.type === "select") return optionLabel(field, value);
    return String(value);
  }

  function setProgress() {
    const total = namespace.steps.length;
    const current = appState.currentStep + 1;
    const percent = Math.round((current / total) * 100);

    els.progressLabel.textContent = `Step ${current} of ${total}`;
    els.progressBar.style.width = `${percent}%`;
  }

  function renderStepPills() {
    const pills = namespace.steps
      .map((step, index) => {
        const classes = ["advisor-step-pill"];
        if (index === appState.currentStep) classes.push("is-active");
        if (index < appState.currentStep) classes.push("is-complete");

        return `<span class="${classes.join(" ")}" data-step="${index + 1}">${step.title}</span>`;
      })
      .join("");

    els.stepPills.innerHTML = pills;
  }

  function renderSnapshot() {
    const snapshotOrder = [
      "roomType",
      "sector",
      "roomSize",
      "attendeeCount",
      "primaryUse",
      "primaryPlatform",
      "hybridRequired",
      "recordingRequired",
      "budgetOrientation",
      "priorityFocus"
    ];

    const rows = snapshotOrder
      .map((fieldId) => {
        const field = fieldById(fieldId);
        if (!field) return "";

        const value = appState.answers[fieldId];
        if (value === "" || value === undefined || value === null) return "";

        const displayValue = formatSnapshotValue(field, value);
        return `<li><span>${field.label}</span><strong>${displayValue}</strong></li>`;
      })
      .filter(Boolean)
      .join("");

    els.snapshotList.innerHTML = rows || "<li>Start the questionnaire to build your room profile.</li>";
  }

  function fieldTemplate(field) {
    const required = field.required ? '<span class="advisor-required">*</span>' : "";
    const helper = field.help ? `<p class="advisor-helper">${field.help}</p>` : "";
    const currentValue = appState.answers[field.id];

    if (field.type === "select") {
      const options = field.options
        .map((opt) => {
          const selected = currentValue === opt.value ? "selected" : "";
          return `<option value="${opt.value}" ${selected}>${opt.label}</option>`;
        })
        .join("");

      return `
        <label class="advisor-label" for="field-${field.id}">${field.label}${required}</label>
        <div class="advisor-select-wrap">
          <select id="field-${field.id}" class="advisor-input" ${field.required ? "required" : ""}>
            <option value="">Select an option</option>
            ${options}
          </select>
        </div>
        ${helper}
      `;
    }

    if (field.type === "number") {
      const valueAttr = currentValue !== undefined && currentValue !== null && currentValue !== "" ? `value="${currentValue}"` : "";
      return `
        <label class="advisor-label" for="field-${field.id}">${field.label}${required}</label>
        <input id="field-${field.id}" class="advisor-input" type="number" min="${field.min || 0}" max="${field.max || 1000}" placeholder="${field.placeholder || ""}" ${valueAttr} ${field.required ? "required" : ""}>
        ${helper}
      `;
    }

    if (field.type === "boolean") {
      const yesChecked = currentValue === true ? "checked" : "";
      const noChecked = currentValue === false ? "checked" : "";

      return `
        <p class="advisor-label">${field.label}${required}</p>
        <div class="advisor-bool-row">
          <label class="advisor-bool-option">
            <input type="radio" name="${field.id}" value="true" ${yesChecked}>
            <span class="advisor-bool-pill">Yes</span>
          </label>
          <label class="advisor-bool-option">
            <input type="radio" name="${field.id}" value="false" ${noChecked}>
            <span class="advisor-bool-pill">No</span>
          </label>
        </div>
        ${helper}
      `;
    }

    return "";
  }

  function showError(messages) {
    const entries = Array.isArray(messages) ? messages : [messages];
    els.errorBox.innerHTML = `
      <div class="flex items-start gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" class="mt-0.5 h-5 w-5 shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div>
          <p class="font-semibold">Please review before continuing:</p>
          <ul class="mt-2 list-disc space-y-1 pl-5">
            ${entries.map((message) => `<li>${message}</li>`).join("")}
          </ul>
        </div>
      </div>
    `;
    els.errorBox.classList.remove("hidden");
  }

  function hideError() {
    els.errorBox.classList.add("hidden");
    els.errorBox.textContent = "";
  }

  function persistDraft() {
    safeLocalStorageSet(
      STORAGE_KEY,
      JSON.stringify({
        currentStep: appState.currentStep,
        answers: appState.answers
      })
    );
  }

  function restoreDraft() {
    const rawDraft = safeLocalStorageGet(STORAGE_KEY);
    if (!rawDraft) return;

    try {
      const parsed = JSON.parse(rawDraft);
      if (parsed && typeof parsed === "object") {
        if (parsed.answers && typeof parsed.answers === "object") {
          const normalizedAnswers = { ...parsed.answers };
          allFields().forEach((field) => {
            if (normalizedAnswers[field.id] === undefined) return;
            normalizedAnswers[field.id] = parseValueByType(field, normalizedAnswers[field.id]);
          });
          appState.answers = normalizedAnswers;
        }

        if (Number.isInteger(parsed.currentStep) && parsed.currentStep >= 0 && parsed.currentStep < namespace.steps.length) {
          appState.currentStep = parsed.currentStep;
        }
      }
    } catch (error) {
      // Ignore malformed draft.
    }
  }

  function bindFieldListeners(step, visibleFields) {
    visibleFields.forEach((field) => {
      if (field.type === "boolean") {
        document.querySelectorAll(`input[name="${field.id}"]`).forEach((input) => {
          input.addEventListener("change", () => handleFieldChange(step, field));
        });
        return;
      }

      const input = byId(`field-${field.id}`);
      if (!input) return;

      const eventName = field.type === "number" ? "input" : "change";
      input.addEventListener(eventName, () => handleFieldChange(step, field));
      input.addEventListener("change", () => handleFieldChange(step, field));
    });
  }

  function handleFieldChange(step, field) {
    const value = getFieldValue(field);

    if (field.type === "number" && Number.isNaN(value)) {
      delete appState.answers[field.id];
      hideError();
      renderSnapshot();
      persistDraft();
      return;
    }

    if (value === "") {
      delete appState.answers[field.id];
    } else {
      appState.answers[field.id] = value;
    }

    hideError();
    renderSnapshot();
    persistDraft();

    if (stepHasVisibilityDependency(step, field.id)) {
      renderStep();
    }
  }

  function validateStep(step, visibleFields) {
    const errors = [];

    visibleFields.forEach((field) => {
      const value = getFieldValue(field);

      if (field.required && (value === "" || value === null || value === undefined)) {
        errors.push(`${field.label} is required.`);
        return;
      }

      if (field.type === "number" && value !== "") {
        if (Number.isNaN(value)) {
          errors.push(`${field.label} must be a valid number.`);
          return;
        }

        if (field.min !== undefined && Number(value) < Number(field.min)) {
          errors.push(`${field.label} should be at least ${field.min}.`);
        }

        if (field.max !== undefined && Number(value) > Number(field.max)) {
          errors.push(`${field.label} should not exceed ${field.max}.`);
        }
      }
    });

    if (step.id === "room-basics") {
      const roomSize = appState.answers.roomSize;
      const attendees = Number(appState.answers.attendeeCount || 0);

      if (roomSize === "small" && attendees > 20) {
        errors.push("Small room profile is usually best for up to 20 attendees. Consider medium or large room size.");
      }

      if (roomSize === "medium" && attendees > 65) {
        errors.push("Medium room profile is usually best for up to 65 attendees. Consider large room size.");
      }
    }

    return errors;
  }

  function captureStepValues() {
    const step = namespace.steps[appState.currentStep];
    const visibleFields = getVisibleFields(step, appState.answers);

    visibleFields.forEach((field) => {
      const value = getFieldValue(field);
      if (value === "" || value === null || value === undefined) {
        delete appState.answers[field.id];
      } else {
        appState.answers[field.id] = value;
      }
    });

    step.fields
      .filter((field) => !visibleFields.some((visibleField) => visibleField.id === field.id))
      .forEach((field) => {
        delete appState.answers[field.id];
      });

    return validateStep(step, visibleFields);
  }

  function renderStep() {
    const step = namespace.steps[appState.currentStep];
    const visibleFields = getVisibleFields(step, appState.answers);

    els.stepTitle.textContent = step.title;
    els.stepDescription.textContent = step.description;

    els.formFields.innerHTML = visibleFields.length
      ? visibleFields.map((field) => `<div class="advisor-field">${fieldTemplate(field)}</div>`).join("")
      : '<div class="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">No additional fields are needed for this step based on your previous answers.</div>';

    bindFieldListeners(step, visibleFields);

    els.prevBtn.disabled = appState.currentStep === 0;
    els.nextBtn.textContent = appState.currentStep === namespace.steps.length - 1 ? "Generate Recommendation" : "Next Step";

    setProgress();
    renderStepPills();
    renderSnapshot();
    persistDraft();
  }

  function titleCase(value) {
    if (!value) return "";
    return String(value).charAt(0).toUpperCase() + String(value).slice(1);
  }

  function answerLabel(fieldId, value) {
    const field = fieldById(fieldId);
    if (!field) return String(value);
    return formatSnapshotValue(field, value);
  }

  function categoryRole(category) {
    const roles = {
      "Education Display": "Core teaching display layer for lesson delivery and annotation.",
      Display: "Primary visual collaboration surface for in-room participants.",
      Video: "Hybrid visual layer for presenter and audience visibility.",
      Audio: "Voice capture and playback layer for room-wide clarity.",
      Collaboration: "Presentation and sharing tools for quick interaction.",
      Compute: "Dedicated processing layer for stable conferencing workflows.",
      Recording: "Session capture layer for revision and asynchronous access.",
      "Writing Surface": "Analog extension layer for side-by-side writing support.",
      Control: "Operational control layer for premium room management."
    };
    var text = roles[category] || "Supports the overall room experience and reliability.";
    var pf = appState.result && appState.result.answers ? appState.result.answers.priorityFocus : null;
    if (pf === "simplicity" && category === "Collaboration") {
      text = "Chosen for ease of use — " + text.toLowerCase();
    } else if (pf === "prestige" && (category === "Display" || category === "Education Display" || category === "Control")) {
      text = "Selected for premium presentation quality — " + text.toLowerCase();
    }
    return text;
  }

  function categoryHeading(category) {
    const labels = {
      "Education Display": "Display & Teaching Layer",
      Display: "Display Layer",
      Video: "Video Collaboration Layer",
      Audio: "Audio Coverage Layer",
      Collaboration: "Presentation & Sharing Layer",
      Compute: "Conferencing Compute Layer",
      Recording: "Recording Layer",
      "Writing Surface": "Writing Support Layer",
      Control: "Control Layer"
    };
    return labels[category] || `${category} Layer`;
  }

  function zoneLabel(zone) {
    return titleCase(String(zone || "general").replace(/_/g, " "));
  }

  function groupProducts(products) {
    const groups = new Map();
    products.forEach((product) => {
      const key = product.category || "Other";
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(product);
    });
    return Array.from(groups.entries());
  }

  function categoryIcon(category) {
    const icons = {
      "Education Display": `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`,
      Display: `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>`,
      Video: `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>`,
      Audio: `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>`,
      Collaboration: `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>`,
      Compute: `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>`,
      Recording: `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>`,
      "Writing Surface": `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>`,
      Control: `<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>`
    };
    return icons[category] || "";
  }

  function productImageSrc(productId) {
    if (!productId) return "";
    return `assets/solution-advisor/images/equipment/${productId}.png?v=${EQUIPMENT_IMAGE_VERSION}`;
  }

  function productImageTemplate(product, className) {
    const src = productImageSrc(product.id);
    const classes = className || "advisor-product-image";
    return `
      <img
        class="${classes}"
        src="${src}"
        alt="${product.name}"
        loading="lazy"
        decoding="async"
      >
    `;
  }

  function productCardTemplate(product, options) {
    const opts = options || {};
    const features = (product.features || []).slice(0, 3).map((feature) => `<li>${feature}</li>`).join("");
    const benefits = (product.benefits || []).slice(0, 2).map((benefit) => `<li>${benefit}</li>`).join("");
    const icon = categoryIcon(product.category);
    const categoryBanner = opts.categoryBanner || "";

    return `
      <article class="advisor-product-card" data-product-id="${product.id}" data-category="${product.category}">
        ${categoryBanner}
        <div class="advisor-product-visual">
          ${productImageTemplate(product, "advisor-product-image")}
        </div>
        <div class="advisor-card-body">
          <p class="advisor-kicker">${icon ? `<span class="text-blue-600">${icon}</span>` : ""}${product.category}</p>
          <h4>${product.name}</h4>
          <div class="advisor-meta">Tier: ${titleCase(product.tier)} • Zone: ${zoneLabel(product.hotspot_zone)}</div>
          <p class="advisor-purpose">${categoryRole(product.category)}</p>
          <div class="advisor-card-attrs">
            <div>
              <p class="advisor-mini-title">Key Features</p>
              <ul>${features}</ul>
            </div>
            <div>
              <p class="advisor-mini-title">Why Included</p>
              <ul>${benefits}</ul>
            </div>
          </div>
          <a href="products.html" class="advisor-product-link">View product family →</a>
        </div>
      </article>
    `;
  }

  function renderProductGroups(products) {
    if (!products.length) {
      return '<div class="advisor-empty-card">No direct equipment matches were found for this exact input set. Please request a consultation for a custom room design.</div>';
    }

    const grouped = groupProducts(products);
    const cards = [];

    grouped.forEach(([category, categoryProducts]) => {
      const icon = categoryIcon(category);
      const headingLabel = categoryHeading(category);
      const banner = `
        <div class="advisor-category-banner">
          ${icon ? `<span class="text-blue-600">${icon}</span>` : ""}${headingLabel}
        </div>
      `;

      categoryProducts.forEach((product, index) => {
        cards.push(productCardTemplate(product, {
          categoryBanner: index === 0 ? banner : ""
        }));
      });
    });

    return `<div class="advisor-unified-grid">${cards.join("")}</div>`;
  }

  function setActiveHotspot(productId) {
    appState.activeHotspotId = productId;

    els.layoutCanvas.querySelectorAll(".layout-hotspot, .layout-v2-icon").forEach((hotspot) => {
      const isActive = hotspot.dataset.productId === productId;
      hotspot.classList.toggle("is-active", isActive);
      hotspot.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    els.layoutCanvas.querySelectorAll(".layout-equipment-card, .layout-v2-card").forEach((card) => {
      const isActive = card.dataset.productId === productId;
      card.classList.toggle("is-active", isActive);
      card.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    els.productGrid.querySelectorAll(".advisor-product-card").forEach((card) => {
      const isActive = card.dataset.productId === productId;
      card.classList.toggle("is-active", isActive);
    });
  }

  function renderFitSummary(result) {
    const { answers } = result;
    const fitEntries = [
      { label: "Room Fit", value: `${answerLabel("roomType", answers.roomType)} • ${answerLabel("roomSize", answers.roomSize)} room profile` },
      { label: "Use Case Fit", value: `${answerLabel("primaryUse", answers.primaryUse)} workflow optimization` },
      { label: "Hybrid Readiness", value: answers.hybridRequired ? "Hybrid-ready design included" : "In-room optimized (hybrid optional)" },
      { label: "Platform Compatibility", value: `${answerLabel("primaryPlatform", answers.primaryPlatform)} aligned stack` },
      { label: "Quality Tier", value: `${result.solutionTier} recommendation profile` }
    ];

    const fitBadges = [
      answerLabel("roomType", answers.roomType),
      `${answerLabel("roomSize", answers.roomSize)} room`,
      `${answers.attendeeCount} attendees`,
      answers.hybridRequired ? "Hybrid Ready" : "In-Room Focused",
      `${result.solutionTier} Tier`
    ];

    els.fitBadges.innerHTML = fitBadges.map((item) => `<span class="advisor-fit-badge">${item}</span>`).join("");
    els.fitList.innerHTML = fitEntries.map((item) => `<li><span>${item.label}</span><strong>${item.value}</strong></li>`).join("");

    els.componentCount.textContent = `${result.recommendedProducts.length} Components Recommended`;
    els.profileLine.textContent = `${answerLabel("sector", answers.sector)} • ${answerLabel("primaryUse", answers.primaryUse)} • ${answerLabel("primaryPlatform", answers.primaryPlatform)}`;
  }

  function showHotspotDetail(productId) {
    if (!appState.result) return;

    if (!productId) {
      setActiveHotspot(null);
      els.hotspotPanel.innerHTML = `
        <div class="flex items-start gap-3">
          <div class="icon-badge mt-0.5 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
          <div>
            <p class="text-sm font-semibold text-slate-900">Explore your room</p>
            <p class="advisor-detail-copy mt-1">Click any room label to view what that device contributes to your solution. Room details and meeting room equipment are shown with the layout.</p>
          </div>
        </div>
      `;
      return;
    }

    const product = appState.result.recommendedProducts.find((item) => item.id === productId);
    if (!product) return;

    const rawBenefits = product.benefits || [];
    const rawFeatures = product.features || [];
    const whyIncluded = rawBenefits[0] || categoryRole(product.category);
    const whatItDoes = rawBenefits.slice(1).concat(rawFeatures).slice(0, 3);
    const bullets = whatItDoes.length
      ? whatItDoes.map((item) => `<li class="flex items-start gap-2"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span><span>${item}</span></li>`).join("")
      : `<li class="flex items-start gap-2"><span class="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500"></span><span>Aligned to your room profile and usage goals.</span></li>`;

    let placementNote = "Placed in the " + zoneLabel(product.hotspot_zone) + ".";
    if (product.hotspot_zone === "front_display") placementNote = "Mounted on the front presentation wall.";
    else if (product.hotspot_zone === "camera_front") placementNote = "Positioned near the display for clear presenter visibility.";
    else if (product.hotspot_zone === "camera_rear") placementNote = "Placed at the back of the room to capture audience participation.";
    else if (product.hotspot_zone === "audio_zone") placementNote = "Distributed for even room-wide audio coverage.";
    else if (product.hotspot_zone === "presenter_zone") placementNote = "Located in the presenter area for easy access.";
    else if (product.hotspot_zone === "recording_zone") placementNote = "Positioned in the AV equipment zone.";

    const icon = categoryIcon(product.category);
    const productImage = productImageTemplate(product, "advisor-detail-image");

    els.hotspotPanel.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="icon-badge mt-0.5 shrink-0">
          ${icon ? `<span class="text-blue-600">${icon}</span>` : ""}
        </div>
        <div class="min-w-0 flex-1">
          <p class="advisor-kicker">${product.category}</p>
          <h4 class="advisor-detail-title">${product.name}</h4>
          <p class="advisor-meta mt-1">${placementNote}</p>
        </div>
      </div>
      <div class="advisor-detail-media">
        ${productImage}
      </div>
      <div class="mt-4 rounded-xl border border-slate-100 bg-slate-50/70 p-3">
        <p class="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">Why included</p>
        <p class="mt-1 text-sm leading-relaxed text-slate-700">${whyIncluded}</p>
      </div>
      <div class="mt-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3">
        <p class="text-xs font-bold uppercase tracking-[0.08em] text-slate-500">What it does for you</p>
        <ul class="mt-2 space-y-1.5 text-sm text-slate-700">
          ${bullets}
        </ul>
      </div>
    `;

    setActiveHotspot(productId);
  }

  function bindHotspotListener() {
    if (els.layoutCanvas.dataset.hotspotBound === "true") return;

    els.layoutCanvas.addEventListener("advisor:hotspot", (event) => {
      showHotspotDetail(event.detail.productId);
      if (event.detail.interactionType === "keyboard") {
        els.hotspotPanel.focus({ preventScroll: true });
      }
    });

    els.layoutCanvas.dataset.hotspotBound = "true";
  }

  function renderResult(result) {
    appState.result = result;

    if (typeof gtag !== "undefined") {
      gtag("event", "advisor_completed", {
        tier: result.solutionTier,
        room_type: result.answers.roomType
      });
    }

    var ctaBtn = byId("advisorCtaConsultation");
    if (ctaBtn && result.answers.roomType && result.solutionTier) {
      ctaBtn.setAttribute(
        "data-tally-open",
        "QKB5B8?room_type=" + encodeURIComponent(result.answers.roomType) +
        "&tier=" + encodeURIComponent(result.solutionTier)
      );
    }

    var TIER_DESCRIPTIONS = {
      Essential: "A focused, reliable setup covering the core requirements for your room.",
      Professional: "A full-featured configuration delivering strong performance and flexibility.",
      Premium: "A high-specification solution optimised for demanding environments and hybrid excellence."
    };

    els.tierBadge.textContent = result.solutionTier;
    els.tierBadge.className = "advisor-tier-badge tier-" + result.solutionTier.toLowerCase();
    if (els.tierDescription) {
      els.tierDescription.textContent = TIER_DESCRIPTIONS[result.solutionTier] || "";
    }

    els.summaryText.textContent = result.summary;
    renderFitSummary(result);
    els.productGrid.innerHTML = renderProductGroups(result.recommendedProducts);

    var checkIcon = '<svg xmlns="http://www.w3.org/2000/svg" class="advisor-insight-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';
    var infoIcon = '<svg xmlns="http://www.w3.org/2000/svg" class="advisor-insight-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';

    var sectorNotes = {
      education: "This configuration is optimised for teaching environments — display and audio are prioritised for student-facing clarity and daily classroom reliability.",
      enterprise: "This bundle is scoped for professional meeting environments — platform compatibility and hybrid readiness are the primary design drivers.",
      government: "Government deployments typically prioritise reliability and manageability. This bundle avoids complexity-heavy components where a simpler solution meets the requirement.",
      training: "Training environments benefit from flexible audio coverage and recording support. This bundle reflects those priorities."
    };
    var sectorNote = sectorNotes[result.answers.sector] || "";
    var sectorHtml = sectorNote ? '<div class="advisor-insight-row advisor-insight-row--info">' + infoIcon + '<p class="advisor-insight-text">' + sectorNote + '</p></div>' : "";

    var IMPORTANT_RULE_IDS = [
      "hybrid-core-stack", "recording-enabled", "essential-guardrails",
      "professional-tier-default", "premium-tier-enable", "premium-hybrid-video-upgrade",
      "presenter-tracking-upgrade", "boardroom-control-layer", "priority-prestige-control",
      "priority-simplicity-wireless"
    ];
    var priorityNotes = result.explanations.filter(function(e) { return IMPORTANT_RULE_IDS.indexOf(e.id) !== -1; });
    var otherNotes = result.explanations.filter(function(e) { return IMPORTANT_RULE_IDS.indexOf(e.id) === -1; });
    var sortedExplanations = priorityNotes.concat(otherNotes).slice(0, 5);

    var rationaleItems = sortedExplanations
      .map(function(item) {
        return '<div class="advisor-insight-row">' + checkIcon + '<p class="advisor-insight-text">' + item.rationale + '</p></div>';
      })
      .join("");

    els.rationaleList.innerHTML = sectorHtml + (rationaleItems || '<div class="advisor-insight-row">' + checkIcon + '<p class="advisor-insight-text">Base recommendation generated from room and usage profile.</p></div>');

    els.resultSection.classList.remove("hidden");
    void els.resultSection.offsetHeight; // force layout so board has real dimensions

    namespace.layout.render(els.layoutCanvas, result);
    bindHotspotListener();

    // Animate result section cards into view
    requestAnimationFrame(() => {
      els.resultSection.querySelectorAll("[data-reveal]").forEach((el) => {
        el.classList.add("advisor-reveal", "is-visible");
      });
    });

    els.resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function goNext() {
    hideError();

    const errors = captureStepValues();
    if (errors.length) {
      showError(errors);
      return;
    }

    if (appState.currentStep < namespace.steps.length - 1) {
      appState.currentStep += 1;
      if (typeof gtag !== "undefined") {
        gtag("event", "advisor_step_completed", {
          step_name: namespace.steps[appState.currentStep - 1].id
        });
      }
      renderStep();
      return;
    }

    els.nextBtn.disabled = true;
    els.prevBtn.disabled = true;
    els.nextBtn.textContent = "Generating...";

    try {
      const result = await namespace.engine.evaluate(appState.answers);
      renderResult(result);
    } catch (error) {
      const fallbackMessage = "Unable to generate recommendation. Please try again.";
      const detail = error && error.message ? error.message : fallbackMessage;
      showError(detail);
      if (window.console && typeof window.console.error === "function") {
        window.console.error("Advisor generation failed:", error);
      }
    } finally {
      els.nextBtn.disabled = false;
      els.prevBtn.disabled = appState.currentStep === 0;
      els.nextBtn.textContent = "Generate Recommendation";
    }
  }

  function goPrev() {
    hideError();
    if (appState.currentStep === 0) return;

    appState.currentStep -= 1;
    renderStep();
  }

  function resetAdvisor() {
    appState.currentStep = 0;
    appState.answers = {};
    appState.result = null;
    appState.activeHotspotId = null;

    hideError();
    els.resultSection.classList.add("hidden");
    els.hotspotPanel.innerHTML = `
      <div class="flex items-start gap-3">
        <div class="icon-badge mt-0.5 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
        </div>
        <div>
          <p class="text-sm font-semibold text-slate-900">Explore your room</p>
          <p class="advisor-detail-copy mt-1">Click any room label to view what that device contributes to your solution. Room details and meeting room equipment are shown with the layout.</p>
        </div>
      </div>
    `;

    safeLocalStorageRemove(STORAGE_KEY);
    renderStep();
  }

  function generateShareText(result) {
    var roomLabel = {
      classroom: "Smart Classroom", meeting: "Meeting Room",
      training: "Training Room", boardroom: "Boardroom", seminar: "Seminar Room"
    }[result.answers.roomType] || titleCase(result.answers.roomType);

    var productLines = result.recommendedProducts
      .map(function(p) { return "\u2022 " + p.name; })
      .join("\n");

    return [
      "POSTO Tech \u2014 Solution Recommendation",
      "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
      "Room: " + roomLabel + " \u00b7 " + result.answers.attendeeCount + " attendees \u00b7 " + titleCase(result.answers.roomSize || ""),
      "Tier: " + result.solutionTier,
      "",
      "Recommended Equipment:",
      productLines,
      "",
      "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
      "Designed by postolabs.com/solution-advisor",
      "For a full proposal: contact@postolabs.com"
    ].join("\n");
  }

  function init() {
    els.progressLabel = byId("advisorProgressLabel");
    els.progressBar = byId("advisorProgressBar");
    els.stepPills = byId("advisorStepPills");
    els.stepTitle = byId("advisorStepTitle");
    els.stepDescription = byId("advisorStepDescription");
    els.formFields = byId("advisorFormFields");
    els.errorBox = byId("advisorError");
    els.snapshotList = byId("advisorSnapshotList");
    els.prevBtn = byId("advisorPrevBtn");
    els.nextBtn = byId("advisorNextBtn");
    els.resultSection = byId("advisorResultSection");
    els.summaryText = byId("advisorSummaryText");
    els.tierBadge = byId("advisorTierBadge");
    els.fitBadges = byId("advisorFitBadges");
    els.fitList = byId("advisorFitList");
    els.componentCount = byId("advisorComponentCount");
    els.profileLine = byId("advisorProfileLine");
    els.productGrid = byId("advisorProductGrid");
    els.rationaleList = byId("advisorRationaleList");
    els.layoutCanvas = byId("advisorLayoutCanvas");
    els.hotspotPanel = byId("advisorHotspotPanel");
    els.tierDescription = byId("advisorTierDescription");
    els.resetBtn = byId("advisorResetBtn");

    els.prevBtn.addEventListener("click", goPrev);
    els.nextBtn.addEventListener("click", goNext);
    els.resetBtn.addEventListener("click", resetAdvisor);

    var copyBtn = byId("advisorCopyBtn");
    if (copyBtn) {
      copyBtn.addEventListener("click", function () {
        if (!appState.result) return;
        var text = generateShareText(appState.result);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" /></svg> Copied!';
            copyBtn.classList.add("copied");
            setTimeout(function () {
              copyBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg> Copy Summary';
              copyBtn.classList.remove("copied");
            }, 2500);
          });
        }
        if (typeof gtag !== "undefined") {
          gtag("event", "advisor_cta_clicked", { cta_type: "copy_summary" });
        }
      });
    }

    var waBtn = byId("advisorWhatsAppBtn");
    if (waBtn) {
      waBtn.addEventListener("click", function () {
        if (!appState.result) return;
        var text = generateShareText(appState.result);
        window.open("https://wa.me/923399887766?text=" + encodeURIComponent(text), "_blank", "noopener");
        if (typeof gtag !== "undefined") {
          gtag("event", "advisor_cta_clicked", { cta_type: "whatsapp_share" });
        }
      });
    }

    var ctaConsultBtn = byId("advisorCtaConsultation");
    var ctaProposalBtn = byId("advisorCtaProposal");
    if (ctaConsultBtn) {
      ctaConsultBtn.addEventListener("click", function () {
        if (typeof gtag !== "undefined") {
          gtag("event", "advisor_cta_clicked", { cta_type: "consultation" });
        }
      });
    }
    if (ctaProposalBtn) {
      ctaProposalBtn.addEventListener("click", function () {
        if (typeof gtag !== "undefined") {
          gtag("event", "advisor_cta_clicked", { cta_type: "proposal" });
        }
      });
    }

    els.hotspotPanel.setAttribute("tabindex", "-1");

    (function observeResultSection() {
      var section = byId("advisorResultSection");
      if (!section || !window.IntersectionObserver) return;
      var obs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            if (typeof gtag !== "undefined") {
              gtag("event", "advisor_result_viewed");
            }
            obs.unobserve(section);
          }
        });
      }, { threshold: 0.2 });
      obs.observe(section);
    })();

    restoreDraft();
    renderStep();
    if (typeof gtag !== "undefined") {
      gtag("event", "advisor_started");
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})(window.PostoSolutionAdvisor);
