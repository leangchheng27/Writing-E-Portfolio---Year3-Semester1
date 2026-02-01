import { createRequestHandler } from '@remix-run/node';
import * as build from '../build/server/index.js';

const requestHandler = createRequestHandler({
  build,
  mode: build.mode,
});

export default (req, res) => {
  return requestHandler(req, res).catch(err => {
    console.error('Request handler error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  });
};
