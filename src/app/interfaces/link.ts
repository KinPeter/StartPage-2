export interface Link {
  id?: string;
  name: string;
  url: string;
  tags: string[];
}

export interface Tag {
  tag: string;
  name: string;
}
