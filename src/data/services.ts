export interface ServiceData {
  id: string;
  slug: string;
  title: string;
  desc: string;
  img: string;
  rightHeading: string;
  extendedDesc: string;
  features: { title: string; description: string }[];
  process: { step: string; title: string; description: string }[];
}

export const services: ServiceData[] = [
  {
    id: "s1",
    slug: "website-development",
    title: "Website Development",
    desc: "Production-grade front-ends built on modern stacks. We craft scalable, performant, and accessible digital experiences.",
    img: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=2000&auto=format&fit=crop",
    rightHeading: "Digital Presence",
    extendedDesc: "Our web development process focuses on creating lightning-fast, accessible, and scalable digital experiences. We leverage the latest in React, Next.js, and modern CSS frameworks to ensure your brand stands out with seamless interactions and flawless performance.",
    features: [
      { title: "Modern Tech Stack", description: "Built with React, Next.js, and Vite for optimal performance." },
      { title: "Responsive Design", description: "Flawless execution across desktop, tablet, and mobile devices." },
      { title: "SEO Optimized", description: "Architecture designed to rank high and perform perfectly." },
      { title: "Custom Animations", description: "GSAP and Framer Motion integrations for premium feel." }
    ],
    process: [
      { step: "01", title: "Architecture Planning", description: "Mapping out the technical requirements and component structure." },
      { step: "02", title: "Frontend Development", description: "Translating designs into pixel-perfect, interactive code." },
      { step: "03", title: "Performance Tuning", description: "Optimizing assets, reducing bundle sizes, and ensuring 90+ Lighthouse scores." }
    ]
  },
  {
    id: "s2",
    slug: "logo-design",
    title: "Logo Design",
    desc: "Shaping unique visual identities for modern brands. We build foundations that scale across every medium.",
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2000&auto=format&fit=crop",
    rightHeading: "Visual Identity",
    extendedDesc: "A logo is the cornerstone of your brand. We design minimal, memorable, and highly adaptable logos that capture your company's essence and communicate your core values at a single glance.",
    features: [
      { title: "Concept Exploration", description: "Multiple distinct directions tailored to your brief." },
      { title: "Scalable Vectors", description: "Flawless rendering from app icons to billboards." },
      { title: "Brand Guidelines", description: "Comprehensive rules for logo usage, spacing, and variations." },
      { title: "Typography Pairing", description: "Custom font selections that perfectly complement the mark." }
    ],
    process: [
      { step: "01", title: "Brand Discovery", description: "Understanding your mission, audience, and market position." },
      { step: "02", title: "Iterative Sketching", description: "Exploring dozens of concepts to find the perfect metaphor." },
      { step: "03", title: "Refinement & Delivery", description: "Polishing the chosen direction and preparing all necessary file formats." }
    ]
  },
  {
    id: "s3",
    slug: "mobile-application",
    title: "Mobile Application",
    desc: "Native and cross-platform apps built for scale and performance. Bringing your product to every pocket.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
    rightHeading: "Product Ecosystems",
    extendedDesc: "We build intuitive and powerful mobile applications for iOS and Android. Whether it's a native Swift/Kotlin app or a cross-platform React Native solution, we focus on smooth gestures, native feel, and offline capabilities.",
    features: [
      { title: "Cross-Platform", description: "React Native and Flutter solutions for unified codebases." },
      { title: "Native Feel", description: "Platform-specific UI paradigms and smooth 60fps animations." },
      { title: "Offline Support", description: "Robust local caching and synchronization logic." },
      { title: "App Store Ready", description: "Full assistance with publishing and compliance." }
    ],
    process: [
      { step: "01", title: "UX Wireframing", description: "Mapping out user flows and screen states." },
      { step: "02", title: "Development", description: "Writing clean, maintainable code with robust state management." },
      { step: "03", title: "QA & Launch", description: "Rigorous testing on physical devices before store submission." }
    ]
  },
  {
    id: "s4",
    slug: "game-development",
    title: "Game Development",
    desc: "Immersive experiences and interactive entertainment. Form meets function in perfectly crafted interfaces.",
    img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2000&auto=format&fit=crop",
    rightHeading: "Interactive Play",
    extendedDesc: "Our game development division creates engaging, visually stunning interactive experiences. From WebGL browser games to Unity-based mobile hits, we combine art, mechanics, and psychology to build games people love to play.",
    features: [
      { title: "3D & 2D Engines", description: "Expertise in Unity, Unreal, and WebGL/Three.js." },
      { title: "Game Mechanics", description: "Finely tuned physics, controls, and progression systems." },
      { title: "Multiplayer", description: "Real-time networking and state synchronization." },
      { title: "Monetization", description: "Ethical and effective in-app purchase integration." }
    ],
    process: [
      { step: "01", title: "Game Design Document", description: "Defining rules, story, art style, and technical stack." },
      { step: "02", title: "Prototyping", description: "Building the core loop to ensure the game is actually fun." },
      { step: "03", title: "Production & Polish", description: "Adding assets, particle effects, sound, and final polish." }
    ]
  },
  {
    id: "s5",
    slug: "digital-marketing",
    title: "Digital Marketing",
    desc: "Data-driven marketing to expand your reach and boost conversion rates. Strategies tailored to grow your audience.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    rightHeading: "Growth Strategies",
    extendedDesc: "We don't just build products; we make sure people see them. Our digital marketing strategies are rooted in data, leveraging SEO, paid media, and content marketing to drive high-quality traffic and conversions.",
    features: [
      { title: "SEO Optimization", description: "Technical, on-page, and off-page search strategies." },
      { title: "Performance Ads", description: "High-ROI campaigns across Google, Meta, and LinkedIn." },
      { title: "Conversion Tracking", description: "Advanced analytics setup for granular attribution." },
      { title: "Content Strategy", description: "Engaging copywriting and creative assets." }
    ],
    process: [
      { step: "01", title: "Audit & Strategy", description: "Analyzing current performance and identifying growth channels." },
      { step: "02", title: "Campaign Setup", description: "Creating ad copy, targeting rules, and landing pages." },
      { step: "03", title: "Optimization", description: "Continuous A/B testing and budget reallocation." }
    ]
  },
  {
    id: "s6",
    slug: "branding",
    title: "Branding",
    desc: "We craft concepts that define unique brands and strengthen their presence in competitive markets.",
    img: "https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=2000&auto=format&fit=crop",
    rightHeading: "Brand Perception",
    extendedDesc: "Branding is more than a logo—it's how people feel about your company. We develop comprehensive brand systems encompassing tone of voice, visual identity, and strategic positioning to ensure you stand out.",
    features: [
      { title: "Brand Strategy", description: "Defining your purpose, vision, and core values." },
      { title: "Visual Identity Systems", description: "Cohesive colors, typography, and graphic elements." },
      { title: "Brand Voice", description: "A distinct personality and tone for all communications." },
      { title: "Brand Books", description: "Detailed guidelines to maintain consistency across teams." }
    ],
    process: [
      { step: "01", title: "Workshops", description: "Collaborative sessions to unearth your brand's true identity." },
      { step: "02", title: "System Design", description: "Building the visual and verbal toolkit." },
      { step: "03", title: "Rollout", description: "Applying the brand to collateral, social, and web." }
    ]
  },
  {
    id: "s7",
    slug: "video-animation",
    title: "Video Animation",
    desc: "Creative processes with rapid delivery and visual storytelling. Movement that explains and delights.",
    img: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop",
    rightHeading: "Motion Narratives",
    extendedDesc: "Motion brings static ideas to life. We create compelling 2D and 3D animations, explainer videos, and UI micro-interactions that capture attention and explain complex concepts simply.",
    features: [
      { title: "2D & 3D Animation", description: "From vector motion graphics to cinematic 3D renders." },
      { title: "Storyboarding", description: "Detailed scene-by-scene planning before production." },
      { title: "Sound Design", description: "Custom Foley and curated soundtracks to elevate the mood." },
      { title: "Lottie Integrations", description: "Lightweight, scalable animations for web and mobile." }
    ],
    process: [
      { step: "01", title: "Script & Storyboard", description: "Writing the narrative and sketching keyframes." },
      { step: "02", title: "Animatics", description: "Creating a rough timeline with voiceovers to test pacing." },
      { step: "03", title: "Final Render", description: "Animating, lighting, rendering, and compositing the final piece." }
    ]
  }
];
