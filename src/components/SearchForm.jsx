import { useState, useEffect } from 'react';

import { AUTO_BRANDS_API } from '../App';
import { useDispatch } from 'react-redux';

export const SearchForm = ({setAutoPartBrandsList}) => {
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

  const handleFinderFormSubmit = (event) => {
    event.preventDefault();

    fetchAutoPartBrands();
  }

  const fetchAutoPartBrands = async () => {
    const autoPartBrandsAPI = `${AUTO_BRANDS_API}&number=${autoPartArticle}`;

    try {
      const fetchedResponse = await fetch(autoPartBrandsAPI);
      const response = await fetchedResponse.json();
      
      const brands = response.goods.map((good) => good.brand); //maybe filter by count
      setAutoPartBrandsList(brands);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error';
      throw new Error(errorMessage);
    }
  }

  return (
    <>
      <h1 className="text-primary">Введите артикул и найдите нужную деталь</h1>

      <form className="d-flex gap-3" onSubmit={handleFinderFormSubmit}>
        <input 
          className="form-control col"
          type="text" 
          name='autoParts'
          value={autoPartArticle}
          onChange={(e) => setAutoPartArticle(e.target.value)}
          required
          />

        <button className="btn btn-primary col-md-auto" type='submit'>Найти деталь</button>
      </form>
    </>
  )
} 