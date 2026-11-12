import './Loader.css'

export const Loader = ({ text }) => {
  return (
    <div className="loader d-flex align-items-center gap-2 py-3 text-secondary" role="status">
      <div className="loader__spinner spinner-border spinner-border-sm" aria-hidden="true" />

      <span className="loader__text">{text}</span>
    </div>
  )
};


// Could be used with loader
export const ContentSkeleton = () => {
  return (
    <div className='placeholder-glow m-5 mt-0'>
      <h2 className="placeholder pb-3 rounded" style={{width: '30%', height: '5dvh'}}></h2>

      <div className='placeholder rounded-top' style={{width: '100%', height: '10dvh'}}></div>
      <div className='placeholder border-top' style={{width: '100%', height: '10dvh'}}></div>
      <div className='placeholder border-top' style={{width: '100%', height: '10dvh'}}></div>
      <div className='placeholder border-top rounded-bottom' style={{width: '100%', height: '10dvh'}}></div>
    </div>
  )
} 