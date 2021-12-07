const Web3 = require('web3');
var expect = require('chai').expect;

const tokenContractAbi = [
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "tokenOwner",
         "type": "address"
       },
       {
         "internalType": "string",
         "name": "tokenName",
         "type": "string"
       },
       {
         "internalType": "string",
         "name": "tokenSymbol",
         "type": "string"
       },
       {
         "internalType": "uint8",
         "name": "decimal",
         "type": "uint8"
       },
       {
         "internalType": "uint256",
         "name": "amountOfTokenWei",
         "type": "uint256"
       },
       {
         "internalType": "uint8",
         "name": "setMxTxPer",
         "type": "uint8"
       },
       {
         "internalType": "uint8",
         "name": "setMxWalletPer",
         "type": "uint8"
       },
       {
         "internalType": "address payable",
         "name": "_devWallet",
         "type": "address"
       },
       {
         "internalType": "address payable",
         "name": "_marketingWallet",
         "type": "address"
       },
       {
         "internalType": "address payable",
         "name": "_charityWallet",
         "type": "address"
       },
       {
         "internalType": "address payable",
         "name": "_rewardWallet",
         "type": "address"
       }
     ],
     "stateMutability": "nonpayable",
     "type": "constructor"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": true,
         "internalType": "address",
         "name": "owner",
         "type": "address"
       },
       {
         "indexed": true,
         "internalType": "address",
         "name": "spender",
         "type": "address"
       },
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "value",
         "type": "uint256"
       }
     ],
     "name": "Approval",
     "type": "event"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": true,
         "internalType": "address",
         "name": "previousOwner",
         "type": "address"
       },
       {
         "indexed": true,
         "internalType": "address",
         "name": "newOwner",
         "type": "address"
       }
     ],
     "name": "OwnershipTransferred",
     "type": "event"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "tokensSwapped",
         "type": "uint256"
       },
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "ethReceived",
         "type": "uint256"
       },
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "tokensIntoLiqudity",
         "type": "uint256"
       }
     ],
     "name": "SwapAndLiquify",
     "type": "event"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": false,
         "internalType": "bool",
         "name": "enabled",
         "type": "bool"
       }
     ],
     "name": "SwapAndLiquifyEnabledUpdated",
     "type": "event"
   },
   {
     "anonymous": false,
     "inputs": [
       {
         "indexed": true,
         "internalType": "address",
         "name": "from",
         "type": "address"
       },
       {
         "indexed": true,
         "internalType": "address",
         "name": "to",
         "type": "address"
       },
       {
         "indexed": false,
         "internalType": "uint256",
         "name": "value",
         "type": "uint256"
       }
     ],
     "name": "Transfer",
     "type": "event"
   },
   {
     "inputs": [],
     "name": "_burnFee",
     "outputs": [
       {
         "internalType": "uint8",
         "name": "",
         "type": "uint8"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "_buybackFee",
     "outputs": [
       {
         "internalType": "uint8",
         "name": "",
         "type": "uint8"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "_charityFee",
     "outputs": [
       {
         "internalType": "uint8",
         "name": "",
         "type": "uint8"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "_devFee",
     "outputs": [
       {
         "internalType": "uint8",
         "name": "",
         "type": "uint8"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "_liquidityFee",
     "outputs": [
       {
         "internalType": "uint8",
         "name": "",
         "type": "uint8"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "_marketingFee",
     "outputs": [
       {
         "internalType": "uint8",
         "name": "",
         "type": "uint8"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "_maxTxAmount",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "_maxWalletAmount",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "_name",
     "outputs": [
       {
         "internalType": "string",
         "name": "",
         "type": "string"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "_rewardFee",
     "outputs": [
       {
         "internalType": "uint8",
         "name": "",
         "type": "uint8"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "_symbol",
     "outputs": [
       {
         "internalType": "string",
         "name": "",
         "type": "string"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "_tTotal",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "name": "blacklist",
     "outputs": [
       {
         "internalType": "address",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "charityWallet",
     "outputs": [
       {
         "internalType": "address payable",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "devWallet",
     "outputs": [
       {
         "internalType": "address payable",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "geUnlockTime",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "time",
         "type": "uint256"
       }
     ],
     "name": "lock",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "marketingWallet",
     "outputs": [
       {
         "internalType": "address payable",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "maxBurnFee",
     "outputs": [
       {
         "internalType": "uint8",
         "name": "",
         "type": "uint8"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "maxBuybackFee",
     "outputs": [
       {
         "internalType": "uint8",
         "name": "",
         "type": "uint8"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "maxLiqFee",
     "outputs": [
       {
         "internalType": "uint8",
         "name": "",
         "type": "uint8"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "maxTaxFee",
     "outputs": [
       {
         "internalType": "uint8",
         "name": "",
         "type": "uint8"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "maxWalletFee",
     "outputs": [
       {
         "internalType": "uint8",
         "name": "",
         "type": "uint8"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "minMxTxPercentage",
     "outputs": [
       {
         "internalType": "uint8",
         "name": "",
         "type": "uint8"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "minMxWalletPercentage",
     "outputs": [
       {
         "internalType": "uint8",
         "name": "",
         "type": "uint8"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "numTokensSellToAddToLiquidity",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "onlyWhiteListed",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "owner",
     "outputs": [
       {
         "internalType": "address",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "pcsV2Pair",
     "outputs": [
       {
         "internalType": "address",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "pcsV2Router",
     "outputs": [
       {
         "internalType": "contract IUniswapV2Router02",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "renounceOwnership",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "rewardWallet",
     "outputs": [
       {
         "internalType": "address payable",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "router",
     "outputs": [
       {
         "internalType": "address",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "swapAndLiquifyEnabled",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "newOwner",
         "type": "address"
       }
     ],
     "name": "transferOwnership",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "unlock",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "name": "whitelist",
     "outputs": [
       {
         "internalType": "address",
         "name": "",
         "type": "address"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "stateMutability": "payable",
     "type": "receive"
   },
   {
     "inputs": [],
     "name": "name",
     "outputs": [
       {
         "internalType": "string",
         "name": "",
         "type": "string"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "symbol",
     "outputs": [
       {
         "internalType": "string",
         "name": "",
         "type": "string"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "decimals",
     "outputs": [
       {
         "internalType": "uint8",
         "name": "",
         "type": "uint8"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "totalSupply",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "account",
         "type": "address"
       }
     ],
     "name": "balanceOf",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "recipient",
         "type": "address"
       },
       {
         "internalType": "uint256",
         "name": "amount",
         "type": "uint256"
       }
     ],
     "name": "transfer",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "owner",
         "type": "address"
       },
       {
         "internalType": "address",
         "name": "spender",
         "type": "address"
       }
     ],
     "name": "allowance",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "spender",
         "type": "address"
       },
       {
         "internalType": "uint256",
         "name": "amount",
         "type": "uint256"
       }
     ],
     "name": "approve",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "sender",
         "type": "address"
       },
       {
         "internalType": "address",
         "name": "recipient",
         "type": "address"
       },
       {
         "internalType": "uint256",
         "name": "amount",
         "type": "uint256"
       }
     ],
     "name": "transferFrom",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "spender",
         "type": "address"
       },
       {
         "internalType": "uint256",
         "name": "addedValue",
         "type": "uint256"
       }
     ],
     "name": "increaseAllowance",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "spender",
         "type": "address"
       },
       {
         "internalType": "uint256",
         "name": "subtractedValue",
         "type": "uint256"
       }
     ],
     "name": "decreaseAllowance",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "account",
         "type": "address"
       }
     ],
     "name": "isExcludedFromReward",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "totalFees",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "tAmount",
         "type": "uint256"
       }
     ],
     "name": "deliver",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "tAmount",
         "type": "uint256"
       },
       {
         "internalType": "bool",
         "name": "deductTransferFee",
         "type": "bool"
       }
     ],
     "name": "reflectionFromToken",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "rAmount",
         "type": "uint256"
       }
     ],
     "name": "tokenFromReflection",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "account",
         "type": "address"
       }
     ],
     "name": "excludeFromReward",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "account",
         "type": "address"
       }
     ],
     "name": "includeInReward",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "account",
         "type": "address"
       }
     ],
     "name": "excludeFromFee",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "account",
         "type": "address"
       }
     ],
     "name": "includeInFee",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint8",
         "name": "liquidityFee",
         "type": "uint8"
       },
       {
         "internalType": "uint8",
         "name": "burnFee",
         "type": "uint8"
       },
       {
         "internalType": "uint8",
         "name": "buybackFee",
         "type": "uint8"
       }
     ],
     "name": "setAllFeePercent",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint8",
         "name": "devFeePercent",
         "type": "uint8"
       }
     ],
     "name": "setDevFeePercent",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint8",
         "name": "rewardFeePercent",
         "type": "uint8"
       }
     ],
     "name": "setRewardFeePercent",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint8",
         "name": "marketingFeePercent",
         "type": "uint8"
       }
     ],
     "name": "setMarketingFeePercent",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint8",
         "name": "charityFeePercent",
         "type": "uint8"
       }
     ],
     "name": "setCharityFeePercent",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [],
     "name": "buyBackUpperLimitAmount",
     "outputs": [
       {
         "internalType": "uint256",
         "name": "",
         "type": "uint256"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "buyBackLimit",
         "type": "uint256"
       }
     ],
     "name": "setBuybackUpperLimit",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "maxTxPercent",
         "type": "uint256"
       }
     ],
     "name": "setMaxTxPercent",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "maxWalletPercent",
         "type": "uint256"
       }
     ],
     "name": "setMaxWalletPercent",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "bool",
         "name": "_enabled",
         "type": "bool"
       }
     ],
     "name": "setSwapAndLiquifyEnabled",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address payable",
         "name": "newDevWallet",
         "type": "address"
       }
     ],
     "name": "setDevWallet",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address payable",
         "name": "newMarketingWallet",
         "type": "address"
       }
     ],
     "name": "setMarketingWallet",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address payable",
         "name": "newRewardWallet",
         "type": "address"
       }
     ],
     "name": "setRewardWallet",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address payable",
         "name": "newCharityWallet",
         "type": "address"
       }
     ],
     "name": "setCharityWallet",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "account",
         "type": "address"
       }
     ],
     "name": "isExcludedFromFee",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "addr",
         "type": "address"
       }
     ],
     "name": "addAddressBlacklist",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "addr",
         "type": "address"
       }
     ],
     "name": "removeAddressBlacklist",
     "outputs": [
       {
         "internalType": "address[]",
         "name": "",
         "type": "address[]"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "addr",
         "type": "address"
       }
     ],
     "name": "addAddressWhitelist",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "addr",
         "type": "address"
       }
     ],
     "name": "removeAddressWhitelist",
     "outputs": [
       {
         "internalType": "address[]",
         "name": "",
         "type": "address[]"
       }
     ],
     "stateMutability": "view",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address[]",
         "name": "list",
         "type": "address[]"
       },
       {
         "internalType": "address",
         "name": "addr",
         "type": "address"
       }
     ],
     "name": "removeElementFromAddressArray",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "pure",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address[]",
         "name": "list",
         "type": "address[]"
       },
       {
         "internalType": "address",
         "name": "addr",
         "type": "address"
       }
     ],
     "name": "findAddressOnArray",
     "outputs": [
       {
         "internalType": "bool",
         "name": "",
         "type": "bool"
       }
     ],
     "stateMutability": "pure",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "uint256",
         "name": "burnAmount",
         "type": "uint256"
       }
     ],
     "name": "burn",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   },
   {
     "inputs": [
       {
         "internalType": "address",
         "name": "tokenAddress",
         "type": "address"
       },
       {
         "internalType": "uint256",
         "name": "tokenAmount",
         "type": "uint256"
       }
     ],
     "name": "recoverBEP20",
     "outputs": [],
     "stateMutability": "nonpayable",
     "type": "function"
   }
 ]

// begin a test suite of one or more tests
describe('Token Test', function () {
   // test a functionality
   it('should add numbers', async function () {

      let web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
      const walletAddress = web3.eth.accounts.privateKeyToAccount('904738fb61a7b034d0acd51a1c8cb43e11bca8b035c6f33cbec1a23380f91838');
      const tokenContractInstance = new web3.eth.Contract(tokenContractAbi, "0x8b205C8Eb1F71DBF658c492ef8b7E3C9C29D7597");
      const r1 = await tokenContractInstance.methods.setDevFeePercent(1).send({from: walletAddress.address});
      //expect(sum(1, 2, 3, 4, 5)).to.equal(15);
   })

   // ...some more tests

})
