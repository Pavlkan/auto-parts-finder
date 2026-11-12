import { getGoods } from './client';

// "Not found" comes back as a single item with empty fields
const isFound = (item) => Boolean(item.brand);

const toOffer = ({ goodsID, brand, number, name, count, warehouses = [] }, isOriginal = false) => ({
  id: goodsID,
  brand,
  number,
  name,
  stock: count,
  price: warehouses.length ? Math.min(...warehouses.map((w) => w.price)) : null,
  isOriginal,
});

// Original part first, then items in stock, then the cheapest
const compareOffers = (a, b) => {
  if (a.isOriginal !== b.isOriginal) return a.isOriginal ? -1 : 1;

  const aInStock = a.stock > 0;
  const bInStock = b.stock > 0;
  if (aInStock !== bInStock) return aInStock ? -1 : 1;

  return (a.price ?? Infinity) - (b.price ?? Infinity);
};

export const fetchBrands = async ({ number }, options) => {
  const goods = await getGoods({ number }, options);

  return goods.filter(isFound).map(({ goodsID, brand, name }) => ({ id: goodsID, brand, name }));
};

export const fetchOffers = async ({ number, brand }, options) => {
  const goods = await getGoods({ number, brand, analogues: 'on' }, options);

  const offers = goods
    .filter(isFound)
    .flatMap((item) => [
      toOffer(item, true),
      ...(item.analogues ?? []).filter(isFound).map((analogue) => toOffer(analogue)),
    ]);

  return offers.sort(compareOffers);
};