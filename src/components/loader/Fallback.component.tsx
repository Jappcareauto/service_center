import Loader from './Loader';

const Fallback = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-white">
      <Loader />
    </div>
  );
};

export default Fallback;
