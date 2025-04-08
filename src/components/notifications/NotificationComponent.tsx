import Notification2Icon from '@/components/icons/Notification2Icon'

interface NotificationComponentProps {
  title: string;
  message: string;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({ title, message }) => {
  return (
    <div className='border border-borderColor rounded-2xl p-4'>
      <div className="flex items-center gap-x-2 text-primary">
        <Notification2Icon />
        <h2 className="font-medium">{title}</h2>
      </div>
      <p className='mt-6'>{message}</p>
    </div>
  )
}

export default NotificationComponent
