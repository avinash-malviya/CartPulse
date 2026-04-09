import React, { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useDemo } from '../../context/DemoContext';

interface PageContainerProps {
  children: ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const { currentPage } = useDemo();

  return (
    <main className="flex-1 overflow-y-auto bg-background p-8 scrollbar-hide">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-7xl mx-auto space-y-8"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </main>
  );
};
