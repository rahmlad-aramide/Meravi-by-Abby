/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetProductsMale } from "../ApiCalls/getProductsMale";
// import shirt from "../assets/t-shirt.png";
import formatPrice from "../functions/FormatPrice";
import { useGetProductsFemale } from "../ApiCalls/getProductsFemale";
import { Oval } from "react-loader-spinner";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../redux/slice/wishlistSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import Fuse from "fuse.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useGender } from "../GenderContext";
import TruncateText from "../functions/TruncateText";

interface ProductsState {
  _id: string | null;
  name: string;
  quantity: number;
  brand_name: {
    name: string;
  };
  price: string | null;
  colors: string[] | null;
  sizes: string[] | null;
  description: string | null;
  image: string[] | null;
  category: {
    name: string;
  };
}

const Category = () => {
  const [categoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [brandOpen, setBrandOpen] = useState<boolean>(false);
  const [colorOpen, setColorOpen] = useState<boolean>(false);
  const [sizeOpen, setSizeOpen] = useState<boolean>(false);
  const [priceRangeOpen, setPriceRangeOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "All Categories"
  );
  const [selectedBrand, setSelectedBrand] = useState<string | null>(
    "All Brands"
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    "All Colors"
  );
  const [selectedSize, setSelectedSize] = useState<string | null>("All Sizes");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const { isLoading: isLoadingMale, data: productsDataMale } =
    useGetProductsMale();
  const { isLoading: isLoadingFemale, data: productsDataFemale } =
    useGetProductsFemale();
  const ProductsFemale = productsDataFemale?.data?.data?.availableProducts;
  const ProductsMale = productsDataMale?.data?.data?.availableProducts;
  const { gender } = useGender();
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state: any) => state.wishlist.items);

  // mobile filter modal states starts
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [brandModalOpen, setBrandModalOpen] = useState(false);
  const [colorModalOpen, setColorModalOpen] = useState(false);
  const [sizesModalOpen, setSizesModalOpen] = useState(false);
  const [pricesModalOpen, setPricesModalOpen] = useState(false);
  const [filterCount, setFilterCount] = useState(0);

  useEffect(() => {
    updateFilterCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedCategory,
    selectedBrand,
    selectedColor,
    selectedSize,
    selectedPriceRanges,
  ]);

  const updateFilterCount = () => {
    let count = 0;
    if (selectedCategory !== "All Categories") count += 1;
    if (selectedBrand !== "All Brands") count += 1;
    if (selectedColor !== "All Colors") count += 1;
    if (selectedSize !== "All Sizes") count += 1;
    if (selectedPriceRanges.length > 0) count += 1;
    setFilterCount(count);
  };

  // console.log("filter count", filterCount);

  const [tempSelectedCategory, setTempSelectedCategory] = useState<
    string | null
  >("All Categories");
  const [tempSelectedBrand, setTempSelectedBrand] = useState<string | null>(
    "All Brands"
  );
  const [tempSelectedColor, setTempSelectedColor] = useState<string | null>(
    "All Colors"
  );
  const [tempSelectedSizes, setTempSelectedSizes] = useState<string | null>(
    "All Sizes"
  );
  const [tempSelectedPrices, setTempSelectedPrices] = useState<string[]>([]);

  const handleCategoryMobileClick = (cat: string) => {
    setTempSelectedCategory(cat);
  };
  const handleBrandMobileClick = (cat: string) => {
    setTempSelectedBrand(cat);
  };
  const handleColorMobileClick = (cat: string) => {
    setTempSelectedColor(cat);
  };
  const handleSizesMobileClick = (cat: string) => {
    setTempSelectedSizes(cat);
  };
  const handlePriceMobileRangeChange = (value: string) => {
    if (tempSelectedPrices.includes(value)) {
      setTempSelectedPrices(
        tempSelectedPrices.filter((item) => item !== value)
      );
    } else {
      setTempSelectedPrices([...tempSelectedPrices, value]);
    }
  };

  const applyCategoryFilter = () => {
    setSelectedCategory(tempSelectedCategory);
    setCategoryModalOpen(false);
    updateFilterCount();
  };
  const applyBrandFilter = () => {
    setSelectedBrand(tempSelectedBrand);
    setBrandModalOpen(false);
    updateFilterCount();
  };
  const applyColorFilter = () => {
    setSelectedColor(tempSelectedColor);
    setColorModalOpen(false);
    updateFilterCount();
  };
  const applySizesFilter = () => {
    setSelectedSize(tempSelectedSizes);
    setSizesModalOpen(false);
    updateFilterCount();
  };
  const applyPricesFilter = () => {
    setSelectedPriceRanges(tempSelectedPrices);
    setPricesModalOpen(false);
    updateFilterCount();
  };

  const cancelCategoryFilter = () => {
    setSelectedCategory("All Categories");
    setTempSelectedCategory("All Categories");
    setFilterCount((prevCount) => prevCount - 1);
    updateFilterCount();
  };
  const cancelBrandFilter = () => {
    setSelectedBrand("All Brands");
    setTempSelectedBrand("All Brands");
    setFilterCount((prevCount) => prevCount - 1);
    updateFilterCount();
  };
  const cancelColorFilter = () => {
    setSelectedColor("All Colors");
    setTempSelectedColor("All Colors");
    setFilterCount((prevCount) => prevCount - 1);
    updateFilterCount();
  };
  const cancelSizesFilter = () => {
    setSelectedSize("All Sizes");
    setTempSelectedSizes("All Sizes");
    setFilterCount((prevCount) => prevCount - 1);
    updateFilterCount();
  };
  const cancelPriceRangeFilter = (price: string) => {
    const updatedPriceRanges = selectedPriceRanges.filter(
      selectedPrice => selectedPrice !== price
    );
    setSelectedPriceRanges(updatedPriceRanges);
    setTempSelectedPrices(updatedPriceRanges);
    updateFilterCount();
  };

  // mobile filter modal states ends
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

  const colorNames = Products
    ? [
        "All Colors",
        ...new Set(
          Products.flatMap((product: ProductsState) =>
            product?.colors ? product.colors : []
          )
        ),
      ]
    : [];
  const sizeNames = Products
    ? [
        "All Sizes",
        ...new Set(
          Products.flatMap((product: ProductsState) =>
            product?.sizes ? product.sizes : []
          )
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
      (selectedColor === "All Colors" ||
        (product.colors &&
          product.colors.includes(selectedColor ? selectedColor : ""))) &&
      (selectedSize === "All Sizes" ||
        (product.sizes &&
          product.sizes.includes(selectedSize ? selectedSize : ""))) &&
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

  // Handle color selection
  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    setCurrentPage(1); // Reset to first page on category change
  };

  // Handle size selection
  const handleSizeClick = (size: string) => {
    setSelectedSize(size);
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
    <div
      className={`pt-16 pb-8 relative ${
        filterModalOpen && "z-20"
      } sm:pt-28 lg:pt-36 px-[5%]`}
    >
      <div className="women-placeholder text-center  py-3  lg:py-5 text-white">
        <h1 className="text-[1.3rem] ssm:text-[1.5rem] sm:text-[1.8rem] md:text-[2.2rem] lg:text-[2.5rem]">
          {gender === "male" ? "MEN'S WEARS" : "WOMEN'S WEARS"}
        </h1>
      </div>

      <div className="">
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-[5%] mt-0 sm:mt-8 ">
          {/* search and filter section */}
          <section className="w-[100%] sm:w-[30%] lg:w-[20%] mt-4 sm:mt-0  z-[2] bg-white sm:bg-transparent bg max-h-full sm:max-h-[70vh] sticky top-12 sm:top-28 lg:top-36 flex flex-row-reverse items-center sm:items-start sm:flex-col gap-2 ">
            <div className="flex w-full justify-end">
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
            <section className="hidden w-full pb-1 sm:pb-0 sm:flex gap-0 sm:gap-1 flex-row justify-between sm:justify-start sm:flex-col  sm:overflow-y-auto sm:pr-[10%]  ">
              {/* Categories filter */}
              <div className=" py-1">
                <section
                  onClick={() => setCategoryOpen(!categoryOpen)}
                  className="cursor-pointer flex items-center justify-between "
                >
                  <p className="text-[0.9rem] ssm:text-[1.1rem] font-medium">
                    Categories
                  </p>
                  <div
                    className={`text-[1.5rem] ${
                      categoryOpen ? "rotate-180" : ""
                    } `}
                  >
                    <MdOutlineKeyboardArrowDown />
                  </div>
                </section>
                {categoryOpen && (
                  <div className="py-1 flex flex-col absolute sm:relative top-full w-[100%] sm:w-auto  px-2 sm:px-0  sm:top-0 bg-white sm:bg-transparent text-[0.8rem] sm:text-[0.9rem] gap-1 ">
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
                <div className="py-1">
                  <section
                    onClick={() => setBrandOpen(!brandOpen)}
                    className="cursor-pointer flex items-center justify-between "
                  >
                    <p className="text-[0.9rem] ssm:text-[1.1rem] font-medium">
                      Brands
                    </p>
                    <div
                      className={`text-[1.5rem] ${
                        brandOpen ? "rotate-180" : ""
                      } `}
                    >
                      <MdOutlineKeyboardArrowDown />
                    </div>
                  </section>
                  {brandOpen && (
                    <div className="py-1 flex flex-col absolute sm:relative top-full w-[100%] sm:w-auto  px-2 sm:px-0  sm:top-0 bg-white sm:bg-transparent text-[0.8rem] sm:text-[0.9rem] gap-1 ">
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

              {/* Colors filter */}
              {colorNames && colorNames.length > 0 && (
                <div className="py-1">
                  <section
                    onClick={() => setColorOpen(!colorOpen)}
                    className="cursor-pointer flex items-center justify-between "
                  >
                    <p className="text-[0.9rem] ssm:text-[1.1rem] font-medium">
                      Colors
                    </p>
                    <div
                      className={`text-[1.5rem] ${
                        colorOpen ? "rotate-180" : ""
                      } `}
                    >
                      <MdOutlineKeyboardArrowDown />
                    </div>
                  </section>
                  {colorOpen && (
                    <div className="py-1 flex flex-col absolute sm:relative top-full w-[100%] sm:w-auto  px-2 sm:px-0  sm:top-0 bg-white sm:bg-transparent text-[0.8rem] sm:text-[0.9rem] gap-1 ">
                      {colorNames?.map((color: any, index: number) => (
                        <div
                          key={index}
                          className={`hover:text-[blue] flex gap-2 items-center cursor-pointer ${
                            selectedColor === color ? "text-blue-500" : ""
                          }`}
                          onClick={() => handleColorClick(color)}
                        >
                          <div
                            className={`h-[18px] w-[18px] border-black ${
                              color === "All Colors" ? "" : " border-[1.5px] "
                            }  rounded-full m-[2px]  cursor-pointer `}
                            style={{ backgroundColor: color }}
                          ></div>
                          <p>{color}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Sizes filter */}
              {sizeNames && sizeNames.length > 0 && (
                <div className="py-1">
                  <section
                    onClick={() => setSizeOpen(!sizeOpen)}
                    className="cursor-pointer flex items-center justify-between "
                  >
                    <p className="text-[0.9rem] ssm:text-[1.1rem] font-medium">
                      Sizes
                    </p>
                    <div
                      className={`text-[1.5rem] ${
                        sizeOpen ? "rotate-180" : ""
                      } `}
                    >
                      <MdOutlineKeyboardArrowDown />
                    </div>
                  </section>
                  {sizeOpen && (
                    <div className="py-1 flex flex-col absolute sm:relative top-full w-[100%] sm:w-auto  px-2 sm:px-0  sm:top-0 bg-white sm:bg-transparent text-[0.8rem] sm:text-[0.9rem] gap-1 ">
                      {sizeNames?.map((size: any, index: number) => (
                        <p
                          key={index}
                          className={`hover:text-[blue] cursor-pointer ${
                            selectedSize === size ? "text-blue-500" : ""
                          }`}
                          onClick={() => handleSizeClick(size)}
                        >
                          {size}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Price range filter */}
              <div className="py-1 ">
                <section
                  onClick={() => setPriceRangeOpen(!priceRangeOpen)}
                  className="cursor-pointer flex items-center justify-between "
                >
                  <p className="text-[0.9rem] ssm:text-[1.1rem] font-medium">
                    Price Range
                  </p>
                  <div
                    className={`text-[1.5rem] ${
                      priceRangeOpen ? "rotate-180" : ""
                    } `}
                  >
                    <MdOutlineKeyboardArrowDown />
                  </div>
                </section>
                {priceRangeOpen && (
                  <div className="py-1 flex flex-col absolute sm:relative top-full w-[100%] sm:w-auto  px-2 sm:px-0  sm:top-0 bg-white sm:bg-transparent text-[0.8rem] sm:text-[0.9rem] gap-1 ">
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

            {/* mobile filter starts */}
            <div className=" block sm:hidden ">
              <button
                onClick={() => setFilterModalOpen(true)}
                className="  bg-black text-[0.95rem] flex text-white py-2 px-4 rounded"
              >
                Filter {filterCount > 0 && <span>({filterCount})</span>}
              </button>

              {filterModalOpen && (
                <div className="fixed inset-0 top-[0]  bg-gray-800  flex justify-center items-center">
                  <div className="bg-white py-4 h-screen overflow-auto pt-0 w-full">
                    <div className=" flex justify-end mb-4  text-[1.8rem] text-gray-500  py-2 border-b-[1.5px] ">
                      <div
                        onClick={() => setFilterModalOpen(false)}
                        className="px-[5%]"
                      >
                        <IoClose />
                      </div>
                    </div>
                    <h2 className="text-xl px-[5%] font-semibold">Filters</h2>

                    {/* Display selected filters */}
                    {filterCount > 0 && (
                      <section className=" flex gap-2 flex-wrap items-center text-sm px-[5%] mt-4 ">
                        {selectedPriceRanges.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {selectedPriceRanges.map((price, index) => (
                              <button
                                key={index}
                                onClick={() => cancelPriceRangeFilter(price)}
                                className="flex p-2 bg-gray-100 rounded hover:bg-gray-200 items-center gap-2"
                              >
                                <span>
                                  {
                                    priceRanges.find(
                                      (range) => range.value === price
                                    )?.label
                                  }
                                </span>
                                <p className="text-red-500 text-xl">
                                  <IoClose />
                                </p>
                              </button>
                            ))}
                          </div>
                        )}
                        {selectedCategory &&
                          selectedCategory !== "All Categories" && (
                            <button
                              onClick={cancelCategoryFilter}
                              className="flex p-2 bg-gray-100 rounded hover:bg-gray-200 items-center gap-2 "
                            >
                              <span>{selectedCategory}</span>
                              <p className="text-red-500 text-xl">
                                <IoClose />
                              </p>
                            </button>
                          )}
                        {selectedBrand && selectedBrand !== "All Brands" && (
                          <button
                            onClick={cancelBrandFilter}
                            className="flex p-2 bg-gray-100 rounded hover:bg-gray-200 items-center gap-2 "
                          >
                            <span>{selectedBrand}</span>
                            <p className="text-red-500 text-xl">
                              <IoClose />
                            </p>
                          </button>
                        )}
                        {selectedColor && selectedColor !== "All Colors" && (
                          <button
                            onClick={cancelColorFilter}
                            className="flex p-2 bg-gray-100 rounded hover:bg-gray-200 items-center gap-2 "
                          >
                            <span
                            className={`h-[18px] w-[18px] border-black ${
                              selectedColor === "All Colors" ? "" : " border-[1.5px] "
                            }  rounded-full m-[2px]  cursor-pointer `}
                            style={{ backgroundColor: selectedColor }}
                          ></span>
                          <span>{selectedColor}</span>
                            <p className="text-red-500 text-xl">
                              <IoClose />
                            </p>
                          </button>
                        )}

                        {selectedSize && selectedSize !== "All Sizes" && (
                          <button
                            onClick={cancelSizesFilter}
                            className="flex p-2 bg-gray-100 rounded hover:bg-gray-200 items-center gap-2 "
                          >
                            <span>{selectedSize}</span>
                            <p className="text-red-500 text-xl">
                              <IoClose />
                            </p>
                          </button>
                        )}
                        
                      </section>
                    )}

                    <div className="text-[1] px-[5%] flex flex-col gap-4 mt-4  ">
                      <button
                        onClick={() => setCategoryModalOpen(true)}
                        className=" text-left"
                      >
                        Categories
                      </button>
                      <button
                        onClick={() => setBrandModalOpen(true)}
                        className=" text-left"
                      >
                        Brands
                      </button>
                      <button
                        onClick={() => setColorModalOpen(true)}
                        className=" text-left"
                      >
                        Colors
                      </button>
                      <button
                        onClick={() => setSizesModalOpen(true)}
                        className=" text-left"
                      >
                        Sizes
                      </button>
                      <button
                        onClick={() => setPricesModalOpen(true)}
                        className=" text-left"
                      >
                        Prices
                      </button>
                    </div>

                    <button
                      onClick={() => setFilterModalOpen(false)}
                      className="w-[90%] fixed bottom-[2%] left-[50%] translate-x-[-50%] py-2 bg-black text-white rounded"
                    >
                      Show {filteredProducts.length} Results
                    </button>
                  </div>
                </div>
              )}

              {categoryModalOpen && (
                <div className="fixed inset-0 bg-gray-800  w-full bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white h-screen w-full rounded-lg pt-0 ">
                    <div className=" flex justify-end mb-4  text-[1.8rem] text-gray-500  py-2 border-b-[1.5px] ">
                      <div
                        onClick={() => {setCategoryModalOpen(false); setTempSelectedCategory(selectedCategory)}}
                        className="px-[5%]"
                      >
                        <IoClose />
                      </div>
                    </div>
                    <div className=" px-[5%] ">
                      <h2 className="text-xl mb-4">Categories</h2>
                      {categoryNames.map((cat, index) => (
                        <div
                          className={`py-2 ${
                            tempSelectedCategory === cat ? "text-blue-500" : ""
                          }`}
                          key={index}
                          onClick={() =>
                            handleCategoryMobileClick(cat as string)
                          }
                        >
                          {cat as string}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={applyCategoryFilter}
                      className="w-[90%] left-[50%] translate-x-[-50%] py-2 bottom-[2%] fixed bg-black text-white rounded mt-4"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}

              {brandModalOpen && (
                <div className="fixed inset-0 bg-gray-800  w-full bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white h-screen overflow-y-auto w-full rounded-lg pt-0 ">
                    <div className="fixed w-full bg-white flex justify-end mb-4  text-[1.8rem] text-gray-500  py-2 border-b-[1.5px] ">
                      <div
                        onClick={() => {setBrandModalOpen(false); setTempSelectedBrand(selectedBrand)}}
                        className="px-[5%]"
                      >
                        <IoClose />
                      </div>
                    </div>
                    <div className=" px-[5%] py-16 ">
                      <h2 className="text-xl font-semibold mb-2">Brands</h2>
                      {brandNames.map((brand, index) => (
                        <div
                          className={`py-2 ${
                            tempSelectedBrand === brand ? "text-blue-500" : ""
                          }`}
                          key={index}
                          onClick={() =>
                            handleBrandMobileClick(brand as string)
                          }
                        >
                          {brand as string}
                        </div>
                      ))}
                    </div>
                    <div className=" left-[50%] w-[90%] translate-x-[-50%] bg-white bottom-[0] fixed">
                      <button
                        onClick={applyBrandFilter}
                        className=" bg-black w-[100%] py-2 mb-[2%] text-white rounded "
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {sizesModalOpen && (
                <div className="fixed inset-0 bg-gray-800  w-full bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white h-screen overflow-y-auto w-full rounded-lg pt-0 ">
                    <div className="fixed w-full bg-white flex justify-end mb-4  text-[1.8rem] text-gray-500  py-2 border-b-[1.5px] ">
                      <div
                        onClick={() => {setSizesModalOpen(false); setTempSelectedSizes(selectedSize)}}
                        className="px-[5%]"
                      >
                        <IoClose />
                      </div>
                    </div>
                    <div className=" px-[5%] py-16 ">
                      <h2 className="text-xl font-semibold mb-2">Sizes</h2>
                      {sizeNames.map((sizes, index) => (
                        <div
                          className={`py-2 ${
                            tempSelectedSizes === sizes ? "text-blue-500" : ""
                          }`}
                          key={index}
                          onClick={() =>
                            handleSizesMobileClick(sizes as string)
                          }
                        >
                          {sizes as string}
                        </div>
                      ))}
                    </div>
                    <div className=" left-[50%] w-[90%] translate-x-[-50%] bg-white bottom-[0] fixed">
                      <button
                        onClick={applySizesFilter}
                        className=" bg-black w-[100%] py-2 mb-[2%] text-white rounded "
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {pricesModalOpen && (
                <div className="fixed inset-0 bg-gray-800  w-full bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white h-screen overflow-y-auto w-full rounded-lg pt-0 ">
                    <div className="fixed w-full bg-white flex justify-end mb-4  text-[1.8rem] text-gray-500  py-2 border-b-[1.5px] ">
                      <div
                        onClick={() => {setPricesModalOpen(false); setTempSelectedPrices(selectedPriceRanges)}}
                        className="px-[5%]"
                      >
                        <IoClose />
                      </div>
                    </div>
                    <div className=" px-[5%] py-16 ">
                      <h2 className="text-xl font-semibold mb-4">Prices</h2>
                      <div className=" flex flex-col gap-4">
                        {priceRanges.map((range, index) => (
                          <label
                            key={index}
                            className="flex cursor-pointer items-center"
                          >
                            <input
                              type="checkbox"
                              checked={tempSelectedPrices.includes(range.value)}
                              onChange={() =>
                                handlePriceMobileRangeChange(range.value)
                              }
                              className="mr-2"
                            />
                            {range.label}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className=" left-[50%] w-[90%] translate-x-[-50%] bg-white bottom-[0] fixed">
                      <button
                        onClick={applyPricesFilter}
                        className=" bg-black w-[100%] py-2 mb-[2%] text-white rounded "
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {colorModalOpen && (
                <div className="fixed inset-0 bg-gray-800  w-full bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white h-screen overflow-y-auto w-full rounded-lg pt-0 ">
                    <div className="fixed w-full bg-white flex justify-end mb-4  text-[1.8rem] text-gray-500  py-2 border-b-[1.5px] ">
                      <div
                        onClick={() => {setColorModalOpen(false); setTempSelectedColor(selectedColor)}}
                        className="px-[5%]"
                      >
                        <IoClose />
                      </div>
                    </div>
                    <div className=" px-[5%] py-16 ">
                      <h2 className="text-xl font-semibold mb-2">Colors</h2>
                      {colorNames.map((color, index) => (
                        <div
                          className={`py-2 flex gap-2 items-center ${
                            tempSelectedColor === color ? "text-blue-500" : ""
                          }`}
                          key={index}
                          onClick={() =>
                            handleColorMobileClick(color as string)
                          }
                        >
                          <div
                            className={`h-[18px] w-[18px] border-black ${
                              color === "All Colors" ? "" : " border-[1.5px] "
                            }  rounded-full m-[2px]  cursor-pointer `}
                            style={{ backgroundColor: color as string }}
                          ></div>
                          <p>{color as string}</p>
                        </div>
                      ))}
                    </div>
                    <div className=" left-[50%] w-[90%] translate-x-[-50%] bg-white bottom-[0] fixed">
                      <button
                        onClick={applyColorFilter}
                        className=" bg-black w-[100%] py-2 mb-[2%] text-white rounded "
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* mobile filter ends */}
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
                  <section
                    className={` grid grid-cols-2 sm:grid-cols-2 items-end lg:grid-cols-3 gap-x-[2%] gap-y-8 sm:gap-y-4`}
                  >
                    {currentProducts?.map((product: ProductsState) => (
                      <div
                        className={` ${
                          product?.quantity < 1
                            ? "text-gray-500"
                            : "text-[#333333]"
                        } `}
                      >
                        <div className=" relative">
                          {product?.quantity >= 1 && (
                            <div className=" flex justify-end">
                              <button className="border-[#181818] text-[1.5rem] p-0 sm:p-2">
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
                          )}
                          <Link
                            to={`/product/details/${product?._id}`}
                            className="pt-3 flex justify-center"
                            key={product?._id}
                          >
                            <LazyLoadImage
                              src={
                                product?.image && product.image.length > 0
                                  ? product.image[0]
                                  : ""
                              }
                              className="w-[100%] mx-auto  h-[8rem] sm:h-[10rem] lg:h-[13rem] object-contain"
                              // PlaceholderSrc={shirt}
                              effect="blur"
                            />
                          </Link>
                        </div>
                        <Link
                          to={`/product/details/${product?._id}`}
                          className=""
                          key={product?._id}
                        >
                          <div className=" flex flex-col mt-[7%] gap-1  items-center ">
                            <h2 className=" font-medium leading-none text-[1rem] h-8 text-center hover:text-blue-500 hover:underline lg:text-[1.1rem] ">
                              {TruncateText(product?.name, 2)}
                            </h2>

                            {product?.quantity < 1 ? (
                              <div>
                                <p className="text-[0.9rem] lg:text-[1rem] font-bold mb-3 ">
                                  Out of stock
                                </p>
                              </div>
                            ) : (
                              <p className=" text-[0.9rem] lg:text-[1rem] font-bold mb-3 ">
                                {TruncateText(product?.brand_name?.name, 2)}
                              </p>
                            )}
                            <h4 className="font-normal text-[1rem] lg:text-[1.1rem]">
                              {formatPrice(product?.price ?? "0")}
                            </h4>
                          </div>
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
        {Products?.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default Category;
