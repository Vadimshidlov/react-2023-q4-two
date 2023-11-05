import React from 'react';
import './ErrorBoundary.scss';

interface State {
  error: Error | null;
}

interface Props {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children } = this.props;

    if (error) {
      return (
        <div className="error-boundary__container">
          <h2 className="error-boundary__title">It&apos;s Error Boundary</h2>
          <p className="error-boundary__message">{error.message}</p>
          <button
            className="error-boundary__reset"
            type="button"
            onClick={() => {
              window.location.reload();
            }}
          >
            Reset Error
          </button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
