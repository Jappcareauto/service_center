import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ServiceItem } from "../../../model/ServiceItem";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { invoiceSelector } from "../../../slice/selectors";
import { invoiceFormAction } from "../../../slice/invoiceSlice";
import { serviceCenterSelector } from "@/modules/service/slice/selectors";

import { AppointementSelector } from "@/modules/appointment/slices/AppointenmentSelector";
import {
  FormInvoiceSubmitModel,
  ValidateFormAddInvoice,
} from "@/modules/Invoice.ts/validations/FormInvoiceSubmitModel";
import { useGetMyself } from "@/modules/user/hooks/useGetMyself";

//
//

//
//
function useInvoicesForm() {
  const invoiceFormState = useAppSelector(invoiceSelector.addInvoiceFormState);
  const activeAppointment = useAppSelector(AppointementSelector.activeAppointment);
  const serviceCenterState = useAppSelector(
    serviceCenterSelector.serviceCenterState
  );
  const {
    state: { myself },
  } = useGetMyself();
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

  const handleEditServiceItem = (key: keyof ServiceItem, value: unknown) => {
    setNewService((prevService) => {
      return {
        ...prevService,
        [key]: value,
      };
    });
  };

  const [formInput, setFormInput] = useState({
    dueDate: "",
    issueDate: "2025-01-01",
  });
  const [isDueDate, setIsDueDate] = useState(false);
  const handleChangeInput = ({
    key,
    value,
  }: {
    key: "issueDate" | "dueDate";
    value: string;
  }) => {
    if (key === "dueDate" && value !== "") {
      setIsDueDate(true);
    }
    if (key === "dueDate" && value === "") {
      setIsDueDate(false);
    }
    console.log("value", value);

    setFormInput((prevState) => ({ ...prevState, [key]: value }));
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
  const handleDeleteService = (id: string) => {
    dispatch(invoiceFormAction.deleteService({ id }));
    handleChangeTaux(invoiceFormState.totalAmountState.taux || 0);
  };
  const handleSubmitForm = ({ navTo }: { navTo: string }) => {
    const dataToSubmit: FormInvoiceSubmitModel = {
      appointmentId: activeAppointment!.id,
      billedFromUserId: myself!.id,
      billedToUserId: myself!.id,
      issueDate: formInput.dueDate,
      dueDate: formInput.issueDate,
      items: invoiceFormState.serviceState.item,
      money: {
        amount: invoiceFormState.totalAmountState.totalAmount,
        currency: "XAF",
      },
      vehicleId: activeAppointment!.vehicleId,
    };

    const validatedData = ValidateFormAddInvoice.safeParse(dataToSubmit);

    console.log("validatedData", validatedData.data);

    navigte(navTo);
  };

  return {
    state: {
      activeAppointment,
      invoiceFormState,
      newService,
      serviceCenterState,
      formInput,
      isDueDate,
    },
    action: {
      handleAddService,
      handleSubmitForm,
      handleChangeTaux,
      handleIsTaux,
      handleDeleteService,
      handleChangeInput,
      handleEditServiceItem,
    },
  };
}

export default useInvoicesForm;
