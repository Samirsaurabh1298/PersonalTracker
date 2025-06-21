import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = "Loading weather data..." }: LoadingStateProps) {
  return (
    <div className="loading-container">
      <Loader2 className="loading-spinner" />
      <p>{message}</p>
    </div>
  );
}
