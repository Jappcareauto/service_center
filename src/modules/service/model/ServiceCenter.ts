import { User } from "@/modules/user/models/User";
import { Audit } from "../../../shared/model/Audit";
import { File } from "../../../shared/model/FIle";

export interface ServiceCenter extends Audit {
    name: string;
    category: string;
    location: Location;
    owner: User;
    image: File;
}