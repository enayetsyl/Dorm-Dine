import bannerImage from '../assets/4.jpg'
const Banner = () => {
  return (
    <div className="min-h-screen bg-no-repeat bg-contain relative"
    style={{backgroundImage: `url(${bannerImage})`}}
    >
      <h1>Dine, Delight, Discover</h1>
      <p>Discover the essence of student life at DormDine — where meals become moments and friendships flourish.</p>
      <form>
        <input type="text" name="search" id="" />
        <button>Search</button>

      </form>
    </div>
  );
};

export default Banner;