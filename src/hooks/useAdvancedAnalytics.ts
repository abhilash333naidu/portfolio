// ============================================
// Bot v4.0 Advanced Analytics Hook
// ============================================

import { useState, useCallback, useEffect, useRef } from 'react';
import { AnalyticsData, ConversationMemory, Message } from '../components/animations/chatbot/types';

// ============================================
// Analytics State
// ============================================
interface AnalyticsState {
  sessions: AnalyticsData[];
  currentSession: Partial<AnalyticsData> | null;
  isTracking: boolean;
}

// ============================================
// Initialize Analytics
// ============================================
function initializeAnalytics(): AnalyticsState {
  return {
    sessions: [],
    currentSession: null,
    isTracking: false
  };
}

export function useAdvancedAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsState>(initializeAnalytics);
  const analyticsRef = useRef(analytics);
  const startTimeRef = useRef<Date | null>(null);
  
  // Keep ref in sync
  const updateAnalytics = useCallback((newState: AnalyticsState) => {
    analyticsRef.current = newState;
    setAnalytics(newState);
  }, []);
  
  // Start tracking a new session
  const startSession = useCallback((sessionId: string, entryPoint: string) => {
    startTimeRef.current = new Date();
    
    updateAnalytics({
      ...analyticsRef.current,
      currentSession: {
        sessionId,
        entryPoint,
        path: [],
        timestamp: new Date()
      },
      isTracking: true
    });
  }, [updateAnalytics]);
  
  // Track an intent/action in the conversation path
  const trackPath = useCallback((intent: string) => {
    if (!analyticsRef.current.currentSession) return;
    
    const currentPath = analyticsRef.current.currentSession.path || [];
    
    updateAnalytics({
      ...analyticsRef.current,
      currentSession: {
        ...analyticsRef.current.currentSession,
        path: [...currentPath, intent]
      }
    });
  }, [updateAnalytics]);
  
  // Track handoff event
  const trackHandoff = useCallback((
    type: 'immediate' | 'recommended' | 'organic',
    success: boolean,
    messageCount: number
  ) => {
    if (!analyticsRef.current.currentSession) return;
    
    updateAnalytics({
      ...analyticsRef.current,
      currentSession: {
        ...analyticsRef.current.currentSession,
        handoffTriggered: true,
        handoffType: type,
        handoffSuccess: success,
        messagesToHandoff: messageCount
      }
    });
  }, [updateAnalytics]);
  
  // Track drop-off (when user leaves without clear ending)
  const trackDropOff = useCallback((
    messageCount: number,
    lastTopic: string,
    lastIntent: string,
    confidence: number
  ) => {
    if (!analyticsRef.current.currentSession) return;
    
    updateAnalytics({
      ...analyticsRef.current,
      currentSession: {
        ...analyticsRef.current.currentSession,
        exitPoint: 'drop_off',
        messagesBeforeDrop: messageCount,
        lastTopic,
        lastIntent,
        confidenceAtDrop: confidence
      }
    });
  }, [updateAnalytics]);
  
  // Track clarification request
  const trackClarification = useCallback(() => {
    if (!analyticsRef.current.currentSession) return;
    
    const currentClarifications = analyticsRef.current.currentSession.clarificationRequests || 0;
    
    updateAnalytics({
      ...analyticsRef.current,
      currentSession: {
        ...analyticsRef.current.currentSession,
        clarificationRequests: currentClarifications + 1
      }
    });
  }, [updateAnalytics]);
  
  // Track sentiment trend
  const trackSentiment = useCallback((sentiment: 'positive' | 'neutral' | 'negative') => {
    if (!analyticsRef.current.currentSession) return;
    
    const currentTrend = analyticsRef.current.currentSession.sentimentTrend || [];
    
    updateAnalytics({
      ...analyticsRef.current,
      currentSession: {
        ...analyticsRef.current.currentSession,
        sentimentTrend: [...currentTrend, sentiment].slice(-10) // Keep last 10
      }
    });
  }, [updateAnalytics]);
  
  // End session and save to history
  const endSession = useCallback((exitPoint: string = 'completed') => {
    if (!analyticsRef.current.currentSession) return;
    
    const completedSession: AnalyticsData = {
      sessionId: analyticsRef.current.currentSession.sessionId || `session_${Date.now()}`,
      entryPoint: analyticsRef.current.currentSession.entryPoint || 'unknown',
      path: analyticsRef.current.currentSession.path || [],
      exitPoint,
      messagesBeforeDrop: analyticsRef.current.currentSession.messagesBeforeDrop || 0,
      lastTopic: analyticsRef.current.currentSession.lastTopic || '',
      lastIntent: analyticsRef.current.currentSession.lastIntent || '',
      confidenceAtDrop: analyticsRef.current.currentSession.confidenceAtDrop || 0,
      handoffTriggered: analyticsRef.current.currentSession.handoffTriggered || false,
      handoffType: analyticsRef.current.currentSession.handoffType,
      handoffSuccess: analyticsRef.current.currentSession.handoffSuccess || false,
      messagesToHandoff: analyticsRef.current.currentSession.messagesToHandoff || 0,
      topicDepth: analyticsRef.current.currentSession.topicDepth || {},
      clarificationRequests: analyticsRef.current.currentSession.clarificationRequests || 0,
      sentimentTrend: analyticsRef.current.currentSession.sentimentTrend || [],
      avgProcessingTime: 0, // Would be calculated from actual timing data
      timestamp: analyticsRef.current.currentSession.timestamp || new Date()
    };
    
    updateAnalytics({
      sessions: [...analyticsRef.current.sessions, completedSession],
      currentSession: null,
      isTracking: false
    });
    
    startTimeRef.current = null;
  }, [updateAnalytics]);
  
  // Update topic depth tracking
  const updateTopicDepth = useCallback((topic: string, depth: number) => {
    if (!analyticsRef.current.currentSession) return;

    const currentDepth = analyticsRef.current.currentSession.topicDepth || {};

    updateAnalytics({
      ...analyticsRef.current,
      currentSession: {
        ...analyticsRef.current.currentSession,
        topicDepth: { ...currentDepth, [topic]: depth },
        lastTopic: topic
      }
    });
  }, [updateAnalytics]);
  
  // Get analytics summary
  const getSummary = useCallback(() => {
    const sessions = analyticsRef.current.sessions;
    
    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        avgMessagesPerSession: 0,
        handoffRate: 0,
        avgTopicDepth: 0,
        topIntents: [],
        dropOffRate: 0
      };
    }
    
    // Calculate metrics
    const totalSessions = sessions.length;
    const totalMessages = sessions.reduce((sum, s) => sum + s.messagesBeforeDrop, 0);
    const handoffs = sessions.filter(s => s.handoffTriggered).length;
    const dropOffs = sessions.filter(s => s.exitPoint === 'drop_off').length;
    
    // Calculate average topic depth
    let totalDepth = 0;
    let depthCount = 0;
    sessions.forEach(s => {
      Object.values(s.topicDepth).forEach((depth) => {
        totalDepth += depth;
        depthCount++;
      });
    });
    
    // Get top intents
    const intentCounts: Record<string, number> = {};
    sessions.forEach(s => {
      s.path.forEach(intent => {
        intentCounts[intent] = (intentCounts[intent] || 0) + 1;
      });
    });
    
    const topIntents = Object.entries(intentCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([intent, count]) => ({ intent, count }));
    
    return {
      totalSessions,
      avgMessagesPerSession: totalMessages / totalSessions,
      handoffRate: (handoffs / totalSessions) * 100,
      avgTopicDepth: depthCount > 0 ? totalDepth / depthCount : 0,
      topIntents,
      dropOffRate: (dropOffs / totalSessions) * 100
    };
  }, []);
  
  // Get user journey funnel data
  const getFunnelData = useCallback(() => {
    const sessions = analyticsRef.current.sessions;
    
    return {
      totalVisitors: sessions.length,
      startedConversation: sessions.filter(s => s.messagesBeforeDrop > 0).length,
      askedQuestions: sessions.filter(s => s.messagesBeforeDrop >= 2).length,
      reachedHandoff: sessions.filter(s => s.handoffTriggered).length,
      successfulHandoff: sessions.filter(s => s.handoffSuccess).length
    };
  }, []);
  
  // Get drop-off analysis
  const getDropOffAnalysis = useCallback(() => {
    const dropOffSessions = analyticsRef.current.sessions.filter(s => s.exitPoint === 'drop_off');
    
    if (dropOffSessions.length === 0) {
      return { dropOffPoints: [], avgMessagesBeforeDrop: 0 };
    }
    
    // Group by last intent
    const dropOffByIntent: Record<string, number> = {};
    dropOffSessions.forEach(s => {
      dropOffByIntent[s.lastIntent] = (dropOffByIntent[s.lastIntent] || 0) + 1;
    });
    
    const dropOffPoints = Object.entries(dropOffByIntent)
      .sort(([, a], [, b]) => b - a)
      .map(([intent, count]) => ({ intent, count }));
    
    const avgMessagesBeforeDrop = dropOffSessions.reduce((sum, s) => sum + s.messagesBeforeDrop, 0) / dropOffSessions.length;
    
    return { dropOffPoints, avgMessagesBeforeDrop };
  }, []);
  
  // Get current session analytics
  const getCurrentSessionAnalytics = useCallback(() => {
    return analyticsRef.current.currentSession;
  }, []);
  
  // Clear all analytics
  const clearAnalytics = useCallback(() => {
    updateAnalytics(initializeAnalytics());
  }, [updateAnalytics]);
  
  // Reset current session
  const resetSession = useCallback(() => {
    updateAnalytics({
      ...analyticsRef.current,
      currentSession: null,
      isTracking: false
    });
    startTimeRef.current = null;
  }, [updateAnalytics]);
  
  return {
    analytics: analyticsRef.current,
    isTracking: analytics.isTracking,
    startSession,
    trackPath,
    trackHandoff,
    trackDropOff,
    trackClarification,
    trackSentiment,
    endSession,
    updateTopicDepth,
    getSummary,
    getFunnelData,
    getDropOffAnalysis,
    getCurrentSessionAnalytics,
    clearAnalytics,
    resetSession
  };
}
