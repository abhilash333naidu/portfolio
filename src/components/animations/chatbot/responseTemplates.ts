// ============================================
// Bot v4.0 Response Templates
// All responses organized by category with rotation support
// ============================================

import { IntentCategory, ConversationPhase } from './types';

// ============================================
// Greeting Responses (Rotating)
// ============================================
export const greetingResponses = [
  "Hi! I can help you learn about Abhilash's background and experience. What brings you here today?",
  "Hello! I'm here to share information about Abhilash's work in engineering management. What would you like to know?",
  "Hey there! Looking to learn about Abhilash's background? I'm happy to help - what interests you?",
  "Hi! I assist visitors with questions about Abhilash's engineering management experience. What can I help you with?"
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
    "Absolutely! I can share information about Abhilash's background, his work in engineering management, specific projects, technical expertise, or help you get in touch with him. What would be most useful for you?",
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
    "I'd be happy to help! Are you interested in his engineering management background, specific projects, or how to connect with him?",
    "Sure thing! Would you like to hear about his technology transfer work, regulatory experience, or something else?",
    "Absolutely! What aspect of Abhilash's background are you most curious about - his current role at CSL Seqirus, previous experience, or technical expertise?"
  ],
  
  unclear_request: [
    "I want to make sure I give you the most helpful information. Could you tell me a bit more about what you're looking for?",
    "To point you in the right direction - are you exploring his background for a specific opportunity, or just learning about his experience?",
    "Help me understand what would be most valuable - are you interested in his pharmaceutical manufacturing expertise, technology transfer experience, or something specific?"
  ],
  
  short_response: [
    "Could you tell me more about what you're looking for? I'd love to help!",
    "What specifically interests you about Abhilash's background?",
    "I'm here to help! What would you like to know - his current role, past experience, or how to connect?"
  ]
};

// ============================================
// Information Seeking Responses
// ============================================
export const informationResponses = {
  // Identity & Background
  who_is_he: {
    brief: "Abhilash is an Engineering Manager at CSL Seqirus with 8+ years in pharmaceutical manufacturing, specializing in technology transfer and GMP compliance.",
    detailed: "Abhilash is an Engineering Manager at CSL Seqirus specializing in technology transfer and GMP manufacturing. He has 8+ years of experience in pharmaceutical and biopharmaceutical manufacturing, with a strong track record in regulatory compliance including achieving TGA license approval on first audit with zero major findings. What specifically interests you?"
  },
  
  what_does_he_do: {
    response: "At CSL Seqirus, Abhilash leads technology transfers for vaccine manufacturing. He's the primary technical authority ensuring processes transfer successfully while maintaining GMP compliance."
  },
  
  experience_overview: {
    brief: "Abhilash brings 8+ years in engineering management across pharma and biopharma. Currently at CSL Seqirus leading tech transfers. Previously led GMP line establishment at Lifespace (achieved TGA approval), managed product commercialization at APM.",
    detailed: "Abhilash brings 8+ years in engineering management across pharma and biopharma. Currently at CSL Seqirus (~4 years) leading technology transfers for vaccine manufacturing. Before that, he led GMP line establishment at Lifespace Group (achieved TGA approval on first audit), managed product commercialization at APM, and worked in precision manufacturing and mechanical design. His core strengths are engineering management, technology transfer, GMP compliance, and regulatory success. What area interests you most?"
  },
  
  // Technical Expertise
  technology_transfer: {
    brief: "Technology transfer is Abhilash's primary specialty. At CSL Seqirus, he leads end-to-end technology transfers as primary technical authority.",
    detailed: "Technology transfer is Abhilash's primary specialty. At CSL Seqirus, he leads end-to-end transfers as the primary technical authority, ensuring processes transfer successfully while maintaining GMP compliance. He's successfully transferred complex processes like flu cell culture manufacturing, enabled first-time GMP manufacturing at receiving sites, and reduced operational risk during commercial campaigns. He focuses on protecting QTTP through proper CPP and CQA control.",
    deep: "Technology transfer is Abhilash's core expertise. He leads end-to-end transfers at CSL Seqirus as primary technical authority, managing complex processes like flu cell culture manufacturing while ensuring GMP compliance and QTTP protection through CPP/CQA control. For the technical specifics of his approach or to discuss how this experience might apply to your needs, connecting directly with Abhilash would be most valuable."
  },
  
  gmp_compliance: {
    response: "Abhilash has a strong track record in GMP compliance. Most notably, he achieved TGA license approval on first audit with zero major findings at Lifespace Group. He understands what regulators look for and how to prepare teams for inspection success."
  },
  
  product_development: {
    response: "Abhilash has led product development programs from concept through commercialization at APM. He managed NPD/NPI programs including pilot batches, scale-up activities, process transfer to manufacturing, and ongoing production support."
  },
  
  regulatory_success: {
    response: "Abhilash achieved TGA license approval on first audit with zero major findings when he led line establishment at Lifespace Group - he was the primary presenter during the audit. That regulatory success mindset carries through all his work."
  },
  
  // Specific Projects
  project_banksia: {
    response: "Project Banksia was a large-scale capital program at CSL Seqirus to establish GMP-compliant vaccine manufacturing. Abhilash was the primary technical authority for technology transfer, successfully transferring flu cell culture and PNS product portfolio."
  },
  
  tga_achievement: {
    response: "At Lifespace Group, Abhilash led the establishment of tablet manufacturing and sachet packing lines. His major achievement was achieving TGA license approval on first audit with zero major findings - he was the primary presenter during the audit."
  },
  
  // Personal
  location: {
    response: "Abhilash is based in Australia. He's currently with CSL Seqirus but open to opportunities. For questions about work arrangements or relocation, connecting with him directly would be best."
  },
  
  contact: {
    response: "You can reach Abhilash at abhilash333naidu@gmail.com or connect on LinkedIn (linkedin.com/in/abhilashpaspulati/). He's responsive to messages and open to discussing opportunities."
  },
  
  availability: {
    response: "Abhilash is currently employed at CSL Seqirus but open to the right opportunities, particularly in engineering management, technology transfer, quality/regulatory leadership. Best to reach out directly at abhilash333naidu@gmail.com."
  }
};

