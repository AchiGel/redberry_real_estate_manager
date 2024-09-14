import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ListingCard from "./ListingCard";
import { PropertyTypes } from "../pages/Home";
import styled from "styled-components";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation } from "swiper/modules";

const SliderWrapper = styled.div`
  padding-bottom: 228px;
`;

const SliderTitle = styled.h2`
  color: #021526;
  font-size: 32px;
  font-weight: 500;
  margin-bottom: 52px;
`;

export default function Slider({ listing }: { listing: PropertyTypes[] }) {
  return (
    <SliderWrapper>
      <SliderTitle>ბინები მსგავს ლოკაციაზე</SliderTitle>
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={50}
        slidesPerView={2}
        navigation
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {listing.map((item: PropertyTypes) => (
          <SwiperSlide key={item.id}>
            <ListingCard
              image={item.image}
              address={item.address}
              price={item.price}
              id={item.id}
              bedrooms={item.bedrooms}
              zip_code={item.zip_code}
              city={item.city.name}
              is_rental={item.is_rental}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderWrapper>
  );
}
