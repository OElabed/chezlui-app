export interface GroupCL {
  title: string;
  img: string;
  items: ItemCL[];
}

export interface ItemCL {
  tilte: string;
  description: string;
  price: number;
  active: boolean;
}
