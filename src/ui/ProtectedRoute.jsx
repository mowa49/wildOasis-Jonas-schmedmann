import styled from "styled-components";

import Spinner from "./Spinner";
import useUser from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var() (--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
/* eslint-disable react/prop-types */
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //// 1- load authenticated user
  const { user, isLoading, isAuthenticated } = useUser();
  console.log(user);
  /////// if there is no authenticated user, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  //////// while loading , show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  //// if there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
