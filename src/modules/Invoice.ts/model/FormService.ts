import { ServiceItem } from "./ServiceItem";

export interface FormService {
  item:ServiceItem[]
  totalItems: number;
  totalPrices: number;
  tauxAmount : number
}
