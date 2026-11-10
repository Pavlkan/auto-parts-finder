import { useRef, useState } from 'react';

const DEBOUNCE_MS = 500;
const MIN_QUERY_LENGTH = 3;

const toQuery = (value) => {
  const query = value.trim();

  // return query.length >= MIN_QUERY_LENGTH ? query : '';
  return query;
}

export const SearchInput = ({ onSearch }) => {
  const [partNumber, setPartNumber] = useState('');
  const timerRef = useRef(null);

  const handleChange = (event) => {
    const nextValue = event.target.value;
    setPartNumber(nextValue);

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onSearch(toQuery(nextValue)), DEBOUNCE_MS);
  };

  return (
    <div className="d-flex flex-column gap-1 align-items-start">
      <input 
        id="part-number"
        type="search" 
        className="form-control form-control-lg"
        placeholder="Введите артикул..."
        autoComplete="off"
        autoFocus
        aria-describedby="part-number-hint"
        value={partNumber}
        onChange={handleChange}
      />

      <div id="part-number-hint" className="form-text">
        {/* {isTooShort
          ? `Введите не менее ${MIN_QUERY_LENGTH} символов`
          : 'Поиск начнётся автоматически после ввода'} */}

          Поиск начнётся автоматически после ввода
      </div>
    </div>
  )
} 