// ============================================
// Bot v4.0 TypeScript Definitions
// ============================================

export interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  intent?: string;
  confidence?: number;
  analyticsTag?: string;
}

export interface ProcessedInput {
  original: string;
  normalized: string;
  tokens: string[];
  intent: DetectedIntent;
  confidence: number;
  isFollowUp: boolean;
  referencedTopics: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
  isShortInput: boolean;
}

export interface DetectedIntent {
  category: IntentCategory;
  subcategory: string;
  specificTopic?: string;
  requiresKnowledgeBase: boolean;
}

export type IntentCategory = 
  | 'greeting' 
  | 'small_talk' 
  | 'information_seeking' 
  | 'clarification' 
  | 'action_request' 
  | 'sentiment_expression' 
  | 'handoff_request' 
  | 'off_topic'
  | 'unknown';

export interface TopicEntry {
  topic: string;
  firstMentioned: Date;
  mentionCount: number;
  detailsShared: string[];
  userFollowUpQuestions: string[];
}

export interface ConversationMemory {
  sessionId: string;
  startTime: Date;
  messages: Message[];
  topicsDiscussed: Record<string, TopicEntry>;
  userInterests: string[];
  currentTopic: string | null;
  questionDepth: number;
  conversationPhase: ConversationPhase;
  userType: 'recruiter' | 'peer' | 'curious_visitor' | 'unknown';
  mentionedIntent: string[];
  handoffAttempts: number;
  lastHandoffSuggestion: Date | null;
  sentimentHistory: ('positive' | 'neutral' | 'negative')[];
  frustrationSignals: number;
}

export type ConversationPhase = 'opening' | 'exploring' | 'deep_dive' | 'closing';

export interface ResponseStrategy {
  type: 'direct_answer' | 'clarifying_question' | 'natural_transition' | 'handoff_suggestion';
  templateCategory: string;
  tone: 'warm' | 'professional' | 'enthusiastic' | 'helpful';
  length: 'brief' | 'standard' | 'detailed';
}

export interface AnalyticsData {
  sessionId: string;
  entryPoint: string;
  path: string[];
  exitPoint: string;
  messagesBeforeDrop: number;
  lastTopic: string;
  lastIntent: string;
  confidenceAtDrop: number;
  handoffTriggered: boolean;
  handoffType?: 'immediate' | 'recommended' | 'organic';
  handoffSuccess: boolean;
  messagesToHandoff: number;
  topicDepth: Record<string, number>;
  clarificationRequests: number;
  sentimentTrend: ('positive' | 'neutral' | 'negative')[];
  avgProcessingTime: number;
  timestamp: Date;
}

export interface IntentPattern {
  category: IntentCategory;
  subcategory: string;
  keywords: string[];
  priority: number;
  requiresExactMatch?: boolean;
}

export interface BotError {
  type: 'INTENT_UNKNOWN' | 'CONTEXT_LOST' | 'RESPONSE_GENERATION_FAILED' | 'INVALID_INPUT';
  message: string;
  originalInput?: string;
  timestamp: Date;
}

export interface UserProfile {
  type: 'recruiter' | 'peer' | 'curious_visitor' | 'unknown';
  interests: string[];
  intent: string[];
  seniority?: 'entry' | 'mid' | 'senior' | 'executive';
}

export interface ConversationMetrics {
  startTime: Date;
  messageCount: number;
  topicSwitches: number;
  avgResponseConfidence: number;
  clarificationCount: number;
  handoffSuggestions: number;
}
