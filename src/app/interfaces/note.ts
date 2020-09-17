export interface Note {
  id?: string;
  text: string;
  links?: Link[];
  archived: boolean;
  added: Date;
}

export interface Link {
  name: string;
  url: string;
}
