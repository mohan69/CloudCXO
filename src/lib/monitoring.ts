// Production Monitoring and Analytics
interface AnalyticsEvent {
  name: string;
  properties?: Record<string, unknown>;
}

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
}

class MonitoringService {
  private isProduction = import.meta.env.PROD;
  private gaTrackingId = import.meta.env.VITE_GA_TRACKING_ID;
  private sentryDsn = import.meta.env.VITE_SENTRY_DSN;

  constructor() {
    if (this.isProduction) {
      this.initializeTracking();
    }
  }

  private initializeTracking() {
    // Initialize Google Analytics if tracking ID is provided
    if (this.gaTrackingId) {
      this.initializeGA();
    }

    // Initialize performance monitoring
    this.initializePerformanceMonitoring();
    
    // Track page loads
    this.trackPageLoad();
  }

  private initializeGA() {
    // Load Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaTrackingId}`;
    document.head.appendChild(script);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    }
    window.gtag = gtag;

    gtag('js', new Date());
    gtag('config', this.gaTrackingId, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }

  private initializePerformanceMonitoring() {
    // Monitor Core Web Vitals
    if ('web-vital' in window) {
      // This would integrate with web-vitals library if installed
      this.trackWebVitals();
    }

    // Monitor network errors
    window.addEventListener('error', (event) => {
      this.trackError({
        type: 'javascript_error',
        message: event.error?.message || 'Unknown error',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
      });
    });

    // Monitor unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.trackError({
        type: 'unhandled_promise_rejection',
        message: event.reason?.message || 'Unhandled promise rejection',
        stack: event.reason?.stack,
      });
    });
  }

  private trackWebVitals() {
    // Monitor First Contentful Paint (FCP)
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          this.trackPerformance({
            name: 'first_contentful_paint',
            value: entry.startTime,
            unit: 'ms'
          });
        }
      }
    }).observe({ entryTypes: ['paint'] });

    // Monitor Largest Contentful Paint (LCP)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.trackPerformance({
        name: 'largest_contentful_paint',
        value: lastEntry.startTime,
        unit: 'ms'
      });
    }).observe({ entryTypes: ['largest-contentful-paint'] });
  }

  private trackPageLoad() {
    window.addEventListener('load', () => {
      // Track page load time
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.trackPerformance({
          name: 'page_load_time',
          value: navigation.loadEventEnd - navigation.fetchStart,
          unit: 'ms'
        });
      }
    });
  }

  // Public methods for tracking
  trackEvent(event: AnalyticsEvent) {
    if (!this.isProduction) {
      console.log('Analytics Event (Dev):', event);
      return;
    }

    // Send to Google Analytics
    if (window.gtag) {
      window.gtag('event', event.name, event.properties);
    }

    // Send to other analytics services
    this.sendToAnalyticsServices(event);
  }

  trackError(error: unknown) {
    if (!this.isProduction) {
      console.error('Error tracked (Dev):', error);
      return;
    }

    // Send to error tracking service
    if (this.sentryDsn) {
      // This would integrate with Sentry if configured
      console.error('Error logged to Sentry:', error);
    }

    // Track as analytics event with safe property access
    const errorObj = error as Record<string, unknown>;
    this.trackEvent({
      name: 'error_occurred',
      properties: {
        error_type: errorObj.type || 'unknown',
        error_message: errorObj.message || 'Unknown error',
        error_stack: errorObj.stack || '',
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      }
    });
  }

  trackPerformance(metric: PerformanceMetric) {
    if (!this.isProduction) {
      console.log('Performance Metric (Dev):', metric);
      return;
    }

    this.trackEvent({
      name: 'performance_metric',
      properties: {
        metric_name: metric.name,
        metric_value: metric.value,
        metric_unit: metric.unit,
      }
    });
  }

  trackUserAction(action: string, properties?: Record<string, unknown>) {
    this.trackEvent({
      name: 'user_action',
      properties: {
        action,
        ...properties,
        timestamp: new Date().toISOString(),
      }
    });
  }

  trackAuthEvent(event: 'login' | 'logout' | 'login_failed') {
    this.trackEvent({
      name: 'auth_event',
      properties: {
        event_type: event,
        timestamp: new Date().toISOString(),
      }
    });
  }

  trackPageView(path: string, title?: string) {
    if (!this.isProduction) {
      console.log('Page View (Dev):', { path, title });
      return;
    }

    if (window.gtag) {
      window.gtag('config', this.gaTrackingId, {
        page_path: path,
        page_title: title || document.title,
      });
    }
  }

  private sendToAnalyticsServices(event: AnalyticsEvent) {
    // Implement integration with other analytics services
    // Example: Mixpanel, Amplitude, etc.
  }
}

// Global monitoring instance
export const monitoring = new MonitoringService();

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export default monitoring;