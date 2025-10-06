import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModalData } from '@/data/types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ModalData | null;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="display-font text-xl" style={{ color: 'var(--tu-navy)' }}>
              {data.headline}
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src={data.image}
                  alt={data.headline}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              <div>
                <div 
                  className="prose prose-sm max-w-none"
                  style={{ color: 'var(--tu-ink)' }}
                  dangerouslySetInnerHTML={{ __html: data.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Modal;

