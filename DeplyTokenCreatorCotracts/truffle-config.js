//const PRIVATE_KEY = "a6aec16774f61071c233bde0b23d097181f871a2db8284cbffc0a6bf27b8f1ec";
// const PRIVATE_KEY = "c84adff77fe3961aed28dcaf36807b04a7333f62b4433aa0f9debce17a9c1077";

const HDWalletProvider = require("@truffle/hdwallet-provider");

const seed = "pigeon biology matrix monitor plunge coffee hand timber more educate jelly season";

module.exports = {
    compilers: {
        solc: {
            version: '0.8.10',
            settings: {
                //evmVersion: 'byzantium', // Default: "petersburg"
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        }
    },


    networks: {
        development: {
            host: "127.0.0.1",
            port: 7545,
            network_id: "5777"
        },
        bsc: {
            provider: () => new HDWalletProvider(seed, `https://bsc-dataseed1.binance.org`),
            network_id: 56,
            confirmations: 10,
            timeoutBlocks: 200,
            skipDryRun: true,
            gas: 20000000,
            gasPrice: 5000000000,
        },
        matic: {
            provider: () => new HDWalletProvider(seed, `https://rpc-mumbai.matic.today`),
            network_id: 80001,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true
        },
        polygon_infura_mainnet: {
            provider: () => new HDWalletProvider({
                mnemonic: {
                    phrase: seed
                },
                providerOrUrl: "https://polygon-mainnet.infura.io/v3/63393c0bfeb8400c909cfdf303044f3e"
            }),
            network_id: 137,
            confirmations: 2,
            timeoutBlocks: 200,
            skipDryRun: true,
            chainId: 137
        },
        rinkeby: {
            provider: function () {
                return new HDWalletProvider(seed, "https://rinkeby.infura.io/v3/63393c0bfeb8400c909cfdf303044f3e");
            },
            network_id: 4,
            gas: 25000000,
            gasPrice: 10000000000,
        },
        "eth-mainet": {
            provider: () => new HDWalletProvider(seed, "https://mainnet.infura.io/v3/63393c0bfeb8400c909cfdf303044f3e", 0),
            network_id: 1,
            gas: 8100000,
            gasPrice: 77000000000, // 77 Gwei
        },
        "ropsten": {
            provider: () => new HDWalletProvider(seed, "https://ropsten.infura.io/v3/2560f14076a04dafb37b9ac8c49e73d6", 0),
            network_id: 3,
            gas: 7992000,
            gasPrice: 20000000000, // 20 Gwei
        },
        bsctestnet: {
            provider: () => new HDWalletProvider(seed, `https://apis-sj.ankr.com/d39155d1e5344cbca9262b1de2010e49/8e1a6b2b88490d4e20818137e607c759/binance/full/test`),
            network_id: 97,
            gas: 28765632,
            gasPrice: 20000000000, // 20 Gwei
            //confirmations: 2,
            //from: "0xB06a4327FF7dB3D82b51bbD692063E9a180b79D9",
            //gas: 29990542,   // <--- Twice as much
            //gasPrice: 20000000000, // 12 Gwei
        },
    },

    // Set default mocha options here, use special reporters etc.
    mocha: {
        // timeout: 100000
    },

    plugins: [
        'truffle-plugin-verify',
        'truffle-contract-size'
    ],

    api_keys: {
        //etherscan: "UCKNP8D26CKHUMIJ36UFKUXSD1QFN9434V"
        etherscan: "V28HJCGUP2XCHSV5IXXG6IK9W14HHXKDCY"
    },
};
