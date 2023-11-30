import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroll-component";

const getMeals = async ({pageParam = 0}) => {
  const res = await fetch(`http://localhost:5000/api/v1/allmealscroll?limit=10&offset=${pageParam}`);
  const data = await res.json()

  return { ...data, prevOffset: pageParam}
}

const Meal2 = () => {
  const {data, fetchNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['meals'],
    queryFn: getMeals,
    getNextPageParam: (lastPage) => {
      if(lastPage.prevOffset + 10 > lastPage.mealsCount){
        return false;
      }
      return lastPage.prevOffset + 10;
    }
  })
  console.log(data)

  const meals = data?.pages.reduce((acc, page) => {
    console.log(page)
    return [...acc, ...page]
  }, [])

  

  return (
    <div>
      <InfiniteScroll
      dataLength={ meals? meals.length : 0 }
      next = { () => fetchNextPage() }
      hasMore = { hasNextPage }
      // loading={ <div>Loading.....</div>}
      >
        <div>
          <div>Hello</div>
          {/* {
            meals && 
            meals.map((meals, idx) => {
              
            })
          } */}
        </div>
      </InfiniteScroll>
    </div>
  );
};

export default Meal2;