import styled from "styled-components";
import { AgentFormTypes } from "../modals/AddAgentModal";

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

export default function ImageUpload({
  setAgentForm,
  required,
}: {
  setAgentForm: React.Dispatch<React.SetStateAction<AgentFormTypes>>;
  required: boolean;
}) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      setAgentForm((prevForm) => ({
        ...prevForm,
        avatar: file,
      }));
    }
  };
  return (
    <>
      <ImageUploadLabel htmlFor="image"></ImageUploadLabel>
      <ImageUloadImput
        id="image"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required={required}
      />
    </>
  );
}
