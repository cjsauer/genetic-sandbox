import MultiStringHashMap from "../../../src/modules/util/MultiStringHashMap";
import chai from "chai";
const expect = chai.expect;

describe("MultiStringHashMap", () => {
  it("should be instantiable", () => {
    const myHash = new MultiStringHashMap();
    expect(myHash).to.be.ok;
  });

  describe("hashing function", () => {
    it("correctly hashes a single string", () => {
      const string = "apple";
      const expectedHash = "$apple";

      const myHash = new MultiStringHashMap();
      const actualHash = myHash._hash(string);

      expect(actualHash).to.equal(expectedHash);
    });

    it("correctly hashes an array of strings", () => {
      const strings = ["apple", "orange", "banana"];
      const expectedHash = "$apple,banana,orange";

      const myHash = new MultiStringHashMap();
      const actualHash = myHash._hash(strings);

      expect(actualHash).to.equal(expectedHash);
    });

    it("hashes equivalent arrays the same way regardless of order", () => {
      const key1 = ["one", "two", "three"];
      const key2 = ["two", "one", "three"];
      const key3 = ["three", "two", "one"];
      const expectedHash = "$one,three,two";

      const myHash = new MultiStringHashMap();
      expect(myHash._hash(key1)).to.equal(expectedHash);
      expect(myHash._hash(key2)).to.equal(expectedHash);
      expect(myHash._hash(key3)).to.equal(expectedHash);
    });

    it("throws an error if given non-string values", () => {
      const badKey = 42;
      const anotherBadKey = {};
      const myHash = new MultiStringHashMap();

      expect(() => myHash._hash(badKey)).to.throw(TypeError);
      expect(() => myHash._hash(anotherBadKey)).to.throw(TypeError);
    });
  });

  it("can provide an array of all current keys", () => {
    const myHash = new MultiStringHashMap();
    myHash.set(["one", "two", "three"], [1, 2, 3]);
    myHash.set("four", 4);
    expect(myHash.keys()).to.deep.equal([
      ["one", "two", "three"].sort(),
      "four"
    ]);
  });

  describe("get and set", () => {
    it("can retrieve a value keyed by single string", () => {
      const key = "vegetables";
      const value = ["carrot", "lettuce", "broccoli"];
      const myHash = new MultiStringHashMap();
      myHash.set(key, value);

      expect(myHash.get(key)).to.deep.equal(value);
    });

    it("can retrieve a value keyed by an array of strings", () => {
      const key = ["cylindrical", "metallic", "shiny"];
      const value = ["can", "pipe", "dumbbell"];
      const myHash = new MultiStringHashMap();
      myHash.set(key, value);

      expect(myHash.get(key)).to.deep.equal(value);
    });

    it("returns undefined if key does not exist", () => {
      /* Completely empty hash map */
      const myHash = new MultiStringHashMap();
      expect(myHash.get("whoops")).to.be.undefined;
      expect(myHash.get(["oh", "no", "jimmy!"])).to.be.undefined;
    });

    it("overwrites the value of an already existing key", () => {
      let key = ["cylindrical", "metallic", "shiny"];
      let initialValue = ["can", "pipe", "dumbbell"];
      let newValue = ["pole", "lightsaber"];
      const myHash = new MultiStringHashMap();

      myHash.set(key, initialValue);
      myHash.set(key, newValue);
      expect(myHash.get(key)).to.deep.equal(newValue);

      key = "weapon";
      myHash.set(key, initialValue);
      myHash.set(key, newValue);
      expect(myHash.get(key)).to.deep.equal(newValue);
    });

    it("can be chained", () => {
      const firstKey = "one";
      const firstValue = [1];
      const secondKey = ["two", "three"];
      const secondValue = [2, 3];
      const myHash = new MultiStringHashMap();

      myHash.set(firstKey, firstValue).set(secondKey, secondValue);
      expect(myHash.get(firstKey)).to.deep.equal(firstValue);
      expect(myHash.get(secondKey)).to.deep.equal(secondValue);
    });
  });

  describe("key existence", () => {
    it("can be verified", () => {
      const myHash = new MultiStringHashMap();
      myHash.set(["tiny", "spherical"], ["marble", "pea"]);
      myHash.set("tiny", ["nanite", "atom"]);

      expect(myHash.hasKey(["tiny", "spherical"])).to.be.true;
      expect(myHash.hasKey("tiny")).to.be.true;
      expect(myHash.hasKey("whoops!")).to.be.false;
      expect(myHash.hasKey(["oh", "no", "jimmy!"])).to.be.false;
    });
  });

  describe("delete", () => {
    it("clears a key from the hash map", () => {
      let key = ["cylindrical", "metallic", "shiny"];
      let value = ["can", "pipe", "dumbbell"];
      const myHash = new MultiStringHashMap();

      myHash.set(key, value);
      expect(myHash.delete(key)).to.be.true;
      expect(myHash.get(key)).to.be.undefined;

      key = "weapon";
      myHash.set(key, value);
      expect(myHash.delete(key)).to.be.true;
      expect(myHash.get(key)).to.be.undefined;
    });

    it("returns false if the given key does not exist", () => {
      const myHash = new MultiStringHashMap();
      expect(myHash.delete("whoops")).to.be.false;
      expect(myHash.delete(["all", "men", "are", "angels"])).to.be.false;
    });
  });
});
