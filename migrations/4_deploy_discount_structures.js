const Staff = artifacts.require("./Staff.sol");
const DiscountStructs = artifacts.require("./DiscountStructs.sol");

module.exports = async function (deployer) {
    deployer.deploy(DiscountStructs, Staff.address);
};
