import { Audit } from "./Audit";
import { MediaItem } from "./MediaItem";

export interface Media extends Audit {
    source: string;
    items: MediaItem[];
}
