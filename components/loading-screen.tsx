'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/components/providers/language-provider';

export function LoadingScreen() {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
          >
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-primary to-chart-4 flex items-center justify-center shadow-2xl shadow-primary/40">
              <span className="text-white font-bold text-2xl font-display">A</span>
            </div>
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ borderTopColor: 'transparent', borderRightColor: 'transparent' }}
            />
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-sm text-muted-foreground font-medium"
          >
            {t.common.loading}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
