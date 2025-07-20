import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '../App.tsx'
import '../styles/globals.css'

// Error boundary component for production error handling
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('NeuroFlow UI Kit Error:', error, errorInfo);
    
    // Track error for analytics
    if (typeof window !== 'undefined' && (window as any).trackDemoEvent) {
      (window as any).trackDemoEvent('app_error', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center p-8">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-red-400 mb-2">Component Error</h1>
              <p className="text-muted-foreground mb-4">
                The NeuroFlow UI Kit encountered an unexpected error. This helps us improve the demo experience.
              </p>
              <div className="space-y-2">
                <button 
                  onClick={() => window.location.reload()}
                  className="w-full px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-medium transition-colors"
                >
                  Reload Demo
                </button>
                <button 
                  onClick={() => this.setState({ hasError: false, error: undefined })}
                  className="w-full px-4 py-2 bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/50 rounded-lg font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
            {this.state.error && process.env.NODE_ENV === 'development' && (
              <details className="text-left bg-muted/20 rounded-lg p-4 text-xs">
                <summary className="cursor-pointer text-muted-foreground mb-2">Error Details</summary>
                <pre className="whitespace-pre-wrap text-red-400">
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Performance monitoring
const startTime = performance.now();

// Initialize React App
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found. Make sure there is a div with id="root" in your HTML.');
}

const root = ReactDOM.createRoot(rootElement);

// Render App with Error Boundary
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// Performance tracking
window.addEventListener('load', () => {
  const loadTime = performance.now() - startTime;
  console.log(`NeuroFlow UI Kit loaded in ${loadTime.toFixed(2)}ms`);
  
  // Track performance
  if (typeof window !== 'undefined' && (window as any).trackDemoEvent) {
    (window as any).trackDemoEvent('app_performance', {
      loadTime,
      timestamp: new Date().toISOString()
    });
  }
});

// Development helpers
if (process.env.NODE_ENV === 'development') {
  // Hot reload error handling
  if (module.hot) {
    module.hot.accept('../App.tsx', () => {
      console.log('Hot reloading App component...');
    });
  }
  
  // Add development toolbar
  setTimeout(() => {
    const devToolbar = document.createElement('div');
    devToolbar.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        left: 20px;
        background: rgba(0, 0, 0, 0.8);
        color: #00d4ff;
        padding: 8px 12px;
        border-radius: 6px;
        font-family: 'Inter', monospace;
        font-size: 12px;
        font-weight: 500;
        z-index: 10000;
        border: 1px solid rgba(0, 212, 255, 0.3);
      ">
        🚀 DEV MODE
      </div>
    `;
    document.body.appendChild(devToolbar);
  }, 2000);
}

// Export for potential SSR or testing
export default App;