// ============================================
// Bot v4.0 Response Templates
// All responses organized by category with rotation support
// ============================================

// ============================================
// Greeting Responses (Rotating)
// ============================================
export const greetingResponses = [
  "Hi! I can help you learn about Abhilash's background and experience. What brings you here today?",
  "Hello! I'm here to share information about Abhilash's work in pharmaceutical manufacturing. What would you like to know?",
  "Hey there! Looking to learn about Abhilash's background? I'm happy to help. What interests you?",
  "Hi! I can answer questions about Abhilash's engineering and pharma manufacturing experience. What can I help you with?"
];

// ============================================
// Small Talk Responses
// ============================================
export const smallTalkResponses = {
  how_are_you: [
    "I'm doing well, thanks for asking! I'm here to help you learn about Abhilash's background. What would you like to know about his experience?",
    "Great, thanks! Ready to help you learn about Abhilash. What brings you here today?"
  ],
  
  can_you_help: [
    "Absolutely! I can share information about Abhilash's background, his work in pharmaceutical manufacturing, specific projects, technical skills, or help you get in touch with him. What would be most useful?",
    "Of course! I can tell you about his experience, projects like Project Banksia, or how to connect. What are you looking for?"
  ],
  
  thanks: [
    "You're welcome! Let me know if you have any other questions, or I can share his contact info if you'd like to connect directly.",
    "Happy to help! Feel free to ask more or I can connect you with Abhilash if you prefer."
  ],
  
  goodbye: [
    "Thanks for stopping by! If you have more questions later or want to connect with Abhilash directly, his email is abhilash333naidu@gmail.com. Have a great day!",
    "Take care! You can reach Abhilash at abhilash333naidu@gmail.com anytime. Goodbye!"
  ]
};

// ============================================
// Clarifying Questions (When confidence < 0.6 or vague input)
// ============================================
export const clarifyingQuestions = {
  vague_interest: [
    "I'd be happy to help! Are you interested in his engineering background, specific projects, or how to connect with him?",
    "Sure thing! Would you like to hear about his technology transfer work, his personal projects, or something else?",
    "Absolutely! What part of Abhilash's background are you most curious about? His work at CSL Seqirus, his engineering experience, or his personal projects?"
  ],
  
  unclear_request: [
    "I want to make sure I give you the most helpful information. Could you tell me a bit more about what you're looking for?",
    "To point you in the right direction, are you exploring his background for a specific role, or just learning about his experience?",
    "Help me understand what would be most valuable. Are you interested in his pharmaceutical manufacturing experience, his technology transfer work, or something specific?"
  ],
  
  short_response: [
    "Could you tell me more about what you're looking for? I'd love to help!",
    "What specifically interests you about Abhilash's background?",
    "I'm here to help! What would you like to know? His engineering experience, previous roles, or how to connect?"
  ]
};

