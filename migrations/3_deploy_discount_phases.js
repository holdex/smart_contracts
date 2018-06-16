const Staff = artifacts.require("./Staff.sol");
const DiscountPhases = artifacts.require("./DiscountPhases.sol");

module.exports = async function (deployer) {
    deployer.deploy(DiscountPhases, Staff.address);
};
