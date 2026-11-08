import { useState, useEffect } from 'react';

import { AUTO_BRANDS_API } from '../App';
import { useDispatch } from 'react-redux';

export const SearchInput = ({setAutoPartBrandList}) => {
  const [autoPartArticle, setAutoPartArticle] = useState('');

  const dispatch = useDispatch(); 

  useEffect(() => {
    const trimmedAutoPartArticle = autoPartArticle.trim();

    if (!trimmedAutoPartArticle) {
      return;
    }

    const timeoutId = setTimeout(() => dispatch(fetchAutoPartBrands(trimmedAutoPartArticle)), 1000);

    return () => clearTimeout(timeoutId);
  }, [autoPartArticle, dispatch]);

  const fetchAutoPartBrands = async () => {
    const autoPartBrandsAPI = `${AUTO_BRANDS_API}&number=${autoPartArticle}`;

    try {
      const fetchedResponse = await fetch(autoPartBrandsAPI);
      const response = await fetchedResponse.json();
      
      const brands = response?.goods?.map((good) => good?.brand); //maybe filter by count
      setAutoPartBrandList(brands);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error';
      throw new Error(errorMessage);
    }
  }

  return (
    <>
      <h1 className="text-primary">Введите артикул и найдите нужную деталь</h1>

      <input 
        className="form-control col"
        type="text" 
        name='auto-parts'
        value={autoPartArticle}
        onChange={(e) => setAutoPartArticle(e.target.value)}
        required
      />
    </>
  )
} 