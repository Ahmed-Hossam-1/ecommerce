export interface Column {
  key: string;
  title: string;
}

export interface DataItem {
  [key: string]: string | number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}
