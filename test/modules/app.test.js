import App from "../../src/modules/App.js";
import chai from "chai";
const expect = chai.expect;

describe("App", () => {
  it("should exist", () => {
    expect(App).to.be.ok;
  });

  it("can be instantiated", () => {
    const app = new App();
    expect(app).to.be.ok;
  });

  it("sanity should be intact", () => {
    const app = new App();
    expect(app.sanity()).to.be.true;
  });
});