// ============================================
// Information Seeking Responses
// ============================================
export const informationResponses = {
  // Identity & Background
  who_is_he: {
    brief: "Abhilash is an Engineers Australia-assessed Mechanical Engineer in Melbourne, with 10 years in engineering and 7 of them in pharma and biopharma.",
    detailed: "Abhilash is an Engineers Australia-assessed Mechanical Engineer in Melbourne. He has 10 years in engineering, 7 of them in pharma and biopharma. He was the MS&T Technology Transfer Lead on CSL Seqirus's AUD 800M Project Banksia, and at Life-Space Group the site received TGA approval at its first audit with 0 major findings. Since Jan 2026 he's been on a planned career break, building personal AI systems projects. What specifically interests you?"
  },
  
  what_does_he_do: {
    response: "Abhilash was the Technology Transfer Lead on CSL Seqirus's Project Banksia program. He owned the MS&T technology-transfer deliverables, which covered engineering batches, characterisation studies, HAZOP, change control, stage-gate packs, and CIP PFD/P&ID."
  },
  
  experience_overview: {
    brief: "Abhilash has 10 years in engineering, 7 of them in pharma and biopharma. He was the MS&T Technology Transfer Lead on CSL Seqirus's AUD 800M Project Banksia. Before that he delivered commissioning and qualification at Life-Space Group, and led product development and scale-up at APM.",
    detailed: "Abhilash has 10 years in engineering, 7 of them in pharma and biopharma. From Jul 2022 to Dec 2025 he was MS&T Process Engineer (Technology Transfer Lead) at CSL Seqirus, on the AUD 800M Project Banksia program. Before that he delivered commissioning and qualification for 2 production lines at Life-Space Group, where the site received TGA approval at its first audit with 0 major findings. He also led product development and scale-up at Australian Pharmaceutical Manufacturers, and worked in precision manufacturing and mechanical design at SKF and Glass Expansion. His core experience is technology transfer and GMP manufacturing. What area interests you most?"
  },
  
  // Technical Expertise
  technology_transfer: {
    brief: "Technology transfer is Abhilash's main specialty. At CSL Seqirus he was the Technology Transfer Lead on Project Banksia, an AUD 800M program.",
    detailed: "Technology transfer is Abhilash's main specialty. At CSL Seqirus he led end-to-end transfers on Project Banksia, an AUD 800M program. He worked on complex processes like flu cell culture and antivenom manufacturing, helped get first-time GMP manufacturing running at the receiving site, and managed the controls that protect quality during commercial campaigns. He focused on protecting QTTP through CPP and CQA control.",
    deep: "Technology transfer is Abhilash's core strength. He led end-to-end transfers at CSL Seqirus on Project Banksia, including complex processes like flu cell culture manufacturing, while keeping GMP compliance and protecting QTTP through CPP and CQA control. For the technical specifics of his approach, or to talk through how that experience applies to your work, connecting with Abhilash directly is the best route."
  },
  
  gmp_compliance: {
    response: "Abhilash has a strong record in GMP compliance. At Life-Space Group the site received TGA approval at its first audit with 0 major findings, and he helped prepare the team for that inspection. He knows what regulators look for."
  },
  
  product_development: {
    response: "Abhilash led product development and scale-up at Australian Pharmaceutical Manufacturers, from product trials through commercial production. He developed and scaled tablets, capsules, powders and sachets, and prepared cost-per-batch quotations that contributed to more than 20 won contracts."
  },
  
  regulatory_success: {
    response: "At Life-Space Group, Abhilash led commissioning and qualification for the tablet and sachet production lines. The site received TGA approval at its first audit with 0 major findings."
  },
  
  // Specific Projects
  project_banksia: {
    response: "Project Banksia was an AUD 800M capital program at CSL Seqirus to build GMP-compliant influenza vaccine manufacturing. Abhilash was the Technology Transfer Lead for MS&T, transferring flu cell culture and antivenom processes."
  },
  
  tga_achievement: {
    response: "At Life-Space Group, Abhilash led commissioning and qualification for the tablet and sachet production lines. The site received TGA approval at its first audit with 0 major findings."
  },
  
  // Personal
  location: {
    response: "Abhilash is based in Melbourne, Victoria. He's an Australian citizen and can start immediately. For questions about specific arrangements, connecting with him directly would be best."
  },
  
  contact: {
    response: "You can reach Abhilash at abhilash333naidu@gmail.com, or connect on LinkedIn at linkedin.com/in/abhilashpaspulati. He aims to reply within 2 business days."
  },
  
  availability: {
    response: "Abhilash has been on a planned career break since Jan 2026, building personal AI systems projects. He's available immediately, with no notice period, and is looking for regulated life sciences work in Melbourne. Best to reach him at abhilash333naidu@gmail.com."
  }
};

// ============================================
// Clarification Responses (Misconceptions)
// ============================================
export const clarificationResponses = {
  is_he_pm: {
    response: "Abhilash is an Engineers Australia-assessed Mechanical Engineer, not a Product Manager by title. He has done product development work though. He led NPD and NPI programs from concept through commercial production at Australian Pharmaceutical Manufacturers."
  },
  
  ai_ml_experience: {
    response: "Since Jan 2026 Abhilash has been building personal AI systems projects. He wrote a resume and job-application tool, an MIT-licensed skills catalogue, and a voice research agent. Programming is a working proficiency for him in Python, TypeScript, React and Playwright."
  },
  
  team_leadership: {
    response: "Abhilash has led cross-functional teams across engineering, quality, validation and operations. At Australian Pharmaceutical Manufacturers he line-managed two Technical Scientists and one Senior Production Technician, and coordinated maintenance contractors. On Project Banksia he led the MS&T technology-transfer deliverables."
  },
  
  defence_experience: {
    response: "Abhilash doesn't have defence sector experience. His background is in pharma and biopharma manufacturing in regulated GMP environments. He's an Australian citizen and is willing to undergo a Baseline or NV1 clearance, though he doesn't hold one. If you need someone who can navigate complex regulatory frameworks, he has that experience."
  }
};

// ============================================
// Natural Transition Phrases
// ============================================
export const naturalTransitions = {
  after_answer: [
    "Does that help with what you were looking for?",
    "Is there anything specific about that you'd like me to elaborate on?",
    "Would you like to know more about that, or is there something else you're curious about?",
    "What else can I share about Abhilash's background?"
  ],
  
  topic_switch: [
    "Speaking of his work at CSL Seqirus, you might also be interested to know...",
    "That relates to something else he worked on...",
    "Building on that, he also has experience with..."
  ],
  
  before_handoff: [
    "This is getting into specifics that Abhilash could explain much better than I can...",
    "You know what, this sounds like it would be worth discussing directly with Abhilash...",
    "For this level of detail, I'd recommend connecting with Abhilash directly..."
  ]
};

