export type Root = RootElement[]

export interface RootElement {
  name: string;
  children: RootChild[];
}

export interface RootChild {
  name: string;
  children: ChildChild[];
}

export interface ChildChild {
  id: number;
  title: string;
  short: string;
}
