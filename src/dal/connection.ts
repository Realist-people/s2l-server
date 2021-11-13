import mysql = require('mysql2/promise');

import { config } from '../config';

export class Connection {

   private readonly _pool: mysql.Pool;

   constructor() {
      this._pool = mysql.createPool({
         host:     config.DB_HOST,
         port:     config.DB_PORT,
         database: config.DB_NAME,
         user:     config.DB_USER,
         password: config.DB_PASS,
         timezone: config.DB_TIME,
      });
   }

   public query<T = any>(sql: string, values?: Array<string | number>) {
      // @ts-ignore
      return this._pool.query<T>(sql, values);
   }
}
