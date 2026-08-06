// ============================================
// Bot v4.0 Response Generator
// ============================================

import { ProcessedInput, ConversationMemory, ResponseStrategy, BotError } from './types';
import {
  getGreetingResponse,
  getSmallTalkResponse,
  getClarifyingQuestion,
  getInformationResponse,
  getNaturalTransition,
  getEdgeCaseResponse,
  truncateResponse,
  handoffMessages,
  naturalTransitions,
  informationResponses,
  clarificationResponses
} from './responseTemplates';
import {
  getTopicDepth,
  hasTopicBeenDiscussed,
  getPreviousTopics,
  detectConversationPhase,
  shouldSuggestHandoff,
  recordHandoffAttempt
} from './ContextManager';

// ============================================
// Determine Response Strategy
// ============================================
function determineResponseStrategy(
  input: ProcessedInput,
  memory: ConversationMemory
): ResponseStrategy {
  // Check for handoff first
  if (input.intent.category === 'handoff_request') {
    return {
      type: 'handoff_suggestion',
      templateCategory: 'immediate',
      tone: 'professional',
      length: 'brief'
    };
  }
  
  // Check if we should suggest handoff organically
  const handoffCheck = shouldSuggestHandoff(memory);
  if (handoffCheck.shouldHandoff && input.intent.category === 'information_seeking') {
    return {
      type: 'handoff_suggestion',
      templateCategory: handoffCheck.type || 'recommended',
      tone: 'professional',
      length: 'standard'
    };
  }
  
  // Low confidence - ask clarifying question
  if (input.confidence < 0.6 || input.isShortInput) {
    return {
      type: 'clarifying_question',
      templateCategory: input.isShortInput ? 'short_response' : 'vague_interest',
      tone: 'helpful',
      length: 'standard'
    };
  }
  
  // Determine based on intent category
  switch (input.intent.category) {
    case 'greeting':
      return {
        type: 'direct_answer',
        templateCategory: 'greeting',
        tone: 'warm',
        length: 'brief'
      };
      
    case 'small_talk':
      return {
        type: 'direct_answer',
        templateCategory: input.intent.subcategory,
        tone: 'warm',
        length: 'brief'
      };
      
    case 'information_seeking':
      const depth = getTopicDepth(memory, input.intent.subcategory);
      return {
        type: 'direct_answer',
        templateCategory: input.intent.subcategory,
        tone: 'professional',
        length: depth === 0 ? 'brief' : depth === 1 ? 'standard' : 'detailed'
      };
      
    case 'clarification':
      return {
        type: 'direct_answer',
        templateCategory: input.intent.subcategory,
        tone: 'helpful',
        length: 'standard'
      };
      
    case 'off_topic':
      return {
        type: 'clarifying_question',
        templateCategory: 'off_topic',
        tone: 'professional',
        length: 'brief'
      };
      
    default:
      return {
        type: 'clarifying_question',
        templateCategory: 'unclear_request',
        tone: 'helpful',
        length: 'standard'
      };
  }
}

// ============================================
// Generate Base Response
// ============================================
function generateBaseResponse(
  strategy: ResponseStrategy,
  input: ProcessedInput,
  memory: ConversationMemory
): string {
  switch (strategy.type) {
    case 'direct_answer':
      return generateDirectResponse(strategy, input, memory);
      
    case 'clarifying_question':
      return generateClarifyingResponse(strategy);
      
    case 'handoff_suggestion':
      return generateHandoffResponse(strategy, input, memory);
      
    case 'natural_transition':
      return getNaturalTransition('after_answer');
      
    default:
      return getClarifyingQuestion('unclear_request');
  }
}

// ============================================
// Generate Direct Response
// ============================================
function generateDirectResponse(
  strategy: ResponseStrategy,
  input: ProcessedInput,
  memory: ConversationMemory
): string {
  const { templateCategory } = strategy;
  
  // Handle greetings
  if (templateCategory === 'greeting') {
    return getGreetingResponse();
  }
  
  // Handle small talk
  if (['how_are_you', 'can_you_help', 'thanks', 'goodbye'].includes(templateCategory)) {
    return getSmallTalkResponse(templateCategory as any);
  }
  
  // Handle information seeking
  if (input.intent.category === 'information_seeking') {
    const depth = getTopicDepth(memory, templateCategory);
    return getInformationResponse(templateCategory, depth);
  }
  
  // Handle clarifications
  if (input.intent.category === 'clarification') {
    const clarificationResponse = (clarificationResponses as Record<string, { response: string }>)[templateCategory];
    if (clarificationResponse) {
      return clarificationResponse.response;
    }
  }
  
  // Handle edge cases
  if (input.intent.category === 'off_topic') {
    return getEdgeCaseResponse('off_topic');
  }
  
  // Fallback
  return getClarifyingQuestion('vague_interest');
}

