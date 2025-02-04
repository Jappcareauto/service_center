import { Audit } from "@/shared/model/Audit";

export interface File extends Audit {
    name: string;
    type: string;
    size: number;
    container: string;
}
