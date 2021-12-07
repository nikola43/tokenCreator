export const DevNetworks = [
  {
    index: 0,
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    name: 'Binance Smart Chain Testnet',
    routerAddress: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
    tokenCreatorContractAddress: '0x45FF5E5f35747aE2296AB9d804CA7C0d3C7F863a',
    lockLiquidityContractAddress: '0x2fBeEc08c73E6E2F391ef6c282F6C370Ff9e82E9',
    launchpadContractAddress: '0x4798f9D67D0fA3BB4A8b8227A7C8B5792fd9D6e9',
    explorerApiKey: 'V28HJCGUP2XCHSV5IXXG6IK9W14HHXKDCY',
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
    ]
  },
  // {
  //   index: 1,
  //   name: 'Ethereum',
  //   image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  //   routerAddress: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
  //   params: {
  //     chainId: '0x1',
  //     chainName: 'Ethereum',
  //     nativeCurrency: {
  //       name: 'Ethereum',
  //       symbol: 'ETH',
  //       decimals: 18
  //     },
  //     rpcUrls: ['https://mainnet.infura.io/v3/63393c0bfeb8400c909cfdf303044f3e'],
  //     blockExplorerUrls: ['https://etherscan.io']
  //   },
  //   acceptedPaymentTokens: [
  //     {
  //       symbol: "ETHER",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  //       address: "0xdsfsd"
  //     },
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
  //     },
  //     {
  //       symbol: "USDC",
  //       image: 'https://bscscan.com/token/images/centre-usdc_28.png',
  //       address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
  //     },
  //     {
  //       symbol: "DAI",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png',
  //       address: "0x6b175474e89094c44da98b954eedeac495271d0f"
  //     },
  //     {
  //       symbol: "USDT",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
  //       address: "0xdac17f958d2ee523a2206206994597c13d831ec7"
  //     },
  //     {
  //       symbol: "MATIC",
  //       image: 'https://etherscan.io/token/images/matic-polygon_32.png',
  //       address: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0"
  //     },
  //     {
  //       symbol: "HARMONY",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3945.png',
  //       address: "0x799a4202c12ca952cb311598a024c80ed371a41e"
  //     },
  //   ]
  // },
  {
    index: 1,
    name: 'Polygon (MATIC)',
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
    routerAddress: '0xa5e0829caced8ffdd4de3c43696c57f7d7a678ff',
    params: {
      chainId: '0x89',
      chainName: 'Polygon (MATIC)',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18
      },
      rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
      blockExplorerUrls: ['https://polygonscan.com/']
    },
    acceptedPaymentTokens: [
      {
        symbol: "MATIC",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
        address: "0x0000000000000000000000000000000000001010"
      },
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
        symbol: "ETHER",
        image: 'https://polygonscan.com/token/images/wETH_32.png',
        address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"
      },
    ]
  },
  // {
  //   index: 3,
  //   name: "Harmony Mainnet Shard 0",
  //   image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3945.png',
  //   routerAddress: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
  //   params: {
  //     chainId: '0x63564C40',
  //     chainName: 'Harmony',
  //     nativeCurrency: {
  //       name: 'ONE',
  //       symbol: 'ONE',
  //       decimals: 18
  //     },
  //     rpcUrls: ['https://api.harmony.one'],
  //     blockExplorerUrls: ['https://explorer.harmony.one']
  //   },
  //   acceptedPaymentTokens: [
  //     {
  //       symbol: "ONE",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "one1eanyppa9hvpr0g966e6zs5hvdjxkngn6jtulua"
  //     },
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "one1k8mwv8s7zymz2kf6ytax4220spftcw0q2et32z"
  //     },
  //     {
  //       symbol: "DAI",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "one1a7th6tunrsvh3k6lvarkvmapat9s6qee9kna05"
  //     },
  //     {
  //       symbol: "USDC",
  //       image: 'https://bscscan.com/token/images/centre-usdc_28.png',
  //       address: "one1np293efrmv74xyjcz0kk3sn53x0fm745f2hsuc"
  //     },
  //     {
  //       symbol: "BUSD",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "one1u9mwheravgdesjnnqd4emfwcx3q3aae5hw36l2"
  //     },
  //     {
  //       symbol: "USDT",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "one18s4ch6vu2pvnpq0252njfu9c9p044w50gw3l6y"
  //     },
  //   ]
  // },
  // {
  //   index: 4,
  //   name: "Fantom Opera",
  //   image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3513.png',
  //   routerAddress: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
  //   params: {
  //     chainId: '0xFA',
  //     chainName: 'Fantom',
  //     nativeCurrency: {
  //       name: 'Fantom',
  //       symbol: 'FTM',
  //       decimals: 18
  //     },
  //     rpcUrls: ['https://rpc.ftm.tools'],
  //     blockExplorerUrls: ['https://ftmscan.com']
  //   },
  //   acceptedPaymentTokens: [
  //     {
  //       symbol: "FTM",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83"
  //     },
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0x27f26f00e1605903645bbabc0a73e35027dccd45"
  //     },
  //     {
  //       symbol: "USDC",
  //       image: 'https://bscscan.com/token/images/centre-usdc_28.png',
  //       address: "0x04068da6c83afcfa0e13ba15a6696662335d5b75"
  //     },
  //     {
  //       symbol: "DAI",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0x8d11ec38a3eb5e956b052f67da8bdc9bef8abf3e"
  //     },
  //     {
  //       symbol: "USDT",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0x940f41f0ec9ba1a34cf001cc03347ac092f5f6b5"
  //     },
  //   ]
  // },
  // {
  //   index: 5,
  //   name: "RSK Testnet",
  //   image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3626.png',
  //   routerAddress: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
  //   params: {
  //     chainId: '0x1F',
  //     chainName: 'RSK',
  //     nativeCurrency: {
  //       name: "RSK Testnet Ether",
  //       symbol: 'tRBTC',
  //       decimals: 18
  //     },
  //     rpcUrls: ['https://public-node.testnet.rsk.co'],
  //     blockExplorerUrls: ['https://ftmscan.com']
  //   },
  //   acceptedPaymentTokens: [
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0xdsfsd"
  //     },
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0xdsfsd"
  //     },
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0xdsfsd"
  //     },
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0xdsfsd"
  //     },
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0xdsfsd"
  //     },
  //   ]
  // },
  // {
  //   index: 5,
  //   name: "OKExChain Testnet",
  //   image: 'https://s2.coinmarketcap.com/static/img/exchanges/64x64/294.png',
  //   routerAddress: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
  //   params: {
  //     chainId: '0x41',
  //     chainName: 'OKT',
  //     nativeCurrency: {
  //       name: "OKExChain Global Utility Token in testnet",
  //       symbol: 'tOKT',
  //       decimals: 18
  //     },
  //     rpcUrls: ['https://exchaintestrpc.okex.org'],
  //     blockExplorerUrls: ['https://www.oklink.com/okexchain-test']
  //   },
  //   acceptedPaymentTokens: [
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0xdsfsd"
  //     },
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0xdsfsd"
  //     },
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0xdsfsd"
  //     },
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0xdsfsd"
  //     },
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0xdsfsd"
  //     },
  //   ]
  // },
  // {
  //   index: 6,
  //   name: "IoTeX Network Testnet",
  //   image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/2777.png',
  //   routerAddress: '0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3',
  //   params: {
  //     chainId: '0x1252',
  //     chainName: 'iotex.io',
  //     nativeCurrency: {
  //       name: "IoTeX",
  //       symbol: 'IOTX',
  //       decimals: 18
  //     },
  //     rpcUrls: ['https://babel-api.testnet.iotex.io'],
  //     blockExplorerUrls: ['https://testnet.iotexscan.io']
  //   },
  //   acceptedPaymentTokens: [
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0xdsfsd"
  //     },
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0xdsfsd"
  //     },
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0xdsfsd"
  //     },
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0xdsfsd"
  //     },
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0xdsfsd"
  //     },
  //   ]
  // },
];

