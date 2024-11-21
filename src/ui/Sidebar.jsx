import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import Uploader from "../data/Uploader";

function Sidebar() {
  const StyledSidebar = styled.aside`
    background-color: var(--color-grey-300);
    padding: 3rem 2rem;
    border-right: 2px solid(--color-grey-100);
    grid-row: 1/-1;
    grid-column: 0;
  `;

  return (
    <StyledSidebar>
      <Logo />
      <MainNav />
      <Uploader />
    </StyledSidebar>
  );
}

export default Sidebar;
