import styled from "styled-components";
import { useSwiper } from "swiper/react";

const SlideButton = styled.button`
  border: none;
  outline: none;
  transition: all 0.4s ease;
  background-color: transparent;
  background-image: url("./listingicons/Icon-Right.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  width: 30px;
  height: 30px;
  position: absolute;
  top: 50%;
  right: 102%;
  &:hover {
    cursor: pointer;
    scale: 1.1;
  }
`;

export default function SlidePrevButton() {
  const swiper = useSwiper();
  return <SlideButton onClick={() => swiper.slidePrev()} />;
}
