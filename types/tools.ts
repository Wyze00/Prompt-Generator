import type { ITool } from './interfaces'

export interface Categories {
  name: string;
  basePath: string;
  data: Tools;
}

export interface Tools {
    [name: string]: ITool | Tools;
}