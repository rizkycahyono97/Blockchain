import { network } from 'hardhat';

const { ethers } = await network.connect();

const simpleStorage = await ethers.deployContract('SimpleStorage');

let favoriteNumber = await simpleStorage.retrieve();
console.log('favoriteNumber: ', favoriteNumber.toString());

const txResponse = await simpleStorage.store('20');
await txResponse.wait(1);

const updatedFavoriteNumber = await simpleStorage.retrieve();
console.log('updatedFavoriteNumber: ', updatedFavoriteNumber.toString());
