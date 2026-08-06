// ============================================
// Bot v4.0 Input Processor (NLU Engine)
// ============================================

import { ProcessedInput, DetectedIntent, IntentCategory, BotError } from './types';

// ============================================
// Synonym Mappings
// ============================================
const synonyms: Record<string, string[]> = {
  'tech transfer': ['technology transfer', 'process transfer', 'knowledge transfer'],
  'gmp': ['good manufacturing practice', 'compliance', 'regulatory'],
  'tga': ['therapeutic goods administration', 'audit', 'regulatory approval'],
  'npd': ['new product development', 'product development'],
  'npi': ['new product introduction', 'product introduction'],
  'qtpp': ['quality target product profile'],
  'cpp': ['critical process parameters'],
  'cqa': ['critical quality attributes'],
  'pm': ['product manager', 'project manager'],
  'engineering manager': ['engineering management', 'eng manager']
};

// ============================================
// Negation Words
// ============================================
const negationWords = ['not', 'no', 'never', 'nothing', "don't", "doesn't", "isn't", "aren't", "wasn't", "weren't"];

// ============================================
// Short Input Detection
// ============================================
const shortInputs = ['ok', 'okay', 'cool', 'hmm', 'uh', 'ah', 'oh', 'yeah', 'yep', 'nope', 'nah', 'sure', 'right', 'k', 'mkay', 'yup'];

