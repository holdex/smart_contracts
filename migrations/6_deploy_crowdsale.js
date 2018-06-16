const Staff = artifacts.require("./Staff.sol");
const Crowdsale = artifacts.require("./Crowdsale.sol");
const PromoCodes = artifacts.require("./PromoCodes.sol");
const DiscountPhases = artifacts.require("./DiscountPhases.sol");
const DiscountStructs = artifacts.require("./DiscountStructs.sol");

module.exports = async function (deployer, network, accounts) {
    const startDate = Math.floor(Date.now() / 1000);
    const crowdsaleStartDate = Math.floor(Date.now() / 1000) + 3600;
    const endDate = crowdsaleStartDate + 3600 * 24 * 30;
    const referralBonusPercent = 1;
    const tokenDecimals = 18;
    const tokenRate = 10000;
    const minPurchaseInWei = web3.toWei(.1, 'ether');
    const maxInvestorContributionInWei = web3.toWei(10, 'ether');
    const tokensForSaleCap = 500000000 * (10**tokenDecimals);
    const purchaseTokensClaimDate = 0;
    const bonusTokensClaimDate = 0;

    let ethFundsWallet;
    switch (network) {
        case "ganache": {
            ethFundsWallet = accounts[9];
            break;
        }
        case "rinkeby_local": {
            ethFundsWallet = "0x5C232a6acCf6fB72983Dc5bA1E9f8C9e019208f3";
            break;
        }
        default: {
            throw "SET CORRECT CONFIG NETWORK";
        }
    }

    await deployer.deploy(Crowdsale,
        [
            startDate,
            crowdsaleStartDate,
            endDate,
            tokenDecimals,
            tokenRate,
            tokensForSaleCap,
            minPurchaseInWei,
            maxInvestorContributionInWei,
            purchaseTokensClaimDate,
            bonusTokensClaimDate,
	        referralBonusPercent
        ],
        [
            ethFundsWallet,
            PromoCodes.address,
            DiscountPhases.address,
            DiscountStructs.address,
            Staff.address
        ]
    );

    const p = await PromoCodes.deployed();
    p.setCrowdsale(Crowdsale.address);

    const d = await DiscountStructs.deployed();
    d.setCrowdsale(Crowdsale.address);
};
