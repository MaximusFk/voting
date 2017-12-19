let Ballot = artifacts.require("Ballot");
let web3_utils = web3.utils;

const NAME_FIELD_INDEX = 0;

contract('Ballot', (accounts) => {
  it("should assert true", () => {
    let ballot = Ballot.deployed();
    assert.isTrue(true);
  });
  it("chairperson", () => {
    return Ballot.deployed().then((instance) => {
      return instance.chairperson.call();
    }).then((chairperson) => {
      assert.isTrue(web3.isAddress(chairperson.valueOf()));
      assert.equal(chairperson.valueOf(), accounts[0], "Chairperson is not first account");
    });
  });
  it("proposals", () => {
    let ballot;
    return Ballot.deployed().then((instance) => {
      ballot = instance;
      return instance.proposals.call(0);
    }).then((proposal_1) => {
      let name = web3.toUtf8(proposal_1[NAME_FIELD_INDEX]);
      assert.equal(name, "Name1", "Value in name field is not correct");
      return ballot.proposals.call(1);
    }).then((proposal_2) => {
      let name = web3.toUtf8(proposal_2[NAME_FIELD_INDEX]);
      assert.equal(name, "Name2", "Value in name field is not correct");
      return ballot.proposals.call(2);
    }).then((proposal_3) => {
      let name = web3.toUtf8(proposal_3[NAME_FIELD_INDEX]);
      assert.equal(name, "Name3", "Value in name field is not correct");
    });
  });
  it("give rights to vote", () => {
    let ballot;
    let another_account = accounts[1];
    return Ballot.deployed().then((instance) => {
      ballot = instance;
      instance.giveRightToVote(another_account, { from: accounts[0] });
    }).then(() => {
      return ballot.voters.call(another_account);
    }).then((voter) => {
      assert.isAbove(voter[0].toNumber(), 0);
    });
  });
  it("vote", () => {
    let ballot;
    let account = accounts[0];
    return Ballot.deployed().then((instance) => {
      ballot = instance;
      ballot.vote(0, { from: account });
    }).then(() => {
      return ballot.voters.call(account);
    }).then((voter) => {
      let voted = voter[1];
      assert.isTrue(voted);
    });
  });
  it("choosing winner", () => {
    let ballot;
    let account = accounts[1];
    const WINNER = 0;
    return Ballot.deployed().then((instance) => {
      ballot = instance;
      ballot.vote(WINNER, { from: account });
      return ballot.winningProposal.call();
    }).then((winner) => {
      assert.equal(winner, WINNER, "Winner index value must be equals to WINNER");
      return ballot.winnerName.call();
    }).then((winner_hex) => {
      let winner_name = web3.toUtf8(winner_hex);
      assert.equal(winner_name, "Name1", "Winner name must be equals to Name1");
    });
  });
});
