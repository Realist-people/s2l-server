import { MochDal } from './moch.impl';
import { MySqlDal } from './mysql.impl';
import { IDal } from './typings';

export { ILink } from './typings';

export const dal: IDal = process.env.NODE_ENV === 'test'
   ? new MochDal()
   : new MySqlDal();