import Theme from "./Theme";
import { expect } from "chai";

describe("Theme", () => {
  let fakeTheme = {
    name: "fake",
    defaultHexStyle: {
      strokeColor: "#BADA55"
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
});
