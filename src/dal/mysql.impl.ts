import { ResultSetHeader } from 'mysql2';

import { Connection } from './connection';
import { IDal, ILink } from './typings';
import { generateHash } from './utils';

import { config } from '../config';
import { Result } from '../models/result';

export class MySqlDal implements IDal {
   private _conn = new Connection();

   public getLinks(): Promise<ILink[]> {
      return this._conn.query<ILink[]>(
         'select * from links',
      )
         .then((result) => result[0]);
   }

   public async getEntryByHash(hash: string): Promise<ILink | undefined> {
      const result = await this._conn.query<ILink[]>(
         'select * from links where hash = ?',
         [hash],
      );
      return result[0]?.[0];
   }

   public async getEntryByLink(link: string): Promise<ILink | undefined> {
      const result = await this._conn.query<ILink[]>(
         'select * from links where link = ?',
         [link],
      );
      return result[0]?.[0];
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
         const hash = await this.generateUniqueHash();
         await this.insertNewLink(link, hash);

         newLinkUrl.pathname = hash;
      }

      return new Result(newLinkUrl);
   }

   public async checkReadiness(): Promise<void> {
      await this._conn.query('select 1+1');
   }

   private generateUniqueHash = async (): Promise<string> => {
      const hash = generateHash();
      const existingEntry = await this.getEntryByHash(hash);
      return existingEntry === undefined
         ? hash
         : this.generateUniqueHash();
   }

   private async insertNewLink(link: string, hash: string): Promise<void> {
      const [result] = await this._conn.query<ResultSetHeader>(
         'INSERT INTO links (hash, link) VALUES(?, ?)',
         [hash, link],
      );
      if (result.affectedRows !== 1 || result.serverStatus !== 2) {
         throw new Error('Some problem with adding a new short link');
      }
   }
}