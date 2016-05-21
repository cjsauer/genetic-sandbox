import Plugin from "../../../src/modules/plugins/Plugin";
import { expect } from "chai";

describe("Plugin", () => {
  const systems = [];
  const config = {};

  it("describes an array of systems and a configuration object", () => {
    const plugin = new Plugin("fake", systems, config);
    expect(plugin.name).to.equal("fake");
    expect(plugin.systems).to.eql(systems);
    expect(plugin.config).to.eql(config);
    expect(plugin.enabled).to.be.true;
  });

  it("can be disabled", () => {
    const plugin = new Plugin("fake", systems, config, false);
    expect(plugin.enabled).to.be.false;
  });
});
