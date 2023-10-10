import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import {
  render as renderUtil,
  fireEvent,
  screen,
} from "@testing-library/react";
import {
  CheckTokenOrDefaultCurrency,
  CoinButton,
  CoinButtonPair,
  CurrencyToggleButtons,
  MaxButton,
} from "../CoinButton";
import { TestProvider } from "../../../libs/utils/test_helpers";

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

describe("CurrencyToggleButtons", () => {
  it("should render correctly", () => {
    render(
      <CurrencyToggleButtons
        selected={"TXT"}
        tokenSymbols={["USD", "TXT"]}
        onSymbolChange={() => {}}
      />,
      container
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"space-x-1 inline-flex flex-shrink-0 items-center\\"><button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-gray100 text-white\\">USD</button><button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-primary text-white\\">TXT</button></div>"`
    );

    render(
      <CurrencyToggleButtons
        selected={"TXT"}
        tokenSymbols={["USD", "TXT"]}
        onSymbolChange={() => {}}
      />,
      container
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"space-x-1 inline-flex flex-shrink-0 items-center\\"><button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-gray100 text-white\\">USD</button><button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-primary text-white\\">TXT</button></div>"`
    );
  });
});

describe("MaxButton", () => {
  it("should render correctly", () => {
    render(<MaxButton onClick={() => {}} />, container);

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-primary text-white\\">Max</button>"`
    );
  });
});

describe("CoinButtonPair", () => {
  it("should render correctly", () => {
    render(
      <TestProvider>
        <CoinButtonPair
          tokenA={{
            image: "https://link-to-a",
            symbol: "BNB",
          }}
          tokenB={{
            image: "https://link-to-c",
            symbol: "BUSD",
          }}
        />
      </TestProvider>,
      container
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<button class=\\"flex justify-center items-center flex-shrink-0 bg-_6 rounded-l-full text-primary font-700 rounded-r-full py-2 px-3\\"><div class=\\"inline-flex flex-shrink-0\\" title=\\"BNB-BUSD\\"><figure class=\\"w-6 h-6 -mr-2 relative z-10 flex items-center justify-center rounded-full relative overflow-hidden\\"><img src=\\"https://assets.coingecko.com/coins/images/12591/small/binance-coin-logo.png?1600947313\\" alt=\\"BNB\\" class=\\"object-cover w-full h-full inline-block\\"></figure><figure class=\\"w-6 h-6 flex items-center justify-center rounded-full relative overflow-hidden\\"><img src=\\"https://raw.githubusercontent.com/uniswap/assets/master/blockchains/ethereum/assets/0x4Fabb145d64652a948d72533023f6E7A623C7C53/logo.png\\" alt=\\"BUSD\\" class=\\"object-cover w-full h-full inline-block\\"></figure></div></button>"`
    );
  });
});

describe("CoinButton", () => {
  it("should render correctly", () => {
    render(<CoinButton text={"CAKE"} />, container);

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<button class=\\"flex justify-center items-center flex-shrink-0 rounded-l-full text-color_1 font-700 rounded-r-full bg-gray50 py-1 px-2\\"><span class=\\"text-12 inline-block\\">CAKE</span></button>"`
    );
  });

  it("should render correctly with icon", () => {
    render(<CoinButton text={"BUSD"} icon="https://link-to-a" />, container);

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<button class=\\"flex justify-center items-center flex-shrink-0 rounded-l-full text-color_1 font-700 rounded-r-full bg-gray50 py-1 px-2\\"><figure class=\\"w-6 h-6 inline-flex items-center justify-center rounded-full bg-white relative mr-1 overflow-hidden -ml-1\\"><img src=\\"https://link-to-a\\" class=\\"object-cover w-8 h-8\\"></figure><span class=\\"text-12 inline-block\\">BUSD</span></button>"`
    );

    render(
      <CoinButton text={"BUSD"} icon="https://link-to-a" iconAlt="BUSD" />,
      container
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<button class=\\"flex justify-center items-center flex-shrink-0 rounded-l-full text-color_1 font-700 rounded-r-full bg-gray50 py-1 px-2\\"><figure class=\\"w-6 h-6 inline-flex items-center justify-center rounded-full bg-white relative mr-1 overflow-hidden -ml-1\\"><img src=\\"https://link-to-a\\" class=\\"object-cover w-8 h-8\\" alt=\\"BUSD\\"></figure><span class=\\"text-12 inline-block\\">BUSD</span></button>"`
    );
  });
});

describe("CheckTokenOrUSD", () => {
  test("should render correctly", () => {
    render(
      <CheckTokenOrDefaultCurrency
        defaultValue={"XTB"}
        tokenSymbol={"XTB"}
        onChange={() => {}}
      />,
      container
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"space-x-1 inline-flex flex-shrink-0 items-center\\"><button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-primary text-white\\">XTB</button><button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-gray100 text-white\\">USD</button></div>"`
    );

    render(
      <CheckTokenOrDefaultCurrency
        defaultCurrencyFirst={true}
        defaultValue={"XTB"}
        tokenSymbol={"XTB"}
        onChange={() => {}}
      />,
      container
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"space-x-1 inline-flex flex-shrink-0 items-center\\"><button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-gray100 text-white\\">USD</button><button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-primary text-white\\">XTB</button></div>"`
    );

    render(
      <CheckTokenOrDefaultCurrency
        defaultCurrencyFirst={true}
        defaultValue={"USD"}
        tokenSymbol={"XTB"}
        onChange={() => {}}
      />,
      container
    );

    expect(container.innerHTML).toMatchInlineSnapshot(
      `"<div class=\\"space-x-1 inline-flex flex-shrink-0 items-center\\"><button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-gray100 text-white\\">USD</button><button class=\\"rounded-full py-[2px] px-[6px] text-12 bg-primary text-white\\">XTB</button></div>"`
    );
  });

  test("should update tokenSymbol automatically", () => {
    const Example = () => {
      const [symbol, setSymbol] = React.useState("NBN");

      return (
        <>
          <CheckTokenOrDefaultCurrency
            defaultValue={"XTB"}
            tokenSymbol={symbol}
            onChange={() => {}}
          />
          <button onClick={() => setSymbol("BTC")}>Change</button>
          <button onClick={() => setSymbol("XTB")}>Change to XTB</button>
        </>
      );
    };

    renderUtil(<Example />);

    expect(screen.getByText("NBN")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Change"));
    expect(screen.getByText("BTC")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Change to XTB"));
    expect(screen.getByText("XTB")).toBeInTheDocument();
  });
});
