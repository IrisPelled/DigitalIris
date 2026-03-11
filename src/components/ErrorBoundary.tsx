import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("App error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#020617] p-6 text-white">
          <h1 className="font-space-grotesk text-xl font-bold text-magenta">
            Something went wrong
          </h1>
          <p className="mt-2 font-space-grotesk text-sm text-muted-slate">
            {this.state.error.message}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-lg border-2 border-cyan/80 bg-cyan/20 px-4 py-2 font-space-grotesk text-sm font-medium hover:bg-cyan/30"
          >
            Reload page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
