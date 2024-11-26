// import aboutImg from "../assets/about-us.png";
// import fullImg from "../assets/about-hero.png";

const AboutUs = () => {
  return (
    <div className="pt-16 pb-6 sm:pt-28 mb-6">
      <div className="about-hero"></div>
      <section className="text-Black flex justify-between items-center flex-wra py-5 sm:py-10 px-[5%] gap-8">
        <div className=" ">
          <div className=" ml-auto"></div>
          <h2 className="font-semibold text-10 text-[1.8rem] md:text-[2.5rem] mb-2">
            WHO WE ARE
          </h2>
          <div className="flex flex-col gap-3 ">
            <p className=" text-justify">
              Welcome to DiLussoStore, Nigeria's premier luxury online shopping
              destination, nestled in the vibrant heart of Lagos. As the largest
              luxury online store in the country, we are dedicated to
              surrounding you with the essence of luxury, offering you
              unparalleled access to an extensive collection of the finest
              historical brands, rare artifacts, and antique treasures—all at
              the most competitive prices.
            </p>
            <p className=" text-justify">
              At DiLussoStore, we believe that luxury is not just a product but
              an experience. Our carefully curated selection features some of
              the world’s most esteemed brands, known for their rich history and
              timeless elegance. Whether you're searching for a rare
              collectible, an exquisite piece of jewelry, or a vintage item with
              a story, you’ll find it in our collection. We are committed to
              bringing you the extraordinary, the unique, and the prestigious.
            </p>
          </div>
        </div>
        {/* <figure className="w-[40%]">
          <img src={aboutImg} alt="about us" />
        </figure> */}
      </section>
      <section className="text-Black flex items-center flex-wrap-reverse py-4 px-[5%] gap-8">
        {/* <figure className="w-[40%]">
          <img src={aboutImg} alt="about us" />
        </figure> */}
        <div className="grow  w-[55%]">
          <div className=" ml-auto ">
            <h2 className="font-semibold text-10 text-[1.8rem] md:text-[2.5rem] mb-2">
              OUR AIM
            </h2>
            <div className="flex flex-col gap-3 ">
              <p className=" text-justify">
                Our website is designed with you in mind—seamless to navigate,
                aesthetically pleasing, and exceptionally secure. We have made
                shopping with us a breeze, ensuring that your journey through
                our virtual aisles is as enjoyable as the treasures you’ll
                discover. From the moment you step into our digital storefront,
                you'll find that every detail is crafted to offer you the luxury
                experience you deserve.
              </p>
              <p className=" text-justify">
                Subscribe to our newsletters to stay at the forefront of luxury
                trends. You'll receive regular updates on our latest arrivals,
                exclusive offers, and special events—keeping you connected to
                the world of opulence and elegance. Rest assured, your privacy
                is our priority. We use the most advanced security measures to
                protect your personal information, ensuring it is safe and never
                shared with third parties.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="text-center px-[5%]">
        <div className="flex flex-col gap-3 ">
          <p className=" text-justify">
            We invite you to explore our collection and discover the world of
            luxury that awaits you. Visit us at <a href="https://dilussostore.shop/" target="_blank" className="text-[blue] ">www.dilusso.shop</a> and
            immerse yourself in the DiLussoStore experience.
          </p>
          <p className=" text-justify">
            Thank you for choosing DiLussoStore—where luxury is not just a
            choice, it's a lifestyle.
          </p>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
