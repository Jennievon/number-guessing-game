import React from "react";
import styled, { css } from "styled-components";

const StyledNetworkStatus = styled.div<{ show: boolean }>`
  position: fixed;
  z-index: 800;
  right: 0;
  padding: 1rem;
  bottom: 0;
  user-select: none;
  transform: translate(100%, 100%);
  transition: transform 0.3s ease-out 0.3s;

  ${({ show }) =>
    show &&
    css`
      transform: translate(0%, 0%);
    `}
`;

const MessageContent = (
  <p style={{ fontSize: "small" }}>
    <b>You seem to be offline</b>
    <br /> Please check your internet connection.
  </p>
);

export const NetworkStatus = ({ message = MessageContent }) => {
  const [isOnline, setIsOnline] = React.useState(true);

  React.useEffect(() => {
    const setOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", setOnlineStatus);
    window.addEventListener("offline", setOnlineStatus);

    return () => {
      window.removeEventListener("online", setOnlineStatus);
      window.removeEventListener("offline", setOnlineStatus);
    };
  }, []);

  return (
    <StyledNetworkStatus show={!isOnline}>
      <div
        className="bg-red-500 text-white p-4 rounded-md shadow-lg ring-1 ring-gray-800 backdrop-blur transition dark:bg-gray-800/90 dark:ring-white/10 dark:hover:ring-white/20"
        onClick={() => setIsOnline(true)}
      >
        {message}
      </div>
    </StyledNetworkStatus>
  );
};
