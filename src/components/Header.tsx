import styled from "styled-components";

const HeaderWrapper = styled.header`
  padding-inline: 162px;
  height: 100px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 77px;
`;

const Logo = styled.div`
  background-image: url("./LOGO.png");
  background-repeat: no-repeat;
  background-size: 100%;
  width: 150px;
  height: 24px;
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <Logo />
    </HeaderWrapper>
  );
}
