export interface GroupCL {
  uuid: string;
  title: string;
  type: string;
  img: string;
  items: ItemCL[];
}

export interface ItemCL {
  uuid: string;
  tilte: string;
  description: string;
  price_vip: number;
  price: number;
  active: boolean;
  img: PhotoData;
  category: string;
}

export interface VipSettingsCL {
  active: boolean;
}

export interface ItemPageData {
  modification: boolean;
  item: ItemCL;
}

export interface PhotoData {
  id: string;
  type: string;
  path: string;
}
