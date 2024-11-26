/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { useGetAllCategories } from "../../ApiCalls/getAllCategories";
import HeaderContainer from "./HeaderContainer";
// import HeaderMobile from "./HeaderMobile";
import { useEffect, useState } from "react";
import { setCategories } from "../../redux/slice/categoriesSlice";
import { useGetAllBrands } from "../../ApiCalls/getAllBrands";
import { setBrands } from "../../redux/slice/brandsSlice";
import { useGetSubCategory } from "../../ApiCalls/getSubCategory";
import {
  setAccesories,
  setAllSubCategory,
  setBags,
  setClothing,
  setShoes,
  setSpeakers,
} from "../../redux/slice/subCategorySlice";
import { useAllGetSubCategory } from "../../ApiCalls/getAllSubCategory";
import { useGender } from "../../GenderContext";

export default function Header() {
  const dispatch = useDispatch();
  const { gender } = useGender();

  // const clothingId = `668ec1a02053143906dc75e0`
  // const shoesId = `668667fbb5ceccefe62613bf`
  // const accessoriesId = `669543df62e544a394b17bd6`

  const { data: categoriesData } = useGetAllCategories();
  const { data: brandsData } = useGetAllBrands(gender);
  const AllCategories = categoriesData?.data?.data;

  const [clothingId, setClothingId] = useState<string | null>("");
  const [shoesId, setShoesId] = useState<string>("");
  const [accessoriesId, setAccessoriesId] = useState<string>("");
  const [bagsId, setBagsId] = useState<string>("");
  const [speakersId, setSpeakersId] = useState<string>("");

  useEffect(() => {
    if (AllCategories) {
      const clothing = AllCategories.find(
        (all: any) => all?.name === "Clothing"
      );
      if (clothing) {
        setClothingId(clothing._id);
      }
      const shoes = AllCategories.find((all: any) => all?.name === "Shoe");
      if (shoes) {
        setShoesId(shoes._id);
      }
      const accessories = AllCategories.find(
        (all: any) => all?.name === "Accessories"
      );
      if (accessories) {
        setAccessoriesId(accessories._id);
      }
      const bags = AllCategories.find((all: any) => all?.name === "Bags");
      if (bags) {
        setBagsId(bags._id);
      }
      const speakers = AllCategories.find(
        (all: any) => all?.name === "Home"
      );
      if (speakers) {
        setSpeakersId(speakers._id);
      }
    }
  }, [AllCategories]);

  const { data: clothingCategory } = useGetSubCategory(
    clothingId ?? "",
    gender
  );
  const { data: shoesCategory } = useGetSubCategory(shoesId, gender);
  const { data: accessoriesCategory } = useGetSubCategory(
    accessoriesId,
    gender
  );
  const { data: bagsCategory } = useGetSubCategory(bagsId, gender);
  const { data: speakersCategory } = useGetSubCategory(speakersId, gender);
  const { data: allSubCategory } = useAllGetSubCategory(gender);

  // console.log("allSubCategory", allSubCategory.data?.data);

  useEffect(() => {
    dispatch(setCategories(categoriesData?.data?.data));
  }, [dispatch, categoriesData]);

  useEffect(() => {
    dispatch(setBrands(brandsData?.data?.data));
  }, [dispatch, brandsData]);

  // function to call clothing category
  useEffect(() => {
    dispatch(setClothing(clothingCategory?.data?.data));
  }, [dispatch, clothingCategory]);

  // function to call shoes category
  useEffect(() => {
    dispatch(setShoes(shoesCategory?.data?.data));
  }, [dispatch, shoesCategory]);

  // function to call accessories category
  useEffect(() => {
    dispatch(setAccesories(accessoriesCategory?.data?.data));
  }, [dispatch, accessoriesCategory]);

  // function to call bags category
  useEffect(() => {
    dispatch(setBags(bagsCategory?.data?.data));
  }, [dispatch, bagsCategory]);

  // function to call speakers category
  useEffect(() => {
    dispatch(setSpeakers(speakersCategory?.data?.data));
  }, [dispatch, speakersCategory]);

  // function to call all accessories category
  useEffect(() => {
    dispatch(setAllSubCategory(allSubCategory?.data?.data));
  }, [dispatch, allSubCategory]);

  return (
    <header className=" z-[100] ">
      <div className="block ">
        <HeaderContainer />
      </div>
    </header>
  );
}
