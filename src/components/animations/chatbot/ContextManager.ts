// ============================================
// Bot v4.0 Context Manager (Conversation Memory)
// ============================================

import { ConversationMemory, Message, TopicEntry, ConversationPhase, UserProfile, ConversationMetrics } from './types';

// ============================================
// Constants
// ============================================
const MAX_MESSAGE_HISTORY = 20;
const MAX_TOPICS_TRACKED = 10;
const DEEP_DIVE_THRESHOLD = 3; // Number of questions on same topic
const EXPLORING_THRESHOLD = 3; // Number of topic switches

// ============================================
// Initialize New Conversation
// ============================================
export function initializeConversation(): ConversationMemory {
  return {
    sessionId: generateSessionId(),
    startTime: new Date(),
    messages: [],
    topicsDiscussed: {},
    userInterests: [],
    currentTopic: null,
    questionDepth: 0,
    conversationPhase: 'opening',
    userType: 'unknown',
    mentionedIntent: [],
    handoffAttempts: 0,
    lastHandoffSuggestion: null,
    sentimentHistory: [],
    frustrationSignals: 0
  };
}

// ============================================
// Generate Unique Session ID
// ============================================
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// ============================================
// Add Message to History
// ============================================
export function addMessage(
  memory: ConversationMemory,
  message: Message
): ConversationMemory {
  const updatedMessages = [...memory.messages, message];
  
  // Keep only last MAX_MESSAGE_HISTORY messages
  if (updatedMessages.length > MAX_MESSAGE_HISTORY) {
    updatedMessages.shift();
  }
  
  return {
    ...memory,
    messages: updatedMessages
  };
}

// ============================================
// Track Topic
// ============================================
export function trackTopic(
  memory: ConversationMemory,
  topic: string,
  details?: string
): ConversationMemory {
  const now = new Date();
  const existingTopic = memory.topicsDiscussed[topic];

  if (existingTopic) {
    // Update existing topic
    const updatedTopic: TopicEntry = {
      ...existingTopic,
      mentionCount: existingTopic.mentionCount + 1,
      detailsShared: details
        ? [...existingTopic.detailsShared, details].slice(0, 5)
        : existingTopic.detailsShared
    };

    const updatedTopics = { ...memory.topicsDiscussed, [topic]: updatedTopic };

    // Keep only MAX_TOPICS_TRACKED most discussed topics
    const entries = Object.entries(updatedTopics);
    entries.sort((a, b) => b[1].mentionCount - a[1].mentionCount);
    const sortedTopics: Record<string, TopicEntry> = {};
    entries.slice(0, MAX_TOPICS_TRACKED).forEach(([key, value]) => {
      sortedTopics[key] = value;
    });

    return {
      ...memory,
      topicsDiscussed: sortedTopics,
      currentTopic: topic,
      questionDepth: memory.currentTopic === topic
        ? memory.questionDepth + 1
        : 1
    };
  } else {
    // Add new topic
    const newTopic: TopicEntry = {
      topic,
      firstMentioned: now,
      mentionCount: 1,
      detailsShared: details ? [details] : [],
      userFollowUpQuestions: []
    };

    const updatedTopics = { ...memory.topicsDiscussed, [topic]: newTopic };

    // Keep only MAX_TOPICS_TRACKED most discussed topics
    const entries = Object.entries(updatedTopics);
    entries.sort((a, b) => b[1].mentionCount - a[1].mentionCount);
    const sortedTopics: Record<string, TopicEntry> = {};
    entries.slice(0, MAX_TOPICS_TRACKED).forEach(([key, value]) => {
      sortedTopics[key] = value;
    });

    return {
      ...memory,
      topicsDiscussed: sortedTopics,
      currentTopic: topic,
      questionDepth: 1
    };
  }
}

