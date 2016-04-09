import Shape from "../../../src/modules/shapes/Shape";
import chai from "chai";
const expect = chai.expect;

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
      constructor(x, y, w, h) {
        super(x, y);
        this.w = w;
        this.h = h;
      }
      get width() { return this.w; }
      get height() { return this.h; }
    }
    const testShape = new TestShape(0, 0, 5, 6);
    expect(testShape).to.be.ok;
    expect(testShape.width).to.equal(5);
    expect(testShape.height).to.equal(6);
    expect(testShape.center).to.deep.equal({x: 0, y: 0});
  });
});
