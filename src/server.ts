import http = require('http');

import { createNewLink, getLinkByHash } from './dal';
import { checkDbConnection } from './dal/connection';
import { Result } from './models/result';

const APP_PORT = process.env.APP_PORT;
if (!APP_PORT) {
   throw new Error('APP_PORT enviroment variable is not set');
}

const GET = 'GET';
const POST = 'POST';
const DUMMY_FAVICON = '/favicon.ico';

const COMPRESS_ENDPOINT = '/compress';
export const TARGET_ENDPOINT = '_';



checkDbConnection().then(() => {
   const server = http.createServer(async (req, res) => {

      switch (req.method) {

         case GET:

            if (req.url === undefined) {
               return res.socket?.destroy();
            }

            if (req.url === DUMMY_FAVICON) {
               res.writeHead(204);
               return res.end();
            }

            const [, target, hash] = req.url.split('/');

            if (target === TARGET_ENDPOINT && typeof hash === 'string') {
               const link = await getLinkByHash(hash);
               console.log({ link });
               if (link !== undefined) {
                  res.writeHead(302, {
                     'Location': link,
                  });
                  return res.end();
               }
            }

            console.log('Not found!');
            res.writeHead(404);
            return res.end('Not found');

         case POST:
            if (req.url === COMPRESS_ENDPOINT) {
               const chunks: Buffer[] = [];
               try {
                  for await (const chunk of req) {
                     chunks.push(chunk);
                  }
               } catch (err) {
                  console.log('Connection error!');
                  console.log(err);
                  res.writeHead(500);
                  return res.end('Connection error');
               }

               const body = Buffer.concat(chunks).toString();
               let parsedBody: { link?: string };
               try {
                  parsedBody = JSON.parse(body);
               } catch {
                  res.writeHead(400);
                  return res.end('Incorrect request body. It should be a valid json-serialized object with a "link" field which is a valid url');
               }

               const link = parsedBody?.link;
               if (typeof link !== 'string') {
                  res.writeHead(400);
                  return res.end('Incorrect request body. It should be a valid json-serialized object with a "link" field which is a valid url');
               }

               let linkUrl: URL;
               try {
                  linkUrl = new URL(link);
               } catch {
                  res.writeHead(400);
                  return res.end('link is not a correct URL');
               }

               const urlStr = linkUrl.toString();
               let newShortLink: Result;
               try {
                  newShortLink = await createNewLink(urlStr);
                  res.writeHead(200);
                  return res.end(newShortLink);
               } catch (err) {
                  console.log('createNewLink error!');
                  console.log(err);
                  res.writeHead(500);
                  return res.end('Server error');
               }
            }

            console.log('Not a compress!');
            return res.socket?.destroy();

         default:
            console.log('default!');
            return res.socket?.destroy();
      }

   });

   server.listen(APP_PORT, () => console.info(`Server running at http://127.0.0.1:${APP_PORT}/`));
});