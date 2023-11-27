
const MealReview = ({review}) => {
  return (
    <div>
      <p className="text-black border border-solid border-four py-3 px-5 text-justify rounded-lg capitalize">{review.reviewText}</p>
    </div>
  );
};

export default MealReview;
