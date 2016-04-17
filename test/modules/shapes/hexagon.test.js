import Hexagon from "../../../src/modules/shapes/Hexagon";
import IShape from "../../../src/modules/shapes/IShape";
import chai from "chai";
const expect = chai.expect;

describe("Hexagon", () => {
  const errorMargin = 0.00001;

  it("should extend IShape", () => {
    const hex = new Hexagon(0, 0, 1);
    expect(hex instanceof IShape).to.be.true;
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

    expect(hex.cornerAt(0).x).to.be.closeTo(7.99999, errorMargin);
    expect(hex.cornerAt(0).y).to.be.closeTo(10.00000, errorMargin);
    expect(hex.cornerAt(1).x).to.be.closeTo(6.50000, errorMargin);
    expect(hex.cornerAt(1).y).to.be.closeTo(7.40192, errorMargin);
    expect(hex.cornerAt(2).x).to.be.closeTo(3.50000, errorMargin);
    expect(hex.cornerAt(2).y).to.be.closeTo(7.40192, errorMargin);
    expect(hex.cornerAt(3).x).to.be.closeTo(2.00000, errorMargin);
    expect(hex.cornerAt(3).y).to.be.closeTo(10.00000, errorMargin);
    expect(hex.cornerAt(4).x).to.be.closeTo(3.50000, errorMargin);
    expect(hex.cornerAt(4).y).to.be.closeTo(12.59807, errorMargin);
    expect(hex.cornerAt(5).x).to.be.closeTo(6.50000, errorMargin);
    expect(hex.cornerAt(5).y).to.be.closeTo(12.59807, errorMargin);
  });

  it("can calculate its bounding box's height and width", () => {
    let hex = new Hexagon(2, 8, 5);
    expect(hex.width).to.equal(10);
    expect(hex.height).to.be.closeTo(8.66025, errorMargin);

    hex = new Hexagon(0, 0, 10);
    expect(hex.width).to.equal(20);
    expect(hex.height).to.be.closeTo(17.32050, errorMargin);
  });
});
