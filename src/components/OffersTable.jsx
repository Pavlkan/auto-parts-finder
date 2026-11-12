const priceFormatter = new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' });

const OfferRow = ({ offer: { brand, number, name, price, stock, isOriginal } }) => (
  <tr className={isOriginal ? 'table-primary' : undefined}>
    <td className="fw-semibold">{brand}</td>

    <td>{number}</td>

    <td>
      {name}
      {isOriginal && <span className="badge text-bg-primary ms-2">Искомая деталь</span>}
    </td>

    <td className="text-end text-nowrap">
      {price === null ? '—' : priceFormatter.format(price)}
    </td>

    <td className="text-end text-nowrap">
      {stock > 0 ? `${stock} шт.` : <span className="text-secondary">нет в наличии</span>}
    </td>
  </tr>
);

export const OffersTable = ({ offers }) => (
  <section className="pb-5 px-2 px-md-4 px-lg-5">
    <h2 className="pb-3">
      Аналоги и предложения <span className="badge text-bg-secondary">{offers.length}</span>
    </h2>

    <div className="table-responsive border rounded">
      <table className="table table-hover align-middle mb-0">
        <thead>
          <tr>
            <th>Производитель</th>

            <th>Артикул</th>

            <th>Наименование</th>

            <th className="text-end">Цена</th>

            <th className="text-end">Остаток</th>
          </tr>
        </thead>
        
        <tbody>
          {offers.map((offer) => (
            <OfferRow key={offer.id} offer={offer} />
          ))}
        </tbody>
      </table>
    </div>
  </section>
);