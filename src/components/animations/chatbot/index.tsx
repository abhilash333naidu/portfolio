// ============================================
// Bot v4.0 - Super Assistant
// Main Chatbot Component
// ============================================

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react";
import { easings } from "@/lib/animations";

// Bot modules
import { Message, ProcessedInput } from "./types";
import { processInput } from "./InputProcessor";
import {
  addMessage,
  trackTopic,
  trackUserQuestion,
  detectUserType,
  trackSentiment,
  recordHandoffAttempt
} from "./ContextManager";
import { generateResponse } from "./ResponseGenerator";
import { getGreetingResponse } from "./responseTemplates";

// Hooks
import { useConversationMemory } from "@/hooks/useConversationMemory";
import { useAdvancedAnalytics } from "@/hooks/useAdvancedAnalytics";

// Constants
const STORAGE_KEY = 'chatbot_conversation';
const MAX_INPUT_LENGTH = 500;
const RATE_LIMIT_MS = 1000; // 1 message per second

// Quick reply options
const QUICK_REPLIES = [
  { label: "Experience", query: "Tell me about his experience" },
  { label: "Projects", query: "What projects has he worked on?" },
  { label: "Skills", query: "What are his key skills?" },
  { label: "Contact", query: "How can I contact him?" }
];

export function ChatBot() {
  // UI State
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [awaitingFeedback, setAwaitingFeedback] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastMessageTime, setLastMessageTime] = useState(0);

  // Refs
  const messageIdCounter = useRef(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hooks
  const {
    memory,
    addMessage: addToMemory,
    trackTopic: trackTopicInMemory,
    trackQuestion,
    detectUser,
    updateSentiment,
    recordHandoff,
    getTopicDepth,
    hasTopicBeenDiscussed,
    getCurrentMemory
  } = useConversationMemory();

  const {
    startSession,
    trackPath,
    trackHandoff,
    trackClarification,
    trackSentiment: trackSentimentAnalytics,
    endSession,
    updateTopicDepth
  } = useAdvancedAnalytics();

  // Load conversation from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { messages: savedMessages, timestamp } = JSON.parse(saved);
        // Only restore if less than 24 hours old
        if (Date.now() - timestamp < 24 * 60 * 60 * 1000 && savedMessages?.length > 0) {
          // Convert timestamp strings back to Date objects
          const restoredMessages = savedMessages.map((m: Message) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          }));
          setMessages(restoredMessages);
          setShowQuickReplies(restoredMessages.length <= 1);
          return;
        }
      }
    } catch (e) {
      console.error('Failed to restore conversation', e);
    }

    // Initialize with greeting if no saved conversation
    const greetingMessage: Message = {
      id: "0",
      type: "bot",
      content: getGreetingResponse(),
      timestamp: new Date(),
      intent: "greeting",
      confidence: 1.0,
      analyticsTag: "greeting"
    };
    setMessages([greetingMessage]);
  }, []);

  // Save conversation to localStorage when messages change
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
          messages: messages.slice(-20), // Only save last 20 messages
          timestamp: Date.now()
        }));
      } catch (e) {
        console.error('Failed to save conversation', e);
      }
    }
  }, [messages]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Hide greeting after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  // Open chat and start analytics session
  const openChat = useCallback(() => {
    setIsOpen(true);
    setShowGreeting(false);

    // Start analytics session
    const memory = getCurrentMemory();
    startSession(memory.sessionId, 'chat_button');
  }, [startSession, getCurrentMemory]);

  // Generate unique message ID
  const generateMessageId = useCallback(() => {
    messageIdCounter.current += 1;
    return messageIdCounter.current.toString();
  }, []);

  // Reset conversation
  const resetConversation = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    const greetingMessage: Message = {
      id: "0",
      type: "bot",
      content: getGreetingResponse(),
      timestamp: new Date(),
      intent: "greeting",
      confidence: 1.0,
      analyticsTag: "greeting"
    };
    setMessages([greetingMessage]);
    setShowQuickReplies(true);
    setAwaitingFeedback(false);
    messageIdCounter.current = 0;
  }, []);

  // Handle quick reply click
  const handleQuickReply = useCallback((query: string) => {
    setInput(query);
    setShowQuickReplies(false);
    // Trigger send after a brief delay
    setTimeout(() => {
      const event = new KeyboardEvent('keypress', { key: 'Enter' });
      inputRef.current?.dispatchEvent(event);
    }, 100);
  }, []);

  // Process user input and generate response
  const handleSend = useCallback(async () => {
    const trimmedInput = input.trim();

    // Validation checks
    if (!trimmedInput) return;

    // Rate limiting
    const now = Date.now();
    if (now - lastMessageTime < RATE_LIMIT_MS) {
      return;
    }
    setLastMessageTime(now);

    // Length validation
    if (trimmedInput.length > MAX_INPUT_LENGTH) {
      const errorMessage: Message = {
        id: generateMessageId(),
        type: "bot",
        content: `Please keep your message under ${MAX_INPUT_LENGTH} characters. Your message has ${trimmedInput.length} characters.`,
        timestamp: new Date(),
        intent: "validation_error",
        analyticsTag: "input_too_long"
      };
      setMessages(prev => [...prev, errorMessage]);
      return;
    }

    const userInput = trimmedInput;
    setInput("");
    setAwaitingFeedback(false);
    setShowQuickReplies(false);

    // Add user message
    const userMessage: Message = {
      id: generateMessageId(),
      type: "user",
      content: userInput,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Add to conversation memory
    addToMemory(userMessage);

    // Detect user type
    detectUser(userInput);

    // Show typing indicator
    setIsTyping(true);

    // Process input with delay to simulate thinking
    setTimeout(() => {
      try {
        // Get previous messages for context
        const previousMessages = messages
          .filter(m => m.type === 'user')
          .map(m => m.content);

        // Process input
        const processedInput: ProcessedInput = processInput(userInput, previousMessages);

        // Track sentiment
        updateSentiment(processedInput.sentiment);
        trackSentimentAnalytics(processedInput.sentiment);

        // Get current memory state
        const currentMemory = getCurrentMemory();

        // Generate response
        const { responses, analyticsTag, shouldRecordHandoff } = generateResponse(
          processedInput,
          currentMemory
        );

        // Track in analytics
        trackPath(`${processedInput.intent.category}_${processedInput.intent.subcategory}`);

        if (analyticsTag.includes('clarification')) {
          trackClarification();
        }

        // Track topic if applicable
        if (processedInput.intent.category === 'information_seeking') {
          trackTopicInMemory(processedInput.intent.subcategory, responses[0]);
          trackQuestion(processedInput.intent.subcategory, userInput);
          updateTopicDepth(processedInput.intent.subcategory, getTopicDepth(processedInput.intent.subcategory));
        }

        // Record handoff if suggested
        if (shouldRecordHandoff) {
          recordHandoff();
          const handoffType = analyticsTag.includes('immediate') ? 'immediate' :
                             analyticsTag.includes('recommended') ? 'recommended' : 'organic';
          trackHandoff(handoffType, false, messages.length + 1);
        }

        // Hide typing indicator
        setIsTyping(false);

        // Add bot messages (split if long)
        responses.forEach((responseText, index) => {
          setTimeout(() => {
            const botMessage: Message = {
              id: generateMessageId(),
              type: "bot",
              content: responseText,
              timestamp: new Date(),
              intent: processedInput.intent.subcategory,
              confidence: processedInput.confidence,
              analyticsTag
            };

            setMessages(prev => [...prev, botMessage]);
            addToMemory(botMessage);
          }, index * 500); // Stagger multiple messages
        });

        // Show feedback option after response
        setTimeout(() => {
          setAwaitingFeedback(true);
        }, responses.length * 500 + 500);

      } catch (error) {
        console.error("Bot processing error:", error);
        setIsTyping(false);

        // Error recovery message
        const errorMessage: Message = {
          id: generateMessageId(),
          type: "bot",
          content: "I apologize, I'm having trouble with that. Could you rephrase your question?",
          timestamp: new Date(),
          intent: "error_recovery",
          analyticsTag: "error_fallback"
        };

        setMessages(prev => [...prev, errorMessage]);
        addToMemory(errorMessage);
      }
    }, 200 + Math.random() * 200); // Random delay 200-400ms for natural feel
  }, [input, messages, lastMessageTime, generateMessageId, addToMemory, detectUser, updateSentiment, trackSentimentAnalytics, getCurrentMemory, trackPath, trackClarification, trackTopicInMemory, trackQuestion, updateTopicDepth, getTopicDepth, recordHandoff, trackHandoff]);

  // Handle feedback
  const handleFeedback = useCallback((isPositive: boolean) => {
    setAwaitingFeedback(false);

    const feedbackMessage = isPositive
      ? "Thanks for the feedback! Glad I could help."
      : "Thanks for letting me know. Is there something specific I can clarify?";

    const botMessage: Message = {
      id: generateMessageId(),
      type: "bot",
      content: feedbackMessage,
      timestamp: new Date(),
      intent: "feedback_response",
      analyticsTag: isPositive ? "positive_feedback" : "negative_feedback"
    };

    setMessages(prev => [...prev, botMessage]);
    addToMemory(botMessage);
  }, [generateMessageId, addToMemory]);

  // Handle key press
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }, [handleSend]);

  // Handle input change with length limit
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_INPUT_LENGTH) {
      setInput(value);
    }
  }, []);

  // Close chat
  const closeChat = useCallback(() => {
    endSession('closed');
    setIsOpen(false);
  }, [endSession]);

  return (
    <>
      {/* Chat Button */}
      <motion.button
        className={`fixed bottom-8 right-8 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl border-2 transition-all duration-300 ${
          isOpen ? "bg-[#050505] border-white" : "bg-[#050505] border-[#222222]"
        }`}
        whileHover={{ scale: 1.05, borderColor: "#ffffff" }}
        whileTap={{ scale: 0.95 }}
        onClick={openChat}
        animate={showGreeting && !isOpen ? {
          boxShadow: [
            "0 0 0 0 rgba(255, 255, 255, 0.4)",
            "0 0 0 15px rgba(255, 255, 255, 0)",
            "0 0 0 0 rgba(255, 255, 255, 0)"
          ]
        } : {}}
        transition={showGreeting && !isOpen ? {
          duration: 2,
          repeat: Infinity,
          ease: "easeOut"
        } : {}}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#050505] font-slab overflow-visible">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ overflow: "visible" }}
            >
              <circle
                cx="28"
                cy="28"
                r="28"
                fill="none"
                stroke="none"
              />
              {/* First tracer */}
              <motion.circle
                cx="28"
                cy="28"
                r="28"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeDasharray="5 170"
                strokeLinecap="round"
                animate={{
                  rotate: 360
                }}
                style={{
                  transformOrigin: "28px 28px",
                  filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 1)) drop-shadow(0 0 24px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 36px rgba(255, 255, 255, 0.4))"
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              {/* Second tracer - exactly opposite (180 degrees offset) */}
              <motion.circle
                cx="28"
                cy="28"
                r="28"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeDasharray="5 170"
                strokeLinecap="round"
                animate={{
                  rotate: 360
                }}
                style={{
                  transformOrigin: "28px 28px",
                  strokeDashoffset: -88,
                  filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 1)) drop-shadow(0 0 24px rgba(255, 255, 255, 0.8)) drop-shadow(0 0 36px rgba(255, 255, 255, 0.4))"
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </svg>
            <div className="relative z-10 flex items-center justify-center w-full h-full">
              <span className="text-xl font-normal italic text-white">AN</span>
            </div>
          </div>
        )}
      </motion.button>

      {/* Greeting Popup */}
      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.5, ease: easings.luxury }}
            className="fixed bottom-24 right-24 z-50 w-72 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-4 cursor-pointer"
            onClick={openChat}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-white font-medium mb-1">
                  Professional Assistant
                </p>
                <p className="text-xs text-white/60 leading-relaxed">
                  Ask me about Abhilash's engineering management experience!
                </p>
              </div>
            </div>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setShowGreeting(false);
              }}
              className="absolute top-2 right-2 p-1 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="h-3 w-3" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: easings.luxury }}
            className="fixed bottom-24 right-8 z-50 w-[calc(100%-2rem)] sm:w-[400px] max-h-[600px] rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#050505]">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 border border-white/20">
                  <span className="text-sm font-bold text-white">AN</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">Professional Assistant</div>
                  <div className="text-xs text-white/40">Online</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <motion.button
                  onClick={resetConversation}
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Start new conversation"
                >
                  <RotateCcw className="h-4 w-4" />
                </motion.button>
                <motion.button
                  onClick={closeChat}
                  className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto min-h-[300px] max-h-[400px] p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-[#666666] to-[#444444] text-white"
                        : "bg-white/5 border border-white/10 text-white"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <div className="mt-1 text-xs text-white/30">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-white/40"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-white/40"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-white/40"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Feedback Buttons */}
              {awaitingFeedback && messages[messages.length - 1]?.type === "bot" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center gap-2 mt-2"
                >
                  <span className="text-xs text-white/40 mr-2">Was this helpful?</span>
                  <motion.button
                    onClick={() => handleFeedback(true)}
                    className="p-1.5 rounded-full bg-white/5 text-white/40 hover:text-green-400 hover:bg-green-400/10 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleFeedback(false)}
                    className="p-1.5 rounded-full bg-white/5 text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <ThumbsDown className="h-3.5 w-3.5" />
                  </motion.button>
                </motion.div>
              )}

              {/* Quick Reply Buttons */}
              {showQuickReplies && messages.length <= 2 && !isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2 mt-3 justify-center"
                >
                  {QUICK_REPLIES.map((reply, idx) => (
                    <motion.button
                      key={reply.label}
                      onClick={() => handleQuickReply(reply.query)}
                      className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-full text-white/70 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {reply.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/10 bg-[#050505]">
              <div className="flex items-center gap-3">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about experience, projects, or how to connect..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50 transition-all"
                    disabled={isTyping}
                    maxLength={MAX_INPUT_LENGTH}
                  />
                  {input.length > MAX_INPUT_LENGTH * 0.8 && (
                    <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${
                      input.length >= MAX_INPUT_LENGTH ? 'text-red-400' : 'text-white/30'
                    }`}>
                      {input.length}/{MAX_INPUT_LENGTH}
                    </span>
                  )}
                </div>
                <motion.button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 rounded-xl transition-all ${
                    input.trim() && !isTyping
                      ? "bg-gradient-to-r from-[#e5e5e5] to-[#666666] text-black"
                      : "bg-white/5 text-white/30 cursor-not-allowed"
                  }`}
                >
                  <Send className="h-4 w-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
