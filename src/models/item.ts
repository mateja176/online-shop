export interface Item {
  article: Article;
  cart: Cart;
  user: User;
}

export interface Article {
  id: number;
  title: string;
  description_short: string;
  description_long: string;
  supplier_name: string;
  supplier_link: string;
  stars: number;
  price: number;
  price_breaks: { [key: string]: number };
  currency: string;
  transport_costs: number;
  vat_percent: number;
  images: string[];
  minimum_order_quantity: number;
  delivery_time: number;
  unit: string;
  features: Features;
  attachments: Attachment[];
  keywords: string[];
}

export interface Attachment {
  file_label: string;
  file_size: number;
  file_name: string;
  file_link: string;
}

export interface Features {
  'Feature 1': string;
  'Feature 2': string;
  'Feature 3': string;
}

export interface Cart {
  items: number;
  total_costs: number;
}

export interface User {
  favorite_articles: number[];
}
