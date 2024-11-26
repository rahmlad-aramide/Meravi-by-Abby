import { NavLink } from "react-router-dom";
import { SelectCountry } from "../../Components/SelectDropdown/Country";
import { CgProfile } from "react-icons/cg";

export default function EditPasswordAddress() {
  return (
    <div className=" mt-[6rem] sm:mt-[7rem] flex gap-10 relative lg:mt-[9rem] px-[5%]">
      <div className=" w-[20%] hidden sm:block text-center sticky top-0 pb-6 ">
        <section className="flex-col gap-6  flex text-[0.85rem] lg:text-[0.95rem] font-medium ">
            <div className="text-[2rem] text-center flex justify-center ">
                <CgProfile />
            </div>
          <div>
            <NavLink
              className=" hover:border-black border-b-2 border-transparent border-solid rounded-md px-1 pb-1 "
              to=""
            >
              Hello Ezekiel{" "}
            </NavLink>
          </div>
          <div>
            <NavLink
              className="  hover:border-black border-b-2 border-transparent border-solid rounded-md px-1 pb-1 "
              to=""
            >
              My Account{" "}
            </NavLink>
          </div>
          <div>
            <NavLink
              className="  hover:border-black border-b-2 border-transparent border-solid rounded-md px-1 pb-1 "
              to=""
            >
              Orders{" "}
            </NavLink>
          </div>
          <div>
            <NavLink
              className="  hover:border-black border-b-2 border-transparent border-solid rounded-md px-1 pb-1 "
              to="/wishlist"
            >
              Wishlist{" "}
            </NavLink>
          </div>
          <div>
            <NavLink
              className="  hover:border-black border-b-2 border-transparent border-solid rounded-md px-1 pb-1 "
              to=""
            >
              Billing Address{" "}
            </NavLink>
          </div>
          <div>
            <NavLink
              className="  hover:border-black border-b-2 border-transparent border-solid rounded-md px-1 pb-1 "
              to=""
            >
              Payments Cards{" "}
            </NavLink>
          </div>
          <div>
            <NavLink
              className="  hover:border-red-500 border-b-2 border-transparent border-solid rounded-md px-1 pb-1 text-red-500 "
              to=""
            >
              Logout{" "}
            </NavLink>
          </div>
        </section>
      </div>

      {/* contents */}
      <section className="w-[100%] sm:w-[70%] lg:w-[55%]   text-[#344054] font-medium text-[0.9rem] ">
        <div>
          <h2 className=" bg-black text-center text-[1.2rem] sm:text-[1.4rem] xxl:text-[1.5rem] text-white px-5 py-2 mx-auto ">
            Edit your delivery address
          </h2>

          <form action="" className="py-[5%] flex flex-col gap-3 sm:gap-5 ">
            <section className="flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between ">
              <div className="w-[100%] sm:w-[48%] flex flex-col gap-1 ">
                <label htmlFor="firstName">first name</label>
                <input
                  type="text"
                  className=" outline-none text-left sm:text-center text-[1rem] px-[2%] py-[6px] border-black border-[1px] w-full "
                  name=""
                  id="firstName"
                  placeholder="Ezekiel"
                />
              </div>
              <div className="w-[100%] sm:w-[48%] flex flex-col gap-1 ">
                <label htmlFor="lastName">last name</label>
                <input
                  type="text"
                  className=" outline-none text-left sm:text-center text-[1rem] px-[2%] py-[6px] border-black border-[1px] w-full "
                  name=""
                  id="lastName"
                  placeholder="Tobi"
                />
              </div>
            </section>

            <section className="w-full flex flex-col gap-1 ">
              <label htmlFor="delivery">delivery address</label>
              <input
                type="text"
                className=" outline-none text-[1rem] px-[2%] py-[6px] border-black border-[1px] w-full "
                name=""
                id="delivery"
                placeholder="Lekki , kings way. Lagos ,Nigeria"
              />
            </section>

            <section className="w-[100%] sm:w-[48%] flex flex-col gap-1 ">
              <label htmlFor="delivery">Country</label>
              <SelectCountry />
            </section>

            <section className="w-[100%] sm:w-[48%] flex flex-col gap-1 ">
              <label htmlFor="city">City</label>
              <input
                type="text"
                className=" outline-none text-[1rem] px-[2%] py-[6px] border-black border-[1px] w-full "
                name=""
                id="delivery"
                placeholder="Lagos"
              />
            </section>

            <section className="w-[100%] sm:w-[48%] flex flex-col gap-1 ">
              <label htmlFor="delivery">Phone</label>
              <div className="text-[1rem] flex gap-2 items-center px-[2%] py-[6px] border-black border-[1px]">
                <select name="" className=" appearance-none outline-none" id="">
                  <option value="">NG</option>
                </select>
                <input
                  type="text"
                  className=" outline-none  w-full "
                  name=""
                  id="delivery"
                  placeholder="+234 234 234 234"
                />
              </div>
            </section>

            <section className=" flex justify-end">
              <button className="bg-black text-center text-[1rem] text-white px-10 py-2">
                Save
              </button>
            </section>
          </form>
        </div>

        {/* edit password */}
        <div className=" mt-[5%] ">
          <h2 className=" bg-black text-center text-[1.2rem] sm:text-[1.4rem] xxl:text-[1.5rem] text-white px-5 py-2 mx-auto ">
            Edit your Password
          </h2>

          <form action="" className="py-[5%] flex flex-col gap-3 sm:gap-5 ">
            <section className="w-full flex flex-col gap-1 ">
              <label htmlFor="current">Current Password</label>
              <input
                type="password"
                className=" outline-none text-[1rem] px-[2%] py-[6px] border-black border-[1px] w-full "
                name=""
                id="current"
              />
            </section>

            <section className="w-full flex flex-col gap-1 ">
              <label htmlFor="New">New Password</label>
              <input
                type="password"
                className=" outline-none text-[1rem] px-[2%] py-[6px] border-black border-[1px] w-full "
                name=""
                id="New"
              />
            </section>

            <section className="w-full flex flex-col gap-1 ">
              <label htmlFor="Confirm">Confirm Password</label>
              <input
                type="password"
                className=" outline-none text-[1rem] px-[2%] py-[6px] border-black border-[1px] w-full "
                name=""
                id="Confirm"
              />
            </section>

            <section className=" flex justify-end">
              <button className="bg-black text-center text-[1rem] text-white px-10 py-2">
                Save
              </button>
            </section>
          </form>
        </div>
      </section>
    </div>
  );
}
