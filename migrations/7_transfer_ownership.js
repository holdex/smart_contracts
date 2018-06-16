const Staff = artifacts.require("./Staff.sol");

module.exports = async function (deployer, network, accounts) {
    let owner, staff;
    switch (network) {
        case "ganache": {
            owner = accounts[0];
            staff = accounts[1];
            break;
        }
        case "rinkeby_local": {
            owner = "0x415541beDF69C93C8aD4bc9e7b8e7E3e952F7111";
            staff = "0x30D44fD6496144Ad7DEC6a8dd26F0e9605217fA0";
            break;
        }
        default: {
            throw "SET CORRECT CONFIG NETWORK";
        }
    }

    Staff.deployed().then(async function (s) {
        await s.addStaff(staff);
        await s.transferOwnership(owner);
    });
};
