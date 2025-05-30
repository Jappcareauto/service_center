import SuccessfulIcon from "@/assets/icons/Successful";
import Button from "../button/Button.component";

const Successful = () => {
  return (
    <div className="flex justify-center items-center flex-col h-full">
      <div className="bg-primaryAccent rounded-full p-4 w-[250px] h-[250px] justify-center items-center flex mb-6">
        <SuccessfulIcon />
      </div>
      <div className="items-center flex flex-col gap-y-2">
        <p className="font-semibold">Withdrawal Successful</p>
        <p className="text-primary font-bold text-2xl">5000 frs</p>
      </div>
      <Button className="absolute w-[90%] bottom-4">Show Report</Button>
    </div>
  );
};

export default Successful;
