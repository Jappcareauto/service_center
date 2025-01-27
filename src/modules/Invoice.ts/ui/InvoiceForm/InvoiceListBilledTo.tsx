import InvoiceBillingCard from "./InvoiceBillingCard";

// import useInvoicesForm from "./hooks/useInvoicesForm";

const InvoiceListBilledTo = () => {
  // const {
  //   state: { activeAppointment },
  // } = useInvoicesForm();
  return (
    <div className="relative">
      <div
        className={`cursor-pointer hover:bg-primaryAccent rounded-xl  `}
      >
        <InvoiceBillingCard user={{email:"user@mail.com",id:"",name:"name",phoneNumber:"+237 386878"}} />
      </div>
      {/* {isListOpen && (
        <div className="absolute z-10 bg-background w-full border-4 rounded-xl max-h-96 overflow-y-scroll shadow-md mt-2">
          {users?.map((user) => (
            <div
              className=""
              key={user.id}
              onClick={() =>
                action.handleSetActiveUser({
                  email: user.email,
                  id: user.id,
                  name: user.name,
                  phoneNumber: user.phones?.[0]?.number || "___ ___ ___",
                })
              }
            >
              <FormListItem
                data={{ description: user.email, id: user.id, name: user.name }}
              />
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default InvoiceListBilledTo;
