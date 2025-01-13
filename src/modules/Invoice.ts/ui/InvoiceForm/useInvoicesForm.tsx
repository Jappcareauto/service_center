import { useState } from "react";
import { FormServiceItem } from "../../model/FormServiceItem";

function UseInvoicesForm() {
  const [services, setServices] = useState<FormServiceItem[]>([
    { name: "service", price: 2000, quantity: 2, totalPrice: 4000 },
  ]);
  const [serviceItem, setServiceItem] = useState<FormServiceItem>({
    name: "",
    price: 0,
    quantity: 0,
    totalPrice: 0,
  });

  const handleEditServiceItem = (
    key: keyof FormServiceItem,
    value: unknown
  ) => {
    setServiceItem((prevState) => {
      const newItem = { ...prevState, [key]: value };
      if (newItem?.price && newItem?.quantity) {
        newItem.totalPrice = newItem.price * newItem.quantity;
      } else {
        newItem.totalPrice = 0;
      }
      return newItem;
    });
  };

  const handleAddService = () => {
    if (serviceItem?.name && serviceItem?.price && serviceItem?.quantity) {
      setServices((prevServices) => [...prevServices, serviceItem]);
      setServiceItem({ name: "", price: 0, quantity: 0, totalPrice: 0 });
    }
  };

  const formServicesState = {
    services,
    handleAddService,
    serviceItem,
    handleEditServiceItem,
  };

  return { formServicesState };
}

export default UseInvoicesForm;
