import { QueryKey } from "react-query";
import { number } from "yup";

export type CollectionsQueryOptionsType = {
  text?: string;
  collection?: string;
  status?: string;
  limit?: number;
};

export type CategoriesQueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
  demoVariant?: "ancient";
};
export type ProductsQueryOptionsType = {
  type: string;
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};
export type QueryOptionsType = {
  text?: string;
  color?: string;
  category?: string;
  status?: string;
  limit?: number;
  demoVariant?: "ancient";
};

export type FilterQueryType = {
  diamondShapeData?: FilterDataType[];
  shopByStyle?: FilterDataType[];
  settingStyleData?: FilterDataType[];
  metalToneData?: FilterDataType[];
};

export type FilterDataType = {
  id?: number;
  image_path?: string;
  name?: string;
  slug?: string;
};

export type ShopsQueryOptionsType = {
  text?: string;
  shop?: Shop;
  status?: string;
  limit?: number;
};

export type QueryParamsType = {
  queryKey: QueryKey;
  pageParam?: string;
};
export type Attachment = {
  id: string | number;
  thumbnail: string;
  original: string;
};
export type Category = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  tag?: Tag[];
  productCount?: number;
};
export type Collection = {
  id: number | string;
  name: string;
  slug: string;
  details?: string;
  image?: Attachment;
  icon?: string;
  products?: Product[];
  productCount?: number;
};

export type Process = {
  id: number | string;
  name: string;
  slug: string;
  text?: string;
  image?: string;
  Button?: string;
  tags?: string[];
};

export type Brand = {
  id: number | string;
  name: string;
  color: string;
  slug: string;
  image?: Attachment;
  background_image?: any;
  [key: string]: unknown;
};
export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};
export type newArrivel = {
  data: newArrivelData[];
};
export type newArrivelData = {
  id: number;
  name: string;
  sku: string;
  sort_description: string;
  long_description: string;
  setting_style_type: string;
  image_metal_tone: number;
  metal_id: number;
  diamond_shape_id: string;
  diamond_price: number;
  metal_price: string;
  total_price: number;
};

export type PropsData = {
  data?: newArrivel;
  error?: any;
  isLoading?: any;
};

export type Product = {
  id: number;
  name: string;
  sku: string;
  sort_description: string;
  long_description: string;
  metal_id: number;
  diamond_price: number;
  metal_price: string;
  total_price: number;
  data?: any;
  selectedShape: string;
};

export type Settings = {
  id: number | string;
  carats: number | string;
  slug: string;
  color: string;
  clarity: string;
  cut: string;
  image: Attachment;
  price: number;
  sale_price?: number;
};

export type OrderItem = {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
};
export type ProcessSection = {
  id: number;
  name: string;
  slug: string;
  text: string;
  Button: string;
  image: string;
  tags: string[];
};

export type HomeBanner = {
  id: number;
  name: string;
  target_url: string;
  created_date: string;
  content: string;
  image_path: string;
};

export type Order = {
  id: string | number;
  name: string;
  slug: string;
  products: OrderItem[];
  total: number;
  tracking_number: string;
  customer: {
    id: number;
    email: string;
  };
  shipping_fee: number;
  payment_gateway: string;
};

export type Shop = {
  id: string | number;
  owner_id: string | number;
  owner_name: string;
  address: string;
  phone: string;
  website: string;
  ratings: string;
  name: string;
  slug: string;
  description: string;
  cover_image: Attachment;
  logo: Attachment;
  socialShare: any;
  created_at: string;
  updated_at: string;
};

export interface BannerList {
  code: number;
  status: string;
  message: string;
  data: BannerListData;
}

export interface mobile {
  height: number;
  width: number;
}
export interface desktop {
  height: number;
  width: number;
}

export type BannerListData = {
  totalItems: number;
  result: result[];
};

export type result = {
  id: number;
  name: string;
  target_url: string;
  created_date: string;
  content: null;
  image_path: string;
};

export type BlogData = {
  data: BlogsData[];
};

export type BlogsData = {
  id: number;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  slug: string;
  description: string;
  author: string;
  publish_date: string;
  image_path: string;
  banner_image_path: string;
  title: string;
};

export type DetailProduct = {
  data: ProductData;
};
export type ProductDetails = {
  data: DetailProduct;
};

export type ProductData = {
  products: ProductsData;
  size: ProductSize[];
  diamond_shape: ProductDetailDiamodShape[];
  metal_tone: ProductDetailMetalTone[];
  metal_karat: ProductDetailMetalKarat[];
  metals: ProductDetailMetal[];
  center_diamond_details: DiamondDetail[]
};

export type ProductSize = {
  id: number;
  size: number;
};
export type ProductsData = {
  id: number;
  name: string;
  sku: string;
  sort_description: string;
  long_description: string;
  making_charge: string;
  finding_charge: string;
  other_charge: string;
  size: number[];
  lenght: number[];
  PDO: ProductDetailPDO[];
  PMO: ProductDetailPMO[] |  ProductDetailPMO ;
  product_images: ProductDetailImage[];
  total_diamond_weight: string
};

export type ProductDetailPDO = {
  id: number;
  id_diamond_group: number;
  weight: string;
};

export type ProductDetailPMO = {
  id_metal: number;
  metal_tone: number[];
  Price: number;
  id_karat: number;
  sort_code : string
};
export type ProductDetailDiamodShape = {
  id: number;
  name: string;
  image_path: string;
};

export type ProductDetailImage = {
  image_path: string;
  id_metal_tone: number;
  image_type: number;
};

export type ProductDetailMetalTone = {
  id: number;
  name: string;
  sort_code: string;
  image_path: string;
};

export type ProductDetailMetalKarat = {
  id: number;
  name: string;
  image_path: string;
};

export type ProductDetailMetal = {
  id: number;
  name: string;
};
export type DiamondDetail = {
  
  diamond: string;
  shape: string;
  mm_size: string;
  diamond_color: string;
  diamond_clarity: string;
  diamond_cut: string;
  weight: string;
}

export enum ProductImageType {
  RingImage = 1,
  RotatingImage = 3,
  RingVideo = 4,
}

export type wishListData = {
    data: wishListProduct[]
}

export type wishListProduct = {

  id: number;
  name: string
  sku: string
  sort_description: string 
  long_description: string
  product_images: ProductDetailImage[]

}