// ============================================
// Generate Clarifying Response
// ============================================
function generateClarifyingResponse(strategy: ResponseStrategy): string {
  const { templateCategory } = strategy;
  
  if (templateCategory === 'short_response') {
    return getClarifyingQuestion('short_response');
  }
  
  return getClarifyingQuestion('vague_interest');
}

// ============================================
// Generate Handoff Response
// ============================================
function generateHandoffResponse(
  strategy: ResponseStrategy,
  input: ProcessedInput,
  memory: ConversationMemory
): string {
  const { templateCategory } = strategy;
  
  // Immediate handoff
  if (templateCategory === 'immediate') {
    return handoffMessages.immediate;
  }
  
  // Recommended handoff
  if (templateCategory === 'recommended') {
    return handoffMessages.recommended;
  }
  
  // Organic handoff with context
  if (memory.currentTopic) {
    return handoffMessages.with_context(memory.currentTopic);
  }
  
  return handoffMessages.organic;
}

// ============================================
// Add Context References
// ============================================
function addContextReferences(
  response: string,
  input: ProcessedInput,
  memory: ConversationMemory
): string {
  // Don't add references to short responses or greetings
  if (response.length < 50 || input.intent.category === 'greeting') {
    return response;
  }
  
  // Check if we should reference a previous topic
  const previousTopics = getPreviousTopics(memory, 3);
  const currentTopic = memory.currentTopic;
  
  // Don't reference the current topic itself
  const topicsToReference = previousTopics.filter(t => t !== currentTopic);
  
  if (topicsToReference.length > 0 && Math.random() > 0.5) {
    const referenceTopic = topicsToReference[0];
    
    // Create natural reference based on topic
    const references: Record<string, string> = {
      'technology_transfer': 'Building on his tech transfer expertise, ',
      'gmp_compliance': 'As mentioned about his GMP experience, ',
      'project_banksia': 'Regarding Project Banksia, ',
      'tga_achievement': 'As I shared about his TGA audit success, ',
      'work_experience': 'Drawing from his experience, ',
      'contact': 'To connect with him, '
    };
    
    const reference = references[referenceTopic];
    if (reference && !response.toLowerCase().includes(reference.toLowerCase())) {
      // Insert at beginning if it makes sense
      if (!response.startsWith('Abhilash') && !response.startsWith('He')) {
        response = reference + response.charAt(0).toLowerCase() + response.slice(1);
      }
    }
  }
  
  return response;
}

// ============================================
// Add Follow-up Suggestion
// ============================================
function addFollowUpSuggestion(
  response: string,
  input: ProcessedInput,
  memory: ConversationMemory
): string {
  // Don't add follow-up to certain response types
  if (input.intent.category === 'handoff_request' ||
      input.intent.subcategory === 'goodbye' ||
      response.includes('abhilash333naidu@gmail.com')) {
    return response;
  }

  // Check if we already have a question
  if (response.includes('?')) {
    return response;
  }

  // Smart Contextual Follow-ups
  const relatedTopics: Record<string, string[]> = {
    'project_banksia': ['technology transfer work', 'GMP compliance experience'],
    'technology_transfer': ['Project Banksia role', 'regulatory success'],
    'gmp_compliance': ['TGA audit achievements', 'regulatory experience'],
    'tga_achievement': ['GMP compliance background', 'experience overview'],
    'experience_overview': ['Project Banksia', 'technology transfer expertise'],
    'product_development': ['experience overview', 'tech transfer skills'],
    'regulatory_success': ['TGA achievements', 'GMP compliance'],
    'who_is_he': ['experience overview', 'current role'],
    'what_does_he_do': ['Project Banksia', 'technology transfer'],
    'contact': ['professional background', 'availability']
  };

  const currentIntent = input.intent.subcategory;

  // Suggest related topic if available
  if (relatedTopics[currentIntent] && Math.random() > 0.3) {
    const suggestions = relatedTopics[currentIntent];
    const suggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

    const transitions = [
      ` Would you be interested in hearing about his ${suggestion}?`,
      ` Shall I tell you about his ${suggestion} as well?`,
      ` I can also share details about his ${suggestion} if you like.`
    ];

    return response + transitions[Math.floor(Math.random() * transitions.length)];
  }

  // Add follow-up based on conversation phase
  const phase = detectConversationPhase(memory);

  if (phase === 'opening') {
    return response + ' What would you like to know?';
  }

  if (phase === 'exploring' && Object.keys(memory.topicsDiscussed).length > 1) {
    const otherTopics = Object.keys(memory.topicsDiscussed)
      .filter(t => t !== memory.currentTopic)
      .slice(0, 2);

    if (otherTopics.length > 0) {
      return response + ` Would you also like to hear about ${otherTopics.join(' or ')}?`;
    }
  }

  if (phase === 'deep_dive') {
    return response + ' Does that help with what you were looking for?';
  }

  // Default follow-up
  const defaultFollowUps = [
    ' What else can I share?',
    ' Anything else you would like to know?',
    ' What other questions do you have?'
  ];

  return response + defaultFollowUps[Math.floor(Math.random() * defaultFollowUps.length)];
}

