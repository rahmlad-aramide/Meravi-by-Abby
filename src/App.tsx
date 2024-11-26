import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage/Homepage";
import Header from "./Components/Header/Header";
import { GenderProvider } from "./GenderContext";
import Footer from "./Components/Footer/Footer";
import AboutUs from "./Pages/About";
import CheckOut from "./Pages/CheckOut";
import Faqs from "./Pages/Faq";
import Category from "./Pages/Category";
import ProductDetails from "./Pages/ProductDetails";
import "./App.css";
import Wishlist from "./Pages/Wishlist/Wishlist";
import EditPasswordAddress from "./Pages/Edit/EditPasswordAddress";
import { EmailVerifyPage } from "./Components/Cart/EmailVerifyPage";
import { ChangePassword } from "./Components/Cart/ChangePassword";
import { ForgetPassword } from "./Components/Cart/ForgetPassword";
import { ResendVerification } from "./Components/Cart/ResendVerification";
import OrderHistory from "./Pages/Orders/OrderHistory";
import Brands from "./Pages/Brands/Brands";
import BrandsSpecificPage from "./Pages/Brands/BrandsSpecificPage";
import SubCategorySpecificPage from "./Pages/SubCategory/SubCategorySpecificPage";
import Faq from "./Components/FAQ/Faq";
import SpecificCategory from "./Pages/SubCategory/SpecificCategory";
import Sales from "./Pages/Sales";
import AllProductsByCategories from "./Pages/SubCategory/AllProductsByCategories";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import Terms from "./Pages/Terms/Terms";
import Contact from "./Pages/Contact";

function App() {
  return (
    <GenderProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage/>} />{" "}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/category" element={<Category />} />
          <Route path="/sales" element={<Sales />} />
          <Route
            path="/specificCategory/:name"
            element={<SpecificCategory />}
          />
          <Route
            path="/products/:name"
            element={<AllProductsByCategories />}
          />
          <Route
            path="/category/:name/:sub"
            element={<SubCategorySpecificPage />}
          />
          <Route path="/brands" element={<Brands />} />
          <Route path="/brands/:name" element={<BrandsSpecificPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="/editPasswordAddress"
            element={<EditPasswordAddress />}
          />
          <Route path="/product/details/:id" element={<ProductDetails />} />
          <Route path="/verify-email" element={<EmailVerifyPage />} />
          <Route path="/resend-verification" element={<ResendVerification />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/order-history" element={<OrderHistory />} />
        </Routes>
        <Faq />
        <Footer />
      </BrowserRouter>
    </GenderProvider>
  );
}

export default App;
