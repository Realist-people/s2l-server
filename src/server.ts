import http = require('node:http');

import { config } from './config';
import { dal } from './dal';
import { Result } from './models/result';

const GET = 'GET';
const POST = 'POST';
const DUMMY_FAVICON = '/favicon.ico';

const COMPRESS_ENDPOINT = '/compress';
export const UNDERSCORE = '_';



dal.checkReadiness().then(() => {
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

            const [, underscoreOrHash, hashOrUndefined] = req.url.split('/');

            let hash: string;
            if (typeof underscoreOrHash === 'string' && underscoreOrHash !== UNDERSCORE) {
               hash = underscoreOrHash;
            } else if (typeof hashOrUndefined === 'string') {
               hash = hashOrUndefined;
            } else {
               console.log('something wrong with the url');
               console.log({underscoreOrHash, hashOrUndefined});
               res.writeHead(500);
               return res.end(`Invalid URL (I don't know why)`);
            }

            try {
               const link = await dal.getLinkByHash(hash);
               if (link !== undefined) {
                  res.writeHead(301, {
                     'Location': link,
                  });
                  return res.end();
               }

               res.writeHead(404);
               return res.end('Not Found');
            }
            catch (err) {
               console.log('getLinkByHash error!');
               console.log(err);
               res.writeHead(500);
               return res.end('Internal Server Error');
            }

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
                  newShortLink = await dal.createNewLink(urlStr);
                  res.writeHead(200);
                  return res.end(newShortLink);
               } catch (err) {
                  console.log('createNewLink error!');
                  console.log(err);
                  res.writeHead(500);
                  return res.end('Internal Server Error');
               }
            }

            console.log('Not a compress!');
            return res.socket?.destroy();

         default:
            console.log('default!');
            return res.socket?.destroy();
      }

   });

   server.listen(config.APP_PORT, () => console.info(`Server running at http://127.0.0.1:${config.APP_PORT}/`));
});