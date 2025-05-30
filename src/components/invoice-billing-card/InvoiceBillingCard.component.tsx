import { FC } from "react";
import Avatar from "../avatar/Avatar.component";
import { InvoiceBillingCardProps } from "./types";
import Skeleton from "../skeletons/Skeleton.component";

const InvoiceBillingCard: FC<InvoiceBillingCardProps> = ({
  name,
  email,
  phones,
  phone,
  location,
  profileImageUrl,
  address,
  isLoading,
}) => {
  return (
    <div className="border border-borderColor rounded-2xl p-3">
      {isLoading ? (
        <Skeleton paragraph={{ rows: 1 }} />
      ) : (
        <>
          <Avatar
            name={name}
            profileImageUrl={profileImageUrl}
            nameClassName="font-normal"
            parentClassName='w-12 h-12'
          />
          {/* <ChevronDownIcon className="w-5 h-5 text-gray-800" /> */}
          <div className="flex gap-y-2 flex-col mt-3">
            {location && <p className="text-gray-600">{location?.name}</p>}
            {address && <p className="text-gray-600">{address}</p>}
            {phone && <p className="text-gray-600">{phone}</p>}
            {phones &&
              phones?.length > 0 &&
              phones?.map((item) => (
                <p className="text-gray-600" key={item.number}>
                  {item.code}
                  {item.number}
                </p>
              ))}
            <p className="text-gray-600">{email && email}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default InvoiceBillingCard;
