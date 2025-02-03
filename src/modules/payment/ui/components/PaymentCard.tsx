
const PaymentCard = () => {
  return (


    <div className="h-[180px] w-[360px] rounded-xl p-4 shadow-lg text-black font-semibold bg-gradient-to-r from-pink-300 via-purple-300  to-greenAccent ">
    <div className="flex justify-between items-center">
      <svg
        width="46"
        height="31"
        viewBox="0 0 46 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14.986"
          cy="15.7468"
          r="14.006"
          stroke="#111111"
          strokeWidth="1.88"
        />
        <circle
          cx="30.2141"
          cy="15.7468"
          r="14.006"
          stroke="#111111"
          strokeWidth="1.88"
        />
      </svg>
    </div>
    <p className="text-xl tracking-widest mt-4">4673 **** **** 4637</p>
    <div className="flex gap-x-5 mt-2 text-sm">
      <span>03/27</span>
      <span>****</span>
    </div>
    <p className="mt-4 text-lg">JAMES MANN</p>
  </div>
)
}

export default PaymentCard