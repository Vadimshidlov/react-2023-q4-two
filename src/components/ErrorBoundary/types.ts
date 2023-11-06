export interface ErrorBoundaryState {
  error: Error | null;
}

export interface ErrorBoundaryProps {
  children: React.ReactNode;
}
