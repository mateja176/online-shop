import { Item } from 'models';
import { useEffect, useState } from 'react';
import { getItem } from 'services';

export const useItem = () => {
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    getItem().then(setItem);
  }, []);

  return item;
};
