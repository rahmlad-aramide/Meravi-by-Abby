import { useEffect, useState } from "react";
import Logo from "./assets/Logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import {
  MdOutlineShoppingCart,
  // MdLanguage,
  // MdFavoriteBorder,
  // MdOutlinePerson,
  // MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { CartItems } from "../Cart/Cart";
import Auth from "../auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slice/authSlice";
import { toast } from "react-toastify";
import { clearCart } from "../../redux/slice/cartSlice";
import { useGender } from "../../GenderContext";

export default function HeaderMobile() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const authenticatedUser = useSelector((state: any) => state.auth.user);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cartItems = useSelector((state: any) => state.cart.items);
  const dispatch = useDispatch();
  const { setGender, gender } = useGender();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(clearCart())
    toast.success("Log-out successfully!");
  };

  const [showCart, setShowCart] = useState<boolean>(false);
  const [showAuth, setShowAuth] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // const handleOptionClick = (selectedGender) => {
  //   handleGenderChange(selectedGender);
  //   setIsDropdownOpen(false);
  // };

  useEffect(() => {
    if (showCart || showAuth === true) {
      document.body.style.overflow = "hidden";
    }
    return (): void => {
      document.body.style.overflow = "unset";
    };
  }, [showCart, showAuth]);
  

  const handleGenderChange = (gender: 'male' | 'female') => {
    setGender(gender);
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className=" bg-White fixed top-0 py-[4%] z-10 px-[5%] w-full  ">
      <section className="flex justify-between items-center">
      <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center text-sm gap-1 p-1 ssm:p-2 border border-gray-300 rounded-md"
      >
        {gender === "male" ? "Menswear" : "Womenswear"} 
        <div className=" text-[1.5rem] ">
          <MdOutlineKeyboardArrowDown />
        </div>
      </button>
      {isDropdownOpen && (
        <div className="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg">
          <Link
            to="/"
            className={`block px-2 sm:px-4 py-2 text-[0.7rem] ssm:text-sm ${gender === "male" ? "bg-gray-200" : ""}`}
            onClick={() => handleGenderChange('male')}
          >
            Menswear
          </Link>
          <Link
            to="/"
            className={`block px-2 sm:px-4 py-2 text-[0.7rem] ssm:text-sm ${gender !== "male" ? "bg-gray-200" : ""}`}
            onClick={() => handleGenderChange('female')}
          >
            Womenswear
          </Link>
        </div>
      )}
    </div>
        <Link to="/">
          <img src={Logo} className=" mx-auto w-[80%] ssm:w-full" alt="Logo" />
        </Link>
        <div className=" flex gap-2 ssm:gap-4">
          <button
            className="text-[1.7rem] relative"
            onClick={() => setShowCart(!showCart)}
          >
            <MdOutlineShoppingCart />
            {cartItems?.length > 0 && (
              <small className=" absolute bg-black text-white text-[0.5rem] leading-none rounded-full flex justify-center items-center w-[0.75rem] h-[0.75rem] top-[-20%] right-0 ">
                {cartItems?.length}
              </small>
            )}
          </button>
          <div onClick={toggleMenu} className=" text-[1.7rem] ">
            {showMenu ? <IoClose /> : <GiHamburgerMenu />}
          </div>
        </div>
      </section>

      {showMenu && (
        <div className=" absolute w-[50%] right-0 h-[100vh] shadow-xl bg-white overflow-y-hidden px-[5%] top-full">
          {authenticatedUser?.firstName && (
                <p className="text-[1rem] pb-2 font-semibold">Hello, {authenticatedUser?.firstName} </p>
              )}
          <section className=" flex flex-col mt-[5%]  gap-4 text-[0.9rem] font-medium ">
            <Link onClick={toggleMenu} to="/">
              Men’s Wear
            </Link>
            <Link onClick={toggleMenu} to="/female">
              Women’s Wear
            </Link>
            <Link onClick={toggleMenu} to="/about">
              About
            </Link>
            <Link onClick={toggleMenu} to="/wishlist">
              Wishlist
            </Link>
            <Link onClick={toggleMenu} to="/faqs">
              FAQS
            </Link>
            {authenticatedUser ? (
              <section className=" text-[0.9rem] flex flex-col gap-4 ">
                <Link
                  to="/order-history"
                  className="hover:text-[blue] "
                  onClick={toggleMenu}
                >
                  Order History
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
      {showCart ? <CartItems close={() => setShowCart(!showCart)} /> : null}
    </div>
  );
}
