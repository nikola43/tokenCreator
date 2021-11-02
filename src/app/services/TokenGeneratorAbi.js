export const TokenGeneratorAddress = '0x5393C67bD33e33131465a443bC8F801DE3580AD9';

export const TokenGeneratorAbi = [
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
        "internalType": "bool",
        "name": "enabled",
        "type": "bool"
      }
    ],
    "name": "TokenCreated",
    "type": "event"
  },
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
        "name": "TxFeePercentToHolders",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "TxFeePercentToLP",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "TxFeePercentToBurned",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "TxFeePercentToWallet",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "TxFeePercentToBuybackTokens",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "MaxWalletPercent",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "MaxTxPercent",
        "type": "uint8"
      },
      {
        "internalType": "address payable",
        "name": "_feeWallet",
        "type": "address"
      }
    ],
    "name": "createNewToken",
    "outputs": [],
    "stateMutability": "payable",
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
    "name": "renounceOwnership",
    "outputs": [],
    "stateMutability": "nonpayable",
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
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "updateTokenCreationPrice",
    "outputs": [],
    "stateMutability": "nonpayable",
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
  }
];
