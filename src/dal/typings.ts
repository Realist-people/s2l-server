import { Result } from '../models/result';

export interface ILink {
   ID: number;
   link: string;
   hash: string;
}

export interface IDal {
   getLinks: () => Promise<ILink[]>;
   getEntryByHash: (hash: string) => Promise<ILink | undefined>;
   getEntryByLink: (link: string) => Promise<ILink | undefined>;
   getLinkByHash: (hash: string) => Promise<string | undefined>;
   getHashByLink: (link: string) => Promise<string | undefined>;
   createNewLink: (link: string) => Promise<Result>;
   checkReadiness: () => Promise<void>;
}