// ============================================
// Handoff Messages
// ============================================
export const handoffMessages = {
  immediate: "That's best discussed directly with Abhilash. You can reach him at abhilash333naidu@gmail.com.",
  
  recommended: "That's a great conversation to have with Abhilash directly. He can give you much more depth than I can. Want his contact info?",
  
  organic: "It sounds like you're evaluating fit in detail. Abhilash would be the best person to discuss this with. Want me to share his contact info?",
  
  with_context: (topic: string) => 
    `Based on your interest in ${topic}, connecting directly with Abhilash would be valuable. His email is abhilash333naidu@gmail.com.`
};

// ============================================
// Edge Case Responses
// ============================================
export const edgeCaseResponses = {
  testing_bot: [
    "I'm an AI assistant helping you learn about Abhilash's background and experience. I'm here to be useful. What would you like to know about his work?",
    "Yes, I'm an AI assistant here to help you learn about Abhilash. What questions do you have about his background?"
  ],
  
  inappropriate: [
    "I'm here to discuss Abhilash's professional experience. What would you like to know about his pharmaceutical manufacturing background?",
    "I can help you learn about Abhilash's professional background. What are you interested in?"
  ],
  
  frustrated_visitor: [
    "I apologize if I'm not addressing what you need. Can you help me understand what specific information would be most valuable? Or I can connect you directly with Abhilash at abhilash333naidu@gmail.com.",
    "I want to make sure I'm helpful. What specifically are you looking to learn about Abhilash?"
  ],
  
  off_topic: [
    "I'm here to help you learn about Abhilash's professional background. What would you like to know about his engineering experience?",
    "I can share information about Abhilash's work in pharmaceutical manufacturing. What interests you?"
  ],
  
  unknown: [
    "I'm not sure I have specific information about that. I can tell you about Abhilash's engineering experience, his technology transfer work, or how to connect with him. What would be most helpful?",
    "I don't have details on that specifically. Would you like to hear about his pharma manufacturing experience, previous roles, or contact information?"
  ]
};

// ============================================
// Response Selection Helpers
// ============================================

export function getRandomResponse(responses: string[]): string {
  const index = Math.floor(Math.random() * responses.length);
  return responses[index];
}

export function getGreetingResponse(): string {
  return getRandomResponse(greetingResponses);
}

export function getSmallTalkResponse(type: keyof typeof smallTalkResponses): string {
  return getRandomResponse(smallTalkResponses[type]);
}

export function getClarifyingQuestion(type: keyof typeof clarifyingQuestions): string {
  return getRandomResponse(clarifyingQuestions[type]);
}

export function getNaturalTransition(type: keyof typeof naturalTransitions): string {
  return getRandomResponse(naturalTransitions[type]);
}

export function getEdgeCaseResponse(type: keyof typeof edgeCaseResponses): string {
  return getRandomResponse(edgeCaseResponses[type]);
}

// ============================================
// Response Truncation Helper
// ============================================
export function truncateResponse(response: string, maxLength: number = 200): string[] {
  if (response.length <= maxLength) {
    return [response];
  }
  
  // Split into sentences
  const sentences = response.match(/[^.!?]+[.!?]+/g) || [response];
  const messages: string[] = [];
  let currentMessage = '';
  
  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if ((currentMessage + ' ' + trimmed).length <= maxLength) {
      currentMessage = currentMessage ? currentMessage + ' ' + trimmed : trimmed;
    } else {
      if (currentMessage) {
        messages.push(currentMessage);
      }
      currentMessage = trimmed;
    }
  }
  
  if (currentMessage) {
    messages.push(currentMessage);
  }
  
  return messages;
}

// ============================================
// Context-Based Response Selection
// ============================================
export function getInformationResponse(
  topic: string, 
  depth: number
): string {
  const responses = informationResponses as Record<string, { brief?: string; detailed?: string; deep?: string; response?: string }>;
  const topicResponses = responses[topic];
  
  if (!topicResponses) {
    return getClarifyingQuestion('vague_interest');
  }
  
  // Return based on depth
  if (topicResponses.response) {
    return topicResponses.response;
  }
  
  if (depth === 0 && topicResponses.brief) {
    return topicResponses.brief;
  } else if (depth === 1 && topicResponses.detailed) {
    return topicResponses.detailed;
  } else if (depth >= 2 && topicResponses.deep) {
    return topicResponses.deep;
  }
  
  // Fallback
  return topicResponses.brief || topicResponses.detailed || topicResponses.response || '';
}
