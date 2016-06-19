import Tile from "./Tile";
import Component from "../../../ecs/Component";
import { expect } from "chai";

describe("Tile", () => {
  it("should extend Component", () => {
    const energy = new Tile();
    expect(energy instanceof Component).to.be.true;
  });

  it("should register its constructor with Component", () => {
    expect(Component._constructors["Tile"]).to.eql(Tile);
  });
});
