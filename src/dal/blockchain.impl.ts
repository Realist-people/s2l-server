import { ethers } from 'ethers';

import { AbstractDal } from './abstract.impl';
import { abi, HashGeneratedEvent, S2lStorage } from './contract_helpers';
import { IDal, ILink } from './typings';

import { config } from '../config';
import { Result } from '../models/result';

const provider = new ethers.providers.InfuraProvider('rinkeby', config.INFURA_ID);
const signer = new ethers.Wallet(config.SIGNER_KEY, provider);
const contract = new ethers.Contract(config.CONTRACT_ADDRESS, abi, signer) as S2lStorage;


export class BlockChainDal extends AbstractDal implements IDal
{
   public override async getLinkByHash(hash: string): Promise<string | undefined> {
      const link = await contract.hashToLink(hash);
      return link === '' ? undefined : link;
   }

   public async createNewLink(link: string): Promise<Result> {
      const tx = await contract.saveLink(link);
      const receipt = await tx.wait();

      const event = receipt.events?.[0] as HashGeneratedEvent;
		if (event === undefined) {
			throw new Error('no events');
		}

		const [, hash] = event.args;
      const url = new URL(config.APP_DOMAIN);
      url.pathname = hash;

      return new Result(url);
   }

   public getLinks(): Promise<ILink[]> {
      throw new Error('not implemented');
   }

   public getEntryByHash(_hash: string): Promise<ILink | undefined> {
      throw new Error('not implemented');
   }

   public getEntryByLink(_link: string): Promise<ILink | undefined> {
      throw new Error('not implemented');
   }

   public checkReadiness(): Promise<void> {
      return Promise.resolve();
   }
}