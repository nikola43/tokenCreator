#!/bin/bash
# cd truffle
#truffle networks --clean
truffle migrate --reset --network bsctestnet TokenCreator Locker
#truffle run verify --network bsctestnet TokenCreator@0x4798f9D67D0fA3BB4A8b8227A7C8B5792fd9D6e9

truffle migrate --reset --network bsctestnet TokenCreator Locker
truffle run verify --network bsctestnet Locker@0x2fBeEc08c73E6E2F391ef6c282F6C370Ff9e82E9
#truffle run verify --network maticMainnet TokenCreator@0xa90654767d1f00a306a54aa6fc37b5b5dd781b8e
#truffle run verify MetaCoin --forceConstructorArgs string:0000000000000000000000000cb966d6a7702a4eff64009502653e302b3ec365 --network bsctestnet
#
# truffle run verify --network maticMainnet Locker@0x257dd621B41E4eaBcC7ef142e3875eD7CEcC585B
#truffle run verify --network maticMainnet TokenCreator@0xa90654767d1f00a306a54aa6fc37b5b5dd781b8e
#truffle run verify MetaCoin --forceConstructorArgs string:0000000000000000000000000cb966d6a7702a4eff64009502653e302b3ec365 --network bsctestnet

