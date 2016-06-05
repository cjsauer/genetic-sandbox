// import CreatureGenerator from "./CreatureGenerator";
// import Tile from "../../../grid/Tile";
// import Creature from "../components/Creature";
// import config from "../../../config";
// import { expect } from "chai";
// import { stub } from "sinon";
//
// describe.skip("CreatureGenerator", () => {
//   let sys, app, grid, random;
//
//   beforeEach(() => {
//     // Stub out the dependencies required by CreatureGenerator
//     grid = {
//       getTiles: stub().returns([
//         new Tile(),
//         new Tile(),
//         new Tile(),
//         new Tile(),
//         new Tile()
//       ])
//     };
//     random = {
//       bool: stub(),
//       real: stub().returns(0.5)
//     };
//     app = { grid, random };
//     sys = new CreatureGenerator(app);
//   });
//
//   it("should be tagged as 'generator'", () => {
//     expect(sys.tag).to.equal("generator");
//   });
//
//   describe("initialize", () => {
//     it("should distribute creatures to tiles", () => {
//       // Stub out the random boolean generation
//       random.bool.onCall(0).returns(true);
//       random.bool.onCall(1).returns(false);
//       random.bool.onCall(2).returns(true);
//       random.bool.onCall(3).returns(false);
//       random.bool.onCall(4).returns(true);
//
//       sys.initialize(app);
//
//       let tilesWithCreature = grid.getTiles().filter((tile) => {
//         return tile.hasComponent("creature");
//       });
//
//       expect(app.random.bool.calledWith(config.creatures.creatureRate)).to.be.true;
//       expect(tilesWithCreature).to.have.length(3);
//       tilesWithCreature.forEach((tile) => {
//         expect(tile.get("creature") instanceof Creature).to.be.true;
//       });
//     });
//   });
// });
