import cardImage from '../assets/silver.jpg'
import cardImage2 from '../assets/gold.jpg'
import cardImage3 from '../assets/platinum.jpg'
import { AwesomeButton } from 'react-awesome-button';
import Container from './Container';
const MemberSection = () => {
  return (
    <Container>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-5 px-5 h-[80vh]'>
      {/* silver card */}
      <div className="bg-white rounded-t-full rounded-b-xl shadow-xl">
      <div className=" w-full rounded-t-full">
        <img src={cardImage} alt="" className='rounded-t-full h-full  w-full' />
      </div>
     <div className='pt-6'>
     <h1 className='text-center text-3xl font-black text-four '>Silver Package</h1>
     <div className='w-full h-[2px] mt-6 bg-four relative'></div>
     <div className='flex justify-center items-center'>
      <button className='bg-four text-white py-1 px-3 font-bold absolute rounded-3xl'>4000.00 TK</button>
     </div>
    <p className='p-5 text-center text-gray-400 text-base font-medium'>As line silver you will get all the common food items that an ordinary people consume.</p>
    <div className='flex justify-center mb-5'><AwesomeButton type="primary" className='aws-btn font-bold px-20 ' >Upgrade to Silver</AwesomeButton></div>
     </div>
    </div>
      {/* gold card */}
      <div className="bg-white rounded-t-full rounded-b-xl shadow-xl">
      <div className=" w-full rounded-t-full">
        <img src={cardImage2} alt="" className='rounded-t-full h-full  w-full' />
      </div>
     <div className='pt-6'>
     <h1 className='text-center text-3xl font-black text-four '>Gold Package</h1>
     <div className='w-full h-[2px] mt-6 bg-four relative'></div>
     <div className='flex justify-center items-center'>
      <button className='bg-four text-white py-1 px-3 font-bold absolute rounded-3xl'>9000.00 TK</button>
     </div>
    <p className='p-5 text-center text-gray-400 text-base font-medium'>You will get food that all the middle class people consume.</p>
    <div className='flex justify-center mb-5'><AwesomeButton type="primary" className='aws-btn font-bold px-20' >Upgrade to Gold</AwesomeButton></div>
     </div>
    </div>
      {/* platinum card */}
      <div className="bg-white rounded-t-full rounded-b-xl shadow-xl">
      <div className=" w-full rounded-t-full">
        <img src={cardImage3} alt="" className='rounded-t-full h-full  w-full' />
      </div>
     <div className='pt-6'>
     <h1 className='text-center text-3xl font-black text-four '>Platinum Package</h1>
     <div className='w-full h-[2px] mt-6 bg-four relative'></div>
     <div className='flex justify-center items-center'>
      <button className='bg-four text-white py-1 px-3 font-bold absolute rounded-3xl'>18,000.00 TK</button>
     </div>
    <p className='p-5 text-center text-gray-400 text-base font-medium'>You will receive food like top 1% people of the world. Do not waste.</p>
    <div className='flex justify-center mb-5'><AwesomeButton type="primary" className='aws-btn font-bold px-20' >Upgrade to Platinum</AwesomeButton></div>
     </div>
    </div>
      
    </div>
    </Container>
  );
};

export default MemberSection;