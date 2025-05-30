import { paths } from "@/routes/paths";
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='text-center'>
        <ExclamationTriangleIcon className='mx-auto h-20 w-20' />
        <h3 className='my-2 font-semibold'>Page not found</h3>
        <Link to={paths.index} className='text-blue-700'>
          Go to home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
