const Staff = artifacts.require("./Staff.sol");

module.exports = async function (deployer) {
    deployer.deploy(Staff);
};
