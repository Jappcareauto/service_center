import { Audit } from "@/shared/model/Audit";

export interface ChatRoomModel extends Audit {
  id: string;
  name: string;
  participentIds: string[];
}
