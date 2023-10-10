import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import pretty from "pretty";
import { TinyButton } from "../TinyButton";

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
  render(<TinyButton text={"Value"} />, container);

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-primary text-white\\">Value</button>"`
  );
});

it("should render correctly for fontSize", () => {
  render(<TinyButton fontSize={"sm"} text={"A Text"} />, container);

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-primary text-white\\">A Text</button>"`
  );

  render(<TinyButton fontSize={"xs"} text={"A Text"} />, container);

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<button class=\\"rounded-full py-[2px] px-[6px] text-[8px] font-[700] bg-primary text-white\\">A Text</button>"`
  );
});

it("should render differently", () => {
  render(<TinyButton fontSize={"xs"} text={"A Text"} />, container);

  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<button class=\\"rounded-full py-[2px] px-[6px] text-[8px] font-[700] bg-primary text-white\\">A Text</button>"`
  );
});

it("should render differently for each variant", () => {
  render(<TinyButton text={"A Text"} variant={"outline"} />, container);
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<button class=\\"rounded-full py-[2px] px-[6px] text-12 border bg-primary bg-opacity-25 text-primary border-primary\\">A Text</button>"`
  );

  render(<TinyButton text={"A Text"} variant={"ghost"} />, container);
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<button class=\\"rounded-full py-[2px] px-[6px] text-12 text-primary bg-transparent border-none font-medium\\">A Text</button>"`
  );

  render(<TinyButton text={"A Text"} variant={"fill"} />, container);
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-primary text-white\\">A Text</button>"`
  );

  render(<TinyButton text={"A Text"} />, container);
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-primary text-white\\">A Text</button>"`
  );
});

it("should render inactive state for every variant", () => {
  render(
    <TinyButton text={"A Text"} inactive={true} variant={"outline"} />,
    container
  );
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-gray50 text-gray400\\">A Text</button>"`
  );

  render(
    <TinyButton text={"A Text"} inactive={true} variant={"ghost"} />,
    container
  );
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-gray100 text-white\\">A Text</button>"`
  );

  render(
    <TinyButton text={"A Text"} inactive={true} variant={"fill"} />,
    container
  );
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-gray100 text-white\\">A Text</button>"`
  );

  render(<TinyButton text={"A Text"} inactive={true} />, container);
  expect(pretty(container.innerHTML)).toMatchInlineSnapshot(
    `"<button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-gray100 text-white\\">A Text</button>"`
  );
});
