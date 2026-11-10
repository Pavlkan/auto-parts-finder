import './App.css';

import { BrandList } from './components/BrandList';
import { SearchInput } from './components/SearchInput';
import { RequestView } from './components/RequestView';
import { OffersTable } from './components/OffersTable';
import { usePartsSearch } from './hooks/usePartsSearch';

export const AUTO_BRANDS_API = 'http://api.favorit-parts.ru/hs/hsprice/?key=00000000-0000-0000-0000-000000000001';


function App() {
  const { partNumber, brand, brands, offers, search, selectBrand, retryBrands, retryOffers } = usePartsSearch();

  return (
    <main className='container d-flex flex-column gap-5'>
      <h1 className="h3 mb-4">Поиск автозапчастей</h1>

      <SearchInput onSearch={search}/>

      <RequestView
        request={brands}
        loadingText="Ищем производителей…"
        emptyText={`По артикулу «${partNumber}» ничего не найдено`}
        onRetry={retryBrands}
      >
        <BrandList brands={brands.data} selectedBrand={brand} onSelect={selectBrand} />
      </RequestView>

      <RequestView
        request={offers}
        loadingText="Загружаем аналоги и предложения…"
        emptyText="Предложений по выбранной детали не найдено"
        onRetry={retryOffers}
      >
        <OffersTable offers={offers.data} />
      </RequestView>
    </main>
  );
}

export default App;
