import { getItem } from 'effects';
import { Item } from 'models';
import { useEffect, useState } from 'react';

export const useItem = () => {
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    getItem().then(setItem);
  }, []);

  return item;
};
