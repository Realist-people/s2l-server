import mt = require('mututests');

import { Result } from '../models/result';

mt.testSync('Result model', (t) => {
   const mockStrUrl = 'https://some.com/path?one=1&two=2';
   const u = new URL(mockStrUrl);
   const r = new Result(u);

   t.strictEqual(r instanceof Buffer, true);
   t.strictEqual(r.toString(), `{"link":"${mockStrUrl}"}`);
});