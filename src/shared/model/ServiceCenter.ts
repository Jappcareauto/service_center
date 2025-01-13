import { Audit } from "./Audit";
import { File } from "./FIle";
import { User } from "./User";

export interface ServiceCenter extends Audit {
    name: string;
    category: string;
    location: Location;
    owner: User;
    image: File;
}