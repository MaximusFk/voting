module.exports = {
  networks: {
    test: {
      host: "localhost",
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      host: "localhost",
      port: 8545,
      from: "0xb1253743997c5a1ce38b1ebdaa4642b9a407f007",
      network_id: 4
    },
    genache: {
      host: "localhost",
      port: 7545,
      network_id: 5777
    }
  }
};
