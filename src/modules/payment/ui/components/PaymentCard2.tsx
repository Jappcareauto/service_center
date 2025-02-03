
const PaymentCard2 = () => {
  return (
    <div className="h-[180px] w-[360px] rounded-xl p-4 shadow-lg text-black font-semibold bg-gradient-to-r from-pink-300   via-primaryAccent2   to-primaryAccent2 ">
      <div className="flex flex-col justify-between h-full ">
        <svg
          width="46"
          height="46"
          viewBox="0 0 46 46"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.0400391"
            y="0.800781"
            width="45.12"
            height="45.12"
            rx="7.52"
            fill="#FFCC00"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M43.1249 23.0515C43.1249 28.7223 33.9343 33.3212 22.6 33.3212C11.2584 33.3212 2.06787 28.7223 2.06787 23.0515C2.06787 17.388 11.2584 12.7891 22.6 12.7891C33.9343 12.7891 43.1249 17.388 43.1249 23.0515ZM41.5026 23.0515C41.5026 18.2788 33.0435 14.4114 22.6 14.4114C12.1565 14.4114 3.69016 18.2788 3.69016 23.0515C3.69016 27.8242 12.1565 31.6989 22.6 31.6989C33.0435 31.6989 41.5026 27.8242 41.5026 23.0515ZM20.0072 21.2554V19.6331H25.8011V21.2554H23.7153V26.4772H22.093V21.2554H20.0072ZM32.79 19.6331V26.4772H31.1677L28.2273 22.4069V26.4772H26.6123V19.6331H28.2273L31.1677 23.7033V19.6331H32.79ZM12.3593 26.4772V19.6331H13.9743L15.7777 22.3997L17.581 19.6331H19.1961V26.4772H17.581V22.6025L16.3498 24.4927H15.2055L13.9743 22.6025V26.4772H12.3593Z"
            fill="#020001"
          />
        </svg>

        <div>
          <p className="text-xl tracking-widest ">4673 **** **** 4637</p>

          <p className=" mt-3 text-lg">JAMES MANN</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCard2;
