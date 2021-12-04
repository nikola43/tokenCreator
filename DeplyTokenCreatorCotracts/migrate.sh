#!/bin/bash
# cd truffle
#truffle networks --clean
truffle migrate --reset --network bsctestnet --skip-dry-run
truffle run verify --network bsctestnet TokenCreator
#truffle run verify TokenCreator@0xdBa48CF8bf9479A61277fE246f42c6C2F0417926 --network bsctestnet
#truffle run verify TokenCreator
#truffle run verify Token --network bsctestnet
#truffle run verify Token@{contract-address} --network bsctestnet
#truffle migrate --reset --network ganache --compile-all
#truffle run verify MetaCoin --forceConstructorArgs string:0000000000000000000000000cb966d6a7702a4eff64009502653e302b3ec365 --network bsctestnet
#truffle run verify Token@0x61C9157A9EfCaf6022243fA65Ef4666ECc9FD3D7 --network bsctestnet
#truffle run verify SimpleStorage --network rinkeby
