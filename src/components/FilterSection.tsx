import styled from "styled-components";
import Button from "./Button";

export interface ButtonTypes {
  buttonType: string;
}

const FilterSectionWrapper = styled.section`
  margin-bottom: 32px;
`;

const FilterLeftSection = styled.div``;

const ButtonsSection = styled.div`
  display: flex;
  gap: 16px;
`;

export default function FilterSection() {
  return (
    <FilterSectionWrapper>
      <FilterLeftSection></FilterLeftSection>
      <ButtonsSection>
        <Button buttonType="ლისტინგის დამატება" />
        <Button buttonType="აგენტის დამატება" />
      </ButtonsSection>
    </FilterSectionWrapper>
  );
}