// ============================================
// Clarification Responses (Misconceptions)
// ============================================
export const clarificationResponses = {
  is_he_pm: {
    response: "Abhilash is an Engineering Manager, not a Product Manager by title. That said, his experience includes significant product development work - he's led NPD/NPI programs from concept through commercialization, managed cross-functional teams, and delivered products to regulatory approval."
  },
  
  ai_ml_experience: {
    response: "Abhilash's professional background is in engineering management and GMP manufacturing, not AI/ML product development. However, he's been teaching himself AI/ML concepts and building personal projects - websites and apps - to solve problems he encounters."
  },
  
  team_leadership: {
    response: "Abhilash has led cross-functional project teams coordinating across engineering, quality, validation, and operations. He's acted as technical lead on major programs like Project Banksia and TGA line establishment."
  },
  
  defence_experience: {
    response: "Abhilash doesn't have defence sector experience. His background is in pharmaceutical and biopharmaceutical manufacturing in regulated GMP environments. If you're looking for experience navigating complex regulatory frameworks, he has that in spades."
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
  
  recommended: "That's a great conversation to have with Abhilash directly - he can give you much more depth than I can. Want his contact info?",
  
  organic: "It sounds like you're seriously evaluating fit. Abhilash would be the best person to discuss this in detail. Want me to share his contact info?",
  
  with_context: (topic: string) => 
    `Based on your interest in ${topic}, connecting directly with Abhilash would be valuable. His email is abhilash333naidu@gmail.com.`
};

// ============================================
// Edge Case Responses
// ============================================
export const edgeCaseResponses = {
  testing_bot: [
    "I'm an AI assistant helping you learn about Abhilash's background and experience. I'm here to be useful - what would you like to know about his work?",
    "Yes, I'm an AI assistant here to help you learn about Abhilash. What questions do you have about his background?"
  ],
  
  inappropriate: [
    "I'm here to discuss Abhilash's professional experience. What would you like to know about his engineering management background?",
    "I can help you learn about Abhilash's professional background. What are you interested in?"
  ],
  
  frustrated_visitor: [
    "I apologize if I'm not addressing what you need. Can you help me understand what specific information would be most valuable? Or I can connect you directly with Abhilash at abhilash333naidu@gmail.com.",
    "I want to make sure I'm helpful. What specifically are you looking to learn about Abhilash?"
  ],
  
  off_topic: [
    "I'm here to help you learn about Abhilash's professional background. What would you like to know about his engineering management experience?",
    "I can share information about Abhilash's work in pharmaceutical manufacturing. What interests you?"
  ],
  
  unknown: [
    "I'm not sure I have specific information about that. I can tell you about Abhilash's engineering management experience, technology transfer work, or how to connect with him. What would be most helpful?",
    "I don't have details on that specifically. Would you like to hear about his current role at CSL Seqirus, previous experience, or contact information?"
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
