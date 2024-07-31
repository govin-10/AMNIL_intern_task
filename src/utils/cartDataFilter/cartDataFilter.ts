import {ProductType} from '../../types';

export const filterData = (product: ProductType, quantity: number) => {
  const {id, title, price, discountPercentage, thumbnail} = product;

  const total = quantity * price;
  const discountedTotal = total - total * (discountPercentage / 100);

  return {
    id,
    title,
    price,
    quantity,
    total,
    discountPercentage,
    discountedTotal,
    thumbnail,
  };
};
