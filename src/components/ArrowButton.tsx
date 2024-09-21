import styled from "styled-components";

const ArrowBtn = styled.button`
  border: none;
  outline: none;
  transition: all 0.4s ease;
  background-color: transparent;
  background-image: url("/listingicons/Icon-Right.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  &:hover {
    cursor: pointer;
    background-color: lightgray;
    scale: 1.1;
  }
`;

export default function ArrowButton() {
  return <ArrowBtn />;
}