export const ProdNetworks = [
  {
    index: 0,
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    name: 'Binance Smart Chain',
    routerAddress: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
    tokenCreatorContractAddress: '0xA90654767d1f00a306A54aA6Fc37B5b5dD781B8e',
    lockLiquidityContractAddress: '0x118cbB6BFAe71E4Fe10d5f83429C439281dA319b',
    explorerApiKey: 'V28HJCGUP2XCHSV5IXXG6IK9W14HHXKDCY',
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
        address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
      },
      {
        symbol: "BUSD",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png',
        address: "0xe9e7cea3dedca5984780bafc599bd69add087d56"
      },
      {
        symbol: "DAI",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png',
        address: "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3"
      },
      {
        symbol: "USDT",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
        address: "0x55d398326f99059ff775485246999027b3197955"
      },
      {
        symbol: "CAKE",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7186.png',
        address: "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82"
      },
      {
        symbol: "MATIC",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
        address: "0xcc42724c6683b7e57334c4e856f4c9965ed682bd"
      },
      {
        symbol: "ETHER",
        image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
        address: "0x2170ed0880ac9a755fd29b2688956bd959f933f8"
      },
    ]
  },
  // {
  //   index: 1,
  //   name: 'Ethereum',
  //   image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  //   routerAddress: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
  //   params: {
  //     chainId: '0x1',
  //     chainName: 'Ethereum',
  //     nativeCurrency: {
  //       name: 'Ethereum',
  //       symbol: 'ETH',
  //       decimals: 18
  //     },
  //     rpcUrls: ['https://mainnet.infura.io/v3/63393c0bfeb8400c909cfdf303044f3e'],
  //     blockExplorerUrls: ['https://etherscan.io']
  //   },
  //   acceptedPaymentTokens: [
  //     {
  //       symbol: "ETHER",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
  //       address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
  //     },
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
  //     },
  //     {
  //       symbol: "USDC",
  //       image: 'https://bscscan.com/token/images/centre-usdc_28.png',
  //       address: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
  //     },
  //     {
  //       symbol: "DAI",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png',
  //       address: "0x6b175474e89094c44da98b954eedeac495271d0f"
  //     },
  //     {
  //       symbol: "USDT",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
  //       address: "0xdac17f958d2ee523a2206206994597c13d831ec7"
  //     },
  //     {
  //       symbol: "MATIC",
  //       image: 'https://etherscan.io/token/images/matic-polygon_32.png',
  //       address: "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0"
  //     },
  //     {
  //       symbol: "HARMONY",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3945.png',
  //       address: "0x799a4202c12ca952cb311598a024c80ed371a41e"
  //     },
  //   ]
  // },
   {
     index: 1,
     name: 'Polygon (MATIC)',
     image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
     routerAddress: '0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff',
     tokenCreatorContractAddress: '0xA90654767d1f00a306A54aA6Fc37B5b5dD781B8e',
     lockLiquidityContractAddress: '0x118cbB6BFAe71E4Fe10d5f83429C439281dA319b',
     explorerApiKey: 'C88WPK1DEGCHQRS74BNNR78QV7ZDRBRRS9',
     params: {
       network_id: 137,
       chainId: 137,
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
         symbol: "MATIC",
         image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
         address: "0x0000000000000000000000000000000000001010"
       },
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
         symbol: "ETHER",
         image: 'https://polygonscan.com/token/images/wETH_32.png',
         address: "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619"
       },
     ]
   },
  // {
  //   index: 3,
  //   name: "Harmony Mainnet Shard 0",
  //   image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3945.png',
  //   routerAddress: '0x1b02dA8Cb0d097eB8D57A175b88c7D8b47997506',
  //   params: {
  //     chainId: '0x63564C40',
  //     chainName: 'Harmony',
  //     nativeCurrency: {
  //       name: 'ONE',
  //       symbol: 'ONE',
  //       decimals: 18
  //     },
  //     rpcUrls: ['https://api.harmony.one'],
  //     blockExplorerUrls: ['https://explorer.harmony.one']
  //   },
  //   acceptedPaymentTokens: [
  //     {
  //       symbol: "ONE",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3945.png',
  //       address: "0xcf664087a5bb0237a0bad6742852ec6c8d69a27a"
  //     },
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0xb1f6e61e1e113625593a22fa6aa94f8052bc39e0"
  //     },
  //     {
  //       symbol: "DAI",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png',
  //       address: "0xef977d2f931c1978db5f6747666fa1eacb0d0339"
  //     },
  //     {
  //       symbol: "USDC",
  //       image: 'https://bscscan.com/token/images/centre-usdc_28.png',
  //       address: "0x985458e523db3d53125813ed68c274899e9dfab4"
  //     },
  //     {
  //       symbol: "BUSD",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4687.png',
  //       address: "0xe176ebe47d621b984a73036b9da5d834411ef734"
  //     },
  //     {
  //       symbol: "USDT",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
  //       address: "0x3c2b8be99c50593081eaa2a724f0b8285f5aba8f"
  //     },
  //   ]
  // },
  // {
  //   index: 4,
  //   name: "Avalanche Mainnet",
  //   image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3945.png',
  //   routerAddress: '0x262DcFB36766C88E6A7a2953c16F8defc40c378A',
  //   params: {
  //     chainId: '0x0000A86A',
  //     chainName: 'AVAX',
  //     nativeCurrency: {
  //       name: 'Avalanche',
  //       symbol: 'AVAX',
  //       decimals: 18
  //     },
  //     rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  //     blockExplorerUrls: ['https://snowtrace.io/']
  //   },
  //   acceptedPaymentTokens: [
  //     {
  //       symbol: "AVAX",
  //       image: 'https://snowtrace.io/token/images/avax_32.png',
  //       address: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7"
  //     },
  //     {
  //       symbol: "USDT",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png',
  //       address: "0xc7198437980c041c805a1edcba50c1ce5db95118"
  //     },
  //     {
  //       symbol: "BNB",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
  //       address: "0x264c1383ea520f73dd837f915ef3a732e204a493"
  //     },
  //     {
  //       symbol: "DAI",
  //       image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4943.png',
  //       address: "0xd586e7f844cea2f87f50152665bcbc2c279d8d70"
  //     },
  //     {
  //       symbol: "USDC",
  //       image: 'https://bscscan.com/token/images/centre-usdc_28.png',
  //       address: "0xa7d7079b0fead91f3e65f86e8915cb59c1a4c664"
  //     }
  //   ]
  // },
];
