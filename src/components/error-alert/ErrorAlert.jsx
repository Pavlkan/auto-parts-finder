import './ErrorAlert.css'

export const ErrorAlert = ({ message, onRetry }) => (
  <div
    className="alert alert-danger d-flex align-items-center justify-content-between gap-3 mx-5 mb-5"
    role="alert"
  >
    <span>{message}</span>

    <button type="button" className="btn btn-sm btn-outline-danger" onClick={onRetry}>
      Повторить
    </button>
  </div>
);