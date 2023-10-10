import React from "react";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-6xl font-bold">Welcome to React</h1>
      <p className="text-xl mt-4">
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="text-blue-500 text-2xl"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </div>
  );
};

export default Home;
