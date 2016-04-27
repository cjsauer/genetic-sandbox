import MultiStringHashMap from "../../../src/modules/util/MultiStringHashMap";
import chai from "chai";
const expect = chai.expect;

describe("MultiStringHashMap", () => {
  let myHashMap;

  beforeEach(() => {
    myHashMap = new MultiStringHashMap();
  });

  it("should be instantiable", () => {
    expect(myHashMap).to.be.ok;
  });

  describe("hashing function", () => {
    it("correctly hashes a single string", () => {
      const string = "apple";
      const expectedHash = "$apple";

      const actualHash = myHashMap._hash(string);

      expect(actualHash).to.equal(expectedHash);
    });

    it("correctly hashes an array of strings", () => {
      const strings = ["apple", "orange", "banana"];
      const expectedHash = "$apple,banana,orange";

      const actualHash = myHashMap._hash(strings);

      expect(actualHash).to.equal(expectedHash);
    });

    it("hashes equivalent arrays the same way regardless of order", () => {
      const key1 = ["one", "two", "three"];
      const key2 = ["two", "one", "three"];
      const key3 = ["three", "two", "one"];
      const expectedHash = "$one,three,two";

      expect(myHashMap._hash(key1)).to.equal(expectedHash);
      expect(myHashMap._hash(key2)).to.equal(expectedHash);
      expect(myHashMap._hash(key3)).to.equal(expectedHash);
    });

    it("throws an error if given non-string values", () => {
      const badKey = 42;
      const anotherBadKey = {};

      expect(() => myHashMap._hash(badKey)).to.throw(TypeError);
      expect(() => myHashMap._hash(anotherBadKey)).to.throw(TypeError);
    });
  });

  it("can provide an array of all current keys", () => {
    myHashMap.set(["one", "two", "three"], [1, 2, 3]);
    myHashMap.set("four", 4);
    expect(myHashMap.keys()).to.deep.equal([
      ["one", "two", "three"].sort(),
      "four"
    ]);
  });

  describe("get and set", () => {
    it("can retrieve a value keyed by single string", () => {
      const key = "vegetables";
      const value = ["carrot", "lettuce", "broccoli"];
      myHashMap.set(key, value);

      expect(myHashMap.get(key)).to.deep.equal(value);
    });

    it("can retrieve a value keyed by an array of strings", () => {
      const key = ["cylindrical", "metallic", "shiny"];
      const value = ["can", "pipe", "dumbbell"];
      myHashMap.set(key, value);

      expect(myHashMap.get(key)).to.deep.equal(value);
    });

    it("returns undefined if key does not exist", () => {
      /* Completely empty hash map */
      expect(myHashMap.get("whoops")).to.be.undefined;
      expect(myHashMap.get(["oh", "no", "jimmy!"])).to.be.undefined;
    });

    it("overwrites the value of an already existing key", () => {
      let key = ["cylindrical", "metallic", "shiny"];
      let initialValue = ["can", "pipe", "dumbbell"];
      let newValue = ["pole", "lightsaber"];

      myHashMap.set(key, initialValue);
      myHashMap.set(key, newValue);
      expect(myHashMap.get(key)).to.deep.equal(newValue);

      key = "weapon";
      myHashMap.set(key, initialValue);
      myHashMap.set(key, newValue);
      expect(myHashMap.get(key)).to.deep.equal(newValue);
    });

    it("can be chained", () => {
      const firstKey = "one";
      const firstValue = [1];
      const secondKey = ["two", "three"];
      const secondValue = [2, 3];

      myHashMap.set(firstKey, firstValue).set(secondKey, secondValue);
      expect(myHashMap.get(firstKey)).to.deep.equal(firstValue);
      expect(myHashMap.get(secondKey)).to.deep.equal(secondValue);
    });
  });

  describe("key existence", () => {
    it("can be verified", () => {
      myHashMap.set(["tiny", "spherical"], ["marble", "pea"]);
      myHashMap.set("tiny", ["nanite", "atom"]);

      expect(myHashMap.hasKey(["tiny", "spherical"])).to.be.true;
      expect(myHashMap.hasKey("tiny")).to.be.true;
      expect(myHashMap.hasKey("whoops!")).to.be.false;
      expect(myHashMap.hasKey(["oh", "no", "jimmy!"])).to.be.false;
    });
  });

  describe("delete", () => {
    it("clears a key from the hash map", () => {
      let key = ["cylindrical", "metallic", "shiny"];
      let value = ["can", "pipe", "dumbbell"];

      myHashMap.set(key, value);
      expect(myHashMap.delete(key)).to.be.true;
      expect(myHashMap.get(key)).to.be.undefined;

      key = "weapon";
      myHashMap.set(key, value);
      expect(myHashMap.delete(key)).to.be.true;
      expect(myHashMap.get(key)).to.be.undefined;
    });

    it("returns false if the given key does not exist", () => {
      expect(myHashMap.delete("whoops")).to.be.false;
      expect(myHashMap.delete(["all", "men", "are", "angels"])).to.be.false;
    });
  });
});
