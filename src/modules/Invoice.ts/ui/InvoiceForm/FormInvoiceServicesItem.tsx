import PrimaryButton from "@/shared/generics/buttons/PrimaryButton";
import Input from "@/shared/generics/inputs/Input";
import useInvoicesForm from "./useInvoicesForm";
import { FC } from "react";
import { ServiceItem } from "../../model/ServiceItem";
import Trash2 from "@/shared/generics/menu/icons/Trash2";
import { validPositiveNumber } from "@/shared/utils/validNumber";

type Props = {
  isEdditing: boolean;
  servicesItems?: ServiceItem[];
};
const FormInvoiceServicesItem: FC<Props> = ({ isEdditing, servicesItems }) => {
  const {
    state: { newService, invoiceFormState },
    action,
  } = useInvoicesForm();

  const price = validPositiveNumber(newService.price);
  const quantity = validPositiveNumber(newService.quantity);

  const data = !isEdditing
    ? servicesItems
    : invoiceFormState.serviceState?.item;
  const listItem = data?.map((service) => (
    <div className="flex justify-between my-4" key={service.id}>
      <div className=" ">{service.name}</div>
      <ul className=" w-1/2 grid grid-cols-4 place-items-end   ">
        <li>{service.quantity} </li>
        <li>{service.price} Frs</li>
        <li>{service.totalPrice} Frs</li>
        <li
          onClick={() => {
            action.handleDeleteService(service.id);
          }}
        >
          <Trash2 />
        </li>
      </ul>
    </div>
  ));

  return (
    <div className="border-2 text-wrap  border-grey3 rounded-xl p-5 ">
      <div className=" border-b-2   pb-1 justify-between flex text-primary  border-grey3">
        <div className=" ">Item</div>
        <ul className=" w-1/2 grid grid-cols-4 place-items-end">
          <li className="">Qnty</li>
          <li>Unit price</li>
          <li>Total Price </li>
          <li></li>
        </ul>
      </div>
      {/* item */}

      {listItem}
      {/*  */}
      {isEdditing && (
        <div>
          <div className="flex my-2 justify-between gap-x-2">
            <div className="w-1/2 ">
              <Input
                placeholder="Designation"
                onChange={(e) =>
                  action.handleEditServiceItem("name", e.target.value)
                }
                value={newService?.name}
              />
            </div>
            <ul className="w-1/2 grid grid-cols-4 gap-x-2 place-items-end">
              <li>
                <Input
                  placeholder="Quantity"
                  value={quantity}
                  onChange={(e) =>
                    action.handleEditServiceItem("quantity", e.target.value)
                  }
                />
              </li>
              <li>
                <Input
                  placeholder="Price"
                  value={price}
                  onChange={(e) =>
                    action.handleEditServiceItem("price", e.target.value)
                  }
                />
              </li>
              <li className=" items-center justify-end justify-self-end flex gap-2 ">
                <p className="border-2 border-grey3 flex items-center bg-inherit rounded-xl  px-2 min-h-12">
                  {isNaN(newService?.price * newService.quantity)
                    ? 0
                    : newService?.price * newService.quantity}
                  {" Frs"}
                </p>
              </li>
            </ul>
          </div>
          <div className="flex justify-end">
            <PrimaryButton
              type="button"
              onClick={() => action.handleAddService(newService)}
              className="border-black h-10 bg-inherit hover:bg-primary hover:text-white hover:border-none duration-200 border rounded-full text-black"
            >
              + Add Item
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormInvoiceServicesItem;
