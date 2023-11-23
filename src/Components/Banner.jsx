import bannerImage from '../assets/4.jpg'
import Container from './Container';
const Banner = () => {
  return (
   <Container>
     <div className="min-h-screen bg-no-repeat bg-cover relative"
    style={{backgroundImage: `url(${bannerImage})`}}
    >
      <div className="absolute rounded-3xl flex flex-col items-center justify-center space-y-8 p-10 h-2/3  md:h-1/2 top-20 lg:left-10 xl:left-40 md:top-1/4 bg-gradient-to-r from-[#151515] to-[rgba(21, 21, 21, 0)] text-white">
      <h1 className='font-bold text-3xl  md:text-5xl font-primary pt-5'>Dine, Delight, Discover</h1>
      <p className='font-semibold text-base md:text-lg '>Discover the essence of student life at DormDine — where meals become moments and friendships flourish.</p>
      <form className='flex flex-col md:flex-row gap-3 pb-5'>
        <input type="text" name="search" id="" placeholder='Search Here' className='p-3 w-80'/>
        <input type="submit" value="Search" className='bg-four py-2 md:px-5 font-semibold rounded-lg' />
      </form>
      </div>
    </div>
   </Container>
  );
};

export default Banner;