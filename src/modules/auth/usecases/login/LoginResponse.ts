import { Roles } from "../../models/Roles"
import { Permissions } from '../../models/Permissions';

export interface LoginResponse{
  userId: string,
  authorities: {
    roles: Roles,
    permissions: Permissions[]
  }
}