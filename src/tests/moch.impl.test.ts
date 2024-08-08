import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { MochDal } from '../dal/moch.impl';

describe('MochDal', () => {
   it('Should implement IDal correctly', async () => {
      const dal = new MochDal();

      const mockStrUrl1 = 'https://some.com/path';
      const mockStrUrl2 = 'https://some.com/path?one=1&two=2';
      const mockStrUrl3 = 'https://some.com/path?three=3';

      await assert.doesNotReject(dal.checkReadiness());

      let entries = await dal.getLinks();
      assert.equal(entries.length, 0);

      const r1 = await dal.createNewLink(mockStrUrl1);

      const r11 = await dal.createNewLink(mockStrUrl1);
      assert.equal(r1.toString(), r11.toString());

      const r2 = await dal.createNewLink(mockStrUrl2);
      assert.notEqual(r1.toString(), r2.toString());

      entries = await dal.getLinks();
      assert.equal(entries.length, 2);

      const hash3 = await dal.getHashByLink(mockStrUrl3);
      assert.equal(hash3, undefined);

      const entry1 = await dal.getEntryByLink(mockStrUrl1);
      assert.notEqual(entry1, undefined);

      const link1 = await dal.getLinkByHash(entry1?.hash as string);
      assert.equal(link1, entry1?.link);

      const hash1 = await dal.getHashByLink(entry1?.link as string);
      assert.equal(hash1, entry1?.hash);
   });
});
