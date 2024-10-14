import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderWrapper = styled.header`
  padding-inline: 8.75%;
  height: 100px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 77px;
  @media screen and (max-width: 560px) {
    margin-bottom: 2rem;
  }
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
      <Link to="/">
        <Logo />
      </Link>
    </HeaderWrapper>
  );
}
