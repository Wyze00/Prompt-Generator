export interface NavLink {
  name: string;
  path: string;
  children?: NavLink[]; 
}