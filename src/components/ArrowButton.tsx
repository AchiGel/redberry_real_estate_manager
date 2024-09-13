import styled from "styled-components";

const ArrowBtn = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  background-image: url("/listingicons/Icon-Right.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  width: 32px;
  height: 32px;
`;

export default function ArrowButton() {
  return <ArrowBtn />;
}
