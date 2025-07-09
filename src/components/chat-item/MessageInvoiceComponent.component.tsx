import { twMerge } from "tailwind-merge";
import Avatar from "../avatar/Avatar.component";
import images from "@/assets/images";
import Button from "../button/Button.component";

type InvoiceStatus = "Pending" | "Paid" | "Unpaid";

interface OwnProps {
  type: InvoiceStatus;
}

const MessageInvoiceComponent: React.FC<OwnProps> = ({ type }) => {
  return (
    <div className="flex flex-col items-end max-w-[370px] w-full my-3">
      <div className="flex items-center gap-x-2 text-sm mb-1">
        <Avatar
          url={images.avatar2}
          name=""
          className="w-8 h-8"
          disabledBorder
        />
        <p>Japtech Autpshop</p>
      </div>
      <div className="p-4 border border-borderColor rounded-2xl w-full">
        <div className="relative">
          <p className="text-sm mb-3 text-grey4">Billed to</p>
          <div className="flex gap-x-2 bg-red-300">
            <Avatar
              url={images.avatar2}
              name=""
              parentClassName="text-sm"
              disabledBorder
            />
            <div>
              <h2 className="font-medium text-black">Sara May</h2>
              <p className="text-grey4 text-xs">jamesmay@gmail.com</p>
            </div>
          </div>
          <div>
            <div
              className={twMerge(
                "text-sm rounded-2xl px-3 py-2 bg-grey3 whitespace-nowrap font-medium top-0 right-0 absolute",
                type === "Pending" ? "bg-red-600 bg-redAccent" : ""
              )}
            >
              {type}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-6 text-sm mt-6">
          <div className="flex justify-between items-center">
            <p className="text-grey4">Service</p>
            <h2 className="font-[600] text-sm">Inspection Fee</h2>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-grey4">Invoice Number</p>
            <h2 className="font-[600] text-sm">JC564739300</h2>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-grey4">Date Issued</p>
            <h2 className="font-[600] text-sm">Oct 20, 2024</h2>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-grey4">Amount</p>
            <h2 className="font-[600] text-primary text-sm">7,000 Frs</h2>
          </div>
          <div className="flex justify-end w-full">
            <Button
              variant="tertiary"
              className="h-10 rounded-full font-normaltext-sm"
            >
              View Invoice
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInvoiceComponent;
