import { Audit } from "./Audit";
import { File } from "./FIle";
import { Garage } from "./Garage";
import { PaymentOption } from "./PaymentOption";
import { Phone } from "./Phone";
import { UserPermission } from "./UserPermission";
import { UserRole } from "./UserRole";
import { VerificationCode } from "./VerificationCode";

export interface User extends Audit {
    name: string;
    email: string;
    password: string;
    verified: string;
    passwordExpiry: string;
    dateOfBirth: string;
    provider: string;
    location: Location;
    phones: Phone[];
    roles: UserRole[];
    permissions: UserPermission[];
    garages: Garage[];
    verificationCodes: VerificationCode[];
    paymentOptions: PaymentOption[];
    profileImage: File;
}