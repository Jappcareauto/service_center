import InvoiceIcon from "@/assets/icons/InvoiceIcon";
import Button from "@/components/button/Button.component";
import Modal from "@/components/modals/Modal.component";
import PlanCard from "@/components/plan-card/PlanCard.component";
import Table from "@/components/table/Table.component";
import {
  billingItems,
  getBillingColumns,
  paymentMethods,
  plans,
} from "@/constants";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Progress } from "antd";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

const Billing = () => {
  const handleViewDetails = () => {};
  const columns = getBillingColumns(handleViewDetails);
  const [active, setActive] = useState(0);

  const [showPlans, setShowPlans] = useState(false);
  const effectRef = useRef(false);

  useEffect(() => {
    // Prevent the effect from running on initial render
    if (effectRef.current) return;
    effectRef.current = true;
    setShowPlans(true);
  }, []);

  return (
    <div>
      <div className="mb-7 flex gap-x-3">
        <InvoiceIcon />
        <h2 className="font-medium">Plan & Billing</h2>
      </div>
      <div className="flex justify-between w-full">
        <div className="border border-borderColor rounded-lg p-6 flex-row items-start justify-between flex bg-white w-[64%]">
          <div className="w-full">
            <p className=" text-gray-500 mb-1">Plan</p>
            <h1 className="font-bold text-3xl mb-2">Starter Plan</h1>
            <p className=" text-gray-400 text-sm w-[80%]">
              Eligible for weekly vehicle checks, maintainance and a pool of
              1000 customers
            </p>
            <div className="mt-4">
              <p className=" text-gray-800 text-sm font-semibold">
                Subscription consumed
              </p>
              <Progress
                percent={30}
                className="text-primary"
                strokeColor="#FB7C37"
              />
            </div>
          </div>
          <div className="w-[80%] px-8">
            <p className=" text-gray-500 mb-1">Payment</p>
            <div className="flex items-center gap-x-2">
              <h1 className="font-bold text-3xl">30,000 XAF </h1>
              <p className="font-light text-sm text-gray-400 mt-3">per month</p>
            </div>
          </div>
          <div className="flex gap-x-5">
            <button className="text-primary text-sm font-semibold" onClick={() => setShowPlans(true)}>
              Upgrade
            </button>
            <button className="text-gray-600 text-sm">Cancel</button>
          </div>
        </div>
        <div className="w-[35%] bg-white border border-borderColor rounded-lg p-6 flex-row items-start justify-between">
          <p className=" text-gray-500 mb-1">Payment Methods</p>
          <div className="flex flex-col gap-y-3 mt-4 border border-gray-100 rounded-lg">
            {paymentMethods.slice(0, 2).map((item) => (
              <button
                className="p-3 flex items-center text-start z-30 border-b border-gray-100"
                onClick={() => setActive(item.id)}
              >
                <div
                  className={twMerge(
                    "w-4 h-4 border border-gray-400 rounded-full mr-4",
                    active === item.id && "bg-primary border-primary"
                  )}
                />
                <div>{item.icon}</div>
                <div className="flex flex-col ml-3">
                  <p>{item.title}</p>
                  <p className="text-sm text-gray-300">{item.date}</p>
                </div>
              </button>
            ))}
          </div>
          <Button
            variant="tertiary"
            className="text-black clear-start w-[64%] border-gray-300 h-10 mt-5"
          >
            <PlusIcon className="w-4 h-4 mr-3 text-gray-500" />
            <span className="text-sm text-gray-500">Add Payment Method</span>
          </Button>
        </div>
      </div>
      <div>
        <Table data={billingItems} columns={columns} pageSize={7} />
      </div>
      <Modal
        open={showPlans}
        onClose={() => setShowPlans(false)}
        title="Choose a Plan"
        onOk={() => setShowPlans(false)}
        okText="Select"
        footer={null}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-3'>
          {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            name={plan.name}
            price={plan.price}
            features={plan.features}
          />
        ))}
        </div>
      </Modal>
    </div>
  );
};

export default Billing;
