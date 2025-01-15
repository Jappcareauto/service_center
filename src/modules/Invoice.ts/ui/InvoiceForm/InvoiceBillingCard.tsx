import Avatar from '@/shared/generics/Avatar'
import ChevronDown from '@/shared/generics/menu/icons/ChevronDown'

const InvoiceBillingCard = () => {
  return (
    <div className="mt-5 ">
    <h2 className="font-normal ">Billed To</h2>
    <div className="border-2 rounded-xl min-h-40 p-2 flex flex-col justify-center border-grey3">
      <div className="flex justify-between">
        <Avatar name="Sara May" className="h-8 w-8" />
        <ChevronDown />
      </div>
      <ul className="space-y-1 mt-1">
        <li className="font-normal">Deido, Douala ,Cameroun</li>
        <li className="font-normal">(555)1314-9684</li>
        <li className="font-normal">person@email.com</li>
      </ul>
    </div>
  </div>
  )
}

export default InvoiceBillingCard