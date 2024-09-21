import styled from "styled-components";
import { useSwiper } from "swiper/react";

const SlideButtonNext = styled.button`
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
  left: 102%;
  transform: rotate(180deg);
  &:hover {
    cursor: pointer;
    scale: 1.1;
  }
`;

export default function SlideNextButton() {
  const swiper = useSwiper();
  return <SlideButtonNext onClick={() => swiper.slideNext()} />;
}
