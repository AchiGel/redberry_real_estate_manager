import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ListingCard from "./ListingCard";
import styled from "styled-components";
import SlidePrevButton from "./SlidePrevButton";
import SlideNextButton from "./SlideNextButton";
import "../generalStyles.css";
import { PropertyTypes } from "../generalTypes.interface";

const SliderWrapper = styled.div`
  padding-bottom: 228px;
  @media screen and (max-width: 560px) {
    padding-bottom: 20px;
  }
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
        spaceBetween={50}
        navigation
        loop={true}
        breakpoints={{
          1024: {
            slidesPerView: 4,
          },

          768: {
            slidesPerView: 2,
          },

          480: {
            slidesPerView: 1,
          },
        }}
      >
        <SlidePrevButton />
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
              area={item.area}
            />
          </SwiperSlide>
        ))}
        <SlideNextButton />
      </Swiper>
    </SliderWrapper>
  );
}