// ============================================
// Track User Question on Topic
// ============================================
export function trackUserQuestion(
  memory: ConversationMemory,
  topic: string,
  question: string
): ConversationMemory {
  const existingTopic = memory.topicsDiscussed[topic];

  if (existingTopic) {
    const updatedTopic: TopicEntry = {
      ...existingTopic,
      userFollowUpQuestions: [...existingTopic.userFollowUpQuestions, question].slice(0, 3)
    };

    return {
      ...memory,
      topicsDiscussed: { ...memory.topicsDiscussed, [topic]: updatedTopic }
    };
  }

  return memory;
}

// ============================================
// Detect User Type
// ============================================
export function detectUserType(
  memory: ConversationMemory,
  message: string
): ConversationMemory {
  const recruiterIndicators = [
    'hiring', 'role', 'position', 'job', 'candidate', 'interview', 
    'recruit', 'opportunity', 'opening', 'talent', 'apply'
  ];
  
  const peerIndicators = [
    'engineering', 'technical', 'gmp', 'tech transfer', 'manufacturing',
    'project', 'industry', 'regulatory', 'validation'
  ];
  
  const message_lower = message.toLowerCase();
  
  // Check for recruiter indicators
  const isRecruiter = recruiterIndicators.some(ind => message_lower.includes(ind));
  if (isRecruiter && memory.userType === 'unknown') {
    return {
      ...memory,
      userType: 'recruiter'
    };
  }
  
  // Check for peer indicators
  const isPeer = peerIndicators.some(ind => message_lower.includes(ind));
  if (isPeer && memory.userType === 'unknown') {
    return {
      ...memory,
      userType: 'peer'
    };
  }
  
  return memory;
}

// ============================================
// Track Sentiment
// ============================================
export function trackSentiment(
  memory: ConversationMemory,
  sentiment: 'positive' | 'neutral' | 'negative'
): ConversationMemory {
  const updatedHistory = [...memory.sentimentHistory, sentiment].slice(-10);
  
  // Track frustration signals
  let updatedFrustration = memory.frustrationSignals;
  if (sentiment === 'negative') {
    updatedFrustration++;
  }
  
  return {
    ...memory,
    sentimentHistory: updatedHistory,
    frustrationSignals: updatedFrustration
  };
}

// ============================================
// Detect Conversation Phase
// ============================================
export function detectConversationPhase(memory: ConversationMemory): ConversationPhase {
  const messageCount = memory.messages.length;
  const uniqueTopics = Object.keys(memory.topicsDiscussed).length;
  const avgDepth = calculateAverageTopicDepth(memory);
  
  // Opening phase
  if (messageCount <= 2) {
    return 'opening';
  }
  
  // Check for closing signals
  const lastMessages = memory.messages.slice(-3);
  const hasGoodbye = lastMessages.some(m => 
    m.content.toLowerCase().includes('bye') || 
    m.content.toLowerCase().includes('thank') && m.type === 'user'
  );
  
  if (hasGoodbye || memory.handoffAttempts > 0) {
    return 'closing';
  }
  
  // Deep dive phase
  if (avgDepth >= DEEP_DIVE_THRESHOLD) {
    return 'deep_dive';
  }
  
  // Exploring phase
  if (uniqueTopics >= EXPLORING_THRESHOLD) {
    return 'exploring';
  }
  
  return 'exploring';
}

// ============================================
// Calculate Average Topic Depth
// ============================================
function calculateAverageTopicDepth(memory: ConversationMemory): number {
  const topics = Object.values(memory.topicsDiscussed);
  if (topics.length === 0) return 0;

  let totalDepth = 0;
  for (const topic of topics) {
    totalDepth += topic.mentionCount;
  }

  return totalDepth / topics.length;
}

// ============================================
// Record Handoff Attempt
// ============================================
export function recordHandoffAttempt(
  memory: ConversationMemory
): ConversationMemory {
  return {
    ...memory,
    handoffAttempts: memory.handoffAttempts + 1,
    lastHandoffSuggestion: new Date()
  };
}

