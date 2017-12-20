let Voting = artifacts.require("Ballot");

module.exports = function(deployer, network) {
  if(network == "test" || network == "genache") {
    let proposals = ["Name1", "Name2", "Name3"];
    deployer.deploy(Voting, proposals);
  }
  else if(network == "rinkeby") {
    let proposals = ["JohnDou", "AlfredPeter", "StanSmith"];
    deployer.deploy(Voting, proposals);
  }
};
