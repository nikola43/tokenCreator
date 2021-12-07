#!/bin/bash
# cd truffle
#truffle networks --clean
truffle migrate --reset --network bsctestnet TokenCreator
#truffle run verify --network bsctestnet TokenCreator@0x4798f9D67D0fA3BB4A8b8227A7C8B5792fd9D6e9

# truffle migrate --reset --network maticMainnet --skip-dry-run
#truffle run verify TokenCreator@0x4798f9D67D0fA3BB4A8b8227A7C8B5792fd9D6e9 --network maticMainnet
#truffle run verify MetaCoin --forceConstructorArgs string:0000000000000000000000000cb966d6a7702a4eff64009502653e302b3ec365 --network bsctestnet

