import { IDal, ILink } from './typings';

import { Result } from '../models/result';

export abstract class AbstractDal implements IDal {
   public abstract getLinks(): Promise<ILink[]>;
   public abstract getEntryByHash(hash: string): Promise<ILink | undefined>;
   public abstract getEntryByLink(link: string): Promise<ILink | undefined>;

   public async getLinkByHash(hash: string): Promise<string | undefined> {
      const entry = await this.getEntryByHash(hash);
      return entry?.link;
   }

   public async getHashByLink(link: string): Promise<string | undefined> {
      const entry = await this.getEntryByLink(link);
      return entry?.hash;
   }

   public abstract createNewLink(link: string): Promise<Result>;
   public abstract checkReadiness(): Promise<void>;
}