export const DevNetworks = [
  {
    index: 0,
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    name: 'Binance Smart Chain Testnet',
    params: {
      chainId: '0x61',
      chainName: 'Binance Smart Chain Testnet',
      nativeCurrency: {
        name: 'Binance Coin',
        symbol: 'tBNB',
        decimals: 18
      },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
      blockExplorerUrls: ['https://testnet.bscscan.com']
    },
    acceptedPaymentTokens: [
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xae13d989dac2f0debff460ac112a837c89baa7cd"
      },
      {
        symbol: "BUSD",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png',
        address: "0x78867bbeef44f2326bf8ddd1941a4439382ef2a7"
      },
      {
        symbol: "DAI",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png',
        address: "0x8a9424745056eb399fd19a0ec26a14316684e274"
      },
      {
        symbol: "USDT",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
        address: "0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684"
      },
      {
        symbol: "CAKE",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7186.png',
        address: "0xdsfsd"
      },
      {
        symbol: "SOLANA",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
        address: "0xdsfsd"
      },
      {
        symbol: "MATIC",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
        address: "0xdsfsd"
      },
      {
        symbol: "ETHER",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
        address: "0xdsfsd"
      },
      {
        symbol: "HARMONY",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3945.png',
        address: "0xdsfsd"
      },
    ]
  },
  {
    index: 1,
    name: 'Ethereum',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    params: {
      chainId: '0x1',
      chainName: 'Ethereum',
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18
      },
      rpcUrls: ['https://mainnet.infura.io/v3/63393c0bfeb8400c909cfdf303044f3e'],
      blockExplorerUrls: ['https://etherscan.io']
    },
    acceptedPaymentTokens: [
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
      },
      {
        symbol: "USDC",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png',
        address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
      },
      {
        symbol: "DAI",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png',
        address: "0x6b175474e89094c44da98b954eedeac495271d0f"
      },
      {
        symbol: "USDT",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
        address: "0xdac17f958d2ee523a2206206994597c13d831ec7"
      },
      {
        symbol: "MATIC",
        image: 'https://etherscan.io/token/images/matic-polygon_32.png',
        address: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0"
      },
      {
        symbol: "ETHER",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
        address: "0xdsfsd"
      },
      {
        symbol: "HARMONY",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3945.png',
        address: "0x799a4202c12ca952cb311598a024c80ed371a41e"
      },
    ]
  },
  {
    index: 2,
    name: 'Polygon (MATIC)',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
    params: {
      chainId: '0x89',
      chainName: 'Polygon (MATIC)',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18
      },
      rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
      blockExplorerUrls: ['https://explorer.matic.network/']
    },
    acceptedPaymentTokens: [
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0x3BA4c387f786bFEE076A58914F5Bd38d668B42c3"
      },
      {
        symbol: "BUSD",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png',
        address: "0xdab529f40e671a1d4bf91361c21bf9f0c9712ab7"
      },
      {
        symbol: "DAI",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png',
        address: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063"
      },
      {
        symbol: "USDT",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
        address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f"
      },
      {
        symbol: "MATIC",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
        address: "0x0000000000000000000000000000000000001010"
      },
      {
        symbol: "ETHER",
        image: 'https://polygonscan.com/token/images/wETH_32.png',
        address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"
      },
    ]
  },
  {
    index: 3,
    name: "Harmony Mainnet Shard 0",
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3945.png',
    params: {
      chainId: '0x63564C40',
      chainName: 'Harmony',
      nativeCurrency: {
        name: 'ONE',
        symbol: 'ONE',
        decimals: 18
      },
      rpcUrls: ['https://api.harmony.one'],
      blockExplorerUrls: ['https://explorer.harmony.one']
    },
    acceptedPaymentTokens: [
      {
        symbol: "ONE",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "one1eanyppa9hvpr0g966e6zs5hvdjxkngn6jtulua"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "one1k8mwv8s7zymz2kf6ytax4220spftcw0q2et32z"
      },
      {
        symbol: "DAI",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "one1a7th6tunrsvh3k6lvarkvmapat9s6qee9kna05"
      },
      {
        symbol: "USDC",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "one1np293efrmv74xyjcz0kk3sn53x0fm745f2hsuc"
      },
      {
        symbol: "BUSD",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "one1u9mwheravgdesjnnqd4emfwcx3q3aae5hw36l2"
      },
      {
        symbol: "USDT",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "one18s4ch6vu2pvnpq0252njfu9c9p044w50gw3l6y"
      },
    ]
  },
  {
    index: 4,
    name: "Fantom Opera",
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3513.png',
    params: {
      chainId: '0xFA',
      chainName: 'Fantom',
      nativeCurrency: {
        name: 'Fantom',
        symbol: 'FTM',
        decimals: 18
      },
      rpcUrls: ['https://rpc.ftm.tools'],
      blockExplorerUrls: ['https://ftmscan.com']
    },
    acceptedPaymentTokens: [
      {
        symbol: "FTM",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0x27f26f00e1605903645bbabc0a73e35027dccd45"
      },
      {
        symbol: "USDC",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0x04068da6c83afcfa0e13ba15a6696662335d5b75"
      },
      {
        symbol: "DAI",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e"
      },
      {
        symbol: "USDT",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0x940f41f0ec9ba1a34cf001cc03347ac092f5f6b5"
      },
    ]
  },
  {
    index: 5,
    name: "RSK Testnet",
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3626.png',
    params: {
      chainId: '0x1F',
      chainName: 'RSK',
      nativeCurrency: {
        name: "RSK Testnet Ether",
        symbol: 'tRBTC',
        decimals: 18
      },
      rpcUrls: ['https://public-node.testnet.rsk.co'],
      blockExplorerUrls: ['https://ftmscan.com']
    },
    acceptedPaymentTokens: [
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
    ]
  },
  {
    index: 5,
    name: "OKExChain Testnet",
    image: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/294.png',
    params: {
      chainId: '0x41',
      chainName: 'OKT',
      nativeCurrency: {
        name: "OKExChain Global Utility Token in testnet",
        symbol: 'tOKT',
        decimals: 18
      },
      rpcUrls: ['https://exchaintestrpc.okex.org'],
      blockExplorerUrls: ['https://www.oklink.com/okexchain-test']
    },
    acceptedPaymentTokens: [
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
    ]
  },
  {
    index: 6,
    name: "IoTeX Network Testnet",
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2777.png',
    params: {
      chainId: '0x1252',
      chainName: 'iotex.io',
      nativeCurrency: {
        name: "IoTeX",
        symbol: 'IOTX',
        decimals: 18
      },
      rpcUrls: ['https://babel-api.testnet.iotex.io'],
      blockExplorerUrls: ['https://testnet.iotexscan.io']
    },
    acceptedPaymentTokens: [
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
    ]
  },
];

