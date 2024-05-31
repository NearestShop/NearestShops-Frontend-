import Skeleton from "@mui/material/Skeleton";

const CartPageSkeleton = () => {
  return (
    <>
      <div className="flex items-center space-x-2 px-6 py-3">
        <Skeleton variant="rectangle" animation="wave" width={75} height={75} />
        <div>
          <Skeleton variant="text" className="w-[100px] sm:w-[400px] md:w-[500px]" animation="wave" />
          <Skeleton variant="text" animation="wave" />
        </div>
      </div>
      <div className="flex items-center space-x-2 px-6 py-3">
        <Skeleton variant="rectangle" animation="wave" width={75} height={75} />
        <div>
          <Skeleton variant="text" className="w-[100px] sm:w-[400px] md:w-[500px]" animation="wave" />
          <Skeleton variant="text" animation="wave" />
        </div>
      </div>
      <div className="flex items-center space-x-2 px-6 py-3">
        <Skeleton variant="rectangle" animation="wave" width={75} height={75} />
        <div>
          <Skeleton variant="text" className="w-[100px] sm:w-[400px] md:w-[500px]" animation="wave" />
          <Skeleton variant="text" animation="wave" />
        </div>
      </div>
    </>
  );
};

export default CartPageSkeleton;
