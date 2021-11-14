import { IDal, ILink } from './typings';
import { generateHash } from './utils';

import { config } from '../config';
import { Result } from '../models/result';

export class MochDal implements IDal {
   private _db: ILink[] = [];

   public getLinks(): Promise<ILink[]> {
      return Promise.resolve(this._db);
   }

   public getEntryByHash(hash: string): Promise<ILink | undefined> {
      const entry = this._db.find((item) => item.hash === hash);
      return Promise.resolve(entry);
   }

   public getEntryByLink(link: string): Promise<ILink | undefined> {
      const entry = this._db.find((item) => item.link === link);
      return Promise.resolve(entry);
   }

   public async getLinkByHash(hash: string): Promise<string | undefined> {
      const entry = await this.getEntryByHash(hash);
      return entry?.link;
   }

   public async getHashByLink(link: string): Promise<string | undefined> {
      const entry = await this.getEntryByLink(link);
      return entry?.hash;
   }

   public async createNewLink(link: string): Promise<Result> {
      const newLinkUrl = new URL(config.APP_DOMAIN);
      const existingHash = await this.getHashByLink(link);

      if (existingHash !== undefined) {
         newLinkUrl.pathname = existingHash;
      }
      else {
         const hash = generateHash();

         const newEntry: ILink = {
            ID: this._db.length + 1,
            link,
            hash,
         };

         this._db.push(newEntry);

         newLinkUrl.pathname = hash;
      }

      return new Result(newLinkUrl);
   }

   public checkReadiness(): Promise<void> {
      return Promise.resolve();
   }
}