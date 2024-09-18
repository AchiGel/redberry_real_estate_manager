import styled from "styled-components";

const ImageUploadLabel = styled.label`
  display: inline-block;
  transition: all 0.4s ease;
  width: 100%;
  height: 120px;
  border-radius: 8px;
  border: 1px dashed #2d3648;
  background-image: url("./listingicons/plus-circle.svg");
  background-repeat: no-repeat;
  background-position: center;
  &:hover {
    cursor: pointer;
    border: 1px solid #2d3648;
    scale: 0.99;
  }
`;

const ImageUloadImput = styled.input`
  display: none;
`;

export default function ImageUpload() {
  return (
    <>
      <ImageUploadLabel htmlFor="image"></ImageUploadLabel>
      <ImageUloadImput id="image" />
    </>
  );
}
