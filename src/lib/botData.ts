export interface BotInfo {
  id: string;
  name: string;
  subtitle: string;
  /** Short bullets from PRD §6 (Core Role / Main User Value) for Phase 2 richer explanation */
  supportingText?: string[];
  svgPath: string;
  bgImagePath: string;
  audioPath: string;
  gradientColors: [string, string];
  tagline: string;
}

export const BOTS: BotInfo[] = [
  {
    id: "digital-iris",
    name: "Digital Iris",
    subtitle:
      "Your 24/7 personal tutor who adapts to your pace, your style, your way of learning. Get clear explanations and real support whenever you need it - no pressure, no cost.",
    svgPath: "/assets/svgs/DigitalIris.svg",
    bgImagePath: "/assets/images/bg-digital-iris.png",
    audioPath: "/assets/audio/DigitalIris.wav",
    gradientColors: ["hsl(190, 85%, 65%)", "hsl(260, 85%, 65%)"],
    tagline: "Your 24/7 personal tutor",
    supportingText: [
      "Personal tutor for explanations, support, and practice.",
      "Personalized support and flexible explanations.",
      "Emotional reassurance when you need it.",
    ],
  },
  {
    id: "brain-boost-iris",
    name: "Brain Boost Iris",
    subtitle:
      "Turn any recorded lesson into a clear, organized summary with all the key points you need. Save hours of re-listening and walk into every test prepared and confident.",
    svgPath: "/assets/svgs/BrainBoostIris.svg",
    bgImagePath: "/assets/images/bg-brain-boost-iris.png",
    audioPath: "/assets/audio/BrainBoostIris.wav",
    gradientColors: ["hsl(260, 85%, 65%)", "hsl(190, 85%, 65%)"],
    tagline: "Turn lessons into clear summaries",
    supportingText: [
      "Turns recorded classes into clear study material.",
      "Saves time and organizes key concepts.",
      "Better preparation for tests.",
    ],
  },
  {
    id: "iris-coach",
    name: "Iris Coach",
    subtitle:
      "Learn to think like a problem-solver, not just a formula-follower. Develop creative thinking skills that work in any challenge, not just in class.",
    svgPath: "/assets/svgs/IrisCoach.svg",
    bgImagePath: "/assets/images/bg-iris-coach.png",
    audioPath: "/assets/audio/IrisCoach.wav",
    gradientColors: ["hsl(260, 85%, 65%)", "hsl(320, 85%, 65%)"],
    tagline: "Think like a problem-solver",
    supportingText: [
      "Coach for creative thinking and problem-solving.",
      "Build confidence and originality.",
      "Deeper understanding, not just the right answer.",
    ],
  },
  {
    id: "iris-simulations",
    name: "Iris Simulations",
    subtitle:
      "Why imagine when you can see it happen? Interactive simulations and virtual labs that turn abstract concepts into something you can touch, change, and truly understand.",
    svgPath: "/assets/svgs/IrisSimulations.svg",
    bgImagePath: "/assets/images/bg-iris-simulations.png",
    audioPath: "/assets/audio/IrisSimulations.wav",
    gradientColors: ["hsl(190, 85%, 65%)", "hsl(260, 85%, 65%)"],
    tagline: "Interactive simulations & virtual labs",
    supportingText: [
      "Simulation-based learning and virtual experiences.",
      "Abstract concepts made visible and interactive.",
      "Explore and experiment with no risk.",
    ],
  },
];