// ============================================
// Intent Patterns
// ============================================
const intentPatterns: Array<{
  category: IntentCategory;
  subcategory: string;
  keywords: string[];
  priority: number;
  contextKeywords?: string[];
}> = [
  // Greetings (Priority 10 - highest)
  { category: 'greeting', subcategory: 'greeting', keywords: ['hi', 'hello', 'hey', 'howdy', 'greetings', 'hola', 'bonjour'], priority: 10 },
  { category: 'greeting', subcategory: 'time_based', keywords: ['good morning', 'good afternoon', 'good evening', 'good day'], priority: 10 },
  
  // Small Talk (Priority 9)
  { category: 'small_talk', subcategory: 'how_are_you', keywords: ['how are you', 'how is it going', 'how are things', 'what is up', 'how do you do'], priority: 9 },
  { category: 'small_talk', subcategory: 'can_you_help', keywords: ['can you help', 'help me', 'i need help', 'can you assist', 'assist me'], priority: 9 },
  { category: 'small_talk', subcategory: 'thanks', keywords: ['thanks', 'thank you', 'appreciate it', 'cheers', 'grateful'], priority: 9 },
  { category: 'small_talk', subcategory: 'goodbye', keywords: ['bye', 'goodbye', 'see you', 'talk later', 'gotta go', 'catch you later'], priority: 9 },
  
  // Identity & Background (Priority 8)
  { category: 'information_seeking', subcategory: 'who_is_he', keywords: ['who is', 'tell me about', 'background', 'introduce', 'who is abhilash', 'about abhilash'], priority: 8 },
  { category: 'information_seeking', subcategory: 'what_does_he_do', keywords: ['what does he do', 'current role', 'day to day', 'responsibilities', 'what is his job'], priority: 8 },
  { category: 'information_seeking', subcategory: 'experience_overview', keywords: ['experience', 'career', 'work history', 'background', 'professional history'], priority: 8 },
  
  // Technical Expertise (Priority 8)
  { category: 'information_seeking', subcategory: 'technology_transfer', keywords: ['tech transfer', 'technology transfer', 'process transfer', 'transferring processes'], priority: 8 },
  { category: 'information_seeking', subcategory: 'gmp_compliance', keywords: ['gmp', 'compliance', 'regulatory', 'good manufacturing', 'validation'], priority: 8 },
  { category: 'information_seeking', subcategory: 'product_development', keywords: ['product development', 'npd', 'npi', 'new product', 'commercialization'], priority: 8 },
  { category: 'information_seeking', subcategory: 'regulatory_success', keywords: ['tga', 'audit', 'regulatory approval', 'inspection', 'license approval'], priority: 8 },
  
  // Specific Projects (Priority 7)
  { category: 'information_seeking', subcategory: 'project_banksia', keywords: ['banksia', 'vaccine project', 'csl project', 'seqirus project'], priority: 7 },
  { category: 'information_seeking', subcategory: 'tga_achievement', keywords: ['tga audit', 'lifespace audit', 'zero findings', 'first audit'], priority: 7 },
  
  // Personal (Priority 7)
  { category: 'information_seeking', subcategory: 'location', keywords: ['where', 'location', 'based', 'live', 'city', 'country', 'located'], priority: 7 },
  { category: 'information_seeking', subcategory: 'contact', keywords: ['contact', 'email', 'reach', 'connect', 'get in touch', 'phone', 'linkedin'], priority: 7 },
  { category: 'information_seeking', subcategory: 'availability', keywords: ['available', 'open to work', 'hiring', 'opportunities', 'looking for'], priority: 7 },
  
  // Clarifications (Priority 6)
  { category: 'clarification', subcategory: 'is_he_pm', keywords: ['product manager', 'pm role', 'project manager', 'pm by title'], priority: 6 },
  { category: 'clarification', subcategory: 'ai_ml_experience', keywords: ['ai', 'machine learning', 'ml', 'data science', 'artificial intelligence'], priority: 6 },
  { category: 'clarification', subcategory: 'team_leadership', keywords: ['lead teams', 'manage people', 'leadership', 'manage staff', 'team size'], priority: 6 },
  { category: 'clarification', subcategory: 'defence_experience', keywords: ['defence', 'defense', 'military', 'defence sector', 'aerospace'], priority: 6 },
  
  // Clarification Requests (Priority 5)
  { category: 'clarification', subcategory: 'tell_me_more', keywords: ['tell me more', 'elaborate', 'explain', 'go deeper', 'more details'], priority: 5 },
  { category: 'clarification', subcategory: 'what_do_you_mean', keywords: ['what do you mean', 'i do not understand', 'confused', 'clarify'], priority: 5 },
  
  // Action Requests (Priority 6)
  { category: 'action_request', subcategory: 'connect', keywords: ['connect me', 'introduce me', 'put me in touch', 'set up a call'], priority: 6 },
  { category: 'action_request', subcategory: 'send_email', keywords: ['send email', 'email him', 'message him', 'reach out'], priority: 6 },
  
  // Handoff Requests (Priority 10 - immediate)
  { category: 'handoff_request', subcategory: 'human_request', keywords: ['human', 'operator', 'speak to someone', 'talk to a person', 'real person', 'representative'], priority: 10 },
  { category: 'handoff_request', subcategory: 'email_request', keywords: ['email abhilash', 'contact abhilash directly', 'talk to abhilash', 'speak with abhilash'], priority: 10 },
  
  // Sentiment (Priority 4)
  { category: 'sentiment_expression', subcategory: 'positive', keywords: ['great', 'awesome', 'excellent', 'impressive', 'fantastic', 'amazing'], priority: 4 },
  { category: 'sentiment_expression', subcategory: 'negative', keywords: ['bad', 'terrible', 'awful', 'horrible', 'useless', 'not helpful'], priority: 4 },
  
  // Edge Cases (Priority 8)
  { category: 'off_topic', subcategory: 'testing_bot', keywords: ['are you a bot', 'are you ai', 'are you real', 'prove', 'test'], priority: 8 },
  { category: 'off_topic', subcategory: 'math_question', keywords: ['2+2', 'calculate', 'math', 'what is 2', 'solve'], priority: 8 },
];

