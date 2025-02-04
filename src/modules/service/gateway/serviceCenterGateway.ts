import { findAllServiceResponse } from "../usecase/findAllServiceCenter/findAllServiceResponse";

export interface ServiceGateway {
  findAllService: () => Promise<findAllServiceResponse>;
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
