const Staff = artifacts.require("./Staff.sol");
const PromoCodes = artifacts.require("./PromoCodes.sol");

module.exports = async function (deployer) {
    deployer.deploy(PromoCodes, Staff.address);
};
