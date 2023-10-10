import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import pretty from "pretty";
import { HelpButton } from "../HelpButton";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("should render correctly", () => {
  render(<HelpButton onClick={() => {}} />, container);

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<span><svg class=\\"inline ml-1\\" width=\\"20\\" height=\\"20\\" viewBox=\\"0 0 20 20\\" fill=\\"none\\" xmlns=\\"http://www.w3.org/2000/svg\\"><g stroke=\\"#301DF5\\" stroke-width=\\"1.5\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d=\\"M10 11.666C10 10 11.313 9.721 11.766 9.27A2.5 2.5 0 107.64 6.676M9.972 14.507h.003\\"></path><path d=\\"M10 18.333a8.333 8.333 0 100-16.667 8.333 8.333 0 000 16.667z\\"></path></g></svg></span>"`
  );
});

it("should render correctly with size", () => {
  render(<HelpButton size={24} onClick={() => {}} />, container);

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<span><svg class=\\"inline ml-1\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 20 20\\" fill=\\"none\\" xmlns=\\"http://www.w3.org/2000/svg\\"><g stroke=\\"#301DF5\\" stroke-width=\\"1.5\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d=\\"M10 11.666C10 10 11.313 9.721 11.766 9.27A2.5 2.5 0 107.64 6.676M9.972 14.507h.003\\"></path><path d=\\"M10 18.333a8.333 8.333 0 100-16.667 8.333 8.333 0 000 16.667z\\"></path></g></svg></span>"`
  );
});
