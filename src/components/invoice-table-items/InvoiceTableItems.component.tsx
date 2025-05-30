import { InvoiceTableItemsType } from './types';

const InvoiceTableItems = ({ items }: InvoiceTableItemsType) => {
  return (
    <div className="rounded-md">
      <table className="w-full text-left">
        <thead className='border-b'>
          <tr className="text-primary font-light mt-5 text-center">
            <th className="pb-2 font-light text-left">Item</th>
            <th className="pb-2 font-light">Quantity</th>
            <th className="pb-2 font-light">Price</th>
            <th className="pb-2 font-light">Total</th>
          </tr>
        </thead>
        <tbody>
          {items?.map((item) => (
            <tr key={item.name} className="border-b last:border-b-0">
              <td className="py-2 w-[50%]">{item.name}</td>
              <td className="py-2 w-[25%] text-center">{item.quantity}</td>
              <td className="py-2 w-[25%] text-center font-semibold">
                {item.price.toLocaleString()}
              </td>
              <td className="py-2 w-[25%] text-center font-semibold">
                {item.total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTableItems;
