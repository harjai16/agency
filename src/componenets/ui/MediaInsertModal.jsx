"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

const MediaInsertModal = ({ isOpen, onClose, onInsert, type = 'image' }) => {
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onInsert({ url: url.trim(), alt: alt.trim() });
      setUrl('');
      setAlt('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Insert {type === 'image' ? 'Image' : 'Video'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL *
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                placeholder={`https://example.com/${type === 'image' ? 'image.jpg' : 'video.mp4'}`}
                required
              />
            </div>

            {type === 'image' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text (optional)
                </label>
                <input
                  type="text"
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Image description"
                />
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button type="submit" className="flex-1">
                Insert
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MediaInsertModal;

