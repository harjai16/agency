"use client";

import React from 'react';

// This component can be used to add custom toolbar buttons if needed
// Currently, ReactQuill handles the toolbar, but this can be extended

const EditorToolbar = ({ onInsertImage, onInsertLink }) => {
  return (
    <div className="editor-toolbar-custom hidden">
      {/* Custom toolbar buttons can be added here if needed */}
    </div>
  );
};

export default EditorToolbar;

