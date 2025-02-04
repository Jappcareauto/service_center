import Avatar from "@/shared/generics/Avatar";
import ChevronDown from "@/shared/generics/menu/icons/ChevronDown";
import { BilledToUser } from "../../model/BilelledUser";
import { FC } from "react";
type Props = {
  user: BilledToUser;
  title?: string;
};
const InvoiceBillingCard: FC<Props> = ({ user, title }) => {
  return (
    <div className="mt-5  ">
      <h2 className="font-normal ">{title} </h2>
      <div className="border-2 rounded-xl min-h-40 p-2 flex flex-col justify-center border-grey3">
        <div className="flex justify-between">
          <Avatar name={user.name} className="h-8 w-8" />
          <ChevronDown />
        </div>
        <ul className="space-y-1 mt-1">
          {/* <li className="font-normal">
            Deido, Douala ,Cameroun
            </li> */}
          <li className="font-normal">{user?.phoneNumber} </li>
          <li className="font-normal">{user.email} </li>
        </ul>
      </div>
    </div>
  );
};

export default InvoiceBillingCard;
