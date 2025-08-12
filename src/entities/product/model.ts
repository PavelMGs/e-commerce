export interface ProductSpecs {
  display?: string;
  processor?: string;
  memory?: string;
  storage?: string;
  camera?: string;
  battery?: string;
  graphics?: string;
  type?: string;
  connectivity?: string;
  features?: string;
  water?: string;
  drivers?: string;
  compatibility?: string;
  charging?: string;
  latency?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  inStock: boolean;
  description?: string;
  brand?: string;
  specs?: ProductSpecs;
}
