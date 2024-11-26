/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import Logo from "./assets/Logo.svg";
import {
  MdOutlineShoppingCart,
  MdLanguage,
  MdFavoriteBorder,
  MdOutlinePerson,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
// import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa";
import { CartItems } from "../Cart/Cart";
import Auth from "../auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";
import { clearCart } from "../../redux/slice/cartSlice";
import { useGender } from "../../GenderContext";
import { clearWishlist } from "../../redux/slice/wishlistSlice";

type Subcategory = {
  name: string;
  slug: string;
  categorySlug: string;
};

type Category = {
  name: string;
  subcategories: Subcategory[] | string[];
  allPageClick: () => void;
};

export default function HeaderContainer() {
  const { setGender, gender } = useGender();
  const handleGenderChange = (gender: "male" | "female") => {
    setGender(gender);
  };

  const [showCart, setShowCart] = useState<boolean>(false);
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [hoverSection, setHoverSection] = useState<string | null>(null);
  const [showLoginMenu, setShowLoginMenu] = useState<boolean>(false);
  const authenticatedUser = useSelector((state: any) => state.auth.user);
  const cartItems = useSelector((state: any) => state.cart.items);
  const wishlistItems = useSelector((state: any) => state.wishlist.items);
  const brandsItem = useSelector((state: any) => state.brands.brands);
  const categories = useSelector((state: any) => state.categories.categories);
  // const allSubCategory = useSelector((state: any) => state.subCategory.allSubCategory);
  const subCategoryShoes = useSelector((state: any) => state.subCategory.shoes);
  const subCategoryBags = useSelector((state: any) => state.subCategory.bags);
  const subCategoryAccessories = useSelector(
    (state: any) => state.subCategory.accessories
  );
  const subCategoryAbayas = useSelector(
    (state: any) => state.subCategory.abayas
  );
  const dispatch = useDispatch();

  // gender items
  const brandsItems = gender === "male" ? brandsItem : brandsItem;

  //  console.log(categories);
  // console.log("allSubCategory", allSubCategory);

  const toggleLoginMenu = () => {
    setShowLoginMenu(!showLoginMenu);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearCart());
    dispatch(clearWishlist());
    toast.success("Log-out successfully!");
  };

  useEffect(() => {
    if (showCart || showAuth === true) {
      document.body.style.overflow = "hidden";
    }
    return (): void => {
      document.body.style.overflow = "unset";
    };
  }, [showCart, showAuth]);

  // const alphabets = [
  //   "A",
  //   "B",
  //   "C",
  //   "D",
  //   "E",
  //   "F",
  //   "G",
  //   "H",
  //   "I",
  //   "J",
  //   "K",
  //   "L",
  //   "M",
  //   "N",
  //   "O",
  //   "P",
  //   "Q",
  //   "R",
  //   "S",
  //   " T",
  //   "U",
  //   "V",
  //   "W",
  //   "X",
  //   "Y",
  //   "Z",
  // ];

  const navigate = useNavigate();

  const GoToBrandsSubPage = (slug: string) => {
    const specificBrand = brandsItems.find((brand: any) => brand.slug === slug);
    // console.log(specificBrand)
    if (specificBrand) {
      navigate(`/brands/${slug}`, { state: { specificBrand } });
    }
  };

  const GoToAllShoesPage = () => {
    const specificCategory = categories.find(
      (cloth: any) => cloth.slug === "shoe"
    );

    if (specificCategory) {
      navigate(`/products/${specificCategory.name}`, {
        state: { specificCategory },
      });
      setHoverSection(null);
      setActiveCategory(null);
      setShowMenu(false);
    }
  };

  const GoToAllBagsPage = () => {
    const specificCategory = categories.find(
      (cloth: any) => cloth.slug === "bags"
    );

    if (specificCategory) {
      navigate(`/products/${specificCategory.name}`, {
        state: { specificCategory },
      });
      setHoverSection(null);
      setActiveCategory(null);
      setShowMenu(false);
    }
  };

  const GoToAllAbayasPage = () => {
    const specificCategory = categories.find(
      (abayas: any) => abayas.slug === "home"
    );

    if (specificCategory) {
      navigate(`/products/${specificCategory.name}`, {
        state: { specificCategory },
      });
      setHoverSection(null);
      setActiveCategory(null);
      setShowMenu(false);
    }
  };

  const GoToAllAccessoriesPage = () => {
    const specificCategory = categories.find(
      (cloth: any) => cloth.slug === "accessories"
    );
    // console.log("cloth", specificCategory);

    if (specificCategory) {
      navigate(`/products/${specificCategory.name}`, {
        state: { specificCategory },
      });
      setHoverSection(null);
      setActiveCategory(null);
      setShowMenu(false);
    }
  };

  const GoToShoesSubPage = (categorySlug: string, slug: string) => {
    const specificSubCategory = subCategoryShoes.find(
      (shoes: any) => shoes.slug === slug
    );
    const category = subCategoryShoes.find(
      (shoes: any) => shoes?.category?.slug === categorySlug
    );
    if (specificSubCategory && category) {
      navigate(`/category/${categorySlug}/${slug}`, {
        state: { specificSubCategory },
      });
    }
  };

  const GoToBagsSubPage = (categorySlug: string, slug: string) => {
    const specificSubCategory = subCategoryBags.find(
      (shoes: any) => shoes.slug === slug
    );
    const category = subCategoryBags.find(
      (shoes: any) => shoes?.category?.slug === categorySlug
    );
    if (specificSubCategory && category) {
      navigate(`/category/${categorySlug}/${slug}`, {
        state: { specificSubCategory },
      });
    }
  };

  const GoToAbayasSubPage = (categorySlug: string, slug: string) => {
    const specificSubCategory = subCategoryAbayas.find(
      (abayas: any) => abayas.slug === slug
    );
    const category = subCategoryAbayas.find(
      (abayas: any) => abayas?.category?.slug === categorySlug
    );
    if (specificSubCategory && category) {
      navigate(`/category/${categorySlug}/${slug}`, {
        state: { specificSubCategory },
      });
    }
  };

  const GoToAccessoriesSubPage = (categorySlug: string, slug: string) => {
    const specificSubCategory = subCategoryAccessories.find(
      (accessories: any) => accessories.slug === slug
    );
    const category = subCategoryAccessories.find(
      (accessories: any) => accessories?.category?.slug === categorySlug
    );
    if (specificSubCategory && category) {
      navigate(`/category/${categorySlug}/${slug}`, {
        state: { specificSubCategory },
      });
    }
  };

  // mobile menu
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  const allCategories = [
    {
      id: 1,
      name: "Brands",
      subcategories: (brandsItem || []).map((item: any) => ({
        name: item?.name,
        slug: item?.slug,
        gotoClick: GoToBrandsSubPage,
      })),
    },
    {
      id: 4,
      name: "Bags",
      allPageClick: GoToAllBagsPage,
      subcategories: (subCategoryBags || []).map((item: any) => ({
        name: item?.name,
        slug: item?.slug,
        categorySlug: item?.category?.slug,
        gotoClick: GoToBagsSubPage,
      })),
    },
    {
      id: 3,
      name: "Shoes",
      allPageClick: GoToAllShoesPage,
      subcategories: (subCategoryShoes || []).map((item: any) => ({
        name: item?.name,
        slug: item?.slug,
        categorySlug: item?.category?.slug,
        gotoClick: GoToShoesSubPage,
      })),
    },
    {
      id: 5,
      name: "Accessories",
      allPageClick: GoToAllAccessoriesPage,
      subcategories: (subCategoryAccessories || []).map((item: any) => ({
        name: item?.name,
        slug: item?.slug,
        categorySlug: item?.category?.slug,
        gotoClick: GoToAccessoriesSubPage,
      })),
    },
    {
      id: 1,
      name: "Abayas",
      allPageClick: GoToAllAbayasPage,
      subcategories: (subCategoryAbayas || []).map((item: any) => ({
        name: item?.name,
        slug: item?.slug,
        categorySlug: item?.category?.slug,
        gotoClick: GoToAbayasSubPage,
      })),
    },
  ];

  return (
    <header className="fixed top-0 w-full z-10 ">
      <div className="h-10 bg-[#B19776] text-white text-center items-center justify-center flex">
        <p className="text-xs">Meet The Classy Collection: Our Best Selling Items of All Time. Shop Men l Shop Women</p>
      </div>
      <nav className="bg-White min-h-[90px] items-center flex sm:px-[5%] ">
        <div className="flex px-[5%] sm:px-0 items-center justify-between relative w-full">
          
          {/* logo section */}
          <section className=" flex  justify-center">
            <Link
              to="/"
              className=" w-[80%] ssm:w-[90%] mr-[20%] ssm:mr-[10%] sm:mr-0 sm:w-[80%] lg:w-auto "
            >
              <img src={Logo} className=" w-full" alt="Logo Icon" />
            </Link>
          </section>
          
          {/* hover sections */}
        <div className=" static hidden sm:relative sm:flex justify-between">
          <section className="flex w-[100%] gap-4 sm:gap-7 md:gap-11 lg:w-[75%] xxl:w-[75%] justify-between text-[0.85rem] sm:text-[0.8rem] lg:text-[0.9rem] font-medium ">
            {/* shoes section */}
            <div
              onMouseEnter={() => setHoverSection("shoes")}
              onMouseLeave={() => setHoverSection(null)}
              className=" cursor-pointer hover:border-black border-b-2 border-transparent border-solid  px-1 pb-1 "
            >
              <div onClick={GoToAllShoesPage}>Shoes </div>
              {hoverSection === "shoes" && (
                <div>
                  {subCategoryShoes?.length > 0 ? (
                    <div
                      onMouseEnter={() => setHoverSection("shoes")}
                      onMouseLeave={() => setHoverSection(null)}
                      className=" text-black flex justify-between px-[5%] sm:px-[2%] pt-[2%] pb-[3%] sm:pb-[5%] overflow-y-auto absolute w-[100%] top-full max-h-[75vh] min-h-[5rem] shadow-xl  left-[50%] translate-x-[-50%] bg-white  "
                    >
                      <section className=" w-[100%] sm:w-[70%] mb-6 ">
                        <h2 className="text-[1.1rem] font-medium ">Shoes</h2>
                        <div className="mt-2 font-normal text-[0.8rem] sm:text-[1rem] flex flex-wrap gap-x-[4%] gap-y-3 ">
                          <button
                            onClick={GoToAllShoesPage}
                            className=" hover:text-[blue] "
                          >
                            All Shoes
                          </button>
                          {/* <button
                            onClick={GoToShoesSpecificPage}
                            className=" hover:text-[blue] "
                          >
                            Shoes by Subcategories
                          </button> */}
                          {subCategoryShoes?.map((sub: any) => (
                            <button
                              onClick={() => {
                                GoToShoesSubPage(sub?.category?.slug, sub?.slug);
                                setHoverSection(null);
                              }}
                              className=" hover:text-[blue] "
                              key={sub?._id}
                            >
                              {sub?.name}
                            </button>
                          ))}
                        </div>
                      </section>
                      <section className="hidden sm:block w-[25%] ">
                        <img
                          src={
                            gender === "male"
                              ? "https://res.cloudinary.com/dzjazulfw/image/upload/v1722651670/male-shoes_ineiqm.webp"
                              : "https://res.cloudinary.com/dzjazulfw/image/upload/v1722651929/female-shoes_vxtfza.webp"
                          }
                          className=" object-contain w-full"
                          alt="clothing image"
                        />
                      </section>
                    </div>
                  ) : (
                    <div className=" text-black flex justify-between px-[5%] sm:px-[2%] pt-[2%] pb-[2%] overflow-y-auto absolute w-[100%] top-full  shadow-xl  left-[50%] translate-x-[-50%] bg-white  ">
                      <p className="text-[1.1rem]  ">No shoes available</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* bags section */}
            <div
              onMouseEnter={() => setHoverSection("bags")}
              onMouseLeave={() => setHoverSection(null)}
              className=" cursor-pointer hover:border-black border-b-2 border-transparent border-solid  px-1 pb-1 "
            >
              <div onClick={GoToAllBagsPage}>Bags </div>
              {hoverSection === "bags" && (
                <div>
                  {subCategoryBags?.length > 0 ? (
                    <div
                      onMouseEnter={() => setHoverSection("bags")}
                      onMouseLeave={() => setHoverSection(null)}
                      className=" text-black flex justify-between px-[5%] sm:px-[2%] pt-[2%] pb-[3%] sm:pb-[5%] overflow-y-auto absolute w-[100%] top-full max-h-[75vh] min-h-[5rem] shadow-xl  left-[50%] translate-x-[-50%] bg-white  "
                    >
                      <section className=" w-[100%] sm:w-[70%] mb-6 ">
                        <h2 className="text-[1.1rem] font-medium ">Bags</h2>
                        <div className="mt-2 font-normal text-[0.8rem] sm:text-[1rem] flex flex-wrap gap-x-[4%] gap-y-3 ">
                          <button
                            onClick={GoToAllBagsPage}
                            className=" hover:text-[blue] "
                          >
                            All Bags
                          </button>
                          {subCategoryBags?.map((sub: any) => (
                            <button
                              onClick={() => {
                                GoToBagsSubPage(sub?.category?.slug, sub?.slug);
                                setHoverSection(null);
                              }}
                              className=" hover:text-[blue] "
                              key={sub?._id}
                            >
                              {sub?.name}
                            </button>
                          ))}
                        </div>
                      </section>
                      <section className="hidden sm:block w-[25%] ">
                        <img
                          src={
                            gender === "male"
                              ? "https://res.cloudinary.com/dzjazulfw/image/upload/v1722652331/male-bag_1_lxwm0x.webp"
                              : "https://res.cloudinary.com/dzjazulfw/image/upload/v1722652228/female-bag2_1_ecffqc.webp"
                          }
                          className=" object-contain w-full"
                          alt="clothing image"
                        />
                      </section>
                    </div>
                  ) : (
                    <div className=" text-black flex justify-between px-[5%] sm:px-[2%] pt-[2%] pb-[2%] overflow-y-auto absolute w-[100%] top-full  shadow-xl  left-[50%] translate-x-[-50%] bg-white  ">
                      <p className="text-[1.1rem]  ">No bags available</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* accesories section */}
            <div
              onMouseEnter={() => setHoverSection("accesories")}
              onMouseLeave={() => setHoverSection(null)}
              className=" cursor-pointer hover:border-black border-b-2 border-transparent border-solid  px-1 pb-1 "
            >
              <div onClick={GoToAllAccessoriesPage}>Accessories </div>
              {hoverSection === "accesories" && (
                <div>
                  {subCategoryAccessories?.length > 0 ? (
                    <div
                      onMouseEnter={() => setHoverSection("accesories")}
                      onMouseLeave={() => setHoverSection(null)}
                      className=" text-black flex justify-between px-[5%] sm:px-[2%] pt-[2%] pb-[3%] sm:pb-[5%] overflow-y-auto absolute w-[100%] top-full max-h-[75vh] min-h-[5rem] shadow-xl rounded-md left-[50%] translate-x-[-50%] bg-white  "
                    >
                      <section className=" w-[100%] sm:w-[70%] mb-6 ">
                        <h2 className="text-[1.1rem] font-medium ">
                          Accessories
                        </h2>
                        <div className="mt-2 font-normal text-[0.8rem] sm:text-[1rem] flex flex-wrap gap-x-[4%] gap-y-3 ">
                          <button
                            onClick={GoToAllAccessoriesPage}
                            className=" hover:text-[blue] "
                          >
                            All Accessories
                          </button>
                          {/* <button
                            onClick={GoToAccessoriesSpecificPage}
                            className=" hover:text-[blue] "
                          >
                            Accessories by subcategories
                          </button> */}
                          {subCategoryAccessories?.map((sub: any) => (
                            <button
                              onClick={() => {
                                GoToAccessoriesSubPage(
                                  sub?.category?.slug,
                                  sub?.slug
                                );
                                setHoverSection(null);
                              }}
                              className=" hover:text-[blue] "
                              key={sub?._id}
                            >
                              {sub?.name}
                            </button>
                          ))}
                        </div>
                      </section>
                      <section className="hidden sm:block w-[25%] ">
                        <img
                          src={
                            gender === "male"
                              ? "https://res.cloudinary.com/dzjazulfw/image/upload/v1722652607/male-access_cijnnn.webp"
                              : "https://res.cloudinary.com/dzjazulfw/image/upload/v1722652870/female-sun2_mdefjq.webp"
                          }
                          className=" object-contain w-full"
                          alt="clothing image"
                        />
                      </section>
                    </div>
                  ) : (
                    <div className=" text-black flex justify-between px-[5%] sm:px-[2%] pt-[2%] pb-[2%] overflow-y-auto absolute w-[100%] top-full  shadow-xl rounded-md left-[50%] translate-x-[-50%] bg-white  ">
                      <p className="text-[1.1rem]  ">No accessories available</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* abayas section */}
            <div
              onMouseEnter={() => setHoverSection("abayas")}
              onMouseLeave={() => setHoverSection(null)}
              className=" cursor-pointer hover:border-black border-b-2 border-transparent border-solid px-1 pb-1 "
            >
              <div onClick={GoToAllAbayasPage}>Abayas </div>
              {hoverSection === "abayas" && (
                <div>
                  {subCategoryAbayas?.length > 0 ? (
                    <div
                      onMouseEnter={() => setHoverSection("abayas")}
                      onMouseLeave={() => setHoverSection(null)}
                      className=" text-black flex justify-between px-[5%] sm:px-[2%] pt-[2%] pb-[3%] sm:pb-[5%] overflow-y-auto absolute w-[100%] top-full max-h-[75vh] min-h-[5rem] shadow-xl rounded-md left-[50%] translate-x-[-50%] bg-white  "
                    >
                      <section className=" w-[100%] sm:w-[70%] mb-6 ">
                        <h2 className="text-[1.1rem] font-medium ">Abayas </h2>
                        <div className="mt-2 font-normal text-[0.8rem] sm:text-[1rem] flex flex-wrap gap-x-[4%] gap-y-3 ">
                          <button
                            onClick={GoToAllAbayasPage}
                            className=" hover:text-[blue] "
                          >
                            All Abayas
                          </button>
                          {subCategoryAbayas?.map((sub: any) => (
                            <button
                              onClick={() => {
                                GoToAbayasSubPage(sub?.category?.slug, sub?.slug);
                                setHoverSection(null);
                              }}
                              className=" hover:text-[blue] "
                              key={sub?._id}
                            >
                              {sub?.name}
                            </button>
                          ))}
                        </div>
                      </section>
                      <section className="hidden sm:block w-[25%] ">
                        <img
                          src={
                            gender === "male"
                              ? "https://res.cloudinary.com/dzjazulfw/image/upload/v1722652984/male-home_g0zhyc.jpg"
                              : "https://res.cloudinary.com/dzjazulfw/image/upload/v1722653212/female-fridge_taslle.jpg"
                          }
                          className=" object-contain w-full"
                          alt="abayas image"
                        />
                      </section>
                    </div>
                  ) : (
                    <div className=" text-black flex justify-between px-[5%] sm:px-[2%] pt-[2%] pb-[2%] overflow-y-auto absolute w-[100%] top-full  shadow-xl rounded-md left-[50%] translate-x-[-50%] bg-white  ">
                      <p className="text-[1.1rem]  ">
                        Nothing in Abayas Products yet
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>

          {/* desktop gender switch */}
          <section className=" hidden sm:hidden gap-2 lg:gap-4 text-[0.8rem] lg:text-[0.9rem] font-medium ">
            <Link
              to="/"
              className={`${
                gender === "male" ? " border-b-2 border-black " : ""
              }`}
              onClick={() => handleGenderChange("male")}
            >
              Menswear
            </Link>
            <Link
              to="/"
              className={`${
                gender !== "male" ? " border-b-2 border-black " : ""
              }`}
              onClick={() => handleGenderChange("female")}
            >
              Womenswear
            </Link>
          </section>


          {/* desktop menu other section */}
          <section className=" hidden sm:block ">
            {authenticatedUser ? (
              <section className="text-[1.3rem] relative flex  justify-end gap-4">
                <button
                  className={`flex gap-1 ${
                    showLoginMenu && "text-[blue] "
                  } hover:text-[blue] `}
                  onClick={toggleLoginMenu}
                >
                  <MdOutlinePerson />
                  {authenticatedUser?.firstName && (
                    <p className="text-[0.9rem] font-semibold">
                      {authenticatedUser?.firstName}{" "}
                    </p>
                  )}
                </button>
                {showLoginMenu && (
                  <div
                    onClick={() => setShowLoginMenu(!showLoginMenu)}
                    className=" bg-white px-[10%] z-[1] flex flex-col gap-1 py-3 shadow-lg absolute top-full left-0 text-black text-[0.9rem]  "
                  >
                    <div className=" cursor-pointer hover:text-[blue]  ">
                      <Link to="/order-history">Order History</Link>
                    </div>
                    <div
                      className=" cursor-pointer text-[red]"
                      onClick={handleLogout}
                    >
                      <p>Logout</p>
                    </div>
                  </div>
                )}
                <Link className=" hover:text-[blue] relative" to="/wishlist">
                  <MdFavoriteBorder />
                  {wishlistItems?.length > 0 && (
                    <small className=" absolute bg-black text-white text-[0.5rem] leading-none rounded-full flex justify-center items-center w-[0.75rem] h-[0.75rem] top-[-20%] right-0 ">
                      {wishlistItems?.length}
                    </small>
                  )}
                </Link>
                <button
                  className="hover:text-[blue] relative"
                  onClick={() => setShowCart(!showCart)}
                >
                  <MdOutlineShoppingCart />
                  {cartItems?.length > 0 && (
                    <small className=" absolute bg-black text-white text-[0.5rem] leading-none rounded-full flex justify-center items-center w-[0.75rem] h-[0.75rem] top-[-20%] right-0 ">
                      {cartItems?.length}
                    </small>
                  )}
                </button>
                <div className=" cursor-pointer flex items-center">
                  <MdLanguage />
                  <MdOutlineKeyboardArrowDown className=" text-[1rem] " />
                </div>
              </section>
            ) : (
              <section className="text-[1.3rem] flex  justify-end gap-4">
                <button onClick={() => setShowAuth(!showAuth)}>
                  <MdOutlinePerson />
                </button>
                <Link className="hover:text-[blue] relative" to="/wishlist">
                  <MdFavoriteBorder />
                  {wishlistItems?.length > 0 && (
                    <small className=" absolute bg-black text-white text-[0.5rem] leading-none rounded-full flex justify-center items-center w-[0.75rem] h-[0.75rem] top-[-20%] right-0 ">
                      {wishlistItems?.length}
                    </small>
                  )}
                </Link>
                <button
                  className="hover:text-[blue] relative"
                  onClick={() => setShowCart(!showCart)}
                >
                  <MdOutlineShoppingCart />
                  {cartItems?.length > 0 && (
                    <small className=" absolute bg-black text-white text-[0.5rem] leading-none rounded-full flex justify-center items-center w-[0.75rem] h-[0.75rem] top-[-20%] right-0 ">
                      {cartItems?.length}
                    </small>
                  )}
                </button>
                <div className=" cursor-pointer flex items-center">
                  <MdLanguage />
                  <MdOutlineKeyboardArrowDown className=" text-[1rem] " />
                </div>
              </section>
            )}
          </section>

          {/* mobile menu other section */}
          <div className="flex items-center sm:hidden  gap-2 ssm:gap-4">
            <button
              className="text-[1.5rem] ssm:text-[1.7rem] relative"
              onClick={() => setShowCart(!showCart)}
            >
              <MdOutlineShoppingCart />
              {cartItems?.length > 0 && (
                <small className=" absolute bg-black text-white text-[0.5rem] leading-none rounded-full flex justify-center items-center w-[0.75rem] h-[0.75rem] top-[-20%] right-0 ">
                  {cartItems?.length}
                </small>
              )}
            </button>
            <Link
              className="hover:text-[blue] mr-2 text-[1.5rem] ssm:text-[1.7rem] relative"
              to="/wishlist"
            >
              <MdFavoriteBorder />
              {wishlistItems?.length > 0 && (
                <small className=" absolute bg-black text-white text-[0.5rem] leading-none rounded-full flex justify-center items-center w-[0.75rem] h-[0.75rem] top-[-20%] right-0 ">
                  {wishlistItems?.length}
                </small>
              )}
            </Link>
            <div
              onClick={toggleMenu}
              className=" text-[1.7rem] ssm:text-[2.2rem] "
            >
              {showMenu ? <IoClose /> : <GiHamburgerMenu />}
            </div>
          </div>

          {showMenu && (
            <div className="block sm:hidden pt-4 absolute w-[100%] z-[5] overflow-y-auto h-[100vh] shadow-xl pb-16 bg-white  px-[5%] right-0 top-full">
              {/* {authenticatedUser?.firstName && (
                <p className="text-[1.3rem] pb-2 font-semibold">
                  Hello, {authenticatedUser?.firstName}{" "}
                </p>
              )} */}
              <section className=" flex gap-2 lg:gap-4 text-[1.2rem] ssm:text-[1.3rem]  font-medium ">
                <Link
                  to="/"
                  className={`${
                    gender === "male" ? " border-b-2 border-black " : ""
                  }`}
                  onClick={() => handleGenderChange("male")}
                >
                  Menswear
                </Link>
                <Link
                  to="/"
                  className={`${
                    gender !== "male" ? " border-b-2 border-black " : ""
                  }`}
                  onClick={() => handleGenderChange("female")}
                >
                  Womenswear
                </Link>
              </section>
              <div className="  flex flex-col pt-4">
                <ul className="space-y-4">
                  {allCategories.map((category) => (
                    <li
                      className="flex justify-between items-center"
                      key={category.id}
                    >
                      <button
                        onClick={() => setActiveCategory(category as Category)}
                        className="w-full text-left text-[1.1rem] ssm:text-[1.2rem] "
                      >
                        {category.name}
                      </button>
                      <div>
                        <FaChevronRight />
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Modal for Subcategories */}
                {activeCategory && (
                  <div className="fixed inset-0  bg-white bg-opacity-50  flex items-center justify-center z-50">
                    <div className="bg-white relative px-[5%] py-3 overflow-y-auto h-screen w-full">
                      <div className="py-2 top-0 left-0 fixed px-[5%] bg-white w-full flex justify-between items-center">
                        <button
                          onClick={() => setActiveCategory(null)}
                          className=" text-base text-blue-500"
                        >
                          &larr; Back
                        </button>
                        <button
                          onClick={() => {
                            setActiveCategory(null);
                            setShowMenu(false);
                          }}
                          className=" text-[1.7rem] "
                        >
                          <IoClose />
                        </button>
                      </div>
                      <h3 className="text-lg font-semibold mt-10 mb-4">
                        {activeCategory.name}
                      </h3>
                      <ul className="space-y-2">
                        {activeCategory.name === "Brands" ? (
                          <Link
                            to="/brands"
                            onClick={() => {
                              setActiveCategory(null);
                              setShowMenu(false);
                            }}
                          >
                            <li className="w-full text-left p-2 bg-gray-100 rounded hover:bg-gray-200">
                              All {activeCategory.name}
                            </li>
                          </Link>
                        ) : (
                          <button
                            onClick={activeCategory?.allPageClick}
                            className="w-full text-left p-2 bg-gray-100 rounded hover:bg-gray-200"
                          >
                            <li>All {activeCategory.name} </li>
                          </button>
                        )}
                        {activeCategory.subcategories.map((subcategory: any) => (
                          <li key={subcategory}>
                            <button
                              onClick={() => {
                                if (activeCategory.name === "Brands") {
                                  subcategory.gotoClick(subcategory.slug);
                                } else {
                                  subcategory.gotoClick(
                                    subcategory.categorySlug,
                                    subcategory.slug
                                  );
                                }
                                setActiveCategory(null);
                                setShowMenu(false);
                              }}
                              className="w-full text-left p-2 bg-gray-100 rounded hover:bg-gray-200"
                            >
                              {subcategory?.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <section className=" flex flex-col mt-10  gap-4 text-[1.1rem] ssm:text-[1.2rem] ">
                <Link
                  className="flex  justify-between items-center"
                  onClick={toggleMenu}
                  to="/sales"
                >
                  <p className="text-[Red]">Sales</p>
                  <div>
                    <FaChevronRight />
                  </div>
                </Link>
                <Link
                  className="flex justify-between items-center"
                  onClick={toggleMenu}
                  to="/about"
                >
                  <p>About</p>
                  <div>
                    <FaChevronRight />
                  </div>
                </Link>
                <Link
                  className="flex justify-between items-center"
                  onClick={toggleMenu}
                  to="/faqs"
                >
                  <p>FAQS</p>
                  <div>
                    <FaChevronRight />
                  </div>
                </Link>
                {authenticatedUser ? (
                  <section className="  flex flex-col gap-4 ">
                    <Link
                      className="flex justify-between items-center"
                      onClick={toggleMenu}
                      to="/order-history"
                    >
                      <p>Order History</p>
                      <div>
                        <FaChevronRight />
                      </div>
                    </Link>
                    <div
                      className="text-[red] "
                      onClick={() => {
                        handleLogout();
                        toggleMenu;
                      }}
                    >
                      Logout
                    </div>
                  </section>
                ) : (
                  <div
                    onClick={() => {
                      setShowAuth(!showAuth);
                      toggleMenu;
                    }}
                  >
                    Login/Sign-Up
                  </div>
                )}
              </section>

              {showAuth ? <Auth close={() => setShowAuth(!showAuth)} /> : null}
            </div>
          )}
        </div>

        {/* mobile menu other section ends */}


        {showCart ? <CartItems close={() => setShowCart(!showCart)} /> : null}
        {showAuth ? <Auth close={() => setShowAuth(!showAuth)} /> : null}
      </nav>
    </header>
  );
}