// ============================================
// Input Normalization
// ============================================
function normalizeInput(input: string): string {
  return input
    .toLowerCase()
    .replace(/[.,!?;:]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// ============================================
// Tokenization
// ============================================
function tokenize(input: string): string[] {
  return input.split(' ').filter(token => token.length > 0);
}

// ============================================
// Synonym Expansion
// ============================================
function expandWithSynonyms(tokens: string[]): string[] {
  const expanded = [...tokens];
  
  for (const [key, values] of Object.entries(synonyms)) {
    // Check if any token matches the key or its synonyms
    const hasMatch = tokens.some(token => 
      key.includes(token) || values.some(v => v.includes(token))
    );
    
    if (hasMatch) {
      expanded.push(key, ...values);
    }
  }
  
  return [...new Set(expanded)]; // Remove duplicates
}

// ============================================
// Negation Detection
// ============================================
function hasNegation(tokens: string[]): boolean {
  return tokens.some(token => negationWords.includes(token));
}

// ============================================
// Short Input Detection
// ============================================
function isShortInput(input: string): boolean {
  const normalized = input.toLowerCase().trim();
  return shortInputs.includes(normalized) || input.length < 10;
}

// ============================================
// Sentiment Analysis (Basic)
// ============================================
function analyzeSentiment(tokens: string[]): 'positive' | 'neutral' | 'negative' {
  const positiveWords = ['great', 'awesome', 'excellent', 'good', 'nice', 'love', 'like', 'impressive', 'fantastic', 'amazing', 'perfect', 'thanks', 'thank'];
  const negativeWords = ['bad', 'terrible', 'awful', 'horrible', 'hate', 'useless', 'not helpful', 'stupid', 'annoying', 'frustrating', 'worst', 'sucks'];
  
  let score = 0;
  
  tokens.forEach(token => {
    if (positiveWords.includes(token)) score++;
    if (negativeWords.includes(token)) score--;
  });
  
  if (score > 0) return 'positive';
  if (score < 0) return 'negative';
  return 'neutral';
}

// ============================================
// Follow-up Detection
// ============================================
function isFollowUpQuestion(input: string): boolean {
  const followUpIndicators = [
    'what about',
    'how about',
    'tell me about',
    'and',
    'also',
    'what else',
    'anything else',
    'more about',
    'that',
    'it',
    'he',
    'his'
  ];
  
  const normalized = input.toLowerCase();
  return followUpIndicators.some(indicator => normalized.includes(indicator));
}

// ============================================
// Topic Reference Extraction
// ============================================
function extractReferencedTopics(input: string): string[] {
  const topicReferences: Record<string, string[]> = {
    'technology_transfer': ['tech transfer', 'that transfer', 'the transfer', 'it'],
    'gmp_compliance': ['gmp', 'that compliance', 'the compliance', 'regulatory'],
    'project_banksia': ['banksia', 'that project', 'the project', 'vaccine project'],
    'tga_achievement': ['tga', 'that audit', 'the audit', 'approval'],
    'work_experience': ['his work', 'his experience', 'his background', 'he', 'him'],
    'contact': ['contact', 'email', 'reach', 'him', 'abhilash']
  };
  
  const normalized = input.toLowerCase();
  const referenced: string[] = [];
  
  for (const [topic, indicators] of Object.entries(topicReferences)) {
    if (indicators.some(ind => normalized.includes(ind))) {
      referenced.push(topic);
    }
  }
  
  return referenced;
}

// ============================================
// Levenshtein Distance (Fuzzy Matching)
// ============================================
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[b.length][a.length];
}

// ============================================
// Fuzzy Match Check
// ============================================
function isFuzzyMatch(input: string, keyword: string, maxDistance: number = 2): boolean {
  const distance = levenshteinDistance(input, keyword);
  return distance <= maxDistance && distance > 0;
}

// ============================================
// Intent Classification
// ============================================
function classifyIntent(
  tokens: string[],
  normalizedInput: string,
  isFollowUp: boolean,
  referencedTopics: string[]
): { intent: DetectedIntent; confidence: number } {
  let bestMatch: { pattern: typeof intentPatterns[0]; score: number } | null = null;
  
  for (const pattern of intentPatterns) {
    let score = 0;
    let hasExactMatch = false;
    let hasFuzzyMatch = false;
    
    // Check for exact keyword matches
    for (const keyword of pattern.keywords) {
      if (normalizedInput.includes(keyword)) {
        score += 0.4;
        hasExactMatch = true;
      }
      
      // Check tokens for exact matches
      if (tokens.some(token => token === keyword || keyword.includes(token))) {
        score += 0.3;
        hasExactMatch = true;
      }
    }
    
    // Check for fuzzy matches (typos)
    if (!hasExactMatch) {
      for (const keyword of pattern.keywords) {
        if (tokens.some(token => isFuzzyMatch(token, keyword))) {
          score += 0.15;
          hasFuzzyMatch = true;
        }
      }
    }
    
    // Context boost if related to current conversation
    if (isFollowUp && referencedTopics.length > 0) {
      score += 0.2;
    }
    
    // Priority boost
    score += pattern.priority * 0.02;
    
    // Check if this is the best match so far
    if (!bestMatch || score > bestMatch.score) {
      bestMatch = { pattern, score };
    }
  }
  
  if (!bestMatch || bestMatch.score < 0.3) {
    return {
      intent: {
        category: 'unknown',
        subcategory: 'unknown',
        requiresKnowledgeBase: false
      },
      confidence: bestMatch?.score || 0
    };
  }
  
  return {
    intent: {
      category: bestMatch.pattern.category,
      subcategory: bestMatch.pattern.subcategory,
      specificTopic: referencedTopics[0] || undefined,
      requiresKnowledgeBase: bestMatch.pattern.category === 'information_seeking'
    },
    confidence: Math.min(bestMatch.score, 1.0)
  };
}

// ============================================
// Main Input Processing Function
// ============================================
export function processInput(
  input: string,
  previousMessages: string[] = []
): ProcessedInput {
  try {
    // Normalize input
    const normalized = normalizeInput(input);
    
    // Tokenize
    let tokens = tokenize(normalized);
    
    // Expand with synonyms
    tokens = expandWithSynonyms(tokens);
    
    // Detect follow-up
    const isFollowUp = isFollowUpQuestion(input) || previousMessages.length > 0;
    
    // Extract referenced topics
    const referencedTopics = extractReferencedTopics(input);
    
    // Analyze sentiment
    const sentiment = analyzeSentiment(tokens);
    
    // Detect short input
    const isShort = isShortInput(input);
    
    // Classify intent
    const { intent, confidence } = classifyIntent(tokens, normalized, isFollowUp, referencedTopics);
    
    // Apply negation penalty
    let finalConfidence = confidence;
    if (hasNegation(tokens) && intent.category === 'information_seeking') {
      finalConfidence *= 0.5;
    }
    
    return {
      original: input,
      normalized,
      tokens,
      intent,
      confidence: finalConfidence,
      isFollowUp,
      referencedTopics,
      sentiment,
      isShortInput: isShort
    };
    
  } catch (error) {
    // Log error and return safe fallback
    console.error('Input processing error:', error);
    
    return {
      original: input,
      normalized: input.toLowerCase(),
      tokens: [input],
      intent: {
        category: 'unknown',
        subcategory: 'processing_error',
        requiresKnowledgeBase: false
      },
      confidence: 0,
      isFollowUp: false,
      referencedTopics: [],
      sentiment: 'neutral',
      isShortInput: isShortInput(input)
    };
  }
}

// ============================================
// Export Helpers
// ============================================
export {
  normalizeInput,
  tokenize,
  expandWithSynonyms,
  hasNegation,
  isShortInput,
  analyzeSentiment,
  isFollowUpQuestion,
  extractReferencedTopics,
  levenshteinDistance,
  isFuzzyMatch,
  classifyIntent,
  intentPatterns
};
