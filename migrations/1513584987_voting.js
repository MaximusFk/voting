let Voting = artifacts.require("Ballot");

module.exports = function(deployer, network) {
  if(network == "test") {
    let proposals = ["Name1", "Name2", "Name3"];
    deployer.deploy(Voting, proposals);
  }
};
