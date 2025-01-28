import React, { ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps {
  children: ReactNode; // Specifies the children of the component
}

interface ErrorBoundaryState {
  hasError: boolean; // Tracks whether an error has occurred
  error?: Error; // Stores the error object
  errorInfo?: ErrorInfo; // Stores additional error details
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined, errorInfo: undefined };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state to show the fallback UI when an error occurs
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error details for debugging or reporting
    console.error("Error Caught by ErrorBoundary:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;

      // Render a fallback UI with error details
      return (
        <div className="flex items-center justify-center   bg-gray-100">
          <div className="max-w-4xl p-6 bg-white shadow-lg rounded-2xl text-center">
            <h1 className="text-4xl font-bold text-red-600">Something went wrong</h1>
            <p className="mt-4 text-gray-600">
              An error occurred while rendering this page. Here are the details:
            </p>
            <div className="mt-4 p-4 bg-gray-100 text-left rounded-lg border overflow-y-scroll border-gray-300 text-sm text-gray-800">
              <strong>Error:</strong> {error?.message || "Unknown error"} <br />
              <strong>Stack Trace:</strong>
              <pre className="mt-2 overflow-x-auto whitespace-pre-wrap">
                {errorInfo?.componentStack || "No stack trace available."}
              </pre>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
