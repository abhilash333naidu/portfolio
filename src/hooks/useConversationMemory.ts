// ============================================
// Bot v4.0 Conversation Memory Hook
// ============================================

import { useState, useCallback, useRef } from 'react';
import { ConversationMemory, Message, ProcessedInput } from '../components/animations/chatbot/types';
import {
  initializeConversation,
  addMessage,
  trackTopic,
  trackUserQuestion,
  detectUserType,
  trackSentiment,
  recordHandoffAttempt,
  getTopicDepth,
  hasTopicBeenDiscussed,
  getPreviousTopics,
  getUserInterests,
  getConversationMetrics,
  shouldSuggestHandoff,
  resetConversation
} from '../components/animations/chatbot/ContextManager';

export function useConversationMemory() {
  // Initialize conversation memory
  const [memory, setMemory] = useState<ConversationMemory>(() => initializeConversation());
  const memoryRef = useRef(memory);
  
  // Keep ref in sync
  const updateMemory = useCallback((newMemory: ConversationMemory) => {
    memoryRef.current = newMemory;
    setMemory(newMemory);
  }, []);
  
  // Add a message to the conversation
  const addMessageToMemory = useCallback((message: Message) => {
    const updatedMemory = addMessage(memoryRef.current, message);
    updateMemory(updatedMemory);
  }, [updateMemory]);
  
  // Track a topic when it's discussed
  const trackTopicInMemory = useCallback((topic: string, details?: string) => {
    const updatedMemory = trackTopic(memoryRef.current, topic, details);
    updateMemory(updatedMemory);
  }, [updateMemory]);
  
  // Track a user's follow-up question on a topic
  const trackQuestion = useCallback((topic: string, question: string) => {
    const updatedMemory = trackUserQuestion(memoryRef.current, topic, question);
    updateMemory(updatedMemory);
  }, [updateMemory]);
  
  // Detect user type based on message content
  const detectUser = useCallback((message: string) => {
    const updatedMemory = detectUserType(memoryRef.current, message);
    updateMemory(updatedMemory);
  }, [updateMemory]);
  
  // Track sentiment
  const updateSentiment = useCallback((sentiment: 'positive' | 'neutral' | 'negative') => {
    const updatedMemory = trackSentiment(memoryRef.current, sentiment);
    updateMemory(updatedMemory);
  }, [updateMemory]);
  
  // Record handoff attempt
  const recordHandoff = useCallback(() => {
    const updatedMemory = recordHandoffAttempt(memoryRef.current);
    updateMemory(updatedMemory);
  }, [updateMemory]);
  
  // Get topic depth
  const getTopicDiscussionDepth = useCallback((topic: string) => {
    return getTopicDepth(memoryRef.current, topic);
  }, []);
  
  // Check if topic was discussed
  const wasTopicDiscussed = useCallback((topic: string) => {
    return hasTopicBeenDiscussed(memoryRef.current, topic);
  }, []);
  
  // Get previous topics
  const getRecentTopics = useCallback((count?: number) => {
    return getPreviousTopics(memoryRef.current, count);
  }, []);
  
  // Get user interests
  const getInferredInterests = useCallback(() => {
    return getUserInterests(memoryRef.current);
  }, []);
  
  // Get conversation metrics
  const getMetrics = useCallback(() => {
    return getConversationMetrics(memoryRef.current);
  }, []);
  
  // Check if should suggest handoff
  const checkHandoffSuggestion = useCallback(() => {
    return shouldSuggestHandoff(memoryRef.current);
  }, []);
  
  // Reset conversation
  const reset = useCallback(() => {
    updateMemory(resetConversation());
  }, [updateMemory]);
  
  // Get current memory (for use in callbacks)
  const getCurrentMemory = useCallback(() => {
    return memoryRef.current;
  }, []);
  
  return {
    memory,
    addMessage: addMessageToMemory,
    trackTopic: trackTopicInMemory,
    trackQuestion,
    detectUser,
    updateSentiment,
    recordHandoff,
    getTopicDepth: getTopicDiscussionDepth,
    hasTopicBeenDiscussed: wasTopicDiscussed,
    getPreviousTopics: getRecentTopics,
    getUserInterests: getInferredInterests,
    getMetrics,
    shouldSuggestHandoff: checkHandoffSuggestion,
    reset,
    getCurrentMemory
  };
}
