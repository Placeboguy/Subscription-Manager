import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-screen bg-red-50 dark:bg-red-900 p-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <details className="bg-gray-100 dark:bg-gray-700 p-3 rounded mb-4 max-h-40 overflow-auto">
              <summary className="cursor-pointer font-semibold text-gray-800 dark:text-gray-200">
                Error Details
              </summary>
              <pre className="text-xs text-gray-600 dark:text-gray-400 mt-2 whitespace-pre-wrap">
                {this.state.error?.stack}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="w-full px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
