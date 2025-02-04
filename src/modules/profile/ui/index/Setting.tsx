const svg = [
  {
    name: "Setting",
    svg: "/svg/7.svg",
    id: 7,
    link: "",
  },
  {
    name: "Help & Support",
    svg: "/svg/1.svg",
    id: 1,
    link: "",
  },
  {
    name: "Notification",
    svg: "/svg/6.svg",
    id: 6,
    link: "",
  },
  {
    name: "Payment",
    svg: "/svg/8.svg",
    id: 8,
    link: "",
  },
  {
    name: "History",
    svg: "/svg/9.svg",
    id: 9,
    link: "",
  },
  {
    name: "Terms & Conditions",
    svg: "/svg/3.svg",
    id: 3,
    link: "",
  },
  {
    name: "Privacy Policy",
    svg: "/svg/4.svg",
    id: 4,
    link: "",
  },
  {
    name: "Log Out",
    svg: "/svg/5.svg",
    id: 5,
    link: "",
  },
  {
    name: "Delete Account",
    svg: "/svg/2.svg",
    id: 2,
    link: "",
  },
];

import { useState } from "react";

export const Setting = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div>
      {svg.map((item) => (
        <div
          key={item.id}
          className="flex my-8 space-x-2"
          onClick={() => setActiveId(item.id)}
          style={{
            cursor: "pointer",
            fontWeight: activeId === item.id ? "bold" : "normal",
            color: activeId === item.id ? "black" : "inherit",
          }}
        >
          <img src={item.svg} alt={item.name} />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
};
