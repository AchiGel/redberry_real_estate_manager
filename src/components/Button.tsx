import styled from "styled-components";
import { ButtonTypes } from "./FilterSection";

const PlusIcon = styled.img<{ iconcolor: string }>`
  filter: ${(props) =>
    props.iconcolor == "ლისტინგის დამატება"
      ? "none"
      : "invert(44%) sepia(94%) saturate(4956%) hue-rotate(349deg) brightness(97%) contrast(101%)"};
`;

const AddButton = styled.button<{ buttoncolor: string }>`
  border: none;
  outline: none;
  transition: all 0.4s ease;
  padding: 10px 16px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  background-color: ${(props) =>
    props.buttoncolor == "ლისტინგის დამატება" ? "#F93B1D" : "white"};
  color: ${(props) =>
    props.buttoncolor == "ლისტინგის დამატება" ? "white" : "#F93B1D"};
  border: ${(props) =>
    props.buttoncolor == "ლისტინგის დამატება"
      ? "1px solid transparent"
      : "1px solid #F93B1D"};
  &:hover {
    background-color: ${(props) =>
      props.buttoncolor == "ლისტინგის დამატება" ? "#DF3014" : "#F93B1D"};
    color: white;
    cursor: pointer;
  }
  &:hover ${PlusIcon} {
    filter: none;
  }
`;

export default function Button(props: ButtonTypes) {
  return (
    <AddButton buttoncolor={props.buttonType}>
      <PlusIcon iconcolor={props.buttonType} src="./plus.svg" alt="plus" />
      {props.buttonType}
    </AddButton>
  );
}
