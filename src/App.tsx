import './App.css';
import ErrorBoundary from '@/components/ErrorBoundary/ErrorBoundary.tsx';
import AppRoutes from '@/components/AppRoutes.tsx';

export default function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}
