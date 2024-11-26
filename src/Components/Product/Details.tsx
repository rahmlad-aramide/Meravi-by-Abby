import { useState, useEffect } from "react";
// import ImageMagnifier from "../../functions/ImageMagnifier";
// import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import "photoswipe/dist/photoswipe.css";

import Viewer from "react-viewer";
// import 'react-viewer/dist/index.css';

// import { Gallery, Item } from "react-photoswipe-gallery";

interface ImageState {
  images?: string[]; 
}

export const ItemDetails = ({ images }: ImageState) => {
  const [imgIndex, setImgIndex] = useState<number>(0);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [visible, setVisible] = useState(false);
  

  useEffect(() => {
    // Set imgSrc to the first image in the array when images are available
    if (images && images.length > 0) {
      setImgSrc(images[0]);
    }
  }, [images]); // Run effect when images prop changes

  const changeImgSlide = (index: number) => {
    if (images && index >= 0 && index < images.length) {
      setImgSrc(images[index]);
      setImgIndex(index);
    }
  };

  // Ensure images is defined before rendering
  if (!images) {
    return null; // or handle loading state or default view
  }

  return (
    <picture className="flex flex-col-reverse overflow-x-hidden sm:grid sm:grid-cols-[200px_1fr] gap-4">
      <div className="scrollbar-custom overflow-x-scroll sm:overflow-auto flex   sm:w-[auto] h-auto sm:h-[30rem] sm:pb-16 gap-[3%] sm:block">
        {images.map((slide: string, index: number) => (
          <figure
            key={index}
            onClick={() => changeImgSlide(index)}
            className={
              imgIndex === index
                ? "px-1 sm:py-4 outline-borderHash outline-1 outline w-[10rem] sm:w-full "
                : "px-4 w-[10rem] sm:w-full  "
            }
          >
            <img
              className=" h-auto sm:h-[160px] object-contain mx-auto py-1 sm:py-4 w-full"
              src={slide}
              alt={`Slide ${index}`}
            />
          </figure>
        ))}
      </div>
      <figure className="grow">
        {/* <ImageMagnifier
                className="w-full object-contain h-[16rem] flex my-auto sm:h-[25rem] mx-auto"
                src={imgSrc}
                alt="Product"
                // width={300}
                // height={200}
                magnifierHeight={200}
                magnifierWidth={200}
                zoomLevel={2}
            /> */}
        {/* <Zoom>
          <img
            className="w-full object-contain h-[16rem] flex my-auto sm:h-[25rem] mx-auto"
            src={imgSrc}
            alt="Product"
          />
        </Zoom> */}

        <img
          className="w-full object-contain h-[16rem] flex my-auto sm:h-[25rem] mx-auto"
          src={imgSrc}
          alt="Product"
          onClick={() => setVisible(true)}
        />
        <Viewer
          visible={visible}
          onClose={() => setVisible(false)}
          images={images.map((img) => ({ src: img, alt: "" }))}
          activeIndex={imgIndex} // Start the viewer at the current image index
          noNavbar={true}
          noImgDetails={true}
          disableMouseZoom={false}
          // downloadable={true}
        />
        {/* <Gallery>
          <Item
            original={imgSrc}
            thumbnail={imgSrc}
            width="1200"
            height="800"
          >
            {({ ref, open }) => (
              <img
                ref={ref}
                onClick={open}
                className="w-full object-contain h-[16rem] flex my-auto sm:h-[25rem] mx-auto"
                src={imgSrc}
                data-pswp-width="1200"
                data-pswp-height="800"
                alt="Product"
              />
            )}
          </Item>
        </Gallery> */}
      </figure>
    </picture>
  );
};
