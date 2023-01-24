const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { assert } = require("chai");

describe("Game4", function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory("Game4");
    const game = await Game.deploy();

    const addr1 = await ethers.provider.getSigner(0);
    const addr2 = await ethers.provider.getSigner(1);

    return { game, addr1, addr2 };
  }
  it("should be a winner", async function () {
    const { game, addr1, addr2 } = await loadFixture(
      deployContractAndSetVariables
    );

    // nested mappings are rough :}
    await game.connect(addr2).write(addr1.getAddress());

    await game.win(addr2.getAddress());

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
