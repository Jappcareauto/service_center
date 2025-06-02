const StatComponent: React.FC<{
  title: string;
  value: string | number | undefined;
  icon: React.ReactElement;
}> = ({ icon, value, title }) => {
  return (
    <div
      className={
        "h-[130px] rounded-[20px] w-full flex flex-col justify-between p-4 border border-borderColor hover:shadow-md transition-all duration-300 "
      }
    >
      <div className="flex items-center justify-between">{icon}</div>
      <div className="">
        <h1 className="font-bold text-3xl my-2 mt-3">{value}</h1>
        <p className="text-grey4">{title}</p>
      </div>
    </div>
  );
};
export default StatComponent;
