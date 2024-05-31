import Skeleton from "@mui/material/Skeleton";

const TotalSkeleton = () => {
  return (
    <div className="mt-8 px-2">
      <Skeleton variant="text" className="mb-6" animation="wave" />
      <Skeleton variant="text" animation="wave" />
      <Skeleton variant="text" className="mb-6" animation="wave" />
      <Skeleton variant="text" animation="wave" />
    </div>
  );
};

export default TotalSkeleton;
