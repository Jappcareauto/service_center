import { AppStore } from "@/app/store";
import { RouteObject } from "react-router-dom";
import { PaymentView } from "../../ui/PaymentView";

export const PaymentRoutes = {
  payment: () => "/payment",
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PaymentRouter = (_store: AppStore): RouteObject[] => {
  return [
    {
      path: PaymentRoutes.payment(),
      element: <PaymentView />,
      children: [
        
      ],
    },
  ];
};
