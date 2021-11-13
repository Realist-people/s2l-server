import mt = require('mututests');

import { MochDal } from '../dal/moch.impl';

mt.testAsync('Moch IDal implementation', async (t) => {
   const dal = new MochDal();

   const mockStrUrl1 = 'https://some.com/path';
   const mockStrUrl2 = 'https://some.com/path?one=1&two=2';
   const mockStrUrl3 = 'https://some.com/path?three=3';

   await t.isResolved(dal.checkReadiness());

   let entries = await dal.getLinks();
   t.strictEqual(entries.length, 0);

   const r1 = await dal.createNewLink(mockStrUrl1);

   const r11 = await dal.createNewLink(mockStrUrl1);
   t.strictEqual(r1.toString(), r11.toString());

   const r2 = await dal.createNewLink(mockStrUrl2);
   t.notEqual(r1.toString(), r2.toString());

   entries = await dal.getLinks();
   t.strictEqual(entries.length, 2);

   const hash3 = await dal.getHashByLink(mockStrUrl3);
   t.strictEqual(hash3, undefined);

   const entry1 = await dal.getEntryByLink(mockStrUrl1);
   t.notEqual(entry1, undefined);

   const link1 = await dal.getLinkByHash(entry1?.hash as string);
   t.strictEqual(link1, entry1?.link);

   const hash1 = await dal.getHashByLink(entry1?.link as string);
   t.strictEqual(hash1, entry1?.hash);

   t.end();
});