import { strict as assert } from 'assert';

import { Result } from '../models/result';

export function testResult(): void {
   const mockStrUrl = 'https://some.com/path?one=1&two=2';
   const u = new URL(mockStrUrl);
   const r = new Result(u);

   assert.equal(r instanceof Buffer, true);
   assert.equal(r.toString(), `{"link":"${mockStrUrl}"}`);
}