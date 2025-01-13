import { Audit } from "./Audit";

export interface Location extends Audit {
    latitude: number;
    longitude: number;
    description: string;
    name: string;
}