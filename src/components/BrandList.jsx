export const BrandList = ({ brands, selectedBrand, onSelect }) => (
  <section className="mb-4">
    <h2 className="h5">Выберите производителя</h2>

    <div className="list-group">
      {brands.map(({ id, brand, name }) => {
        const isSelected = brand === selectedBrand;

        return (
          <button
            key={id}
            type="button"
            className={`list-group-item list-group-item-action ${isSelected ? 'active' : ''}`}
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