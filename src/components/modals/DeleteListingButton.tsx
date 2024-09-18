import styled from "styled-components";

const DeleteButton = styled.button`
  outline: none;
  background-color: transparent;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #676e76;
  color: #676e76;
  font-size: 12px;
  font-weight: 500;
  &:hover {
    background-color: #676e76;
    color: white;
    cursor: pointer;
  }
`;
export default function DeleteListingButton({
  setDeleteClicked,
}: {
  setDeleteClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <DeleteButton onClick={() => setDeleteClicked(true)}>
      ლისტინგის წაშლა
    </DeleteButton>
  );
}
