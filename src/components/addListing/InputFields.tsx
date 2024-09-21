import styled from "styled-components";
import { InputFieldsProps } from "../../generalTypes.interface";

export const InputFieldLayout = styled.div<{ $gridArea: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  grid-area: ${(props) =>
    props.$gridArea === "1"
      ? "3 / 1 / 3 / 3"
      : props.$gridArea === "2"
      ? "4 / 1 / 4 / 3"
      : "auto"};
`;

export const InputLabel = styled.label`
  color: #021526;
  font-size: 14px;
  font-weight: 500;
`;

const InputBox = styled.input<{ $validationError: string | null }>`
  padding: 10px;
  border-radius: 6px;
  border: ${(props) =>
    props.$validationError ? "1px solid #F93B1D" : "1px solid #808a93"};
  width: 100%;
`;

export const ErrorMessage = styled.p`
  color: #f93b1d;
  font-size: "14px";
  margin: 0;
`;

export default function InputFields({
  type,
  label,
  id,
  $gridArea,
  agentForm,
  setAgentForm,
  required,
  minLength,
  pattern,
  $validationError,
  setErrors,
  value,
  onChange,
  listingError,
  setListingErrors,
}: InputFieldsProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (onChange) {
      onChange(e);
    } else {
      setAgentForm((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }

    if (validateField(value) && agentForm) {
      setErrors((prevErrors) => {
        const { [id]: _, ...rest } = prevErrors;
        return rest;
      });
    }

    if (validateListingFields(value) && !agentForm) {
      setListingErrors((prevErrors) => {
        const { [id]: _, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const validateField = (value: string) => {
    if (required && !value) return false;
    if (minLength && value.length < minLength) return false;
    if (pattern && !new RegExp(pattern).test(value)) return false;
    return true;
  };

  const validateListingFields = (value: string) => {
    if (required && !value) return false;
    if (minLength && value.length < minLength) return false;
    return true;
  };

  return (
    <InputFieldLayout $gridArea={$gridArea}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputBox
        id={id}
        type={type}
        onChange={handleChange}
        value={onChange ? value : agentForm?.[id] ?? ""}
        minLength={minLength}
        required={required}
        pattern={pattern}
        $validationError={$validationError}
      />
      {$validationError && <ErrorMessage>{$validationError}</ErrorMessage>}
      {listingError && <ErrorMessage>{listingError}</ErrorMessage>}
    </InputFieldLayout>
  );
}
