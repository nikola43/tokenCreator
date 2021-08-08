export const DevNetworks = [
  {
    index: 0,
    image: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png',
    name: 'Binance Smart Chain Testnet',
    params: {
      chainId: 97,
      chainName: 'Binance Smart Chain Testnet',
      nativeCurrency: {
        name: 'Binance Coin',
        symbol: 'tBNB',
        decimals: 18
      },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
      blockExplorerUrls: ['https://testnet.bscscan.com']
    }
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
    }
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
    }
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
    }
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
    }
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
    }
  },
];
