import { Audit } from "@/shared/model/Audit";
import { Garage } from "@/shared/model/Garage";
import { Location } from "@/shared/model/Location";
import { PaymentOption } from "@/shared/model/PaymentOption";
import { Phone } from "@/shared/model/Phone";
import { UserPermission } from "@/shared/model/UserPermission";
import { UserRole } from "@/shared/model/UserRole";
import { VerificationCode } from "@/shared/model/VerificationCode";

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
