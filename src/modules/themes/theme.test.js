import Theme from "./Theme";
import { expect } from "chai";
import { stub } from "sinon";

describe("Theme", () => {
  let paper = {
    Symbol: stub().returns({
      place: stub().returns("fakeItem")
    })
  };

  let fakeTheme = {
    name: "fake",
    defaultHexStyle: {
      strokeColor: "#BADA55"
    },
    sprites: {
      default(paper) {
        // Pretend to place a new symbol
        return paper.Symbol().place();
      }
    }
  };

  beforeEach(() => {
    Theme._themes.fake = fakeTheme;
  });

  it("can be selected", () => {
    Theme.setTheme("fake");
    expect(Theme.current.name).to.equal("fake");
  });

  it("can retrieve styles", () => {
    Theme.setTheme("fake");
    expect(Theme.current.defaultHexStyle).to.deep.equal(fakeTheme.defaultHexStyle);
  });

  it("can retrieve sprites", () => {
    Theme.setTheme("fake");
    expect(Theme.getSprite("default", paper)).to.equal("fakeItem");
  });
});
