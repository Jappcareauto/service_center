import { Audit } from "./Audit";
import { Role } from "./Role";

export interface UserRole extends Audit {
    user: string;
    role: Role;
}
