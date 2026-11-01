import { useState } from 'react';
import './App.css';

const AUTO_BRANDS_API = 'http://api.favorit-parts.ru/hs/hsprice/?key=00000000-0000-0000-0000-000000000001';


function App() {
  const [autoPartArticle, setAutoPartArticle] = useState('');

  const [autoPartBrandsList, setAutoPartBrandsList] = useState([]);

  const [chosenAutoPartBrand, setChosenAutoPartBrand] = useState('');
  
  const [chosenAutoPart, setChosenAutoPart] = useState(null);

  const [chosenAutoPartAnalogues, setChosenAutoPartAnalogues] = useState([]);

  const controller = new AbortController();

  const fetchAutoPartBrands = async () => {
    const autoPartBrandsAPI = `${AUTO_BRANDS_API}&number=${autoPartArticle}`;

    try {
      const fetchedResponse = await fetch(autoPartBrandsAPI, { signal: controller.signal });
      const response = await fetchedResponse.json();
      
      const brands = response.goods.map((good) => good.brand); //maybe filter by count
      setAutoPartBrandsList(brands);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error';
      throw new Error(errorMessage);
    }
  }

  const fetchAutoPart = async () => {
    if (!chosenAutoPartBrand) {
      return;
    }

    const autoPartsAPI = `${AUTO_BRANDS_API}&number=${autoPartArticle}&brand=${chosenAutoPartBrand}&analogues=on`;

    try {
      const fetchedResponse = await fetch(autoPartsAPI);
      const response = await fetchedResponse.json();
      
      const autoPart = response.goods[0];
      setChosenAutoPart(autoPart);

      const autoPartAnalogues = autoPart.analogues;
      console.log('autoPartAnalogues', autoPartAnalogues);
      setChosenAutoPartAnalogues(autoPartAnalogues);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error';
      throw new Error(errorMessage);
    }
  }

  const handleFinderFormSubmit = (event) => {
    event.preventDefault();

    fetchAutoPartBrands();
  } 

  const handleBrandClick = (autoPartBrand) => {
    console.warn('autoPartBrand', autoPartBrand);
    setChosenAutoPartBrand(autoPartBrand);

    if (chosenAutoPartBrand) {
      fetchAutoPart();
    }
  }

  return (
    <div className='container d-flex flex-column gap-5'>
      <div className="mt-5">
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
      </div>

      {autoPartBrandsList.length > 0 && (
        <div className="mt-5">
          <h2 className='text-primary'>Выберите производителя</h2>

          <div className='d-flex flex-wrap gap-3'>
            {autoPartBrandsList.map((autoPartBrand, index) => (
              <button 
                key={index}
                className='btn border'
                onClick={() => handleBrandClick(autoPartBrand)}  
              >{autoPartBrand}</button>
            ))}
          </div>
        </div>
      )}

      {chosenAutoPart && (
        <div className="mt-5 border">
          <h2 className='text-primary'>Выбранная деталь</h2>
          
          <p>
            <b>Название:</b> {chosenAutoPart.name} / Производитель: {chosenAutoPart.brand}
          </p>

          <p>
            <b>Стоимость:</b> {chosenAutoPart.price}
          </p>

          <p>
            <b>Количество на складе:</b> {chosenAutoPart.count}
          </p>
        </div>
      )}

      {chosenAutoPartAnalogues.length > 0 && (
        <div>
          <h2 className='text-primary'>Аналоги</h2>

          <div className="d-flex flex-wrap gap-3 justify-content-center">
            {chosenAutoPartAnalogues.map((autoPartAnalogue, index) => (
              <div 
                className="border"
                style={{minWidth: '40%', maxWidth: '45%'}} 
                key={index}
              >
                <p>
                  <b>Название:</b> {autoPartAnalogue.name} / Производитель: {autoPartAnalogue.brand}
                </p>

                <p>
                  <b>Стоимость:</b> {autoPartAnalogue.price}
                </p>

                <p>
                  <b>Количество на складе:</b> {autoPartAnalogue.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
