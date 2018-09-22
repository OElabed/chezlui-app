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
  price: number;
  active: boolean;
  img: string;
  category: string;
}


export interface VipSettingsCL {
  delta: number;
  active: boolean;
}

export interface ItemPageData {
  modification: boolean,
  item: ItemCL
}
