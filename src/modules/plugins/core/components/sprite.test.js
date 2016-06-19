import Sprite from "./Sprite";
import Component from "../../../ecs/Component";
import Theme from "../../../themes/Theme";
import { expect } from "chai";
import { stub, spy } from "sinon";

describe("Sprite", () => {
  let paper, fakeTheme, item;

  beforeEach(() => {
    item = {
      remove: spy()
    };

    paper = {
      Symbol: stub().returns({
        place: stub().returns(item)
      })
    };

    fakeTheme = {
      sprites: {
        default(paper) {
          // Pretend to place a new symbol
          return paper.Symbol().place();
        }
      }
    };

    // Pretend that this is our current theme
    Theme._themes.fake = fakeTheme;
    Theme.setTheme("fake");
  });

  it("should extend Component", () => {
    const sprite = new Sprite();
    expect(sprite instanceof Component).to.be.true;
  });

  it("should register its constructor with Component", () => {
    expect(Component._constructors["Sprite"]).to.eql(Sprite);
  });

  it("should be instantiable given the name of a graphic", () => {
    const sprite = new Sprite("test");
    expect(sprite).to.be.ok;
    expect(sprite.spriteName).to.equal("test");
  });

  it("can retrieve its Paper.js Item instance", () => {
    const sprite = new Sprite("default");
    const item = sprite.getItem(paper);
    expect(item).to.be.ok;
    expect(item).to.eql(item);
  });

  it("caches a reference to its item", () => {
    const sprite = new Sprite("default");
    let item = sprite.getItem(paper);
    expect(item).to.be.ok;
    expect(paper.Symbol().place.calledOnce).to.be.true;

    // Try getting it again, it shouldn't build the graphic a second time
    let item2 = sprite.getItem(paper);
    expect(item).to.eql(item2);
    expect(paper.Symbol().place.callCount).to.equal(1);
  });

  it("can release its Paper.js Item", () => {
    const sprite = new Sprite("default");
    const neverAccessedSprite = new Sprite("default");
    sprite.getItem(paper); // Access it

    sprite.release();
    neverAccessedSprite.release(); // This should basically do nothing

    expect(item.remove.calledOnce).to.be.true;
  });
});
