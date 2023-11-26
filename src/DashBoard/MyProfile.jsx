import useAuth from "../hooks/useAuth";
import gold from '../assets/gold-badge.jpg'
import bronze from '../assets/bronze-badge.png'
import noPhoto from '../assets/no-photo.png'


const MyProfile = () => {
  const { user, googleUser, loading } = useAuth();
  return (
    <div>
    {
      loading ? (<p>loading</p>) : (
        <div className="rounded-lg border border-solid border-four drop-shadow-xl bg-five flex justify-center items-center gap-5 flex-col w-[90%] md:w-1/2 p-5 lg:p-10 h-[90%] mx-auto
        ">
          {
            user.photoURL ? (<img src={user?.photoURL} alt="" className="rounded-full"/>) : (
              <img src={noPhoto}/>
            )
          }
          <h1 className="font-primary font-bold text-3xl">Name: {user?.displayName}</h1>
          <h2 className="font-semibold">Email: {user?.email}</h2>
          <div>
            {
              googleUser.map((user, idx) => (
                user.badge === 'bronze' ? (<img src={bronze} key={idx}/>) :( <img src={gold} key={idx}/>)
              ))
            }
          </div>
  
        </div>
      )
    }
    </div>
  );
};

export default MyProfile;