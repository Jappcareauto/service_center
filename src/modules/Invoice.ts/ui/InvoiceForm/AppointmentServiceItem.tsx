import PrimaryButton from "@/shared/generics/buttons/PrimaryButton";
import Input from "@/shared/generics/inputs/Input";
import UseInvoicesForm from "./useInvoicesForm";

const FormInvoiceServicesItem = () => {
  const { formServicesState } = UseInvoicesForm();

  const listItem = formServicesState.services.map((service, index) => (
    <div className="flex my-4" key={index}>
      <div className="w-2/3 ">{service.name}</div>
      <ul className="w-1/3 grid grid-cols-3 place-items-center  ">
        <li>{service.quantity} </li>
        <li>{service.price} Frs</li>
        <li>{service.totalPrice} Frs</li>
      </ul>
    </div>
  ));

  return (
    <div className="border-2 border-grey3 rounded-xl p-5">
      <div className=" border-b-2 pb-1 flex w-full text-primary border-grey3">
        <div className="w-2/3 ">Item</div>
        <ul className="w-1/3  grid grid-cols-3 ">
          <li>Qnty</li>
          <li>Unit price</li>
          <li>Total Price </li>
        </ul>
      </div>
      {/* item */}

      {listItem}
      {/*  */}
      <div className="flex my-2 gap-x-2">
        <div className="w-2/3 ">
          <Input
            placeholder="Designation"
            onChange={(e) =>
              formServicesState.handleEditServiceItem("name", e.target.value)
            }
            value={formServicesState.serviceItem?.name}
          />
        </div>
        <ul className="w-1/3 grid grid-cols-3 gap-x-2 place-items-center">
          <li>
            <Input
              placeholder="Quantity"
              type="number"
              value={formServicesState.serviceItem?.quantity}
              onChange={(e) =>
                formServicesState.handleEditServiceItem(
                  "quantity",
                  e.target.value
                )
              }
            />
          </li>
          <li>
            <Input
              placeholder="Price"
              type="number"
              value={formServicesState.serviceItem?.price}
              onChange={(e) =>
                formServicesState.handleEditServiceItem("price", e.target.value)
              }
            />
          </li>
          <li>
            <Input
              // placeholder="Total"
              disabled
              value={` ${formServicesState.serviceItem?.totalPrice}  Frs`}
              onChange={(e) =>
                formServicesState.handleEditServiceItem(
                  "totalPrice",
                  e.target.value
                )
              }
            />
          </li>
        </ul>
      </div>
      <div className="flex justify-end">
        <PrimaryButton
          onClick={formServicesState.handleAddService}
          className="border-black h-10 bg-inherit hover:bg-primary hover:text-white hover:border-none duration-200 border rounded-full text-black"
        >
          + Add Item
        </PrimaryButton>
      </div>
    </div>
  );
};

export default FormInvoiceServicesItem;