export const ProdNetworks = [
  {
    index: 0,
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    name: 'Binance Smart Chain',
    params: {
      chainId: '0x38',
      chainName: 'Binance Smart Chain Mainnet',
      nativeCurrency: {
        name: 'Binance Coin',
        symbol: 'BNB',
        decimals: 18
      },
      rpcUrls: ['https://bsc-dataseed.binance.org/'],
      blockExplorerUrls: ['https://bscscan.com']
    },
    acceptedPaymentTokens: [
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
    ]
  },
  {
    index: 1,
    name: 'Ethereum',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    params: {
      chainId: '0x1',
      chainName: 'Ethereum',
      nativeCurrency: {
        name: 'Ethereum',
        symbol: 'ETH',
        decimals: 18
      },
      rpcUrls: ['https://mainnet.infura.io/v3/63393c0bfeb8400c909cfdf303044f3e'],
      blockExplorerUrls: ['https://etherscan.io']
    },
    acceptedPaymentTokens: [
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
    ]
  },
  {
    index: 2,
    name: 'Polygon (MATIC)',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
    params: {
      chainId: '0x89',
      chainName: 'Polygon (MATIC)',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18
      },
      rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
      blockExplorerUrls: ['https://explorer.matic.network/']
    },
    acceptedPaymentTokens: [
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
      {
        symbol: "BNB",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
        address: "0xdsfsd"
      },
    ]
  },
];
