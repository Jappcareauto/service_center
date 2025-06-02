import Button from "../button/Button.component";

// PlanCard.tsx
interface IProps {
  name?: string;
  price?: string;

  features: string[];
}
const PlanCard = ({ name, price, features }: IProps) => {
  return (
    <div className="max-w-sm bg-primaryAccent p-6 rounded-xl shadow-sm  relative hover:shadow-lg transition-shadow duration-300">
      <div className="mb-20">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-3xl font-bold my-2">{price}</p>
        <div className="border-t border-primary my-4"></div>
        <h3 className="font-semibold mb-2">Details</h3>
        <ul className="list-decimal list-inside space-y-2 text-sm">
          {features?.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </div>
      <Button className="mt-4 bottom-5 bg-primary text-white py-2 rounded-lg absolute  w-[83%]">
        Select Plan
      </Button>
    </div>
  );
};

export default PlanCard;
