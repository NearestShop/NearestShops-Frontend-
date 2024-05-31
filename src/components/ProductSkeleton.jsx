import Skeleton from "@mui/material/Skeleton";

const ProductSkeleton = () => {
  return (
    <>
      <div className="basis-1/2 flex justify-end">
        <Skeleton variant="rectangle" width="60%" height={500} animation="wave" />
      </div>
      <div className="basis-1/2">
        <Skeleton variant="text" width="100px" animation="wave" />
        <Skeleton variant="text" width="300px" animation="wave" />
        <Skeleton variant="text" width="300px" animation="wave" />
        <Skeleton variant="text" width="500px" animation="wave" />
        <Skeleton variant="text" width="500px" animation="wave" />
      </div>
    </>
  );
};

export default ProductSkeleton;
