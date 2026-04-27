export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  collection: 'Kite' | 'Denim' | 'Parachute';
  materials: string;
  colourPattern: string;
  slug: string;
  imageUrl: string;
  images: string[];
  inStock: boolean;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'mock-1',
    name: 'Cooler Bag',
    description: 'A sturdy, insulated cooler bag handcrafted from collected kite fabric. Each one is unique — the colours and patterns are determined by whatever kites we collected that season.',
    price: 1000,
    collection: 'Kite',
    materials: 'Collected kite ripstop nylon, recycled insulating liner',
    colourPattern: 'lumo lime',
    slug: 'cooler-bag-lumo-lime',
    imageUrl: '/images/product-cooler-boxes.jpg',
    images: ['/images/product-cooler-boxes.jpg'],
    inStock: true,
  },
  {
    id: 'mock-2',
    name: 'Denim Jacket',
    description: 'A one-of-a-kind jacket made from upcycled denim. Thick, durable and beautifully worn — no two are alike. Sewn by hand at the Sewing Café in Masiphumelele.',
    price: 2000,
    collection: 'Denim',
    materials: 'Upcycled denim',
    colourPattern: 'blue',
    slug: 'denim-jacket-blue',
    imageUrl: '/images/product-denim-jacket.jpg',
    images: ['/images/product-denim-jacket.jpg'],
    inStock: true,
  },
  {
    id: 'mock-3',
    name: 'Parachute Handbag',
    description: 'Lightweight and surprisingly spacious, this handbag is cut from decommissioned parachute fabric. The ripstop weave makes it tough enough for everyday use.',
    price: 2500,
    collection: 'Parachute',
    materials: 'Rescued parachute nylon, brass hardware',
    colourPattern: 'yellow',
    slug: 'parachute-handbag-yellow',
    imageUrl: '/images/product-parachute-handbag.jpeg',
    images: ['/images/product-parachute-handbag.jpeg'],
    inStock: false,
  },
];

export async function getProducts(): Promise<Product[]> {
  const apiKey  = import.meta.env.AIRTABLE_API_KEY;
  const baseId  = import.meta.env.AIRTABLE_BASE_ID;
  const tableId = import.meta.env.AIRTABLE_TABLE_NAME ?? 'Products';

  if (!apiKey || !baseId) {
    return MOCK_PRODUCTS;
  }

  const res = await fetch(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableId)}`,
    { headers: { Authorization: `Bearer ${apiKey}` } }
  );

  if (!res.ok) {
    console.error('Airtable fetch failed:', res.status, await res.text());
    return MOCK_PRODUCTS;
  }

  const json = await res.json();

  return json.records.map((r: any): Product => ({
    id:           r.id,
    name:         r.fields['Name'] ?? '',
    description:  r.fields['Description'] ?? '',
    price:        r.fields['Price in ZAR'] ?? 0,
    collection:   r.fields['Collection'] ?? 'Kite',
    materials:    r.fields['Materials'] ?? '',
    colourPattern: r.fields['Colour / Pattern'] ?? '',
    slug:         r.fields['Slug'] ?? '',
    imageUrl:     r.fields['Images']?.[0]?.thumbnails?.large?.url ?? r.fields['Images']?.[0]?.url ?? '',
    images:       (r.fields['Images'] ?? []).map((img: any) => img.thumbnails?.large?.url ?? img.url),
    inStock:      r.fields['In Stock'] ?? false,
  }));
}
