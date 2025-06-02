import { Skeleton as SkeletonComponent, SkeletonProps } from "antd";

const Skeleton = ({...props}: SkeletonProps) => {
  return <SkeletonComponent active paragraph={{ rows: 4 }} className='mt-2' {...props} />;
};

export default Skeleton;
