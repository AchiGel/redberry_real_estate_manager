import "@fontsource/firago";
import "./generalStyles.css";
import styled from "styled-components";
import Header from "./components/Header";

const Wrapper = styled.main`
  padding-inline: 162px;
`;

function App() {
  return (
    <>
      <Header />
      <Wrapper>
        <h1>Redberry Real Estate Manager</h1>
      </Wrapper>
    </>
  );
}

export default App;
