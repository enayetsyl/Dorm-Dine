import image1 from '../assets/person1.jpg'
import image2 from '../assets/person2.jpg'
import image3 from '../assets/person3.jpg'
import Container from './Container';

const Review = () => {
  return (
   <>
 <Container>
 <div className=' mx-5 md:mx-2 lg:mx-10'>
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
    {/* first card */}
    <div className="w-96 h-96 bg-three relative">
    <p className="text-center text-7xl font-black opacity-50">Feedback</p>
    <div className="bg-four mx-8 h-52 rounded-3xl w-10/12 absolute top-32">
      <div className="w-28 h-28 bg-five rounded-full absolute -top-16 left-24">
        <img src={image1} alt="" className='rounded-full w-24 h-24 absolute left-2 top-2' />
      </div>
      <div className="w-16 h-16 bg-four rotate-45 absolute -bottom-8 left-32"></div>
      <p className="pt-16 px-5 text-white font-bold"><span className="text-black font-black text-4xl">"</span>In one sentence, Excellent Food and Service.<span className="text-black font-black text-4xl">"</span> </p>
      <p className="uppercase text-black font-black text-center">Khalid bin <span className="text-white">Walid</span></p>
    </div>
   </div>
  {/* second card */}
  <div className="w-96 h-96 bg-three relative">
    <p className="text-center text-7xl font-black opacity-50">Feedback</p>
    <div className="bg-four mx-8 h-52 rounded-3xl w-10/12 absolute top-32">
      <div className="w-28 h-28 bg-five rounded-full absolute -top-16 left-24">
      <img src={image2} alt="" className='rounded-full w-24 h-24 absolute left-2 top-2' />
      </div>
      <div className="w-16 h-16 bg-four rotate-45 absolute -bottom-8 left-32"></div>
      <p className="pt-16 px-5 text-white font-bold"><span className="text-black font-black text-4xl">"</span>Great service to tell. I like them.<span className="text-black font-black text-4xl">"</span> </p>
      <p className="uppercase text-black font-black text-center">Ali Ibne <span className="text-white">Abi Talib</span></p>
    </div>
   </div>
     {/* third card */}
     <div className="w-96 h-96 bg-three relative">
    <p className="text-center text-7xl font-black opacity-50">Feedback</p>
    <div className="bg-four mx-8 h-52 rounded-3xl w-10/12 absolute top-32">
      <div className="w-28 h-28 bg-five rounded-full absolute -top-16 left-24">
      <img src={image3} alt="" className='rounded-full w-24 h-24 absolute left-2 top-2' />
      </div>
      <div className="w-16 h-16 bg-four rotate-45 absolute -bottom-8 left-32"></div>
      <p className="pt-16 px-5 text-white font-bold"><span className="text-black font-black text-4xl">"</span>They always make my mind fresh by their food.<span className="text-black font-black text-4xl">"</span> </p>
      <p className="uppercase text-black font-black text-center">Abu <span className="text-white">Ubidah</span></p>
    </div>
   </div>
  </div>
  </div>
 </Container>
   </>
  );
};

export default Review;