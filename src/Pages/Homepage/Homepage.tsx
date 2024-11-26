import { useEffect } from "react";
import Hero from "./Components/Hero";
import Categories from "./Components/Categories";
// import Blog from "./Components/Blog";
// import NewArrivals from "./Components/NewArrivals";
// import NewSeason from "./Components/NewSeason";
// import ShopTheLook from "./Components/ShopTheLook";
// import { useGender } from "../../GenderContext";


export default function Homepage() {
  // const { gender } = useGender(); 

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="pb-[60px]">
      <Hero />
      <Categories />
      {/* <NewArrivals gender={gender}/>
      <NewSeason gender={gender}/>
      <ShopTheLook gender={gender} /> */}
      {/* <Blog gender={gender}/> */}
    </div>
  )
}
