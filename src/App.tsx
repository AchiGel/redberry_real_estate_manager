import "@fontsource/firago";
import "./generalStyles.css";
import styled from "styled-components";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";

const Wrapper = styled.main`
  padding-inline: 162px;
  display: flex;
  flex-direction: column;
  margin-bottom: 90px;
`;

function App() {
  return (
    <>
      <Header />
      <Wrapper>
        <Outlet />
      </Wrapper>
    </>
  );
}

export default App;
