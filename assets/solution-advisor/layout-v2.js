window.PostoSolutionAdvisor = window.PostoSolutionAdvisor || {};

(function registerLayoutV2(namespace) {
  const ROOM_BACKGROUNDS = {
    classroom: "assets/solution-advisor/images/classroom-overhead-v1.png?v=20260417a",
    training: "assets/solution-advisor/images/training-overhead-v1.png?v=20260417a",
    conference: "assets/solution-advisor/images/meeting-room-overhead-v3.png",
    boardroom: "assets/solution-advisor/images/boardroom-overhead-v2.png?v=20260417b",
    theater: "assets/solution-advisor/images/seminar-overhead-v1.png?v=20260417a"
  };

  const ICON_PATHS = {
    display_main: "assets/solution-advisor/icons-v2/display-main.svg",
    display_aux: "assets/solution-advisor/icons-v2/display-aux.svg",
    camera_front: "assets/solution-advisor/icons-v2/camera-front.svg",
    camera_rear: "assets/solution-advisor/icons-v2/camera-rear.svg",
    audio_speaker: "assets/solution-advisor/icons-v2/speaker.svg",
    audio_mic: "assets/solution-advisor/icons-v2/mic.svg",
    audio_dsp: "assets/solution-advisor/icons-v2/dsp.svg",
    recording: "assets/solution-advisor/icons-v2/recorder.svg",
    control: "assets/solution-advisor/icons-v2/control.svg",
    compute: "assets/solution-advisor/icons-v2/compute.svg",
    collaboration: "assets/solution-advisor/icons-v2/collaboration.svg",
    presenter: "assets/solution-advisor/icons-v2/control.svg",
    fallback: "assets/solution-advisor/icons-v2/compute.svg"
  };

  const CATEGORY_ROLES = {
    "Education Display": "Supports lesson delivery, annotation, and student visibility.",
    Display: "Provides the primary visual surface for in-room collaboration.",
    Video: "Improves remote participation with clear presenter and audience framing.",
    Audio: "Improves speech intelligibility for in-room and remote participants.",
    Collaboration: "Enables quick wireless sharing and smoother session flow.",
    Compute: "Stabilizes conferencing runtime and connected room workflows.",
    Recording: "Captures sessions for revision, compliance, and asynchronous access.",
    "Writing Surface": "Extends board space for side notes and concept breakdown.",
    Control: "Simplifies operation with one-touch room control scenes."
  };

  const PLACEMENT_PROFILES = {
    classroom: {
      slots: {
        display_main: [{ left: 50, top: 14.8 }],
        display_aux: [{ left: 34.2, top: 14.8 }, { left: 65.8, top: 14.8 }],
        camera_front: [{ left: 50, top: 6.2 }, { left: 46, top: 6.2 }, { left: 54, top: 6.2 }],
        camera_rear: [{ left: 50, top: 90.6 }, { left: 44, top: 90.6 }, { left: 56, top: 90.6 }],
        audio_speaker: [{ left: 8, top: 22 }, { left: 92, top: 22 }, { left: 8, top: 41 }, { left: 92, top: 41 }],
        audio_mic: [{ left: 37, top: 33 }, { left: 50, top: 33 }, { left: 63, top: 33 }, { left: 37, top: 47 }, { left: 50, top: 47 }, { left: 63, top: 47 }, { left: 37, top: 61 }, { left: 50, top: 61 }, { left: 63, top: 61 }],
        audio_dsp: [{ left: 52, top: 24.2 }, { left: 48, top: 24.2 }],
        recording: [{ left: 50, top: 27.2 }, { left: 54, top: 27.2 }],
        control: [{ left: 49.3, top: 74.7 }, { left: 47.2, top: 76.5 }, { left: 51.4, top: 76.5 }],
        presenter: [{ left: 50, top: 83.2 }],
        collaboration: [{ left: 53.4, top: 74.7 }, { left: 55.2, top: 76.5 }, { left: 51.6, top: 76.5 }],
        compute: [{ left: 46, top: 24.2 }, { left: 44, top: 24.2 }],
        fallback: [{ left: 12, top: 32 }, { left: 88, top: 32 }, { left: 12, top: 53 }, { left: 88, top: 53 }, { left: 12, top: 76 }, { left: 88, top: 76 }]
      },
      exclusions: []
    },
    training: {
      slots: {
        display_main: [{ left: 50, top: 16.8 }],
        display_aux: [{ left: 39, top: 16.8 }, { left: 61, top: 16.8 }],
        camera_front: [{ left: 50, top: 7.6 }, { left: 47, top: 7.6 }, { left: 53, top: 7.6 }],
        camera_rear: [{ left: 92, top: 27.8 }, { left: 90, top: 27.8 }, { left: 8, top: 27.8 }],
        audio_speaker: [{ left: 13, top: 15.5 }, { left: 87, top: 15.5 }, { left: 8, top: 27 }, { left: 92, top: 27 }, { left: 8, top: 50 }, { left: 92, top: 50 }],
        audio_mic: [{ left: 31, top: 35 }, { left: 50, top: 35 }, { left: 69, top: 35 }, { left: 31, top: 47 }, { left: 50, top: 47 }, { left: 69, top: 47 }, { left: 31, top: 59 }, { left: 50, top: 59 }, { left: 69, top: 59 }, { left: 44.5, top: 75.8 }],
        audio_dsp: [{ left: 50, top: 25.2 }, { left: 53, top: 25.2 }, { left: 57.8, top: 82.5 }],
        recording: [{ left: 47, top: 25.2 }, { left: 43, top: 25.2 }],
        control: [{ left: 49.3, top: 75.8 }, { left: 51.5, top: 75.8 }],
        presenter: [{ left: 50, top: 83 }],
        collaboration: [{ left: 54.2, top: 75.8 }, { left: 56.3, top: 75.8 }],
        compute: [{ left: 50, top: 29.2 }, { left: 58.2, top: 82.5 }],
        fallback: [{ left: 12, top: 34 }, { left: 88, top: 34 }, { left: 12, top: 56 }, { left: 88, top: 56 }, { left: 12, top: 86 }, { left: 88, top: 86 }]
      },
      exclusions: []
    },
    conference: {
      slots: {
        display_main: [{ left: 50, top: 14.6 }],
        display_aux: [{ left: 45, top: 14.6 }, { left: 55, top: 14.6 }],
        // Keep Video Bar anchor on the physical camera bar (above the IFP), not the display surface.
        camera_front: [{ left: 50, top: 6.4 }],
        camera_rear: [{ left: 50, top: 92 }],
        audio_speaker: [{ left: 8, top: 36 }, { left: 92, top: 36 }, { left: 25, top: 13 }, { left: 75, top: 13 }],
        audio_mic: [{ left: 50, top: 33 }, { left: 50, top: 43 }, { left: 50, top: 53 }, { left: 50, top: 63 }],
        audio_dsp: [{ left: 43, top: 24 }, { left: 50, top: 24 }],
        recording: [{ left: 50, top: 24 }, { left: 50, top: 92 }],
        control: [{ left: 46, top: 69 }, { left: 55, top: 69 }],
        presenter: [{ left: 50, top: 72 }],
        collaboration: [{ left: 50, top: 69 }, { left: 48, top: 24 }],
        compute: [{ left: 41, top: 24 }, { left: 55, top: 24 }],
        fallback: [{ left: 38, top: 18 }, { left: 62, top: 18 }, { left: 16, top: 45 }, { left: 84, top: 45 }, { left: 16, top: 75 }, { left: 84, top: 75 }]
      },
      exclusions: []
    },
    boardroom: {
      slots: {
        display_main: [{ left: 50, top: 14 }],
        display_aux: [{ left: 40, top: 14 }, { left: 60, top: 14 }],
        camera_front: [{ left: 50, top: 4.8 }, { left: 46, top: 4.8 }, { left: 54, top: 4.8 }],
        camera_rear: [{ left: 50, top: 92 }, { left: 9, top: 68 }, { left: 91, top: 68 }],
        audio_speaker: [{ left: 8, top: 25 }, { left: 92, top: 25 }, { left: 8, top: 42 }, { left: 92, top: 42 }],
        audio_mic: [{ left: 50, top: 42 }, { left: 50, top: 50 }, { left: 50, top: 58 }, { left: 50, top: 66 }],
        audio_dsp: [{ left: 46, top: 22 }, { left: 54, top: 22 }, { left: 58, top: 24 }],
        recording: [{ left: 50, top: 90 }, { left: 45, top: 90 }, { left: 55, top: 90 }],
        control: [{ left: 47.4, top: 68.5 }, { left: 46.2, top: 70.2 }, { left: 48.6, top: 70.2 }],
        presenter: [{ left: 50, top: 84 }],
        collaboration: [{ left: 51.8, top: 68.8 }, { left: 53, top: 70.2 }, { left: 50.8, top: 70.2 }],
        compute: [{ left: 42, top: 22 }, { left: 58, top: 22 }],
        fallback: [{ left: 10, top: 34 }, { left: 90, top: 34 }, { left: 10, top: 56 }, { left: 90, top: 56 }, { left: 12, top: 86 }, { left: 88, top: 86 }]
      },
      exclusions: []
    },
    theater: {
      slots: {
        display_main: [{ left: 50, top: 16.8 }],
        // Place side writing panel anchor on the extreme-left edge of the left writing panel.
        display_aux: [{ left: 27.2, top: 16.8 }, { left: 72.8, top: 16.8 }],
        camera_front: [{ left: 50, top: 7.2 }, { left: 47, top: 7.2 }, { left: 53, top: 7.2 }],
        camera_rear: [{ left: 94, top: 27.8 }, { left: 92, top: 27.8 }],
        // First slot is the left wall speaker anchor and should remain exact.
        audio_speaker: [{ left: 16.2, top: 14.8 }, { left: 83.8, top: 14.8 }, { left: 9, top: 33 }, { left: 91, top: 33 }],
        audio_mic: [{ left: 26, top: 43 }, { left: 38, top: 43 }, { left: 50, top: 43 }, { left: 62, top: 43 }, { left: 74, top: 43 }, { left: 26, top: 52 }, { left: 38, top: 52 }, { left: 50, top: 52 }, { left: 62, top: 52 }, { left: 74, top: 52 }, { left: 26, top: 61 }, { left: 38, top: 61 }, { left: 50, top: 61 }, { left: 62, top: 61 }, { left: 74, top: 61 }, { left: 47, top: 78 }],
        audio_dsp: [{ left: 52.8, top: 78 }],
        recording: [{ left: 56.3, top: 78 }],
        control: [{ left: 45, top: 78 }],
        presenter: [{ left: 50, top: 84 }],
        collaboration: [{ left: 48.8, top: 78 }],
        compute: [{ left: 60.2, top: 78 }],
        fallback: [{ left: 12, top: 34 }, { left: 88, top: 34 }, { left: 12, top: 56 }, { left: 88, top: 56 }, { left: 12, top: 86 }, { left: 88, top: 86 }]
      },
      exclusions: []
    }
  };

  const ICON_SIZE_PX = 40;
  const ICON_MARGIN_PX = 8;
  const ICON_SAFE_GAP_PX = 12;
  const CHAIR_SIZE_PX = 14;
  const CHAIR_MARGIN_PX = 10;
  const BOARD_SAFE_BOUNDS = { left: 6, right: 94, top: 10, bottom: 92 };
  const TABLE_GEOMETRY = {
    conference: { cx: 50, cy: 51, rx: 29, ry: 16, width: 58, height: 32 },
    boardroom: { cx: 50, cy: 57, rx: 17.5, ry: 30 }
  };
  const SHOW_CONFERENCE_SEAT_FURNITURE = false;
  const MEETING_STANDARD_SEAT_COUNTS = [6, 8, 10, 12, 16, 20];
  const MEETING_SEAT_RING_20 = [
    { left: 22, top: 33.4, axis: "h" },
    { left: 29.5, top: 33.4, axis: "h" },
    { left: 37, top: 33.4, axis: "h" },
    { left: 44.5, top: 33.4, axis: "h" },
    { left: 52, top: 33.4, axis: "h" },
    { left: 59.5, top: 33.4, axis: "h" },
    { left: 67, top: 33.4, axis: "h" },
    { left: 74.5, top: 33.4, axis: "h" },
    { left: 83.8, top: 46, axis: "v" },
    { left: 83.8, top: 56.2, axis: "v" },
    { left: 22, top: 74.2, axis: "h" },
    { left: 29.5, top: 74.2, axis: "h" },
    { left: 37, top: 74.2, axis: "h" },
    { left: 44.5, top: 74.2, axis: "h" },
    { left: 52, top: 74.2, axis: "h" },
    { left: 59.5, top: 74.2, axis: "h" },
    { left: 67, top: 74.2, axis: "h" },
    { left: 74.5, top: 74.2, axis: "h" },
    { left: 16.2, top: 46, axis: "v" },
    { left: 16.2, top: 56.2, axis: "v" }
  ];
  const MEETING_SEAT_INDEX_PRESETS = {
    6: [1, 4, 7, 12, 15, 18],
    8: [0, 3, 6, 8, 10, 13, 16, 18],
    10: [0, 2, 4, 7, 9, 10, 12, 14, 17, 19],
    12: [0, 1, 3, 4, 6, 8, 10, 11, 13, 14, 16, 18],
    16: [0, 1, 2, 3, 4, 6, 7, 9, 10, 11, 12, 13, 14, 16, 17, 19],
    20: Array.from({ length: 20 }, (_, index) => index)
  };
  const TEMPLATE_CALLOUT_SLOTS = {
    classroom: {
      top: [
        { left: 24, top: 8.8 },
        { left: 50, top: 8.8 },
        { left: 76, top: 8.8 }
      ],
      left: [
        { left: 14, top: 23 },
        { left: 14, top: 34 },
        { left: 14, top: 45 },
        { left: 14, top: 56 },
        { left: 14, top: 67 },
        { left: 14, top: 78 }
      ],
      right: [
        { left: 86, top: 23 },
        { left: 86, top: 34 },
        { left: 86, top: 45 },
        { left: 86, top: 56 },
        { left: 86, top: 67 },
        { left: 86, top: 78 }
      ],
      bottom: [
        { left: 24, top: 89.5 },
        { left: 50, top: 89.5 },
        { left: 76, top: 89.5 }
      ]
    },
    conference: {
      top: [
        { left: 34, top: 5.8 },
        { left: 50, top: 4.9 },
        { left: 66, top: 5.8 }
      ],
      left: [
        { left: 16, top: 32 },
        { left: 16, top: 43 },
        { left: 16, top: 54 },
        { left: 17, top: 65 }
      ],
      right: [
        { left: 84, top: 32 },
        { left: 84, top: 43 },
        { left: 84, top: 54 },
        { left: 83, top: 65 }
      ],
      bottom: [
        { left: 34, top: 84.5 },
        { left: 50, top: 90 },
        { left: 66, top: 84.5 }
      ]
    },
    boardroom: {
      top: [
        { left: 22, top: 8 },
        { left: 34, top: 8 },
        { left: 46, top: 8 }
      ],
      left: [
        { left: 14, top: 24 },
        { left: 14, top: 34 },
        { left: 14, top: 44 },
        { left: 14, top: 54 },
        { left: 14, top: 64 },
        { left: 14, top: 74 }
      ],
      right: [
        { left: 86, top: 24 },
        { left: 86, top: 34 },
        { left: 86, top: 44 },
        { left: 86, top: 54 },
        { left: 86, top: 64 },
        { left: 86, top: 74 }
      ],
      bottom: [
        { left: 24, top: 88 },
        { left: 36, top: 88 },
        { left: 50, top: 88 },
        { left: 64, top: 88 }
      ]
    },
    training: {
      top: [
        { left: 22, top: 8 },
        { left: 36, top: 8 },
        { left: 50, top: 8 },
        { left: 64, top: 8 }
      ],
      left: [
        { left: 14, top: 22 },
        { left: 14, top: 32 },
        { left: 14, top: 42 },
        { left: 14, top: 52 },
        { left: 14, top: 62 },
        { left: 14, top: 74 },
        { left: 14, top: 84 }
      ],
      right: [
        { left: 86, top: 22 },
        { left: 86, top: 32 },
        { left: 86, top: 42 },
        { left: 86, top: 52 },
        { left: 86, top: 62 },
        { left: 86, top: 74 },
        { left: 86, top: 84 }
      ],
      bottom: [
        { left: 24, top: 91 },
        { left: 50, top: 91 },
        { left: 76, top: 91 }
      ]
    },
    theater: {
      top: [
        { left: 22, top: 8 },
        { left: 36, top: 8 },
        { left: 50, top: 8 },
        { left: 64, top: 8 }
      ],
      left: [
        { left: 14, top: 22 },
        { left: 14, top: 32 },
        { left: 14, top: 42 },
        { left: 14, top: 52 },
        { left: 14, top: 62 },
        { left: 14, top: 74 },
        { left: 14, top: 84 }
      ],
      right: [
        { left: 86, top: 22 },
        { left: 86, top: 32 },
        { left: 86, top: 42 },
        { left: 86, top: 52 },
        { left: 86, top: 62 },
        { left: 86, top: 74 },
        { left: 86, top: 84 }
      ],
      bottom: [
        { left: 24, top: 91 },
        { left: 50, top: 91 },
        { left: 76, top: 91 }
      ]
    }
  };
  const TEMPLATE_ROLE_LABEL_SLOTS = {
    classroom: {
      display_main: [{ left: 16, top: 14.8 }],
      display_aux: [{ left: 16, top: 22 }, { left: 84, top: 22 }],
      camera_front: [{ left: 84, top: 6.2 }],
      camera_rear: [{ left: 16, top: 90.6 }],
      audio_speaker: [{ left: 14, top: 23 }, { left: 86, top: 23 }, { left: 14, top: 41 }, { left: 86, top: 41 }],
      audio_mic: [{ left: 86, top: 34 }, { left: 86, top: 45 }, { left: 86, top: 56 }, { left: 86, top: 67 }],
      recording: [{ left: 86, top: 27.2 }],
      audio_dsp: [{ left: 86, top: 24.2 }],
      collaboration: [{ left: 14, top: 74.7 }],
      control: [{ left: 86, top: 74.7 }],
      compute: [{ left: 14, top: 24.2 }],
      presenter: [{ left: 14, top: 83.2 }],
      fallback: [{ left: 14, top: 50 }, { left: 86, top: 50 }]
    },
    conference: {
      display_main: [{ left: 16, top: 14.6 }],
      // Meeting-room label rules (persisted): avoid speaker occlusion and cross-over conflicts.
      // 1) Video Bar label stays right-side but inside, left of the right speaker.
      // 2) Tabletop Microphones label stays on the right side.
      // 3) Compute Module label stays on the left side.
      camera_front: [{ left: 72, top: 8 }],
      camera_rear: [{ left: 84, top: 92 }],
      audio_speaker: [{ left: 16, top: 36 }, { left: 84, top: 36 }, { left: 16, top: 13 }, { left: 84, top: 13 }],
      audio_mic: [{ left: 86, top: 33 }, { left: 86, top: 43 }, { left: 86, top: 53 }, { left: 86, top: 63 }],
      recording: [{ left: 84, top: 52 }, { left: 84, top: 92 }],
      audio_dsp: [{ left: 84, top: 44 }, { left: 84, top: 52 }],
      collaboration: [{ left: 84, top: 69 }, { left: 84, top: 61 }],
      control: [{ left: 84, top: 61 }, { left: 84, top: 69 }],
      compute: [{ left: 16, top: 24 }, { left: 16, top: 31 }],
      presenter: [{ left: 16, top: 69 }],
      fallback: [{ left: 16, top: 45 }, { left: 84, top: 45 }]
    },
    boardroom: {
      display_main: [{ left: 18, top: 14 }],
      camera_front: [{ left: 18, top: 4.8 }],
      camera_rear: [{ left: 18, top: 92 }],
      audio_speaker: [{ left: 14, top: 25 }, { left: 86, top: 25 }, { left: 14, top: 42 }, { left: 86, top: 42 }],
      audio_mic: [{ left: 14, top: 42 }, { left: 14, top: 50 }, { left: 14, top: 58 }, { left: 14, top: 66 }],
      recording: [{ left: 86, top: 82 }, { left: 86, top: 90 }],
      audio_dsp: [{ left: 86, top: 22 }, { left: 86, top: 30 }],
      collaboration: [{ left: 14, top: 76 }],
      control: [{ left: 86, top: 76 }],
      compute: [{ left: 86, top: 16 }, { left: 86, top: 24 }],
      presenter: [{ left: 14, top: 84 }],
      fallback: [{ left: 14, top: 50 }, { left: 86, top: 50 }]
    },
    training: {
      display_main: [{ left: 16, top: 16.8 }],
      display_aux: [{ left: 16, top: 16.8 }, { left: 84, top: 16.8 }],
      camera_front: [{ left: 16, top: 7.6 }],
      camera_rear: [{ left: 86, top: 27.8 }],
      audio_speaker: [{ left: 14, top: 15.5 }, { left: 86, top: 15.5 }, { left: 14, top: 27 }, { left: 86, top: 27 }],
      audio_mic: [{ left: 86, top: 35 }, { left: 86, top: 47 }, { left: 86, top: 59 }, { left: 86, top: 75.8 }],
      recording: [{ left: 86, top: 25.2 }],
      audio_dsp: [{ left: 86, top: 31 }, { left: 86, top: 82.5 }],
      collaboration: [{ left: 86, top: 75.8 }],
      control: [{ left: 14, top: 75.8 }],
      compute: [{ left: 16, top: 29.2 }, { left: 86, top: 82.5 }],
      presenter: [{ left: 14, top: 83 }],
      fallback: [{ left: 14, top: 50 }, { left: 86, top: 50 }]
    },
    theater: {
      display_main: [{ left: 50, top: 28.2 }],
      display_aux: [{ left: 12, top: 16.8 }],
      // Audience camera label: right side, close to camera, but clear of right speaker.
      camera_front: [{ left: 67, top: 10.4 }],
      camera_rear: [{ left: 86, top: 27.8 }],
      audio_speaker: [{ left: 41, top: 20.5 }],
      audio_mic: [{ left: 16, top: 43 }, { left: 16, top: 52 }, { left: 16, top: 61 }, { left: 16, top: 78 }],
      recording: [{ left: 86, top: 78 }],
      audio_dsp: [{ left: 86, top: 78 }],
      collaboration: [{ left: 86, top: 78 }],
      control: [{ left: 14, top: 78 }],
      compute: [{ left: 60.2, top: 66.2 }],
      presenter: [{ left: 14, top: 84 }],
      fallback: [{ left: 14, top: 50 }, { left: 86, top: 50 }]
    }
  };
  const TEMPLATE_CALLOUT_RULES = {
    classroom: {
      // Persisted rule: front/back camera labels should stay opposite to avoid crossing near the smartboard.
      roleBucketOverrides: {
        camera_front: "left",
        camera_rear: "left",
        audio_mic: "right"
      },
      sameSideRoles: ["control", "collaboration"]
    },
    boardroom: {
      // Persisted rule: control/hub labels must stay on the same side as their physical device anchor.
      sameSideRoles: ["control", "collaboration"]
    },
    training: {
      // Persisted rule: audience camera stays front-wall side, teacher-tracking stays trainer-side.
      roleBucketOverrides: {
        camera_front: "left",
        camera_rear: "right",
        audio_mic: "right"
      },
      sameSideRoles: ["control", "collaboration"]
    },
    theater: {
      // Seminar rules: explicit side control and vertical callouts for center hardware.
      roleBucketOverrides: {
        camera_front: "right",
        camera_rear: "right",
        audio_mic: "left"
      },
      sameSideRoles: ["control", "collaboration", "audio_mic"],
      lockedSideRoles: ["camera_front", "audio_mic", "display_aux"],
      verticalRoles: ["display_main", "compute"],
      lockedVerticalRoles: ["display_main", "compute"]
    }
  };
  const TEMPLATE_ROLE_LABELS = {
    default: {
      display_main: "Interactive Flat Panel",
      display_aux: "Aux Display",
      camera_front: "Video Bar",
      camera_rear: "Audience Camera",
      audio_mic: "Tabletop Microphones",
      audio_speaker: "Wall Speakers",
      audio_dsp: "DSP / Audio Core",
      recording: "Lecture Capture",
      collaboration: "Wireless Hub",
      control: "Touch Controller",
      compute: "Compute Module",
      presenter: "Presenter Position"
    },
    classroom: {
      display_main: "Smart E-Blackboard",
      display_aux: "Side Writing Panels",
      camera_front: "Audience Camera",
      camera_rear: "Teacher Tracking Camera",
      audio_mic: "Tabletop Microphones",
      audio_speaker: "Wall Speakers",
      audio_dsp: "DSP / Audio Core",
      recording: "Lecture Capture",
      collaboration: "Wireless Hub",
      control: "Touch Controller",
      compute: "Compute Module",
      presenter: "Teacher Position"
    },
    training: {
      display_main: "Interactive Flat Panel",
      display_aux: "Side Writing Panels",
      camera_front: "Audience Camera",
      camera_rear: "Teacher Tracking Camera",
      audio_mic: "Tabletop Microphones",
      audio_speaker: "Wall Speakers",
      audio_dsp: "DSP / Audio Core",
      recording: "Lecture Capture",
      collaboration: "Wireless Hub",
      control: "Touch Controller",
      compute: "Compute Module",
      presenter: "Trainer Position"
    },
    theater: {
      display_main: "Interactive Flat Panel",
      display_aux: "Side Writing Panels",
      camera_front: "Audience Camera",
      camera_rear: "Teacher Tracking Camera",
      audio_mic: "Tabletop Microphones",
      audio_speaker: "Wall Speakers",
      audio_dsp: "DSP / Audio Core",
      recording: "Lecture Capture",
      collaboration: "Wireless Hub",
      control: "Touch Controller",
      compute: "Compute Module",
      presenter: "Lecturer Position"
    }
  };
  const CALLOUT_SIDE_COLUMNS = {
    left: [18, 26, 34],
    right: [82, 74, 66]
  };
  const CALLOUT_BOX_HEIGHT_PCT = 6.2;
  const CALLOUT_MIN_SIDE_Y = 8;
  const CALLOUT_MAX_SIDE_Y = 92;
  const CALLOUT_LAYOUT_PRIORITY = {
    display_main: 1,
    camera_front: 2,
    camera_rear: 3,
    audio_speaker: 4,
    audio_mic: 5,
    audio_dsp: 6,
    recording: 7,
    control: 8,
    collaboration: 9,
    compute: 10,
    presenter: 11,
    display_aux: 12,
    fallback: 99
  };

  const THEATER_ROLE_CALLOUTS = {
    // Seminar uses deterministic role anchors/labels for consistent uncluttered output.
    // Keep horizontal labels on the same y as their anchor; use vertical only where explicitly needed.
    display_main: { label: { left: 50, top: 28.2 }, lineOrientation: "vertical" },
    display_aux: { label: { left: 12, top: 16.8 }, lineOrientation: "horizontal" },
    camera_front: { label: { left: 67, top: 7.2 }, lineOrientation: "horizontal" },
    camera_rear: { label: { left: 78, top: 27.8 }, lineOrientation: "horizontal" },
    audio_speaker: { label: { left: 33, top: 14.8 }, lineOrientation: "horizontal" },
    audio_mic: { label: { left: 16, top: 43 }, lineOrientation: "horizontal" },
    compute: { label: { left: 60.2, top: 66.2 }, lineOrientation: "vertical" },
    recording: { label: { left: 84, top: 78 }, lineOrientation: "horizontal" },
    collaboration: { label: { left: 16, top: 78 }, lineOrientation: "horizontal" },
    control: { label: { left: 34, top: 78 }, lineOrientation: "horizontal" },
    audio_dsp: { label: { left: 72, top: 78 }, lineOrientation: "horizontal" },
    presenter: { label: { left: 50, top: 91 }, lineOrientation: "vertical" },
    fallback: { label: { left: 14, top: 50 }, lineOrientation: "horizontal" }
  };

  function roleLabelForTemplate(template, role, fallbackName) {
    const scoped = TEMPLATE_ROLE_LABELS[template] || {};
    const fallback = TEMPLATE_ROLE_LABELS.default || {};
    return scoped[role] || fallback[role] || fallbackName || "Device";
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(Number(value) || min, min), max);
  }

  function titleCase(value) {
    if (!value) return "";
    return String(value).replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }

  function distanceSq(a, b) {
    const dx = (a.left || 0) - (b.left || 0);
    const dy = (a.top || 0) - (b.top || 0);
    return dx * dx + dy * dy;
  }

  function resolveTemplate(layoutConfig, recommendation) {
    if (layoutConfig && layoutConfig.template) return layoutConfig.template;
    const roomType = recommendation?.answers?.roomType;
    if (roomType === "boardroom") return "boardroom";
    if (roomType === "meeting") return "conference";
    if (roomType === "seminar") return "theater";
    if (roomType === "training") return "training";
    return "classroom";
  }

  function roleSummary(category) {
    return CATEGORY_ROLES[category] || "Supports reliable room performance and user experience.";
  }

  function placementRole(product) {
    const zone = String(product.zone || "");
    const id = String(product.id || "").toLowerCase();
    const name = String(product.name || "").toLowerCase();
    const category = String(product.category || "").toLowerCase();
    const text = `${id} ${name} ${category}`;

    if (zone === "side_panels" || category.includes("writing")) return "display_aux";
    if (zone === "front_display") return "display_main";
    if (zone === "camera_front") return "camera_front";
    if (zone === "camera_rear") return "camera_rear";

    if (zone === "audio_zone") {
      if (text.includes("speaker")) return "audio_speaker";
      if (text.includes("mic")) return "audio_mic";
      if (text.includes("dsp") || text.includes("echo")) return "audio_dsp";
      return "audio_speaker";
    }

    if (zone === "recording_zone") {
      if (text.includes("dsp") || text.includes("echo")) return "audio_dsp";
      return "recording";
    }

    if (zone === "presenter_zone") {
      if (category.includes("control")) return "control";
      if (category.includes("compute")) return "compute";
      if (category.includes("collaboration")) return "collaboration";
      if (text.includes("wireless") || text.includes("control") || text.includes("compute")) return "control";
      return "presenter";
    }

    return "fallback";
  }

  function placementRoleForTemplate(product, template) {
    const baseRole = placementRole(product);
    if (template === "classroom" || template === "training" || template === "theater") {
      if (product.id === "audience_camera") return "camera_front";
      if (product.id === "ai_tracking_camera") return "camera_rear";
    }
    return baseRole;
  }

  function isAnchoredRole(role) {
    return ["display_main", "display_aux", "camera_front", "camera_rear"].includes(role);
  }

  function escapeAttribute(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function mapProducts(layoutConfig, recommendation, template) {
    const recommendedProducts = recommendation?.recommendedProducts || [];
    const productById = new Map(recommendedProducts.map((p) => [p.id, p]));

    const baseProducts = (layoutConfig?.products || []).length
      ? layoutConfig.products
      : recommendedProducts.map((p) => ({
          id: p.id,
          name: p.name,
          zone: p.hotspot_zone,
          category: p.category,
          tier: p.tier
        }));

    return baseProducts
      .filter((p) => p && p.id)
      .map((p, index) => {
        const matched = productById.get(p.id) || {};
        const zone = p.zone || p.hotspot_zone || matched.hotspot_zone || "front_display";
        const resolvedName = p.name || matched.name || "Recommended Device";
        const resolvedCategory = p.category || matched.category || "General";
        const benefits = Array.isArray(matched.benefits) ? matched.benefits : [];
        const features = Array.isArray(matched.features) ? matched.features : [];

        return {
          id: p.id,
          order: index + 1,
          name: resolvedName,
          category: resolvedCategory,
          zone,
          description: benefits[0] || roleSummary(resolvedCategory),
          details: benefits.slice(0, 3),
          features: features.slice(0, 3),
          tier: p.tier || matched.tier || "professional",
          placementRole: placementRoleForTemplate({ id: p.id, name: resolvedName, zone, category: resolvedCategory }, template)
        };
      });
  }

  // ============================================
  // Collision engine (pixel space)
  // ============================================
  function pctToPx(pct, bw, bh) {
    return { x: (pct.left / 100) * bw, y: (pct.top / 100) * bh };
  }

  function pxToPct(px, bw, bh) {
    return { left: (px.x / bw) * 100, top: (px.y / bh) * 100 };
  }

  function getBox(centerPx, w, h) {
    return {
      left: centerPx.x - w / 2,
      right: centerPx.x + w / 2,
      top: centerPx.y - h / 2,
      bottom: centerPx.y + h / 2
    };
  }

  function intersects(a, b) {
    return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
  }

  function exclusionToPx(ex, bw, bh) {
    return {
      left: (ex.left / 100) * bw,
      right: (ex.right / 100) * bw,
      top: (ex.top / 100) * bh,
      bottom: (ex.bottom / 100) * bh
    };
  }

  function boxWithGap(centerPx, iconW, iconH, gapPx) {
    return getBox(centerPx, iconW + gapPx, iconH + gapPx);
  }

  function markerFootprint(template) {
    if (template === "conference") {
      return { width: 132, height: 36 };
    }
    return { width: ICON_SIZE_PX + ICON_MARGIN_PX, height: ICON_SIZE_PX + ICON_MARGIN_PX };
  }

  function isPositionAvailable(centerPx, iconW, iconH, placedBoxes, exclusionsPx, gapPx = ICON_SAFE_GAP_PX) {
    const iconBox = getBox(centerPx, iconW, iconH);
    const collisionBox = boxWithGap(centerPx, iconW, iconH, gapPx);
    const hitsExclusion = exclusionsPx.some((ex) => intersects(iconBox, ex));
    const hitsPlaced = placedBoxes.some((b) => intersects(collisionBox, b));
    return !hitsExclusion && !hitsPlaced;
  }

  function deterministicFallback(base, placedBoxes, exclusionsPx, bw, bh, iconW, iconH) {
    const leftMin = 8;
    const leftMax = 92;
    const topMin = 10;
    const topMax = 90;
    const stepLeft = Math.max(4, ((iconW + ICON_SAFE_GAP_PX) / bw) * 100);
    const stepTop = Math.max(4, ((iconH + ICON_SAFE_GAP_PX) / bh) * 100);
    const candidates = [];

    for (let top = topMin; top <= topMax; top += stepTop) {
      for (let left = leftMin; left <= leftMax; left += stepLeft) {
        const distance = Math.abs(left - base.left) + Math.abs(top - base.top);
        candidates.push({ left, top, distance });
      }
    }

    candidates.sort((a, b) => a.distance - b.distance);

    for (let i = 0; i < candidates.length; i++) {
      const point = candidates[i];
      const center = pctToPx(point, bw, bh);
      if (isPositionAvailable(center, iconW, iconH, placedBoxes, exclusionsPx)) {
        return { left: point.left, top: point.top };
      }
    }

    return {
      left: clamp(base.left, leftMin, leftMax),
      top: clamp(base.top, topMin, topMax)
    };
  }

  function findFreePosition(product, placedBoxes, template, bw, bh) {
    const profile = PLACEMENT_PROFILES[template];
    const role = product.placementRole;
    const slots = profile.slots[role] || profile.slots.fallback;
    const footprint = markerFootprint(template);
    const iconW = footprint.width;
    const iconH = footprint.height;
    const exclusionsPx = profile.exclusions.map((e) => exclusionToPx(e, bw, bh));

    // Try each slot
    for (let i = 0; i < slots.length; i++) {
      const center = pctToPx(slots[i], bw, bh);
      if (isPositionAvailable(center, iconW, iconH, placedBoxes, exclusionsPx)) {
        return { left: slots[i].left, top: slots[i].top };
      }
    }

    // Spiral search from first preferred slot
    const base = slots[0];
    const basePx = pctToPx(base, bw, bh);
    const stepPx = Math.min(bw, bh) * 0.015;
    const maxRings = 8;

    for (let ring = 1; ring <= maxRings; ring++) {
      const radius = ring * stepPx;
      const steps = ring <= 2 ? 12 : 16;
      for (let s = 0; s < steps; s++) {
        const angle = (Math.PI * 2 * s) / steps;
        const cx = basePx.x + Math.cos(angle) * radius;
        const cy = basePx.y + Math.sin(angle) * radius;
        const pct = pxToPct({ x: cx, y: cy }, bw, bh);
        if (pct.left < BOARD_SAFE_BOUNDS.left || pct.left > BOARD_SAFE_BOUNDS.right || pct.top < BOARD_SAFE_BOUNDS.top || pct.top > BOARD_SAFE_BOUNDS.bottom) continue;
        const center = { x: cx, y: cy };
        if (isPositionAvailable(center, iconW, iconH, placedBoxes, exclusionsPx)) {
          return pct;
        }
      }
    }

    return deterministicFallback(base, placedBoxes, exclusionsPx, bw, bh, iconW, iconH);
  }

  function assignPlacements(products, template, boardEl) {
    if (template === "conference" || template === "boardroom" || template === "classroom" || template === "training" || template === "theater") {
      const profile = PLACEMENT_PROFILES[template];
      const roleUsage = new Map();
      return products.map((product) => {
        const role = product.placementRole;
        const slots = profile.slots[role] || profile.slots.fallback || [{ left: 50, top: 50 }];
        const usage = roleUsage.get(role) || 0;
        const selectedIndex = Math.min(usage, slots.length - 1);
        roleUsage.set(role, usage + 1);
        return { ...product, placement: slots[selectedIndex] };
      });
    }

    const rect = boardEl.getBoundingClientRect();
    const bw = rect.width;
    const bh = rect.height;

    // Sort: anchored first, then by slot scarcity
    const sorted = [...products].sort((a, b) => {
      const aAnchor = isAnchoredRole(a.placementRole) ? 1 : 0;
      const bAnchor = isAnchoredRole(b.placementRole) ? 1 : 0;
      if (aAnchor !== bAnchor) return bAnchor - aAnchor;
      const aSlots = (PLACEMENT_PROFILES[template].slots[a.placementRole] || []).length;
      const bSlots = (PLACEMENT_PROFILES[template].slots[b.placementRole] || []).length;
      return aSlots - bSlots;
    });

    const placedBoxes = [];
    const footprint = markerFootprint(template);
    const iconW = footprint.width;
    const iconH = footprint.height;

    return sorted.map((product) => {
      const pos = findFreePosition(product, placedBoxes, template, bw, bh);
      const center = pctToPx(pos, bw, bh);
      placedBoxes.push(boxWithGap(center, iconW, iconH, ICON_SAFE_GAP_PX));
      return { ...product, placement: pos };
    });
  }

  function calloutBucketForProduct(template, product, anchor) {
    const role = product.placementRole;
    const ruleSet = TEMPLATE_CALLOUT_RULES[template];
    const roleBucketOverrides = ruleSet && ruleSet.roleBucketOverrides;
    if (roleBucketOverrides && roleBucketOverrides[role]) {
      return roleBucketOverrides[role];
    }

    if (role === "display_main" || role === "camera_front") return "top";
    if (role === "camera_rear") return "bottom";
    if (role === "audio_mic") return "left";
    if (role === "audio_dsp" || role === "recording" || role === "control" || role === "compute" || role === "collaboration") return "right";
    if (role === "audio_speaker") return anchor.left < 50 ? "left" : "right";

    return anchor.left < 50 ? "left" : "right";
  }

  function pickTemplateCalloutSlot(template, anchor, preferredBucket, usedSlots) {
    const templateSlots = TEMPLATE_CALLOUT_SLOTS[template] || TEMPLATE_CALLOUT_SLOTS.conference;
    const fallbackOrder = ["top", "right", "left", "bottom"];
    const orderedBuckets = [preferredBucket]
      .concat(fallbackOrder)
      .filter((bucket, index, list) => list.indexOf(bucket) === index);

    for (let i = 0; i < orderedBuckets.length; i++) {
      const bucket = orderedBuckets[i];
      const slots = templateSlots[bucket] || [];
      let bestSlot = null;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (let s = 0; s < slots.length; s++) {
        const key = `${bucket}:${s}`;
        if (usedSlots.has(key)) continue;
        const slot = slots[s];
        const dist = distanceSq(anchor, slot);
        if (dist < bestDistance) {
          bestDistance = dist;
          bestSlot = { slot, key };
        }
      }

      if (bestSlot) {
        usedSlots.add(bestSlot.key);
        return bestSlot.slot;
      }
    }

    return {
      left: clamp(anchor.left + (anchor.left < 50 ? -14 : 14), 12, 88),
      top: clamp(anchor.top + (anchor.top < 50 ? -8 : 8), 8, 92)
    };
  }

  function sideBucketForAnchor(anchor) {
    return (Number(anchor?.left) || 0) < 50 ? "left" : "right";
  }

  function pickSlotFromBucket(template, anchor, bucket, usedSlots) {
    const templateSlots = TEMPLATE_CALLOUT_SLOTS[template] || TEMPLATE_CALLOUT_SLOTS.conference;
    const slots = templateSlots[bucket] || [];
    let bestSlot = null;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (let i = 0; i < slots.length; i++) {
      const key = `${bucket}:${i}`;
      if (usedSlots.has(key)) continue;
      const slot = slots[i];
      const dist = distanceSq(anchor, slot);
      if (dist < bestDistance) {
        bestDistance = dist;
        bestSlot = { slot, key };
      }
    }

    if (bestSlot) {
      usedSlots.add(bestSlot.key);
      return bestSlot.slot;
    }

    return null;
  }

  function pickRoleSpecificCalloutSlot(template, anchor, role, usedSlots) {
    const rules = TEMPLATE_CALLOUT_RULES[template];
    if (rules && Array.isArray(rules.sameSideRoles) && rules.sameSideRoles.includes(role)) {
      const sideBucket = sideBucketForAnchor(anchor);
      const sameSideSlot = pickSlotFromBucket(template, anchor, sideBucket, usedSlots);
      if (sameSideSlot) return sameSideSlot;
    }

    const roleMap = TEMPLATE_ROLE_LABEL_SLOTS[template] || TEMPLATE_ROLE_LABEL_SLOTS.conference;
    const slots = roleMap[role] || [];
    let bestSlot = null;
    let bestDistance = Number.POSITIVE_INFINITY;

    for (let i = 0; i < slots.length; i++) {
      const key = `role:${role}:${i}`;
      if (usedSlots.has(key)) continue;
      const slot = slots[i];
      const dist = distanceSq(anchor, slot);
      if (dist < bestDistance) {
        bestDistance = dist;
        bestSlot = { slot, key };
      }
    }

    if (bestSlot) {
      usedSlots.add(bestSlot.key);
      return bestSlot.slot;
    }

    return null;
  }

  function oppositeSide(side) {
    return side === "left" ? "right" : "left";
  }

  function anchorSide(anchor) {
    return (Number(anchor?.left) || 0) <= 50 ? "left" : "right";
  }

  function calloutSideFromSlot(slot, anchor) {
    if (!slot) return anchorSide(anchor);
    if (slot.left <= 45) return "left";
    if (slot.left >= 55) return "right";
    return anchorSide(anchor);
  }

  function templateRoleHintSide(template, role, anchor) {
    const roleMap = TEMPLATE_ROLE_LABEL_SLOTS[template] || TEMPLATE_ROLE_LABEL_SLOTS.conference;
    const slots = roleMap[role] || [];
    if (!slots.length) return anchorSide(anchor);
    let nearest = slots[0];
    let nearestDist = distanceSq(anchor, slots[0]);
    for (let i = 1; i < slots.length; i++) {
      const dist = distanceSq(anchor, slots[i]);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = slots[i];
      }
    }
    return calloutSideFromSlot(nearest, anchor);
  }

  function nearestRoleSlot(template, role, anchor) {
    const roleMap = TEMPLATE_ROLE_LABEL_SLOTS[template] || TEMPLATE_ROLE_LABEL_SLOTS.conference;
    const slots = roleMap[role] || [];
    if (!slots.length) return null;
    let nearest = slots[0];
    let nearestDist = distanceSq(anchor, slots[0]);
    for (let i = 1; i < slots.length; i++) {
      const dist = distanceSq(anchor, slots[i]);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = slots[i];
      }
    }
    return nearest;
  }

  function estimateCalloutWidthPct(text) {
    const normalized = String(text || "").trim();
    const count = normalized.length || 12;
    // Conservative width estimate to prevent pill-on-pill collisions before render.
    return clamp(8.5 + count * 0.56, 11, 31.5);
  }

  function calloutBox(label, widthPct) {
    return {
      left: label.left - widthPct / 2,
      right: label.left + widthPct / 2,
      top: label.top - CALLOUT_BOX_HEIGHT_PCT / 2,
      bottom: label.top + CALLOUT_BOX_HEIGHT_PCT / 2
    };
  }

  function boxesOverlapPct(a, b, gap = 0) {
    return !(
      a.right + gap < b.left ||
      a.left - gap > b.right ||
      a.bottom + gap < b.top ||
      a.top - gap > b.bottom
    );
  }

  function lineIntersectsBox(line, box, gap = 0) {
    if (line.orientation === "vertical") {
      const lineX = line.left;
      const lineTop = line.top;
      const lineBottom = line.top + line.length;
      const xHit = lineX >= (box.left - gap) && lineX <= (box.right + gap);
      const yHit = !(lineBottom < (box.top - gap) || lineTop > (box.bottom + gap));
      return xHit && yHit;
    }
    const lineLeft = line.left;
    const lineRight = line.left + line.length;
    const lineY = line.top;
    const yHit = lineY >= (box.top - gap) && lineY <= (box.bottom + gap);
    const xHit = !(lineRight < (box.left - gap) || lineLeft > (box.right + gap));
    return yHit && xHit;
  }

  function calloutUiReservedZones(template) {
    const zones = [];
    if (template === "conference") {
      zones.push({ left: 5.5, right: 28, top: 1, bottom: 12.5 });
    } else {
      zones.push({ left: 72, right: 98, top: 1, bottom: 13.6 });
    }
    zones.push({ left: 74.5, right: 98, top: 84, bottom: 98.5 });
    return zones;
  }

  function deviceAvoidanceZones(products) {
    return products.map((product, index) => {
      const anchor = product?.placement || { left: 50, top: 50 };
      return {
        index,
        box: {
          left: anchor.left - 3.2,
          right: anchor.left + 3.2,
          top: anchor.top - 2.8,
          bottom: anchor.top + 2.8
        }
      };
    });
  }

  function calloutColumnsForSide(side, anchor) {
    if (side === "left") {
      return (anchor.left < 18) ? [24, 32, 40] : CALLOUT_SIDE_COLUMNS.left;
    }
    return (anchor.left > 82) ? [76, 68, 60] : CALLOUT_SIDE_COLUMNS.right;
  }

  function rankProductsForCallouts(products) {
    return products
      .map((product, index) => ({ product, index }))
      .sort((a, b) => {
        const aPriority = CALLOUT_LAYOUT_PRIORITY[a.product.placementRole] || CALLOUT_LAYOUT_PRIORITY.fallback;
        const bPriority = CALLOUT_LAYOUT_PRIORITY[b.product.placementRole] || CALLOUT_LAYOUT_PRIORITY.fallback;
        if (aPriority !== bPriority) return aPriority - bPriority;
        return a.index - b.index;
      });
  }

  function buildCalloutLine(labelPoint, anchorPoint) {
    const left = Math.min(labelPoint.left, anchorPoint.left);
    const right = Math.max(labelPoint.left, anchorPoint.left);
    return {
      orientation: "horizontal",
      left,
      top: anchorPoint.top,
      length: Math.max(0, right - left)
    };
  }

  function buildVerticalCalloutLine(labelPoint, anchorPoint) {
    const top = Math.min(labelPoint.top, anchorPoint.top);
    const bottom = Math.max(labelPoint.top, anchorPoint.top);
    return {
      orientation: "vertical",
      left: anchorPoint.left,
      top,
      length: Math.max(0, bottom - top)
    };
  }

  function assignTheaterCallouts(products) {
    const reservedZones = calloutUiReservedZones("theater");
    const avoidZones = deviceAvoidanceZones(products);
    const placedLabelBoxes = [];
    const placedLines = [];
    const resolved = new Array(products.length);
    const usedRoles = new Set();
    const ranked = rankProductsForCallouts(products);

    ranked.forEach(({ product, index }) => {
      const role = product.placementRole || "fallback";
      const anchor = product.placement || { left: 50, top: 50 };
      const mapping = THEATER_ROLE_CALLOUTS[role] || THEATER_ROLE_CALLOUTS.fallback;
      const labelText = roleLabelForTemplate("theater", role, product.name);
      const widthPct = estimateCalloutWidthPct(labelText);
      const isVertical = mapping.lineOrientation === "vertical";
      const baseLabel = mapping.label;

      if (usedRoles.has(role)) {
        resolved[index] = { ...product, skipBoardCallout: true };
        return;
      }

      const minLeft = 5 + widthPct / 2;
      const maxLeft = 95 - widthPct / 2;
      const horizontalDirection = baseLabel.left <= anchor.left ? -1 : 1;
      const baseSide = baseLabel.left <= anchor.left ? "left" : "right";
      const candidates = [];

      if (isVertical) {
        [0, -6, 6, -10, 10, -14, 14].forEach((offset) => {
          candidates.push({
            label: {
              left: clamp(anchor.left, minLeft, maxLeft),
              top: clamp(baseLabel.top + offset, CALLOUT_MIN_SIDE_Y, CALLOUT_MAX_SIDE_Y)
            },
            shiftPenalty: Math.abs(offset) * 0.6
          });
        });
      } else {
        [0, 4, 8, 12, 16, -4, -8].forEach((offset) => {
          const candidateLeft = clamp(baseLabel.left + horizontalDirection * offset, minLeft, maxLeft);
          const candidateSide = candidateLeft <= anchor.left ? "left" : "right";
          const oppositeSidePenalty = candidateSide !== baseSide ? 180 : 0;
          candidates.push({
            label: {
              left: candidateLeft,
              top: clamp(anchor.top, CALLOUT_MIN_SIDE_Y, CALLOUT_MAX_SIDE_Y)
            },
            shiftPenalty: Math.abs(offset) * 1.2 + oppositeSidePenalty
          });
        });
      }

      let best = null;
      candidates.forEach((candidate) => {
        const label = candidate.label;
        const box = calloutBox(label, widthPct);
        const line = isVertical ? buildVerticalCalloutLine(label, anchor) : buildCalloutLine(label, anchor);
        let penalty = candidate.shiftPenalty;
        let hardCollision = false;

        if (box.left < 4.5 || box.right > 95.5 || box.top < 3.5 || box.bottom > 96.5) penalty += 90;
        if (!isVertical && line.length > 68) penalty += (line.length - 68) * 1.4;
        if (!isVertical && line.length < 2.8) penalty += 26;
        if (isVertical && line.length < 2.6) penalty += 20;

        reservedZones.forEach((zone) => {
          if (boxesOverlapPct(box, zone, 0.35)) {
            hardCollision = true;
            penalty += 320;
          }
          if (lineIntersectsBox(line, zone, 0.25)) {
            hardCollision = true;
            penalty += 170;
          }
        });

        placedLabelBoxes.forEach((placed) => {
          if (boxesOverlapPct(box, placed, 0.65)) {
            hardCollision = true;
            penalty += 360;
          }
          if (lineIntersectsBox(line, placed, 0.35)) {
            hardCollision = true;
            penalty += 210;
          }
        });

        placedLines.forEach((placedLine) => {
          if (lineIntersectsBox(placedLine, box, 0.35)) {
            hardCollision = true;
            penalty += 180;
          }
        });

        avoidZones.forEach((zone) => {
          if (zone.index !== index && boxesOverlapPct(box, zone.box, 0.35)) {
            hardCollision = true;
            penalty += 220;
          }
          if (zone.index !== index && lineIntersectsBox(line, zone.box, 0.3)) {
            hardCollision = true;
            penalty += 120;
          }
        });

        const scored = { label, box, line, penalty, hardCollision };
        if (
          !best ||
          (best.hardCollision && !scored.hardCollision) ||
          (best.hardCollision === scored.hardCollision && scored.penalty < best.penalty)
        ) {
          best = scored;
        }
      });

      usedRoles.add(role);
      const picked = best || {
        label: {
          left: clamp(baseLabel.left, minLeft, maxLeft),
          top: clamp(isVertical ? baseLabel.top : anchor.top, CALLOUT_MIN_SIDE_Y, CALLOUT_MAX_SIDE_Y)
        },
        box: calloutBox(
          {
            left: clamp(baseLabel.left, minLeft, maxLeft),
            top: clamp(isVertical ? baseLabel.top : anchor.top, CALLOUT_MIN_SIDE_Y, CALLOUT_MAX_SIDE_Y)
          },
          widthPct
        ),
        line: isVertical
          ? buildVerticalCalloutLine(
              {
                left: clamp(baseLabel.left, minLeft, maxLeft),
                top: clamp(baseLabel.top, CALLOUT_MIN_SIDE_Y, CALLOUT_MAX_SIDE_Y)
              },
              anchor
            )
          : buildCalloutLine(
              {
                left: clamp(baseLabel.left, minLeft, maxLeft),
                top: clamp(anchor.top, CALLOUT_MIN_SIDE_Y, CALLOUT_MAX_SIDE_Y)
              },
              anchor
            ),
        penalty: Number.POSITIVE_INFINITY,
        hardCollision: false
      };

      placedLabelBoxes.push(picked.box);
      placedLines.push(picked.line);
      const resolvedSide = picked.label.left <= anchor.left ? "left" : "right";

      resolved[index] = {
        ...product,
        callout: { label: picked.label, anchor, line: picked.line, side: resolvedSide },
        skipBoardCallout: false
      };
    });

    return resolved;
  }

  function assignTemplateCallouts(products, template) {
    const reservedZones = calloutUiReservedZones(template);
    const avoidZones = deviceAvoidanceZones(products);
    const placedLabelBoxes = [];
    const placedLines = [];
    const resolved = new Array(products.length);
    const ranked = rankProductsForCallouts(products);

    ranked.forEach(({ product, index }) => {
      const anchor = product.placement || { left: 50, top: 50 };
      const role = product.placementRole;
      const rules = TEMPLATE_CALLOUT_RULES[template] || {};
      const preferredBucket = calloutBucketForProduct(template, product, anchor);
      const hintSide = templateRoleHintSide(template, role, anchor);
      const anchorPreferredSide = anchorSide(anchor);
      const explicitSide = (rules.roleBucketOverrides && rules.roleBucketOverrides[role] && (rules.roleBucketOverrides[role] === "left" || rules.roleBucketOverrides[role] === "right"))
        ? rules.roleBucketOverrides[role]
        : null;
      const sameSideRequired = Array.isArray(rules.sameSideRoles) && rules.sameSideRoles.includes(role);
      const lockedSideRole = Array.isArray(rules.lockedSideRoles) && rules.lockedSideRoles.includes(role);
      const preferredSide = explicitSide || hintSide || (preferredBucket === "left" || preferredBucket === "right" ? preferredBucket : anchorPreferredSide);
      const fallbackSide = oppositeSide(preferredSide);
      let candidateSides = [preferredSide, anchorPreferredSide, hintSide, fallbackSide]
        .filter((side, idx, list) => (side === "left" || side === "right") && list.indexOf(side) === idx);

      if (lockedSideRole && explicitSide) {
        candidateSides = [explicitSide, oppositeSide(explicitSide)];
      } else if (sameSideRequired) {
        candidateSides = [anchorPreferredSide, oppositeSide(anchorPreferredSide)];
      } else if (candidateSides[0] !== anchorPreferredSide) {
        candidateSides.unshift(anchorPreferredSide);
      }

      const labelText = roleLabelForTemplate(template, role, product.name);
      const widthPct = estimateCalloutWidthPct(labelText);
      let best = null;

      candidateSides.forEach((side) => {
        const columns = calloutColumnsForSide(side, anchor);
        columns.forEach((columnLeft, columnIndex) => {
          const label = {
            left: columnLeft,
            top: clamp(anchor.top, CALLOUT_MIN_SIDE_Y, CALLOUT_MAX_SIDE_Y)
          };
          const box = calloutBox(label, widthPct);
          const line = buildCalloutLine(label, anchor);
          let penalty = 0;
          let hardCollision = false;

          if (side !== anchorPreferredSide) penalty += 14;
          if (side !== preferredSide) penalty += 10;
          if (lockedSideRole && explicitSide && side !== explicitSide) penalty += 340;
          if (columnIndex > 0) penalty += columnIndex * 3;
          if (sameSideRequired && side !== anchorPreferredSide) penalty += 240;
          if (line.length < 4.5) penalty += 18;
          if (line.length > 75) penalty += (line.length - 75) * 1.2;
          if (box.left < 5 || box.right > 95 || box.top < 3.5 || box.bottom > 96.5) penalty += 40;

          reservedZones.forEach((zone) => {
            if (boxesOverlapPct(box, zone, 0.3)) {
              hardCollision = true;
              penalty += 260;
            }
          });

          reservedZones.forEach((zone) => {
            if (lineIntersectsBox(line, zone, 0.2)) {
              hardCollision = true;
              penalty += 120;
            }
          });

          placedLabelBoxes.forEach((placed) => {
            if (boxesOverlapPct(box, placed, 0.75)) {
              hardCollision = true;
              penalty += 320;
            }
          });
          placedLabelBoxes.forEach((placed) => {
            if (lineIntersectsBox(line, placed, 0.35)) {
              hardCollision = true;
              penalty += 180;
            }
          });
          placedLines.forEach((placedLine) => {
            if (lineIntersectsBox(placedLine, box, 0.35)) {
              hardCollision = true;
              penalty += 180;
            }
          });
          avoidZones.forEach((zone) => {
            if (boxesOverlapPct(box, zone.box, 0.45)) {
              if (zone.index !== index) {
                hardCollision = true;
                penalty += 220;
              } else {
                penalty += 42;
              }
            }
          });
          avoidZones.forEach((zone) => {
            if (zone.index !== index && lineIntersectsBox(line, zone.box, 0.3)) {
              hardCollision = true;
              penalty += 110;
            }
          });

          const candidate = { penalty, label, line, box, side, hardCollision };
          if (
            !best ||
            (best.hardCollision && !candidate.hardCollision) ||
            (best.hardCollision === candidate.hardCollision && candidate.penalty < best.penalty)
          ) {
            best = candidate;
          }
        });
      });

      const fallbackLabel = {
        left: preferredSide === "left" ? 22 : 78,
        top: clamp(anchor.top, CALLOUT_MIN_SIDE_Y, CALLOUT_MAX_SIDE_Y)
      };
      const picked = best || {
        penalty: Number.POSITIVE_INFINITY,
        label: fallbackLabel,
        line: buildCalloutLine(fallbackLabel, anchor),
        box: calloutBox(fallbackLabel, widthPct),
        side: preferredSide
      };

      const verticalRoles = Array.isArray(rules.verticalRoles) ? rules.verticalRoles : [];
      const lockedVerticalRole = Array.isArray(rules.lockedVerticalRoles) && rules.lockedVerticalRoles.includes(role);
      if (verticalRoles.includes(role)) {
        const slot = nearestRoleSlot(template, role, anchor);
        const targetTop = clamp(
          slot ? slot.top : (role === "display_main" ? anchor.top + 10.5 : anchor.top - 7.2),
          CALLOUT_MIN_SIDE_Y,
          CALLOUT_MAX_SIDE_Y
        );
        const verticalOffsets = [0, -6, 6, -10, 10];
        let bestVertical = null;

        verticalOffsets.forEach((offset) => {
          const verticalLabel = {
            left: anchor.left,
            top: clamp(targetTop + offset, CALLOUT_MIN_SIDE_Y, CALLOUT_MAX_SIDE_Y)
          };
          const verticalLine = buildVerticalCalloutLine(verticalLabel, anchor);
          const verticalBox = calloutBox(verticalLabel, widthPct);
          let penalty = Math.abs(offset) * 0.7;
          let collision = false;

          reservedZones.forEach((zone) => {
            if (boxesOverlapPct(verticalBox, zone, 0.3) || lineIntersectsBox(verticalLine, zone, 0.2)) {
              collision = true;
              penalty += 260;
            }
          });
          placedLabelBoxes.forEach((placed) => {
            if (boxesOverlapPct(verticalBox, placed, 0.75) || lineIntersectsBox(verticalLine, placed, 0.35)) {
              collision = true;
              penalty += 320;
            }
          });
          placedLines.forEach((placedLine) => {
            if (lineIntersectsBox(placedLine, verticalBox, 0.35)) {
              collision = true;
              penalty += 180;
            }
          });
          avoidZones.forEach((zone) => {
            if (zone.index !== index && (boxesOverlapPct(verticalBox, zone.box, 0.45) || lineIntersectsBox(verticalLine, zone.box, 0.3))) {
              collision = true;
              penalty += 220;
            }
          });

          const candidate = { verticalLabel, verticalLine, verticalBox, penalty, collision };
          if (!bestVertical || (!candidate.collision && bestVertical.collision) || (candidate.collision === bestVertical.collision && candidate.penalty < bestVertical.penalty)) {
            bestVertical = candidate;
          }
        });

        if (bestVertical && (!bestVertical.collision || lockedVerticalRole)) {
          picked.label = bestVertical.verticalLabel;
          picked.line = bestVertical.verticalLine;
          picked.box = bestVertical.verticalBox;
          picked.side = anchorPreferredSide;
        }
      }

      placedLabelBoxes.push(picked.box);
      placedLines.push(picked.line);

      resolved[index] = {
        ...product,
        callout: {
          label: picked.label,
          anchor,
          line: picked.line,
          side: picked.side
        }
      };
    });

    return resolved;
  }

  // ============================================
  // Attendee dots
  // ============================================
  function pointInsideEllipse(point, ellipse, inset = 0) {
    const rx = Math.max(0.1, ellipse.rx - inset);
    const ry = Math.max(0.1, ellipse.ry - inset);
    const dx = (point.left - ellipse.cx) / rx;
    const dy = (point.top - ellipse.cy) / ry;
    return dx * dx + dy * dy < 1;
  }

  function fitsBoard(point) {
    return (
      point.left >= BOARD_SAFE_BOUNDS.left &&
      point.left <= BOARD_SAFE_BOUNDS.right &&
      point.top >= BOARD_SAFE_BOUNDS.top &&
      point.top <= BOARD_SAFE_BOUNDS.bottom
    );
  }

  function pointKey(point) {
    return `${point.left.toFixed(2)}|${point.top.toFixed(2)}`;
  }

  function closestMeetingSeatCount(requestedCount) {
    const requested = Math.max(0, Math.round(Number(requestedCount) || 0));
    for (let i = 0; i < MEETING_STANDARD_SEAT_COUNTS.length; i++) {
      if (requested <= MEETING_STANDARD_SEAT_COUNTS[i]) return MEETING_STANDARD_SEAT_COUNTS[i];
    }
    return MEETING_STANDARD_SEAT_COUNTS[MEETING_STANDARD_SEAT_COUNTS.length - 1];
  }

  function takeEvenly(list, count) {
    if (!Array.isArray(list) || !list.length || count <= 0) return [];
    if (count >= list.length) return list.slice();
    const step = list.length / count;
    const result = [];
    for (let i = 0; i < count; i++) {
      const idx = Math.min(list.length - 1, Math.floor(i * step));
      result.push(list[idx]);
    }
    return result;
  }

  function buildMeetingSeatLayout(attendeeCount) {
    const requested = Math.max(0, Math.round(Number(attendeeCount) || 0));
    const seatCapacity = closestMeetingSeatCount(requested || 20);
    const presetIndices = MEETING_SEAT_INDEX_PRESETS[seatCapacity] || MEETING_SEAT_INDEX_PRESETS[20];
    const seatPositions = presetIndices
      .map((index) => MEETING_SEAT_RING_20[index])
      .filter(Boolean);

    const occupied = Math.min(requested, seatPositions.length);
    const attendeePositions = takeEvenly(seatPositions, occupied).map((seat) => ({
      left: seat.left,
      top: seat.top
    }));

    return {
      seatPositions,
      positions: attendeePositions,
      occupied,
      seatCapacity,
      overflow: Math.max(0, requested - seatPositions.length)
    };
  }

  function conferenceTrackPoint(distance, halfStraight, radius) {
    const topLen = halfStraight * 2;
    const arcLen = Math.PI * radius;
    const bottomLen = topLen;

    if (distance <= topLen) {
      return { x: -halfStraight + distance, y: -radius };
    }

    if (distance <= topLen + arcLen) {
      const t = (distance - topLen) / arcLen;
      const angle = -Math.PI / 2 + t * Math.PI;
      return { x: halfStraight + Math.cos(angle) * radius, y: Math.sin(angle) * radius };
    }

    if (distance <= topLen + arcLen + bottomLen) {
      const t = distance - topLen - arcLen;
      return { x: halfStraight - t, y: radius };
    }

    const t = (distance - topLen - arcLen - bottomLen) / arcLen;
    const angle = Math.PI / 2 + t * Math.PI;
    return { x: -halfStraight + Math.cos(angle) * radius, y: Math.sin(angle) * radius };
  }

  function generateConferenceTableChairs(count) {
    return buildMeetingSeatLayout(count);
  }

  function generateConferenceChairs(count, template) {
    if (template === "conference") {
      return generateConferenceTableChairs(count);
    }

    const isBoardroom = template === "boardroom";
    const table = TABLE_GEOMETRY[template] || TABLE_GEOMETRY.conference;
    const baseClearance = isBoardroom ? 1.2 : 2.4;
    const ringGap = isBoardroom ? 3.4 : 3.8;
    const refW = 800;
    const refH = 600;
    const seatSpacingPx = 48;
    const seen = new Set();

    const positions = [];
    let remaining = Math.max(0, Math.round(Number(count) || 0));
    let ring = 0;
    const maxRings = 12;

    while (remaining > 0 && ring < maxRings) {
      const rxPct = table.rx + baseClearance + ring * ringGap;
      const ryPct = table.ry + baseClearance + ring * ringGap;
      const rxPx = (rxPct / 100) * refW;
      const ryPx = (ryPct / 100) * refH;
      const circumferencePx = Math.PI * (3 * (rxPx + ryPx) - Math.sqrt((3 * rxPx + ryPx) * (rxPx + 3 * ryPx)));
      const capacity = Math.max(4, Math.round(circumferencePx / seatSpacingPx));
      const sampleCount = Math.max(capacity * 3, 48);
      const candidates = [];

      for (let i = 0; i < sampleCount; i++) {
        const angle = (Math.PI * 2 * i) / sampleCount - Math.PI / 2;
        const point = {
          left: table.cx + Math.cos(angle) * rxPct,
          top: table.cy + Math.sin(angle) * ryPct
        };
        if (!fitsBoard(point)) continue;
        if (pointInsideEllipse(point, table, 0.2)) continue;
        const key = pointKey(point);
        if (seen.has(key)) continue;
        seen.add(key);
        candidates.push(point);
      }

      if (!candidates.length) {
        ring += 1;
        continue;
      }

      const seats = Math.min(remaining, Math.min(capacity, candidates.length));
      const step = candidates.length / seats;
      for (let i = 0; i < seats; i++) {
        const idx = Math.min(candidates.length - 1, Math.floor(i * step));
        positions.push(candidates[idx]);
      }

      remaining -= seats;
      ring += 1;
    }

    return { positions, overflow: remaining };
  }

  function generateClassroomDots(count) {
    // 6 desks x 4 corners = 24 positions
    const positions = [
      { left: 13, top: 26 }, { left: 29.5, top: 26 }, { left: 13, top: 37 }, { left: 29.5, top: 37 },
      { left: 41.5, top: 26 }, { left: 58, top: 26 }, { left: 41.5, top: 37 }, { left: 58, top: 37 },
      { left: 70.5, top: 26 }, { left: 87, top: 26 }, { left: 70.5, top: 37 }, { left: 87, top: 37 },
      { left: 13, top: 50 }, { left: 29.5, top: 50 }, { left: 13, top: 61 }, { left: 29.5, top: 61 },
      { left: 41.5, top: 50 }, { left: 58, top: 50 }, { left: 41.5, top: 61 }, { left: 58, top: 61 },
      { left: 70.5, top: 50 }, { left: 87, top: 50 }, { left: 70.5, top: 61 }, { left: 87, top: 61 }
    ];
    const use = Math.min(count, positions.length);
    return { positions: positions.slice(0, use), overflow: count > positions.length ? count - positions.length : 0 };
  }

  function generateTrainingDots(count) {
    // 12 desks x 2 seats = 24 positions
    const positions = [
      { left: 14, top: 25 }, { left: 21.5, top: 25 },
      { left: 35.5, top: 25 }, { left: 43, top: 25 },
      { left: 57, top: 25 }, { left: 64.5, top: 25 },
      { left: 78.5, top: 25 }, { left: 86, top: 25 },
      { left: 14, top: 42 }, { left: 21.5, top: 42 },
      { left: 35.5, top: 42 }, { left: 43, top: 42 },
      { left: 57, top: 42 }, { left: 64.5, top: 42 },
      { left: 78.5, top: 42 }, { left: 86, top: 42 },
      { left: 14, top: 58 }, { left: 21.5, top: 58 },
      { left: 35.5, top: 58 }, { left: 43, top: 58 },
      { left: 57, top: 58 }, { left: 64.5, top: 58 },
      { left: 78.5, top: 58 }, { left: 86, top: 58 }
    ];
    const use = Math.min(count, positions.length);
    return { positions: positions.slice(0, use), overflow: count > positions.length ? count - positions.length : 0 };
  }

  function generateTheaterDots(count) {
    // 6 rows x 4 dots = 24 positions
    const positions = [
      { left: 20, top: 24 }, { left: 40, top: 24 }, { left: 60, top: 24 }, { left: 80, top: 24 },
      { left: 20, top: 33 }, { left: 40, top: 33 }, { left: 60, top: 33 }, { left: 80, top: 33 },
      { left: 20, top: 42.5 }, { left: 40, top: 42.5 }, { left: 60, top: 42.5 }, { left: 80, top: 42.5 },
      { left: 20, top: 53 }, { left: 40, top: 53 }, { left: 60, top: 53 }, { left: 80, top: 53 },
      { left: 20, top: 64 }, { left: 40, top: 64 }, { left: 60, top: 64 }, { left: 80, top: 64 },
      { left: 20, top: 75.5 }, { left: 40, top: 75.5 }, { left: 60, top: 75.5 }, { left: 80, top: 75.5 }
    ];
    const use = Math.min(count, positions.length);
    return { positions: positions.slice(0, use), overflow: count > positions.length ? count - positions.length : 0 };
  }

  function getAttendeeElements(template, answers) {
    const count = Math.max(0, Math.round(Number(answers?.attendeeCount) || 0));
    let data;
    let seatsHtml = "";

    if (template === "conference") {
      return {
        seatsHtml: "",
        dotsHtml: "",
        badgeHtml: count > 0 ? `<span class="layout-v2-count-badge">${count} participants</span>` : ""
      };
    }

    if (template === "boardroom" || template === "classroom" || template === "training" || template === "theater") {
      return {
        seatsHtml: "",
        dotsHtml: "",
        badgeHtml: count > 0 ? `<span class="layout-v2-count-badge">${count} participants</span>` : ""
      };
    } else {
      data = generateTheaterDots(count);
    }

    if (template === "conference" && SHOW_CONFERENCE_SEAT_FURNITURE && Array.isArray(data.seatPositions)) {
      seatsHtml = data.seatPositions
        .map((seat) => {
          const axisClass = seat.axis === "v" ? "layout-v2-seat--v" : "layout-v2-seat--h";
          return `<span class="layout-v2-seat ${axisClass}" style="left:${seat.left}%;top:${seat.top}%;"></span>`;
        })
        .join("");
    }

    const dots = data.positions
      .map((p) => `<span class="layout-v2-attendee" style="left:${p.left}%;top:${p.top}%;"></span>`)
      .join("");

    let badge = "";
    if (template === "conference" && Number.isFinite(data.seatCapacity)) {
      const occupied = Number.isFinite(data.occupied) ? data.occupied : count;
      badge = `<span class="layout-v2-count-badge">${occupied}/${data.seatCapacity} seats</span>`;
      if (data.overflow > 0) {
        badge += `<span class="layout-v2-overflow-badge layout-v2-overflow-badge--stacked">+${data.overflow} overflow</span>`;
      }
    } else {
      badge = data.overflow > 0
        ? `<span class="layout-v2-overflow-badge">+${data.overflow} participants</span>`
        : (count > 0 ? `<span class="layout-v2-count-badge">${count} participants</span>` : "");
    }

    return { seatsHtml, dotsHtml: dots, badgeHtml: badge };
  }


  // ============================================
  // Rendering
  // ============================================
  function inlineLabelForProduct(product, template) {
    if (template !== "conference" && template !== "boardroom" && template !== "classroom" && template !== "training" && template !== "theater") return "";
    return roleLabelForTemplate(template, product.placementRole, product.name);
  }

  function inlineLabelPlacement(product) {
    if (["display_main", "camera_front", "control", "collaboration", "compute", "audio_dsp", "recording"].includes(product.placementRole)) return "bottom";
    return "top";
  }

  function iconTemplate(product, template) {
    const iconPath = ICON_PATHS[product.placementRole] || ICON_PATHS.fallback;
    const tooltip = `${product.order}. ${product.name} — ${product.description}`;
    const p = product.placement || { left: 50, top: 60 };
    const inlineLabel = inlineLabelForProduct(product, template);
    const labelClass = inlineLabel ? `layout-v2-icon__label layout-v2-icon__label--${inlineLabelPlacement(product)}` : "";

    if (template === "conference" || template === "boardroom" || template === "classroom" || template === "training" || template === "theater") {
      if (template === "theater" && product.skipBoardCallout) return "";
      const callout = product.callout || {
        label: p,
        anchor: p,
        line: { orientation: "horizontal", left: p.left, top: p.top, length: 0 }
      };
      const lineStyle = callout.line.orientation === "vertical"
        ? `left:${callout.line.left}%;top:${callout.line.top}%;height:${callout.line.length}%;width:1.85px;transform:translateX(-50%);`
        : `left:${callout.line.left}%;top:${callout.line.top}%;width:${callout.line.length}%;transform:translateY(-50%);`;
      return `
        <div class="layout-v2-callout" data-product-id="${escapeAttribute(product.id)}">
          <span
            class="layout-v2-callout__line"
            style="${lineStyle}"
            aria-hidden="true"
          ></span>
          <span class="layout-v2-callout__anchor" style="left:${callout.anchor.left}%;top:${callout.anchor.top}%;" aria-hidden="true"></span>
          <button
            type="button"
            class="layout-v2-icon layout-v2-icon--tag layout-v2-icon--callout"
            style="left:${callout.label.left}%;top:${callout.label.top}%;"
            data-product-id="${escapeAttribute(product.id)}"
            data-tooltip="${escapeAttribute(tooltip)}"
            aria-label="${product.order}. View details for ${escapeAttribute(product.name)}"
            aria-controls="advisorHotspotPanel"
            aria-pressed="false"
          >
            <span class="layout-v2-icon__tag-text">${escapeAttribute(inlineLabel || product.name)}</span>
          </button>
        </div>
      `;
    }

    return `
      <button
        type="button"
        class="layout-v2-icon"
        style="left:${p.left}%;top:${p.top}%;"
        data-product-id="${escapeAttribute(product.id)}"
        data-tooltip="${escapeAttribute(tooltip)}"
        aria-label="${product.order}. View details for ${escapeAttribute(product.name)}"
        aria-controls="advisorHotspotPanel"
        aria-pressed="false"
      >
        <img class="layout-v2-icon__svg" src="${iconPath}" alt="" loading="lazy" />
        <span class="layout-v2-icon__number">${product.order}</span>
        ${inlineLabel ? `<span class="${labelClass}">${escapeAttribute(inlineLabel)}</span>` : ""}
      </button>
    `;
  }

  function platformLabel(platform) {
    const labels = {
      teams: "Microsoft Teams",
      zoom: "Zoom",
      webex: "Webex",
      meet: "Google Meet",
      mixed: "Multi-platform"
    };
    return labels[platform] || "Multi-platform";
  }

  function boardClassForTemplate(template) {
    if (template === "conference") return "layout-v2-board layout-v2-board--meeting-real";
    if (template === "boardroom") return "layout-v2-board layout-v2-board--boardroom-real";
    if (template === "classroom") return "layout-v2-board layout-v2-board--classroom-real";
    if (template === "training") return "layout-v2-board layout-v2-board--training-real";
    if (template === "theater") return "layout-v2-board layout-v2-board--seminar-real";
    return "layout-v2-board";
  }

  function frontIndicatorMarkup(template, recommendation, loading = false) {
    if (template === "conference") {
      return `
        <div class="layout-v2-front-indicator layout-v2-front-indicator--clean">
          <span class="layout-v2-front-text">Meeting Room</span>
        </div>
      `;
    }

    const hybridLabel = recommendation?.answers?.hybridRequired ? "Hybrid Ready" : "In-Room Focused";
    const platform = loading ? "Loading layout…" : platformLabel(recommendation?.answers?.primaryPlatform);

    return `
      <div class="layout-v2-front-indicator">
        <span class="layout-v2-front-text">Front</span>
        <span class="layout-v2-front-sub">${platform}${loading ? "" : ` • ${hybridLabel}`}</span>
      </div>
    `;
  }

  function renderBoard(container, products, attendees, template, recommendation) {
    const bg = ROOM_BACKGROUNDS[template] || ROOM_BACKGROUNDS.classroom;
    const boardClass = boardClassForTemplate(template);
    const icons = products.map((p) => iconTemplate(p, template)).join("");

    return `
      <div class="${boardClass}" style="background-image:url('${bg}');">
        ${frontIndicatorMarkup(template, recommendation)}
        ${attendees.seatsHtml}
        ${attendees.dotsHtml}
        ${attendees.badgeHtml}
        ${icons}
        <div class="layout-v2-tooltip" role="tooltip" aria-hidden="true"></div>
      </div>
    `;
  }

  const CATEGORY_COLORS = {
    "Education Display": "#6366f1",
    "Display": "#3b82f6",
    "Video": "#8b5cf6",
    "Audio": "#10b981",
    "Collaboration": "#f59e0b",
    "Compute": "#94a3b8",
    "Recording": "#ef4444",
    "Writing Surface": "#14b8a6",
    "Control": "#f97316"
  };

  function equipmentCardTemplate(product) {
    const dotColor = CATEGORY_COLORS[product.category] || "#94a3b8";
    return `
      <button type="button" class="layout-v2-card" data-product-id="${escapeAttribute(product.id)}" aria-pressed="false">
        <span class="layout-v2-card__order">${product.order}</span>
        <div class="layout-v2-card__body">
          <p class="layout-v2-card__name">${escapeAttribute(product.name)}</p>
          <p class="layout-v2-card__meta">
            <span class="layout-v2-card__dot" style="background:${dotColor};"></span>
            ${escapeAttribute(product.category)}
          </p>
          <p class="layout-v2-card__copy">${escapeAttribute(product.description)}</p>
        </div>
      </button>
    `;
  }

  const ROOM_LABELS = {
    classroom: "Smart Classroom",
    meeting: "Meeting Room",
    training: "Training Room",
    boardroom: "Boardroom",
    seminar: "Seminar Room"
  };

  function renderSideGuide(products, recommendation) {
    const answers = recommendation?.answers || {};
    const roomType = answers.roomType || "room";
    const roomLabel = ROOM_LABELS[roomType] || titleCase(roomType);
    const size = titleCase(answers.roomSize || "medium");
    const attendees = Number(answers.attendeeCount || 0);
    const platform = platformLabel(answers.primaryPlatform);
    const hybrid = answers.hybridRequired ? "Hybrid-ready" : "In-room optimised";

    return `
      <aside class="layout-v2-guide">
        <p class="layout-v2-guide__eyebrow">Room Details</p>
        <h5 class="layout-v2-guide__title">${escapeAttribute(roomLabel)} Equipment</h5>
        <p class="layout-v2-guide__copy">${size} space · ${attendees} participants · ${platform} · ${hybrid}</p>
        <div class="layout-v2-guide__grid">
          ${products.map((p) => equipmentCardTemplate(p)).join("")}
        </div>
      </aside>
    `;
  }

  function renderLegend(layoutConfig, products) {
    const activeZones = new Map();
    (layoutConfig?.zones || [])
      .filter((z) => z.active)
      .forEach((z) => activeZones.set(z.id, z.label || titleCase(z.id)));

    if (!activeZones.size) {
      products.forEach((p) => activeZones.set(p.zone, titleCase(p.zone)));
    }

    const chips = Array.from(activeZones.values())
      .map((label) => `<span class="layout-v2-legend-chip">${escapeAttribute(label)}</span>`)
      .join("");

    return `
      <div class="layout-v2-legend">
        <p class="layout-v2-legend__title">Zone Reference</p>
        <div class="layout-v2-legend__chips">${chips || '<span class="layout-v2-legend-chip">Core Room Zones</span>'}</div>
      </div>
    `;
  }

  // ============================================
  // Tooltip system
  // ============================================
  function bindTooltip(board) {
    const tooltip = board.querySelector(".layout-v2-tooltip");
    if (!tooltip) return;

    board.querySelectorAll(".layout-v2-icon").forEach((btn) => {
      let timer;

      const show = () => {
        const text = btn.dataset.tooltip;
        if (!text) return;
        tooltip.textContent = text;
        tooltip.setAttribute("aria-hidden", "false");
        tooltip.classList.add("is-visible");
        positionTooltip(board, tooltip, btn);
      };

      const hide = () => {
        tooltip.classList.remove("is-visible");
        tooltip.setAttribute("aria-hidden", "true");
      };

      btn.addEventListener("mouseenter", () => {
        timer = setTimeout(show, 180);
      });
      btn.addEventListener("mouseleave", () => {
        clearTimeout(timer);
        hide();
      });
      btn.addEventListener("focus", show);
      btn.addEventListener("blur", hide);
    });
  }

  function positionTooltip(board, tooltip, btn) {
    const boardRect = board.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const ttRect = tooltip.getBoundingClientRect();

    let top = btnRect.top - boardRect.top - ttRect.height - 10;
    let left = btnRect.left - boardRect.left + btnRect.width / 2 - ttRect.width / 2;

    // Flip to bottom if clipping top
    if (top < 8) {
      top = btnRect.top - boardRect.top + btnRect.height + 10;
    }

    // Clamp horizontally
    left = Math.max(8, Math.min(left, boardRect.width - ttRect.width - 8));

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  }

  // ============================================
  // Main render
  // ============================================
  function render(container, recommendation) {
    if (!container || !recommendation) return;

    const layoutConfig = recommendation.layoutConfig || {};
    const template = resolveTemplate(layoutConfig, recommendation);
    const baseProducts = mapProducts(layoutConfig, recommendation, template);

    // Build board shell first so we can measure it
    container.innerHTML = `
      <div class="room-layout-shell">
        <div class="room-layout-main">
          <div class="${boardClassForTemplate(template)}" id="layoutV2Board" style="background-image:url('${ROOM_BACKGROUNDS[template]}');">
            ${frontIndicatorMarkup(template, recommendation, true)}
          </div>
          ${renderSideGuide(baseProducts, recommendation)}
        </div>
        ${renderLegend(layoutConfig, baseProducts)}
      </div>
    `;

    const board = container.querySelector("#layoutV2Board");
    if (!board) return;
    container.__layoutV2BoardSize = `${Math.round(board.clientWidth)}x${Math.round(board.clientHeight)}`;

    // Measure and compute placements
    const mappedProducts = assignPlacements(baseProducts, template, board);
    let renderProducts;
    if (template === "theater") {
      renderProducts = assignTheaterCallouts(mappedProducts);
    } else if (template === "conference" || template === "boardroom" || template === "classroom" || template === "training") {
      renderProducts = assignTemplateCallouts(mappedProducts, template);
    } else {
      renderProducts = mappedProducts;
    }
    const attendees = getAttendeeElements(template, recommendation?.answers);
    // Re-render board with computed placements
    board.innerHTML = `
      ${frontIndicatorMarkup(template, recommendation)}
      ${attendees.seatsHtml}
      ${attendees.dotsHtml}
      ${attendees.badgeHtml}
      ${renderProducts.map((p) => iconTemplate(p, template)).join("")}
      <div class="layout-v2-tooltip" role="tooltip" aria-hidden="true"></div>
    `;

    bindTooltip(board);

    // Sync active states between board icons and side cards
    const updateActive = (productId) => {
      container.querySelectorAll(".layout-v2-icon, .layout-v2-card, .layout-v2-callout").forEach((el) => {
        const isActive = el.dataset.productId === productId;
        el.classList.toggle("is-active", isActive);
        if (el.classList.contains("layout-v2-icon")) {
          el.setAttribute("aria-pressed", isActive ? "true" : "false");
        }
      });
    };

    // Click handlers
    container.querySelectorAll(".layout-v2-icon, .layout-v2-card").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.dataset.productId;
        updateActive(id);
        const customEvent = new CustomEvent("advisor:hotspot", {
          detail: {
            productId: id,
            interactionType: e.detail === 0 ? "keyboard" : "pointer"
          }
        });
        container.dispatchEvent(customEvent);
      });
    });

    // Clear active on board background click
    board.addEventListener("click", (e) => {
      if (e.target === board) {
        updateActive(null);
        const customEvent = new CustomEvent("advisor:hotspot", {
          detail: { productId: null, interactionType: "pointer" }
        });
        container.dispatchEvent(customEvent);
      }
    });

    // Keyboard: Escape clears
    board.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        updateActive(null);
        const customEvent = new CustomEvent("advisor:hotspot", {
          detail: { productId: null, interactionType: "keyboard" }
        });
        container.dispatchEvent(customEvent);
      }
    });

    // Auto-select first device on initial render
    if (renderProducts[0]) {
      updateActive(renderProducts[0].id);
      const customEvent = new CustomEvent("advisor:hotspot", {
        detail: {
          productId: renderProducts[0].id,
          interactionType: "auto"
        },
        bubbles: true
      });
      container.dispatchEvent(customEvent);
    }

    if (typeof container.__layoutV2Cleanup === "function") {
      container.__layoutV2Cleanup();
    }

    let resizeTimer = null;
    const scheduleReflow = () => {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const liveBoard = container.querySelector("#layoutV2Board");
        if (!liveBoard) return;
        const nextSize = `${Math.round(liveBoard.clientWidth)}x${Math.round(liveBoard.clientHeight)}`;
        if (!nextSize || nextSize === container.__layoutV2BoardSize) return;
        container.__layoutV2BoardSize = nextSize;
        render(container, recommendation);
      }, 120);
    };

    const onWindowResize = () => scheduleReflow();
    window.addEventListener("resize", onWindowResize, { passive: true });

    let resizeObserver = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => scheduleReflow());
      resizeObserver.observe(board);
    }

    container.__layoutV2Cleanup = () => {
      window.removeEventListener("resize", onWindowResize);
      if (resizeObserver) resizeObserver.disconnect();
      if (resizeTimer) clearTimeout(resizeTimer);
    };
  }

  namespace.layout = { render };
})(window.PostoSolutionAdvisor);
