import { FormListItemModel } from "@/shared/model/FormListItem";
import { FC } from "react";

// import { useState } from "react";
type Props = {
  data: FormListItemModel;
};

const FormListItem: FC<Props> = ({ data }) => {

  return (
    <div className="hover:bg-primaryAccent p-2 min-h-8 rounded-xl ">
      <h2 className="text-primary  font-semibold ">{data.name} </h2>
      <h3 className="font-medium">{data.description} </h3>
    </div>
  );
};
export default FormListItem;
