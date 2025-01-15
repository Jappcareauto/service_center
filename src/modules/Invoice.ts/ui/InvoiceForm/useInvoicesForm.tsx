import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServiceItem } from "../../model/ServiceItem";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { invoiceSelector } from "../../slice/selectors";
import { invoiceFormAction } from "../../slice/invoiceSlice";
import { serviceCenterSelector } from "@/modules/service/slice/selectors";
import { FormListItem } from "@/shared/model/FormListItem";

//
//
//
function useInvoicesForm() {
  const invoiceFormState = useAppSelector(invoiceSelector.addInvoiceFormState);
  const serviceCenterState = useAppSelector(
    serviceCenterSelector.serviceCenterState
  );

  const dispatch = useAppDispatch();
  const navigte = useNavigate();
  const id = new Date();
  const [newService, setNewService] = useState<ServiceItem>({
    name: "",
    price: 0,
    quantity: 0,
    totalPrice: 0,
    id: id.toISOString(),
  });

  const [activeServiceCenter, setActiveSrviceCenter] = useState<FormListItem>({
    description:
      serviceCenterState?.servicesCenter?.[0]?.category || "failed to load",
    name: serviceCenterState?.servicesCenter?.[0]?.name || "",
    id: serviceCenterState?.servicesCenter?.[0]?.id || "",
  });

  const [isServiceListOpen, setIsServiceListOpen] = useState(false);

  const handleEditServiceItem = (key: keyof ServiceItem, value: unknown) => {
    console.log("key", key, value);
    setNewService((prevService) => {
      return {
        ...prevService,
        [key]: value,
      };
    });
  };
  //service list
  const toogleServiceList = () => {
    setIsServiceListOpen((prev) => !prev);
  };
  const handleSetServiceCenter = (service: FormListItem) => {
    setActiveSrviceCenter(service);
    toogleServiceList();
  };
  //actionslice
  const handleChangeTaux = (taux: number) => {
    dispatch(invoiceFormAction.handleTotalPrice({ taux: taux }));
  };
  //action
  const handleAddService = (service: ServiceItem) => {
    if (service.name === "" && !service.price && !service.quantity) {
      return;
    }
    dispatch(invoiceFormAction.addService({ ...service, id: id.toString() }));
    handleChangeTaux(invoiceFormState.totalAmountState.taux || 0);
    setNewService({
      id: id.toString(),
      name: "",
      price: 0,
      quantity: 0,
      totalPrice: 0,
    });
  };
  //action
  const handleIsTaux = (isTaux: boolean) => {
    dispatch(invoiceFormAction.toogleTaux({ isTaux: isTaux }));
    handleChangeTaux(invoiceFormState.totalAmountState.taux);
  };
  //submit
  const handleSubmitForm = ({ navTo }: { navTo: string }) => {
    navigte(navTo);
  };
  const handleDeleteService = (id: string) => {
    dispatch(invoiceFormAction.deleteService({ id }));
    handleChangeTaux(invoiceFormState.totalAmountState.taux || 0);
  };

  return {
    state: {
      invoiceFormState,
      newService,
      activeServiceCenter,
      serviceCenterState,
      isServiceListOpen,
    },
    action: {
      handleSetServiceCenter,
      toogleServiceList,
      handleAddService,
      handleSubmitForm,
      handleEditServiceItem,
      handleChangeTaux,
      handleIsTaux,
      handleDeleteService,
    },
  };
}

export default useInvoicesForm;
