import {ProductType} from '../../types';

export const filterData = (product: ProductType, quantity: number) => {
  const {id, title, price, stock, discountPercentage, thumbnail} = product;

  const total = quantity * price;
  const discountedTotal = total - total * (discountPercentage / 100);

  return {
    id,
    title,
    price,
    stock,
    quantity,
    total,
    discountPercentage,
    discountedTotal,
    thumbnail,
  };
};
