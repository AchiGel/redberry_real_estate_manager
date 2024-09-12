import styled from "styled-components";

const ChosenOptionLayout = styled.div`
  padding: 6px 10px;
  border-radius: 43px;
  border: 1px solid #dbdbdb;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const OptionDelete = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  background-image: url("./close.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  width: 14px;
  height: 14px;
`;

export default function ChosenOption() {
  return (
    <ChosenOptionLayout>
      ChosenOption
      <OptionDelete />
    </ChosenOptionLayout>
  );
}
