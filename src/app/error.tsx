"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#000000] px-4">
      <motion.div
        className="max-w-md w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Error Icon */}
        <motion.div
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          <AlertTriangle className="w-10 h-10 text-red-500" />
        </motion.div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-white mb-2">
          Something went wrong
        </h1>
        <p className="text-white/60 mb-8">
          An unexpected error occurred. Please try again or return to the homepage.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f4d03f] to-[#d4af37] text-black font-semibold text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </motion.button>

          <motion.a
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/5 transition-colors"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Home className="w-4 h-4" />
            Go Home
          </motion.a>
        </div>

        {/* Error Details (dev only) */}
        {process.env.NODE_ENV === "development" && (
          <motion.div
            className="mt-8 p-4 rounded-lg bg-white/5 border border-white/10 text-left"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-xs text-white/40 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-white/30 mt-2">
                Digest: {error.digest}
              </p>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
