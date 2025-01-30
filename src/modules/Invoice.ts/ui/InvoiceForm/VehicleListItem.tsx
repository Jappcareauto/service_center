import Input from "@/shared/generics/inputs/Input";
import useInvoicesForm from "./hooks/useInvoicesForm";

const VehicleListItem = () => {
  const {
    state: { activeAppointment },
  } = useInvoicesForm();
  return (
    <div className="relative z-10">
      <div className="mt">
        <Input
          disabled
          label="Vehicle"
          value={activeAppointment?.vehicle?.name}
          type="text"
          onChange={() => {}}
        />
      </div>
      {/* {isOpen && (
        <div className="w-full border-4 absolute cursor-pointer bg-background max-h-96 overflow-y-scroll border-grey3 rounded-xl ">
          {vehicles?.map((vehicle) => (
            <div
              onClick={() => action.handleActiveVehicle(vehicle)}
              className=""
            >
              <FormListItem
                data={{
                  description: vehicle.vin,
                  id: vehicle.id,
                  name: vehicle.name,
                }}
              />
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default VehicleListItem;
