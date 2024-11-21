import styled from "styled-components";

import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
function Header() {
  const StyledHeader = styled.header`
    background-color: var(--color-grey-100);
    padding: 2rem 2rem;
    border-bottom: 3px;

    display: flex;
    gap: 2.4rem;
    align-items: center;
    justify-content: flex-end;
  `;
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
