import Shape from "../../../src/modules/shapes/Shape";
import Point from "../../../src/modules/shapes/Point";
import { expect } from "chai";

describe("Shape", () => {
  it("should not be instantiable", () => {
    expect(() => new Shape()).to.throw(TypeError);
  });

  it("throws an error when trying to call unimplemented Shape instance methods", () => {
    /* Define a TestShape that doesn't override any Shape instance methods */
    class TestShape extends Shape {
      /* No overrides = ERROR! */
    }
    const testShape = new TestShape();
    expect(() => testShape.width).to.throw(Error, /must be implemented/);
    expect(() => testShape.height).to.throw(Error, /must be implemented/);
  });

  it("can be properly extended to create new types of shapes", () => {
    class TestShape extends Shape {
      constructor(point, w, h) {
        super(point);
        this.w = w;
        this.h = h;
      }
      get width() { return this.w; }
      get height() { return this.h; }
    }
    const testShape = new TestShape(new Point(0, 0), 5, 6);
    expect(testShape).to.be.ok;
    expect(testShape.width).to.equal(5);
    expect(testShape.height).to.equal(6);
    expect(testShape.center).to.deep.equal({x: 0, y: 0});
  });
});
