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

const sendEvent = (name, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, params);
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
  sendEvent(action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

// Track clicks (helper function)
export const trackClick = (elementName, elementType = 'button', additionalData = {}) => {
  sendEvent('click', {
    event_category: elementType,
    event_label: elementName,
    ...additionalData,
  });
};

// Track form submissions
export const trackFormSubmit = (formName, formType = 'contact', additionalData = {}) => {
  // Keeps legacy event for historical continuity
  sendEvent('submit', {
    event_category: 'form',
    event_label: formName,
    value: formType,
    ...additionalData,
  });

  // GA4 recommended conversion event
  sendEvent('generate_lead', {
    currency: 'USD',
    value: 1,
    lead_source: formType,
    form_name: formName,
    ...additionalData,
  });
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

// Track contact intent actions (email, phone, WhatsApp, etc.)
export const trackContact = (method, label = '', additionalData = {}) => {
  sendEvent('contact', {
    method,
    event_category: 'contact',
    event_label: label || method,
    ...additionalData,
  });
};

// Track key CTA interactions to monitor conversion funnel quality
export const trackCTA = (ctaName, location = 'unknown', additionalData = {}) => {
  sendEvent('select_content', {
    content_type: 'cta',
    item_id: ctaName,
    item_name: ctaName,
    location,
    ...additionalData,
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

