import { ErrorAlert } from './ErrorAlert';
import { Loader } from './Loader';

export const RequestView = ({ request, loadingText, emptyText, onRetry, children }) => {
  const { data, isLoading, error } = request;

  if (isLoading) return <Loader text={loadingText} />;

  if (error) return <ErrorAlert message={error} onRetry={onRetry} />;

  if (!data) return null;
  
  if (data.length === 0) return <div className="alert alert-secondary">{emptyText}</div>;

  return children;
};