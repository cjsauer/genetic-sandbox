import Hexagon from "../../../src/modules/shapes/Hexagon";
import Shape from "../../../src/modules/shapes/Shape";
import chai from "chai";
const expect = chai.expect;

describe("Hexagon", () => {
  it("should extend Shape", () => {
    const hex = new Hexagon(0, 0, 1);
    expect(hex instanceof Shape).to.be.true;
  });

  it("should be instantiable with x,y coordinates and a radius", () => {
    const hex = new Hexagon(10, 12, 2);
    expect(hex.center).to.deep.equal({x: 10, y: 12});
    expect(hex.radius).to.equal(2);
  });

  it("can calculate the position of each of its corners", () => {
    const x = 5;
    const y = 10;
    const radius = 3;
    const hex = new Hexagon(x, y, radius);

    expect(hex.cornerAt(0).x).to.equal(x + radius * Math.cos(Math.PI / 180 * 0));
    expect(hex.cornerAt(0).y).to.equal(y + radius * Math.sin(Math.PI / 180 * 0));
    expect(hex.cornerAt(1).x).to.equal(x + radius * Math.cos(Math.PI / 180 * -60));
    expect(hex.cornerAt(1).y).to.equal(y + radius * Math.sin(Math.PI / 180 * -60));
    expect(hex.cornerAt(2).x).to.equal(x + radius * Math.cos(Math.PI / 180 * -120));
    expect(hex.cornerAt(2).y).to.equal(y + radius * Math.sin(Math.PI / 180 * -120));
    expect(hex.cornerAt(3).x).to.equal(x + radius * Math.cos(Math.PI / 180 * -180));
    expect(hex.cornerAt(3).y).to.equal(y + radius * Math.sin(Math.PI / 180 * -180));
    expect(hex.cornerAt(4).x).to.equal(x + radius * Math.cos(Math.PI / 180 * -240));
    expect(hex.cornerAt(4).y).to.equal(y + radius * Math.sin(Math.PI / 180 * -240));
    expect(hex.cornerAt(5).x).to.equal(x + radius * Math.cos(Math.PI / 180 * -300));
    expect(hex.cornerAt(5).y).to.equal(y + radius * Math.sin(Math.PI / 180 * -300));
  });

  it("can calculate its bounding box's height and width", () => {
    const x = 2;
    const y = 8;
    const radius = 5;
    const hex = new Hexagon(x, y, radius);

    expect(hex.width).to.equal(radius * 2);
    expect(hex.height).to.equal(Math.sqrt(3) / 2 * hex.width);
  });
});
