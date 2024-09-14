import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ListingCard from "./ListingCard";
import { PropertyTypes } from "../pages/Home";
import styled from "styled-components";
import SlidePrevButton from "./SlidePrevButton";
import SlideNextButton from "./SlideNextButton";
import "../generalStyles.css";

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

      <Swiper spaceBetween={50} slidesPerView={4} navigation loop={true}>
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
