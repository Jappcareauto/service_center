import Notification2Icon from '@/components/icons/Notification2Icon'

const NotificationComponent = () => {
  return (
    <div className='border border-borderColor rounded-2xl p-4'>
      <div className="flex items-center gap-x-2 text-primary">
        <Notification2Icon />
        <h2 className="font-medium">Notification</h2>
      </div>
      <p className='mt-6'>New Appoinment scheduled, from James for a body shop repair</p>
    </div>
  )
}

export default NotificationComponent