// ============================================
// Get Topic Depth
// ============================================
export function getTopicDepth(
  memory: ConversationMemory,
  topic: string
): number {
  const topicEntry = memory.topicsDiscussed[topic];
  return topicEntry ? topicEntry.mentionCount : 0;
}

// ============================================
// Has Topic Been Discussed
// ============================================
export function hasTopicBeenDiscussed(
  memory: ConversationMemory,
  topic: string
): boolean {
  return topic in memory.topicsDiscussed;
}

// ============================================
// Get Previous Topics (for natural references)
// ============================================
export function getPreviousTopics(
  memory: ConversationMemory,
  count: number = 3
): string[] {
  const topics = Object.entries(memory.topicsDiscussed);
  topics.sort((a, b) => new Date(b[1].firstMentioned).getTime() - new Date(a[1].firstMentioned).getTime());

  return topics.slice(0, count).map(([topic]) => topic);
}

// ============================================
// Get User Interests (Inferred)
// ============================================
export function getUserInterests(memory: ConversationMemory): string[] {
  // Infer interests based on topic frequency and follow-up questions
  const interests: string[] = [];

  for (const [topic, entry] of Object.entries(memory.topicsDiscussed)) {
    if (entry.mentionCount >= 2 || entry.userFollowUpQuestions.length > 0) {
      interests.push(topic);
    }
  }

  return interests;
}

// ============================================
// Get Conversation Metrics
// ============================================
export function getConversationMetrics(memory: ConversationMemory): ConversationMetrics {
  const now = new Date();

  return {
    startTime: memory.startTime,
    messageCount: memory.messages.length,
    topicSwitches: Object.keys(memory.topicsDiscussed).length,
    avgResponseConfidence: calculateAvgConfidence(memory),
    clarificationCount: memory.messages.filter(m =>
      m.analyticsTag?.includes('clarification')
    ).length,
    handoffSuggestions: memory.handoffAttempts
  };
}

// ============================================
// Calculate Average Confidence
// ============================================
function calculateAvgConfidence(memory: ConversationMemory): number {
  const botMessages = memory.messages.filter(m => m.type === 'bot' && m.confidence !== undefined);
  
  if (botMessages.length === 0) return 0;
  
  const totalConfidence = botMessages.reduce((sum, m) => sum + (m.confidence || 0), 0);
  return totalConfidence / botMessages.length;
}

// ============================================
// Check if Ready for Handoff
// ============================================
export function shouldSuggestHandoff(memory: ConversationMemory): {
  shouldHandoff: boolean;
  type: 'immediate' | 'recommended' | 'organic' | null;
} {
  // Don't suggest too frequently
  if (memory.lastHandoffSuggestion) {
    const timeSinceLastSuggestion = Date.now() - memory.lastHandoffSuggestion.getTime();
    if (timeSinceLastSuggestion < 60000) { // 1 minute
      return { shouldHandoff: false, type: null };
    }
  }
  
  // Frustration signals - immediate handoff
  if (memory.frustrationSignals >= 2) {
    return { shouldHandoff: true, type: 'immediate' };
  }
  
  // Deep dive into complex topic - recommended handoff
  if (memory.questionDepth >= 4 && memory.currentTopic) {
    return { shouldHandoff: true, type: 'recommended' };
  }
  
  // Long conversation - organic handoff
  if (memory.messages.length >= 10 && memory.messages.filter(m => m.type === 'user').length >= 5) {
    return { shouldHandoff: true, type: 'organic' };
  }
  
  return { shouldHandoff: false, type: null };
}

// ============================================
// Reset Conversation
// ============================================
export function resetConversation(): ConversationMemory {
  return initializeConversation();
}

// ============================================
// Export All Functions
// ============================================
export {
  MAX_MESSAGE_HISTORY,
  MAX_TOPICS_TRACKED,
  DEEP_DIVE_THRESHOLD,
  EXPLORING_THRESHOLD
};
