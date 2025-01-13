import { Audit } from "./Audit";
import { Permission } from "./Pemission";

export interface UserPermission extends Audit {
    user: string;
    permission: Permission;
    itemId: string;
    itemType: string;
    expiration: string;
}
