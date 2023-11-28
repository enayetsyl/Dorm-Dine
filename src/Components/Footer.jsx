import logo from '../assets/titleIcon.png'
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center shadow-2xl mt-14">
      <div className="bg-three w-full md:w-1/2 py-12 flex flex-col justify-center items-center gap-10">
        <h1 className=" text-7xl text-black font-bold font-primary">DormDine</h1>
        <img src={logo} alt="" className='w-40 h-32' />
      </div>
      <div className="bg-five py-[100px] md:w-1/2 flex flex-col w-full justify-center items-center gap-10">
        <h1 className='text-black text-5xl font-bold font-primary'>Follow us on</h1>
        <div className='flex
        justify-center items-center gap-10 text-5xl'>
          <FaFacebook/>
          <FaTwitter/>
          <FaYoutube/>
        </div>
      </div>
      
    </div>
  );
};

export default Footer;