#!/bin/bash
# cd truffle
#truffle networks --clean
truffle migrate --reset --network bsctestnet --skip-dry-run
#truffle run verify TokenCreator@0x9Ea66D8DF1b239685df4050494A9dC4424F8c39e --network bsctestnet
#truffle run verify Token --network bsctestnet
#truffle run verify Token@{contract-address} --network bsctestnet
#truffle migrate --reset --network ganache --compile-all
#truffle run verify MetaCoin --forceConstructorArgs string:0000000000000000000000000cb966d6a7702a4eff64009502653e302b3ec365 --network bsctestnet
#truffle run verify Token@0x61C9157A9EfCaf6022243fA65Ef4666ECc9FD3D7 --network bsctestnet
#truffle run verify SimpleStorage --network rinkeby
