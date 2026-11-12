import { useRef, useEffect} from 'react';
import './App.css';

import { BrandList } from './components/BrandList';
import { SearchInput } from './components/search-input/SearchInput';
import { RequestView } from './components/RequestView';
import { OffersTable } from './components/OffersTable';
import { usePartsSearch } from './hooks/usePartsSearch';


function App() {
  const { number, brand, brands, offers, search, selectBrand, retryBrands, retryOffers } = usePartsSearch();
  const brandsRef = useRef(null);
  const offersRef = useRef(null);

  const wasLoading = useRef(false);

  useEffect(() => {
    if (wasLoading.current && !brands.isLoading) {
      brandsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    wasLoading.current = brands.isLoading;
  }, [brands.isLoading]);

  useEffect(() => {
    if (wasLoading.current && !offers.isLoading) {
      offersRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }

    wasLoading.current = offers.isLoading;
  }, [offers.isLoading]);

  return (
    <main className='d-flex flex-column'>
      <section className="hero px-2 pt-2 px-md-4 pt-md-4 px-lg-5 pt-lg-5 text-left">
        <div className="hero__background" />

        <div className="hero__overlay" />

        <div className="hero__content d-flex flex-column gap-3 align-items-start">
          <h1 className='hero__content__title' style={{paddingBlockEnd: '25dvh'}}>Проценка</h1>

          <h2 className='hero__content__subtitle text-left'>
            Находите автозапчасти и аналоги всего в несколько кликов
          </h2>

          <SearchInput onSearch={search} />
        </div>
      </section>

      <RequestView
        contentRef={brandsRef}
        request={brands}
        loadingText="Ищем производителей…"
        emptyText={`По артикулу «${number}» ничего не найдено`}
        onRetry={retryBrands}
      >
        <BrandList brands={brands.data} selectedBrand={brand} onSelect={selectBrand} />
      </RequestView>

      <RequestView
        contentRef={offersRef}
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
