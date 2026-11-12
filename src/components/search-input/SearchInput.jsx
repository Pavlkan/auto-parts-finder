import { useRef, useState } from 'react';
import './SearchInput.css';

const DEBOUNCE_MS = 500;

const toQuery = (value) => {
  const query = value.trim();
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
    <div className="search__container d-flex flex-column gap-1 align-items-start">
      <input 
        id="part-number"
        type="search" 
        className="search__input form-control form-control-lg"
        placeholder="Введите артикул..."
        autoComplete="off"
        autoFocus
        aria-describedby="part-number-hint"
        value={partNumber}
        onChange={handleChange}
      />

      <div id="part-number-hint" className="form-text" style={{color: 'inherit'}}>
          Поиск начнётся автоматически после ввода
      </div>
    </div>
  )
} 