export const BrandList = ({ brands, selectedBrand, onSelect }) => (
  <section className="py-5 px-2 px-md-4 px-lg-5 brand-list">
    <h2 className="pb-3">Выберите производителя</h2>

    <div className="list-group">
      {brands.map(({ id, brand, name }) => {
        const isSelected = brand === selectedBrand;

        return (
          <button
            key={id}
            type="button"
            className={`brand-list__button list-group-item list-group-item-action ${isSelected ? 'active' : ''}`}
            aria-current={isSelected}
            onClick={() => onSelect(brand)}
          >
            <strong>{brand}</strong>

            <span className="ms-2">{name}</span>
          </button>
        );
      })}
    </div>
  </section>
);