import { strict as assert } from 'node:assert';
import { describe, it } from 'node:test';

import { Result } from '../models/result';

describe('Result', () => {
   it('Should generate Result correctly', () => {
      const mockStrUrl = 'https://some.com/path?one=1&two=2';
      const u = new URL(mockStrUrl);
      const r = new Result(u);

      assert.equal(r instanceof Buffer, true);
      assert.equal(r.toString(), `{"link":"${mockStrUrl}"}`);
   });
});
