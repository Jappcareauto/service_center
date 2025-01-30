import { Audit } from "./Audit";

export interface MediaItem extends Audit {
    sourceUrl: string;
    capturedUrl: string;
    type: string;
    media: string;
    file: File;
}
