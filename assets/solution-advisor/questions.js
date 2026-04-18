window.PostoSolutionAdvisor = window.PostoSolutionAdvisor || {};

window.PostoSolutionAdvisor.steps = [
  {
    id: "room-basics",
    title: "Room Basics",
    description: "Start with space and institutional context so we can right-size the recommendation.",
    fields: [
      {
        id: "roomType",
        label: "Room type",
        type: "select",
        required: true,
        help: "Choose the primary environment this setup is for.",
        options: [
          { value: "classroom", label: "Smart Classroom" },
          { value: "meeting", label: "Meeting Room" },
          { value: "training", label: "Training Room" },
          { value: "boardroom", label: "Boardroom" },
          { value: "seminar", label: "Seminar / Small Auditorium" }
        ]
      },
      {
        id: "sector",
        label: "Institution type",
        type: "select",
        required: true,
        help: "This helps us align recommendations to your operating context.",
        options: [
          { value: "education", label: "Education (School / University)" },
          { value: "enterprise", label: "Enterprise / Corporate" },
          { value: "government", label: "Government / Public Sector" },
          { value: "training", label: "Training Center" }
        ]
      },
      {
        id: "roomSize",
        label: "Room size",
        type: "select",
        required: true,
        options: [
          { value: "small", label: "Small (up to 250 sq ft)" },
          { value: "medium", label: "Medium (250 - 600 sq ft)" },
          { value: "large", label: "Large (600+ sq ft)" }
        ]
      },
      {
        id: "attendeeCount",
        label: "Typical attendee/student count",
        type: "number",
        required: true,
        min: 1,
        max: 300,
        placeholder: "e.g., 30",
        help: "Use the regular day-to-day room occupancy, not maximum event capacity."
      }
    ]
  },
  {
    id: "usage-collaboration",
    title: "Usage and Collaboration",
    description: "Define how sessions happen so we can optimize platform, camera, and recording strategy.",
    fields: [
      {
        id: "primaryUse",
        label: "Primary use pattern",
        type: "select",
        required: true,
        options: [
          { value: "teaching", label: "Teaching / Learning" },
          { value: "meetings", label: "Meetings / Collaboration" },
          { value: "presentation", label: "Presentations / Briefings" },
          { value: "mixed", label: "Mixed Usage" }
        ]
      },
      {
        id: "primaryPlatform",
        label: "Primary collaboration platform",
        type: "select",
        required: true,
        options: [
          { value: "teams", label: "Microsoft Teams" },
          { value: "zoom", label: "Zoom" },
          { value: "webex", label: "Webex" },
          { value: "meet", label: "Google Meet" },
          { value: "mixed", label: "Mixed / Multiple Platforms" }
        ]
      },
      {
        id: "hybridRequired",
        label: "Need hybrid participation?",
        type: "boolean",
        required: true,
        help: "Select Yes if remote participants will frequently join live sessions."
      },
      {
        id: "recordingRequired",
        label: "Need session or lecture recording?",
        type: "boolean",
        required: true
      }
    ]
  },
  {
    id: "technology-preferences",
    title: "Technology Preferences",
    description: "Capture feature preferences so the bundle aligns with your delivery style.",
    fields: [
      {
        id: "writingPanels",
        label: "Need side writing panels / blackboard wings?",
        type: "boolean",
        required: true,
        visibleWhen: {
          field: "roomType",
          in: ["classroom", "training", "seminar"]
        }
      },
      {
        id: "audienceCamera",
        label: "Need audience camera for remote viewers?",
        type: "boolean",
        required: true,
        visibleWhen: {
          all: [
            { field: "hybridRequired", equals: true },
            { field: "roomType", notEquals: "meeting" }
          ]
        }
      },
      {
        id: "presenterTracking",
        label: "Need teacher/presenter tracking camera?",
        type: "boolean",
        required: true,
        visibleWhen: {
          all: [
            { field: "roomType", notEquals: "meeting" },
            {
              any: [
                { field: "hybridRequired", equals: true },
                { field: "roomType", in: ["classroom", "training"] }
              ]
            }
          ]
        }
      },
      {
        id: "wirelessPresentation",
        label: "Need wireless content sharing?",
        type: "boolean",
        required: true,
        help: "Useful when presenters switch frequently between laptops/devices."
      }
    ]
  },
  {
    id: "budget-goals",
    title: "Budget and Priorities",
    description: "Finalize preferred investment tier and decision priorities.",
    fields: [
      {
        id: "budgetOrientation",
        label: "Budget orientation",
        type: "select",
        required: true,
        options: [
          { value: "essential", label: "Essential" },
          { value: "professional", label: "Professional" },
          { value: "premium", label: "Premium" }
        ]
      },
      {
        id: "priorityFocus",
        label: "Primary decision priority",
        type: "select",
        required: true,
        options: [
          { value: "simplicity", label: "Ease of use" },
          { value: "performance", label: "Performance and reliability" },
          { value: "prestige", label: "Premium presentation" }
        ]
      }
    ]
  }
];
