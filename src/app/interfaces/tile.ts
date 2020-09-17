export interface Tile {
  id?: string;
  category: string;
  icon: string;
  link: string;
  name: string;
  priority: number;
}

export interface Tiles {
  top: Tile[];
  coding: Tile[];
  google: Tile[];
  fun: Tile[];
  others: Tile[];
}
