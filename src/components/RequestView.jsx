import { ErrorAlert } from './error-alert/ErrorAlert';
import { Loader } from './loader/Loader';

export const RequestView = ({ request, loadingText, emptyText, onRetry, children, contentRef }) => {
  const { data, isLoading, error } = request;


  if (isLoading && data && !error) return (
    <>
      <Loader text={loadingText} />

      {children}
    </>
  );

  if (isLoading && data === null) return <Loader text={loadingText} />;

  if (error) return (
    <div ref={contentRef}>
      <ErrorAlert message={error} onRetry={onRetry} />
    </div>
  );

  if (!data) return null;
  
  if (data.length === 0) return <div ref={contentRef} className="alert alert-secondary">{emptyText}</div>;

  return (
    <div ref={contentRef}>
      {children}
    </div>
  ); 
};