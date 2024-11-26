/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetProductsMale } from "../ApiCalls/getProductsMale";
import shirt from "../assets/t-shirt.png";
import formatPrice from "../functions/FormatPrice";
import { useGetProductsFemale } from "../ApiCalls/getProductsFemale";
import { Oval } from "react-loader-spinner";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../redux/slice/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import Fuse from "fuse.js";

interface ProductsState {
  _id: string | null;
  name: string;
  brand_name: {
    name: string;
  };
  price: string | null;
  description: string | null;
  image: string[] | null;
  category: {
    name: string;
  };
}

const Category = () => {
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [brandOpen, setBrandOpen] = useState<boolean>(false);
  const [priceRangeOpen, setPriceRangeOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "All Categories"
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    "All Brands"
  );
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { isLoading: isLoadingMale, data: productsDataMale } =
    useGetProductsMale();
  const { isLoading: isLoadingFemale, data: productsDataFemale } =
    useGetProductsFemale();
  const ProductsFemale = productsDataFemale?.data?.data?.availableProducts;
  const ProductsMale = productsDataMale?.data?.data?.availableProducts;
  const location = useLocation();
  const { gender } = location.state || { gender: "male" };
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: any) => state.wishlist.items);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const isLoading = gender === "male" ? isLoadingMale : isLoadingFemale;
  const Products = gender === "male" ? ProductsMale : ProductsFemale;

  const categoryNames = Products
    ? [
        "All Categories",
        ...new Set(
          Products.map((product: ProductsState) => product?.category?.name)
        ),
      ]
    : [];

  const brandNames = Products
    ? [
        "All Brands",
        ...new Set(
          Products.map((product: ProductsState) => product?.brand_name?.name)
        ),
      ]
    : [];

  // console.log("Products:", Products);
  // console.log("Category Names:", categoryNames);
  // console.log("Brands Names:", brandNames);
  // console.log("Selected Category:", selectedCategory);

  const priceRanges = [
    { label: "Below 10k", value: "under10k" },
    { label: "10k to 100k", value: "10to100" },
    { label: "100k to 500k", value: "100to500" },
    { label: "Above 500k", value: "over500" },
  ];

  // console.log("Selected Price Ranges:", selectedPriceRanges);

  const filterByPrice = (product: ProductsState) => {
    const price = parseFloat(product.price ?? "0");
    if (selectedPriceRanges.length === 0) return true;
    return selectedPriceRanges.some((range) => {
      if (range === "under10k") return price < 10000;
      if (range === "10to100") return price >= 10000 && price <= 100000;
      if (range === "100to500") return price > 100000 && price <= 500000;
      if (range === "over500") return price > 500000;
      return false;
    });
  };

  // Filtered Products based on selected category, brand, price range, and search term
  const fuse = new Fuse(Products ?? [], {
    keys: ["name", "brand_name.name", "category.name"],
    threshold: 0.3,
  });

  const searchResults = searchTerm
    ? fuse.search(searchTerm).map((result: any) => result.item)
    : Products;

  // Filtered Products based on selected category and price range
  const filteredProducts = searchResults?.filter((product: ProductsState) => {
    return (
      (selectedCategory === "All Categories" ||
        product?.category?.name === selectedCategory) &&
      (selectedBrand === "All Brands" ||
        product?.brand_name?.name === selectedBrand) &&
      filterByPrice(product)
    );
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of items per page

  // Calculate the current products to display
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Total number of pages
  const totalPages = Math.ceil((filteredProducts?.length || 0) / itemsPerPage);

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Next and Previous page handlers
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Generate page numbers to display
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = () => {
    const maxPageButtons = 5; // Max number of page buttons to show
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage < maxPageButtons - 1) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    const pageButtons = [];
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={`px-2 ssm:px-3 sm:px-4 py-1 ssm:py-[6px] sm:py-2 mx-1 rounded ${
            currentPage === i ? "bg-gray-800 text-white" : "bg-gray-300"
          }`}
        >
          {i}
        </button>
      );
    }

    return pageButtons;
  };

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to first page on category change
  };

  // Handle brand selection
  const handleBrandClick = (brand: string) => {
    setSelectedBrand(brand);
    setCurrentPage(1); // Reset to first page on category change
  };

  // Handle price range selection
  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRanges((prev) =>
      prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
    );
  };

  // add to wishlist and also remove from it
  // add to wishlist and also remove from it
  const handleAddToWishlist = (product: ProductsState) => {
    if (
      product._id &&
      product.name &&
      product.price &&
      product.description &&
      product.image
    ) {
      dispatch(
        addItemToWishlist({
          id: product._id,
          name: product.name,
          price: parseFloat(product.price),
          totalPrice: parseFloat(product.price) * 1,
          description: product.description,
          image: product.image[0],
          quantity: 1,
        })
      );
      // toast.success("You've added item to Wishlist!");
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    dispatch(removeItemFromWishlist(productId));
    // toast.success("You've removed item from wishlist!");
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(
      (item: { id: string | null }) => item.id === productId
    );
  };

  // console.log("Filtered Products:", filteredProducts);
  // console.log("Current Products:", currentProducts);

  return (
    <div className="pt-20 pb-8 sm:pt-28 lg:pt-36 px-[5%]">
      <div className="women-placeholder text-center py-3  lg:py-5 text-white">
        <h1 className="text-[1.3rem] ssm:text-[1.5rem] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.5rem]">
          {gender === "male" ? "MEN'S WEARS" : "WOMEN'S WEARS"}
        </h1>
      </div>

      <div className="">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-[5%] mt-0 sm:mt-8 ">

          {/* search and filter section */}
          <section className="w-[100%] sm:w-[30%] lg:w-[20%] z-[2] bg-white sm:bg-transparent bg max-h-full sm:max-h-[70vh] sticky top-12 sm:top-28 lg:top-36 flex flex-col gap-2 ">
            <div className="flex mt-4 w-full justify-end">
              <section className=" text-[0.95rem] w-[100%]  ">
                <input
                  type="text"
                  placeholder="Search for Items"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-[1.5px] rounded-[4px] outline-none border-black w-full  px-[2%] py-1 "
                />
              </section>
            </div>
            {/* Filter section */}
            <section className=" pb-1 sm:pb-0 flex flex-row   justify-between sm:justify-start sm:flex-col  sm:overflow-y-auto   sm:border-t-[1.5px] sm:border-black ">
              {/* Categories filter */}
              <div className=" border-b-[1.5px] py-1 border-black">
                <section
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="cursor-pointer flex items-center justify-between "
                >
                  <p className="text-[0.9rem] ssm:text-[1rem]">Categories</p>
                  <div
                    className={`text-[1.5rem] ${
                      categoryOpen ? "rotate-180" : ""
                    } `}
                  >
                    <MdOutlineKeyboardArrowDown />
                  </div>
                </section>
                {categoryOpen && (
                  <div className="py-1 flex flex-col absolute sm:relative top-full w-[50%] sm:w-auto shadow-md px-2 sm:px-0  sm:top-0 bg-white sm:bg-transparent text-[0.8rem] sm:text-[0.9rem] gap-1 ">
                    {categoryNames?.map((cat: any, index: number) => (
                      <p
                        key={index}
                        className={`hover:text-[blue] cursor-pointer ${
                          selectedCategory === cat ? "text-blue-500" : ""
                        }`}
                        onClick={() => handleCategoryClick(cat)}
                      >
                        {cat}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Brands filter */}
              {brandNames && brandNames.length > 0 && (
                <div className="border-b-[1.5px] py-1 border-black">
                  <section
                    onClick={() => setBrandOpen(!brandOpen)}
                    className="cursor-pointer flex items-center justify-between "
                  >
                    <p className="text-[0.9rem] ssm:text-[1rem]">Brands</p>
                    <div
                      className={`text-[1.5rem] ${
                        brandOpen ? "rotate-180" : ""
                      } `}
                    >
                      <MdOutlineKeyboardArrowDown />
                    </div>
                  </section>
                  {brandOpen && (
                    <div className="py-1 flex flex-col absolute sm:relative top-full w-[50%] sm:w-auto shadow-md px-2 sm:px-0  sm:top-0 bg-white sm:bg-transparent text-[0.8rem] sm:text-[0.9rem] gap-1 ">
                      {brandNames?.map((brand: any, index: number) => (
                        <p
                          key={index}
                          className={`hover:text-[blue] cursor-pointer ${
                            selectedBrand === brand ? "text-blue-500" : ""
                          }`}
                          onClick={() => handleBrandClick(brand)}
                        >
                          {brand}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Price range filter */}
              <div className="border-b-[1.5px] py-1 border-black ">
                <section
                  onClick={() => setPriceRangeOpen(!priceRangeOpen)}
                  className="cursor-pointer flex items-center justify-between "
                >
                  <p className="text-[0.9rem] ssm:text-[1rem]">Price Range</p>
                  <div
                    className={`text-[1.5rem] ${
                      priceRangeOpen ? "rotate-180" : ""
                    } `}
                  >
                    <MdOutlineKeyboardArrowDown />
                  </div>
                </section>
                {priceRangeOpen && (
                  <div className="py-1 flex flex-col absolute sm:relative top-full w-[50%] sm:w-auto shadow-md px-2 sm:px-0  sm:top-0 bg-white sm:bg-transparent text-[0.8rem] sm:text-[0.9rem] gap-1 ">
                    {priceRanges.map((range, index) => (
                      <label
                        key={index}
                        className="flex cursor-pointer items-center"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPriceRanges.includes(range.value)}
                          onChange={() => handlePriceRangeChange(range.value)}
                          className="mr-2"
                        />
                        {range.label}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </section>
          </section>

          {/* Products section */}
          <section className=" w-full sm:w-[68%] lg:w-[75%]">
            {isLoading ? (
              <div className="flex justify-center text-white items-center min-h-[15vh] sm:min-h-[30vh]">
                <Oval
                  visible={true}
                  height="50"
                  width="50"
                  color="white"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : Products && Products?.length > 0 ? (
              <div>
                {filteredProducts && filteredProducts.length > 0 ? (
                  <section className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-[5%] gap-y-4">
                    {currentProducts?.map((product: ProductsState) => (
                      <div>
                        <div className=" relative">
                        <div className=" flex justify-end">
                            <button className="border-[#181818] text-[1.5rem] p-2">
                              {isInWishlist(product._id!) ? (
                                <IoHeartSharp
                                  className="cursor-pointer text-red-500"
                                  onClick={() =>
                                    handleRemoveFromWishlist(product._id!)
                                  }
                                />
                              ) : (
                                <IoHeartOutline
                                  className="cursor-pointer"
                                  onClick={() => handleAddToWishlist(product)}
                                />
                              )}
                            </button>
                          </div>
                          <Link
                            to={`/product/details/${product?._id}`}
                            className="pt-3"
                            key={product?._id}
                          >
                            <img
                              src={
                                product?.image && product.image.length > 0
                                  ? product.image[0]
                                  : shirt
                              }
                              className="w-[90%] mx-auto  h-[8rem] sm:h-[10rem] lg:h-[13rem] object-contain"
                              alt="Product Image"
                            />
                          </Link>
                          
                        </div>
                        <Link
                          to={`/product/details/${product?._id}`}
                          className=""
                          key={product?._id}
                        >
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 pt-2 items-start sm:items-center justify-between">
                            <p className="text-base font-bold text-[#333333]">
                              {product?.name}
                            </p>
                            <p className="text-sm font-medium text-[#333333]">
                              {formatPrice(product?.price ?? "0")}{" "}
                            </p>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 pt-2 items-start sm:items-center justify-between">
                            <p className="text-sm font-medium text-[#333333]">
                              {product?.category?.name}
                            </p>
                            <p className="text-sm font-medium text-[#333333]">
                              {product?.brand_name?.name}{" "}
                            </p>
                          </div>
                          {/* <p className="text-[#000000e6] text-sm mt-3">
                          {product?.description}
                        </p> */}
                        </Link>
                      </div>
                    ))}
                  </section>
                ) : (
                  <div className="text-[1.2rem] sm:text-[1.5rem] text-center flex justify-center items-center min-h-[15vh] sm:min-h-[30vh]">
                    <p>No products match the conditions</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-[1.2rem] sm:text-[1.5rem] text-center flex justify-center items-center min-h-[15vh] sm:min-h-[30vh]">
                <p>No products available here</p>
              </div>
            )}
          </section>
        </div>

        {/* Pagination controls */}
        <div className="flex text-[0.8rem] sm:text-base justify-center mt-12">
          <button
            onClick={handlePrevious}
            className={`px-2 ssm:px-3 sm:px-4 py-1 ssm:py-[6px] sm:py-2 mx-1 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-800 text-white"
            }`}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {renderPageNumbers()}
          <button
            onClick={handleNext}
            className={`px-2 ssm:px-3 sm:px-4 py-1 ssm:py-[6px] sm:py-2 mx-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gray-800 text-white"
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Category;
