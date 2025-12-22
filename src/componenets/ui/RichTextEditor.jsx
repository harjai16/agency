"use client";

import React, { useState, useRef, useEffect } from 'react';

const RichTextEditor = ({ value, onChange, placeholder = 'Start writing...' }) => {
  const editorRef = useRef(null);
  const isInternalChange = useRef(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showBgColorPicker, setShowBgColorPicker] = useState(false);
  const [textColor, setTextColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const linkModalRef = useRef(null);
  const savedRangeRef = useRef(null);

  useEffect(() => {
    if (editorRef.current && !isInternalChange.current) {
      editorRef.current.innerHTML = value || '';
      // Ensure lists are styled after content is set
      setTimeout(() => {
        const uls = editorRef.current.querySelectorAll('ul');
        uls.forEach(ul => {
          ul.style.listStyleType = 'disc';
          ul.style.paddingLeft = '2em';
          ul.style.margin = '0.5em 0';
          ul.style.display = 'block';
          ul.querySelectorAll('li').forEach(li => {
            li.style.display = 'list-item';
          });
        });
        
        const ols = editorRef.current.querySelectorAll('ol');
        ols.forEach(ol => {
          ol.style.listStyleType = 'decimal';
          ol.style.paddingLeft = '2em';
          ol.style.margin = '0.5em 0';
          ol.style.display = 'block';
          ol.querySelectorAll('li').forEach(li => {
            li.style.display = 'list-item';
          });
        });
      }, 0);
    }
    isInternalChange.current = false;
  }, [value]);

  // Handle ESC key to close link modal
  useEffect(() => {
    if (!showLinkModal) return;
    
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowLinkModal(false);
        setLinkUrl('');
        setLinkText('');
        editorRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [showLinkModal]);

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    updateToolbarState();
    handleContentChange();
  };

  const updateToolbarState = () => {
    setIsBold(document.queryCommandState('bold'));
    setIsItalic(document.queryCommandState('italic'));
    setIsUnderline(document.queryCommandState('underline'));
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      // Ensure lists have proper styling
      const uls = editorRef.current.querySelectorAll('ul');
      uls.forEach(ul => {
        if (!ul.style.listStyleType) {
          ul.style.listStyleType = 'disc';
          ul.style.paddingLeft = '2em';
          ul.style.margin = '0.5em 0';
        }
        ul.querySelectorAll('li').forEach(li => {
          li.style.display = 'list-item';
        });
      });
      
      const ols = editorRef.current.querySelectorAll('ol');
      ols.forEach(ol => {
        if (!ol.style.listStyleType) {
          ol.style.listStyleType = 'decimal';
          ol.style.paddingLeft = '2em';
          ol.style.margin = '0.5em 0';
        }
        ol.querySelectorAll('li').forEach(li => {
          li.style.display = 'list-item';
        });
      });
      
      isInternalChange.current = true;
      onChange(editorRef.current.innerHTML);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      const img = `<img src="${url}" alt="Image" style="max-width: 100%; height: auto;" />`;
      execCommand('insertHTML', img);
    }
  };

  const insertLink = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    
    // Save the selection range before opening modal (selection might be lost when modal opens)
    if (selection.rangeCount > 0) {
      savedRangeRef.current = selection.getRangeAt(0).cloneRange();
    } else {
      savedRangeRef.current = null;
    }
    
    // Get selected text or use empty string
    setLinkText(selectedText || '');
    setLinkUrl('');
    setShowLinkModal(true);
    
    // Position modal near selection with smart positioning
    setTimeout(() => {
      if (selection.rangeCount > 0 && linkModalRef.current && editorRef.current) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const editorRect = editorRef.current.getBoundingClientRect();
        const modal = linkModalRef.current;
        
        // Modal dimensions (approximate)
        const modalWidth = 320; // w-80 = 320px
        const modalHeight = 180; // approximate height
        
        // Calculate position relative to editor
        const scrollTop = editorRef.current.scrollTop;
        const scrollLeft = editorRef.current.scrollLeft;
        
        // Position relative to editor viewport
        const relativeTop = rect.top - editorRect.top + scrollTop;
        const relativeLeft = rect.left - editorRect.left + scrollLeft;
        const relativeBottom = rect.bottom - editorRect.top + scrollTop;
        
        // Available space calculations
        const spaceBelow = editorRef.current.offsetHeight - (relativeBottom - scrollTop);
        const spaceAbove = relativeTop - scrollTop;
        const spaceRight = editorRef.current.offsetWidth - (relativeLeft - scrollLeft);
        const spaceLeft = relativeLeft - scrollLeft;
        
        let top, left;
        
        // Vertical positioning: prefer below, but use above if not enough space
        if (spaceBelow >= modalHeight + 20) {
          // Position below selection
          top = relativeBottom - scrollTop + 10;
        } else if (spaceAbove >= modalHeight + 20) {
          // Position above selection
          top = relativeTop - scrollTop - modalHeight - 10;
        } else {
          // Center vertically if neither fits well
          top = Math.max(10, (editorRef.current.offsetHeight - modalHeight) / 2);
        }
        
        // Horizontal positioning: center on selection, but adjust if near edges
        if (spaceRight >= modalWidth / 2 && spaceLeft >= modalWidth / 2) {
          // Center on selection
          left = relativeLeft - scrollLeft - (modalWidth / 2) + (rect.width / 2);
        } else if (spaceRight < modalWidth) {
          // Near right edge, align to right with padding
          left = editorRef.current.offsetWidth - modalWidth - 10;
        } else if (spaceLeft < modalWidth / 2) {
          // Near left edge, align to left with padding
          left = 10;
        } else {
          // Default: center on selection
          left = relativeLeft - scrollLeft - (modalWidth / 2) + (rect.width / 2);
        }
        
        // Ensure modal stays within editor bounds
        top = Math.max(10, Math.min(top, editorRef.current.offsetHeight - modalHeight - 10));
        left = Math.max(10, Math.min(left, editorRef.current.offsetWidth - modalWidth - 10));
        
        modal.style.top = `${top}px`;
        modal.style.left = `${left}px`;
        modal.style.transform = 'none'; // Remove centering transform
      } else if (linkModalRef.current && editorRef.current) {
        // Fallback: center modal if no selection
        const modal = linkModalRef.current;
        const modalWidth = 320;
        const modalHeight = 180;
        modal.style.top = `${(editorRef.current.offsetHeight - modalHeight) / 2}px`;
        modal.style.left = `${(editorRef.current.offsetWidth - modalWidth) / 2}px`;
        modal.style.transform = 'none';
      }
    }, 0);
  };

  const handleLinkSubmit = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (!linkUrl.trim()) {
      return false;
    }
    
    // Restore focus to editor first
    editorRef.current?.focus();
    
    // Restore saved selection if available
    let range = null;
    if (savedRangeRef.current) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(savedRangeRef.current);
      range = savedRangeRef.current;
    } else {
      // Try to get current selection
      const selection = window.getSelection();
      if (selection.rangeCount > 0) {
        range = selection.getRangeAt(0);
      }
    }
    
    const text = linkText.trim() || linkUrl.trim();
    
    // If we have a range with selected text, wrap it with link
    if (range && !range.collapsed) {
      const selectedText = range.toString();
      const linkTextToUse = text || selectedText;
      
      // Create link element
      const linkElement = document.createElement('a');
      linkElement.href = linkUrl.trim();
      linkElement.target = '_blank';
      linkElement.rel = 'noopener noreferrer';
      linkElement.textContent = linkTextToUse;
      
      // Delete selected content and insert link
      range.deleteContents();
      range.insertNode(linkElement);
      
      // Move cursor after the link
      const newRange = document.createRange();
      newRange.setStartAfter(linkElement);
      newRange.collapse(true);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      // No selection, insert link at cursor position
      const link = `<a href="${linkUrl.trim()}" target="_blank" rel="noopener noreferrer">${text}</a>`;
      execCommand('insertHTML', link);
    }
    
    // Update content
    handleContentChange();
    
    // Close modal and reset
    setShowLinkModal(false);
    setLinkUrl('');
    setLinkText('');
    savedRangeRef.current = null;
    editorRef.current?.focus();
    
    return false;
  };

  const handleLinkCancel = () => {
    setShowLinkModal(false);
    setLinkUrl('');
    setLinkText('');
    savedRangeRef.current = null;
    editorRef.current?.focus();
  };

  const colors = [
    '#000000', '#333333', '#666666', '#999999', '#CCCCCC', '#FFFFFF',
    '#FF0000', '#FF6600', '#FFCC00', '#33CC00', '#0066FF', '#6600CC',
    '#FF0066', '#00CCCC', '#FFCC99', '#FFFF99', '#99FF99', '#99CCFF'
  ];

  return (
    <div className="rich-text-editor border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="toolbar bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => execCommand('bold')}
          className={`px-3 py-1.5 rounded text-sm font-semibold hover:bg-gray-200 ${isBold ? 'bg-gray-300' : ''}`}
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => execCommand('italic')}
          className={`px-3 py-1.5 rounded text-sm italic hover:bg-gray-200 ${isItalic ? 'bg-gray-300' : ''}`}
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => execCommand('underline')}
          className={`px-3 py-1.5 rounded text-sm underline hover:bg-gray-200 ${isUnderline ? 'bg-gray-300' : ''}`}
          title="Underline"
        >
          <u>U</u>
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Headers */}
        <select
          onChange={(e) => {
            if (e.target.value) {
              execCommand('formatBlock', e.target.value);
            }
          }}
          className="px-2 py-1.5 rounded text-sm border border-gray-300 bg-white hover:bg-gray-50"
          title="Heading"
        >
          <option value="">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
        </select>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Lists */}
        <button
          type="button"
          onClick={() => {
            execCommand('insertUnorderedList');
            // Ensure list styling is applied
            setTimeout(() => {
              const lists = editorRef.current?.querySelectorAll('ul');
              lists?.forEach(ul => {
                ul.style.listStyleType = 'disc';
                ul.style.paddingLeft = '2em';
                ul.style.margin = '0.5em 0';
                ul.style.display = 'block';
                Array.from(ul.querySelectorAll('li')).forEach(li => {
                  li.style.display = 'list-item';
                  li.style.listStyleType = 'disc';
                });
              });
            }, 10);
          }}
          className="px-3 py-1.5 rounded text-sm hover:bg-gray-200"
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => {
            execCommand('insertOrderedList');
            // Ensure list styling is applied
            setTimeout(() => {
              const lists = editorRef.current?.querySelectorAll('ol');
              lists?.forEach(ol => {
                ol.style.listStyleType = 'decimal';
                ol.style.paddingLeft = '2em';
                ol.style.margin = '0.5em 0';
                ol.style.display = 'block';
                Array.from(ol.querySelectorAll('li')).forEach(li => {
                  li.style.display = 'list-item';
                  li.style.listStyleType = 'decimal';
                });
              });
            }, 10);
          }}
          className="px-3 py-1.5 rounded text-sm hover:bg-gray-200"
          title="Numbered List"
        >
          1. List
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Text Color */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="px-3 py-1.5 rounded text-sm hover:bg-gray-200 flex items-center gap-1"
            title="Text Color"
          >
            <span className="text-xs">A</span>
            <div
              className="w-4 h-4 rounded border border-gray-300"
              style={{ backgroundColor: textColor }}
            />
          </button>
          {showColorPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-10 grid grid-cols-6 gap-1 w-48">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setTextColor(color);
                    execCommand('foreColor', color);
                    setShowColorPicker(false);
                  }}
                  className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              <input
                type="color"
                value={textColor}
                onChange={(e) => {
                  setTextColor(e.target.value);
                  execCommand('foreColor', e.target.value);
                }}
                className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
                title="Custom Color"
              />
            </div>
          )}
        </div>

        {/* Background Color */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowBgColorPicker(!showBgColorPicker)}
            className="px-3 py-1.5 rounded text-sm hover:bg-gray-200 flex items-center gap-1"
            title="Background Color"
          >
            <span className="text-xs">Bg</span>
            <div
              className="w-4 h-4 rounded border border-gray-300"
              style={{ backgroundColor: bgColor }}
            />
          </button>
          {showBgColorPicker && (
            <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-10 grid grid-cols-6 gap-1 w-48">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setBgColor(color);
                    execCommand('backColor', color);
                    setShowBgColorPicker(false);
                  }}
                  className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
              <input
                type="color"
                value={bgColor}
                onChange={(e) => {
                  setBgColor(e.target.value);
                  execCommand('backColor', e.target.value);
                }}
                className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
                title="Custom Color"
              />
            </div>
          )}
        </div>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Alignment */}
        <button
          type="button"
          onClick={() => execCommand('justifyLeft')}
          className="px-3 py-1.5 rounded text-sm hover:bg-gray-200"
          title="Align Left"
        >
          ⬅
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyCenter')}
          className="px-3 py-1.5 rounded text-sm hover:bg-gray-200"
          title="Align Center"
        >
          ⬌
        </button>
        <button
          type="button"
          onClick={() => execCommand('justifyRight')}
          className="px-3 py-1.5 rounded text-sm hover:bg-gray-200"
          title="Align Right"
        >
          ➡
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Insert */}
        <button
          type="button"
          onClick={insertLink}
          className="px-3 py-1.5 rounded text-sm hover:bg-gray-200"
          title="Insert Link"
        >
          🔗
        </button>
        <button
          type="button"
          onClick={insertImage}
          className="px-3 py-1.5 rounded text-sm hover:bg-gray-200"
          title="Insert Image"
        >
          🖼️
        </button>

        <div className="w-px h-6 bg-gray-300 mx-1" />

        {/* Other */}
        <button
          type="button"
          onClick={() => execCommand('formatBlock', 'blockquote')}
          className="px-3 py-1.5 rounded text-sm hover:bg-gray-200"
          title="Quote"
        >
          "
        </button>
        <button
          type="button"
          onClick={() => execCommand('removeFormat')}
          className="px-3 py-1.5 rounded text-sm hover:bg-gray-200"
          title="Clear Formatting"
        >
          ✕
        </button>
      </div>

      {/* Editor */}
      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleContentChange}
          onBlur={handleContentChange}
          onKeyUp={updateToolbarState}
          onMouseUp={updateToolbarState}
          className="editor-content min-h-[300px] p-4 text-sm focus:outline-none"
          style={{ minHeight: '300px' }}
          data-placeholder={placeholder}
          suppressContentEditableWarning
        />
        
        {/* Link Modal */}
        {showLinkModal && (
          <div
            ref={linkModalRef}
            className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-xl p-4 w-80"
            style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Add Link</h3>
              <button
                type="button"
                onClick={handleLinkCancel}
                className="text-gray-400 hover:text-gray-600 text-lg leading-none"
              >
                ×
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Link Text
                </label>
                <input
                  type="text"
                  value={linkText}
                  onChange={(e) => setLinkText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleLinkSubmit(e);
                    }
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Link text"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  URL *
                </label>
                <input
                  type="url"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleLinkSubmit(e);
                    }
                  }}
                  className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="https://example.com"
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleLinkSubmit}
                  className="flex-1 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Add Link
                </button>
                <button
                  type="button"
                  onClick={handleLinkCancel}
                  className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .rich-text-editor .editor-content:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
        .rich-text-editor .editor-content img {
          max-width: 100%;
          height: auto;
          margin: 8px 0;
        }
        .rich-text-editor .editor-content a {
          color: #0066cc;
          text-decoration: underline;
        }
        .rich-text-editor .editor-content h1 { font-size: 2em; font-weight: bold; margin: 0.5em 0; }
        .rich-text-editor .editor-content h2 { font-size: 1.5em; font-weight: bold; margin: 0.5em 0; }
        .rich-text-editor .editor-content h3 { font-size: 1.17em; font-weight: bold; margin: 0.5em 0; }
        .rich-text-editor .editor-content h4 { font-size: 1em; font-weight: bold; margin: 0.5em 0; }
        .rich-text-editor .editor-content blockquote {
          border-left: 4px solid #ddd;
          padding-left: 1em;
          margin: 1em 0;
          color: #666;
        }
        .rich-text-editor .editor-content ul {
          list-style-type: disc !important;
          margin: 0.5em 0 !important;
          padding-left: 2em !important;
          display: block !important;
        }
        .rich-text-editor .editor-content ul li {
          display: list-item !important;
          list-style-type: disc !important;
          margin: 0.25em 0 !important;
          padding-left: 0 !important;
        }
        .rich-text-editor .editor-content ol {
          list-style-type: decimal !important;
          margin: 0.5em 0 !important;
          padding-left: 2em !important;
          display: block !important;
        }
        .rich-text-editor .editor-content ol li {
          display: list-item !important;
          list-style-type: decimal !important;
          margin: 0.25em 0 !important;
          padding-left: 0 !important;
        }
        .rich-text-editor .editor-content ul ul {
          list-style-type: circle !important;
          margin: 0.25em 0 !important;
        }
        .rich-text-editor .editor-content ul ul ul {
          list-style-type: square !important;
        }
        .rich-text-editor .editor-content ol ol {
          list-style-type: lower-alpha !important;
        }
        .rich-text-editor .editor-content ol ol ol {
          list-style-type: lower-roman !important;
        }
      `}} />
    </div>
  );
};

export default RichTextEditor;
