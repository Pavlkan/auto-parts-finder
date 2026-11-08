import { useRef, useState } from 'react';

const DEBOUNCE_MS = 500;
const MIN_QUERY_LENGTH = 3;

const toQuery = (value) => {
  const query = value.trim();

  // return query.length >= MIN_QUERY_LENGTH ? query : '';
  return query;
}

export const SearchInput = ({ onSearch }) => {
  const [autoPartNumber, setAutoPartNumber] = useState('');
  const timerRef = useRef(null);

  // const dispatch = useDispatch(); 

  // const fetchAutoPartBrands = async () => {
  //   const autoPartBrandsAPI = `${AUTO_BRANDS_API}&number=${autoPartArticle}`;

  //   try {
  //     const fetchedResponse = await fetch(autoPartBrandsAPI);
  //     const response = await fetchedResponse.json();
      
  //     const brands = response?.goods?.map((good) => good?.brand); //maybe filter by count
  //     setAutoPartBrandList(brands);
  //   } catch (error) {
  //     const errorMessage = error instanceof Error ? error.message : 'Error';
  //     throw new Error(errorMessage);
  //   }
  // }

  const handleChange = (event) => {
    const nextValue = event.target.value;
    setAutoPartNumber(nextValue);

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onSearch(toQuery(nextValue)), DEBOUNCE_MS);
  };

  return (
    <>
      <label htmlFor="part-number" className="form-label">
        Введите артикул детали
      </label>

      <input 
        id="part-number"
        type="search" 
        className="form-control form-control-lg"
        placeholder="Например, 7160500039S"
        autoComplete="off"
        autoFocus
        aria-describedby="part-number-hint"
        value={autoPartNumber}
        onChange={handleChange}
      />

      <div id="part-number-hint" className="form-text">
        {/* {isTooShort
          ? `Введите не менее ${MIN_QUERY_LENGTH} символов`
          : 'Поиск начнётся автоматически после ввода'} */}

          Поиск начнётся автоматически после ввода
      </div>
    </>
  )
} 