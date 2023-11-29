import { useQuery } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { useState } from "react";

const MyReviews = () => {
  const {user, googleUser} = useAuth();

  const [editingReview, setEditingReview] = useState(null);
  const [editedText, setEditedText] = useState('')


  const axiosSecure = useAxiosSecure()

  const {data, isLoading, refetch} = useQuery({
    queryKey:['userReview'],
    queryFn: async () => {
      const response = await axiosSecure.get(`/api/v1/userreview/${googleUser._id}`)
      return response.data;
    }
  })


  const handleEditClick = (reviewId) => {
    console.log(reviewId)
    setEditingReview(reviewId);
    const reviewToEdit = data.find((review) => review._id === reviewId);
    setEditedText(reviewToEdit.reviewText)
  }

  const handleEditClose = () => {
    setEditingReview(null)
    setEditedText('')
  }

  const handleEditSave = async() => {
    console.log('save button clicked')
    console.log(editingReview)

    const res = await axiosSecure.patch(`/api/v1/updatereview/${editingReview}`, {
      reviewText: editedText,
    })
    console.log(res)
    if(res.data.modifiedCount > 0){
      refetch()
      swal("Congratulation", "Your Review Updated Successfully", "success")
      handleEditClick();
    } else {
      swal("error", "Fail to edit your review", "Error")
    }
  }


  const handleReviewDelete = (id) => {
    console.log(id)
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to see this review",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
          const res = await axiosSecure.delete(`/api/v1/userreview/${id}`);
          console.log(res.data);
          if (res.data.deletedCount > 0) {
              // refetch to update the ui
              refetch();
              swal("Your request meal has been deleted!", {
                icon: "success",
              });
          }
      }
      else {
        swal("Sorry we can not delete your meal this time. Try again later.");
      }
  })
  }

  if(isLoading){
    return <p>Loading</p>
  }

  // console.log('user',user)
  // console.log('google user', googleUser)
  console.log('review data', data)
  return (
    <div>
      <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
      <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meal Title</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Likes</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Reviews</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Edit Button</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delete Button</th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View Button</th>
      </tr>
    </thead>
    <tbody className="bg-white divide-y divide-gray-200">
      {/* Row 1: Fake Data */}
    {
      data?.length > 0 ? (
        data.map((review , index) => (
          <tr key={index}>
        <td className="px-6 py-4 whitespace-nowrap">{review.meal.mealTitle}</td>
        <td className="px-6 py-4 whitespace-nowrap">{review.meal.likes}</td>
        <td className="px-6 py-4 whitespace-nowrap">{review.meal.reviews}</td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleEditClick(review._id)}
          >Edit</button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <button 
          onClick={()=> handleReviewDelete(review._id)}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <Link to={`/mealdetails/${review.meal._id}`}>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">View</button>
          </Link>

        </td>
      </tr>
        ))
      ) : (<p>You have no review.</p>)
    }

      
    </tbody>
  </table>
</div>
{/* Modal for editing review */}
{editingReview && (
        <div className="modal h-[600px] w-2/3 bg-one">
          <div className="modal-content">
            <span className="close text-white text-7xl font-bold" onClick={handleEditClose}>&times;</span>
            <div className="py-5 flex flex-col justify-center items-center gap-5 text-white
            ">
            <label htmlFor="editedText"
            className="text-2xl font-primary"
            >Edit Review:</label>
            <textarea
              className="text-four p-2 text-xl  rounded-lg 
              overflow-y-auto
              w-[90%] h-[380px]"
              type="text"
              id="editedText"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
            />
            <button onClick={handleEditSave}
            className="bg-four rounded-lg px-4 py-2 text-xl"
            >Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;