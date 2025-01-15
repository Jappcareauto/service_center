import { findAllServiceCenterResponse } from "../usecase/findAllService/findAllServiceCenterResponse";

export interface ServiceGateway {
  findAllService: () => Promise<findAllServiceCenterResponse>;
}




























// const inferFunction = <ArrObj, T extends Array<ArrObj>>(
//   data: T,
//   element: ArrObj
// ) => {
//   const tester: ArrObj = {
//     ...element,
//     id: "",
//   };

//   data.push(tester);

//   return data;
// };

// inferFunction([{ user: "user" }, { user: "user" }], { user: "" });
