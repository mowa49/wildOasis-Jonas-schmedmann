import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-template-rows: 1fr 4fr;
  height: 100vh;
`;
const Main = styled.main`
  background-color: var(--color-grey-2 00);
  padding: 4rem 4.8rem 6rem 5rem;
  overflow: scroll;
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
