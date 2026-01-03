// Google Analytics utility functions

export const GA_TRACKING_ID = 'G-9EB3988689';

// Initialize dataLayer
export const initGA = () => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_path: window.location.pathname,
    });
  }
};

// Track page views
export const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track events
export const event = ({ action, category, label, value }) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track clicks (helper function)
export const trackClick = (elementName, elementType = 'button', additionalData = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'click', {
      event_category: elementType,
      event_label: elementName,
      ...additionalData,
    });
  }
};

// Track form submissions
export const trackFormSubmit = (formName, formType = 'contact', additionalData = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'submit', {
      event_category: 'form',
      event_label: formName,
      value: formType,
      ...additionalData,
    });
  }
};

// Track outbound links
export const trackOutboundLink = (url, linkText) => {
  event({
    action: 'click',
    category: 'outbound_link',
    label: linkText || url,
    value: url,
  });
};

// Track downloads
export const trackDownload = (fileName, fileType) => {
  event({
    action: 'download',
    category: 'file',
    label: fileName,
    value: fileType,
  });
};

// Track video interactions
export const trackVideo = (action, videoName) => {
  event({
    action: action, // play, pause, complete, etc.
    category: 'video',
    label: videoName,
  });
};

// Track scroll depth
export const trackScroll = (depth) => {
  event({
    action: 'scroll',
    category: 'engagement',
    label: `${depth}%`,
    value: depth,
  });
};

