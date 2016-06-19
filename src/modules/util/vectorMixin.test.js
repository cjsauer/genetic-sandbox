import VectorMixin from "./VectorMixin";
import { expect } from "chai";

describe("VectorMixin", () => {
  class Foo {}
  class Vector extends VectorMixin(Foo) {
    constructor(x, y) {
      super();
      this.x = x;
      this.y = y;
    }
  }

  it("can determine if two vectors are equal", () => {
    const vector1 = new Vector(0, 0);
    const vector2 = new Vector(0, 0);
    const vector3 = new Vector(10, 12);

    expect(vector1.equalTo(vector2)).to.be.true;
    expect(vector1.equalTo(vector3)).to.be.false;
    expect(vector2.equalTo(vector3)).to.be.false;
  });

  it("can set its coordinates in one call", () => {
    const vector = new Vector(0, 0);
    const sameVector = vector.set(10, 12);
    expect(vector.x).to.equal(10);
    expect(vector.y).to.equal(12);
    expect(sameVector.x).to.equal(10);
    expect(sameVector.y).to.equal(12);
  });

  it("can add two vectors together", () => {
    const vector1 = new Vector(2, 3);
    const vector2 = new Vector(4, 5);
    const sum = vector1.add(vector2);
    const otherSum = vector2.add(vector1);

    expect(sum instanceof Vector).to.be.true;
    expect(otherSum instanceof Vector).to.be.true;
    expect(sum.x).to.equal(6);
    expect(sum.y).to.equal(8);
    expect(otherSum.x).to.equal(6);
    expect(otherSum.y).to.equal(8);
  });
});
