import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { filterSelector } from "./selector";
import { AppointmentFilter } from "@/modules/Invoice.ts/model/AppointmentFilter";
import { filterAction } from "./filterSlice";

export const useFilterAppointment = () => {
  const filter = useAppSelector((state) =>
    filterSelector.appointmentFilter(state)
  );
  const dispatch = useAppDispatch();
  const onFilter = (filter: AppointmentFilter) => {
    console.log('filter', filter)
    dispatch(filterAction.onFilterAppointments({ filter }));
  };
  return {
    state: { filter },
    action: {
      onFilter,
    },
  };
};
