import { buildTile } from "./assembly";
import Coord from "./components/Coord";
import { expect } from "chai";

describe("Core assembly", () => {
  it("can build tile entities", () => {
    let coord = new Coord(0, 0);
    let tile = buildTile(coord);
    expect(tile.hasComponent("tile")).to.be.true;
    expect(tile.hasComponent("coord")).to.be.true;
    expect(tile.getComponent("coord")).to.eql(coord);
  });
});
