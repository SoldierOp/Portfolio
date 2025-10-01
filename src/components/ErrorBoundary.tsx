import React, { Component, ReactNode } from 'react';
import { useAppStore } from '@stores/appStore';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Error boundary component for graceful error handling
 * Catches JavaScript errors anywhere in the component tree
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // Log error to store
    const { addError } = useAppStore.getState();
    addError({
      code: 'REACT_ERROR',
      message: error.message,
      details: {
        error: error.toString(),
        errorInfo: errorInfo.toString(),
        stack: error.stack,
      },
    });
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="error-screen">
          <div className="error-content">
            <h1>SYSTEM ERROR</h1>
            <p>An unexpected error has occurred.</p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-4 text-left">
                <summary className="cursor-pointer text-tactical-warning">
                  Error Details (Development)
                </summary>
                <pre className="mt-2 p-2 bg-tactical-darker rounded text-xs overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <button 
              className="tactical-button mt-4"
              onClick={() => window.location.reload()}
            >
              RESTART SYSTEM
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;



