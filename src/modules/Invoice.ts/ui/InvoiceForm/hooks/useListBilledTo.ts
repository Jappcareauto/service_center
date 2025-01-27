import { useAppSelector } from "@/app/hooks";
import { BilledToUser } from "@/modules/Invoice.ts/model/BilelledUser";
import { userSelector } from "@/modules/user/slice/selectors";
import { useState } from "react";

const useListBilledTo = () => {
  const { users, loading } = useAppSelector(userSelector.allUserState);

  const [activeUser, setActiveUser] = useState<BilledToUser>({
    email: users?.[0]?.email || "",
    id: users?.[0]?.id || "",
    name: users?.[0]?.name || "",
    phoneNumber: "",
  });
  const [isListOpen, setIsListOpen] = useState(false);
  const toogleList = () => {
    setIsListOpen((prev) => !prev);
  };

  const handleSetActiveUser = (user: BilledToUser) => {
    setActiveUser(user);
    toogleList()
  };
  return {
    state: {
      activeUser,
      users,
      loading,
      isListOpen,
    },
    action: {
      toogleList,
      handleSetActiveUser,
    },
  };
};

export default useListBilledTo;
