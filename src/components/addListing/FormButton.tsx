import styled from "styled-components";

const FormBtn = styled.button<{ $btnStyle: string }>`
  border: none;
  outline: none;
  transition: all 0.4s ease;
  padding: 10px 16px;
  border-radius: 10px;
  border: ${(props) =>
    props.$btnStyle === "cancel"
      ? "1px solid #F93B1D"
      : "1px solid transparent"};
  color: ${(props) => (props.$btnStyle === "cancel" ? "#F93B1D" : "white")};
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  background-color: ${(props) =>
    props.$btnStyle === "cancel" ? "transparent" : "#F93B1D"};

  &:hover {
    background-color: ${(props) =>
      props.$btnStyle === "cancel" ? "#F93B1D" : "#DF3014"};
    border: ${(props) =>
      props.$btnStyle === "cancel"
        ? "1px solid transparent"
        : "1px solid #F93B1D"};
    color: ${(props) => props.$btnStyle === "cancel" && "white"};
    cursor: pointer;
  }
`;

export default function FormButton({
  $btnStyle,
  btnText,
}: {
  $btnStyle: string;
  btnText: string;
}) {
  return <FormBtn $btnStyle={$btnStyle}>{btnText}</FormBtn>;
}