// ============================================
// Enforce Third-Person Rule
// ============================================
function enforceThirdPerson(content: string): string {
  const prohibitedPatterns = [
    { pattern: /\bi have\b/gi, replacement: 'Abhilash has' },
    { pattern: /\bi am\b/gi, replacement: 'Abhilash is' },
    { pattern: /\bi'm\b/gi, replacement: 'Abhilash is' },
    { pattern: /\bi work\b/gi, replacement: 'Abhilash works' },
    { pattern: /\bi worked\b/gi, replacement: 'Abhilash worked' },
    { pattern: /\bi led\b/gi, replacement: 'Abhilash led' },
    { pattern: /\bi specialize\b/gi, replacement: 'Abhilash specializes' },
    { pattern: /\bi achieved\b/gi, replacement: 'Abhilash achieved' },
    { pattern: /\bmy experience\b/gi, replacement: "Abhilash's experience" },
    { pattern: /\bmy background\b/gi, replacement: "Abhilash's background" },
    { pattern: /\bmy role\b/gi, replacement: "Abhilash's role" },
    { pattern: /\bmy expertise\b/gi, replacement: "Abhilash's expertise" },
    { pattern: /\bmy work\b/gi, replacement: "Abhilash's work" },
    { pattern: /\bmy career\b/gi, replacement: "Abhilash's career" }
  ];
  
  let processed = content;
  for (const { pattern, replacement } of prohibitedPatterns) {
    processed = processed.replace(pattern, replacement);
  }
  
  return processed;
}

// ============================================
// Personalize Response
// ============================================
function personalizeResponse(
  response: string,
  input: ProcessedInput,
  memory: ConversationMemory
): string {
  // Enforce third-person
  response = enforceThirdPerson(response);
  
  // Add context references
  response = addContextReferences(response, input, memory);
  
  // Add follow-up suggestion
  response = addFollowUpSuggestion(response, input, memory);
  
  return response;
}

// ============================================
// Main Response Generation Function
// ============================================
export function generateResponse(
  input: ProcessedInput,
  memory: ConversationMemory
): { responses: string[]; analyticsTag: string; shouldRecordHandoff: boolean } {
  try {
    // Determine strategy
    const strategy = determineResponseStrategy(input, memory);
    
    // Generate base response
    let response = generateBaseResponse(strategy, input, memory);
    
    // Personalize response
    response = personalizeResponse(response, input, memory);
    
    // Truncate if necessary (max 200 chars per message)
    const responses = truncateResponse(response, 200);
    
    // Determine analytics tag
    let analyticsTag = `${input.intent.category}_${input.intent.subcategory}`;
    if (strategy.type === 'clarifying_question') {
      analyticsTag = 'clarification_requested';
    } else if (strategy.type === 'handoff_suggestion') {
      analyticsTag = `handoff_${strategy.templateCategory}`;
    }
    
    // Check if we should record handoff
    const shouldRecordHandoff = strategy.type === 'handoff_suggestion';
    
    return {
      responses,
      analyticsTag,
      shouldRecordHandoff
    };
    
  } catch (error) {
    // Log error
    console.error('Response generation error:', error);
    
    // Return safe fallback
    return {
      responses: ["I apologize, I'm having trouble with that. Could you rephrase your question?"],
      analyticsTag: 'error_fallback',
      shouldRecordHandoff: false
    };
  }
}

// ============================================
// Handle Error Recovery
// ============================================
export function handleError(error: BotError): string[] {
  console.error('Bot error:', error);
  
  const recoveryResponses: Record<string, string> = {
    'INTENT_UNKNOWN': "I want to make sure I understand. Could you tell me what you're most interested in learning about Abhilash?",
    'CONTEXT_LOST': "I'm not sure I follow. Are you asking about Abhilash's current role, past experience, or how to connect?",
    'RESPONSE_GENERATION_FAILED': "I apologize, I'm having trouble with that. You can reach Abhilash directly at abhilash333naidu@gmail.com.",
    'INVALID_INPUT': "I didn't quite catch that. Could you rephrase your question about Abhilash's background?"
  };
  
  const response = recoveryResponses[error.type] || recoveryResponses['INVALID_INPUT'];
  return truncateResponse(response, 200);
}

// ============================================
// Export Functions
// ============================================
export {
  determineResponseStrategy,
  generateBaseResponse,
  addContextReferences,
  addFollowUpSuggestion,
  enforceThirdPerson,
  personalizeResponse
};
