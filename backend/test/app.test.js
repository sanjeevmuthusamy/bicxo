const assert = require('node:assert/strict');
const { test } = require('node:test');

process.env.CORS_ORIGIN = 'http://localhost:4200';

const app = require('../src/app');

function request(method, path, body, headers = {}) {
  return new Promise((resolve, reject) => {
    const server = app.listen(0, () => {
      const { port } = server.address();
      const payload = body ? JSON.stringify(body) : undefined;

      const req = require('node:http').request({
        hostname: '127.0.0.1',
        port,
        path,
        method,
        headers: {
          ...headers,
          ...(payload
            ? {
                'content-type': 'application/json',
                'content-length': Buffer.byteLength(payload)
              }
            : {})
        }
      }, (res) => {
        let responseBody = '';

        res.setEncoding('utf8');
        res.on('data', (chunk) => {
          responseBody += chunk;
        });
        res.on('end', () => {
          server.close(() => {
            resolve({
              body: responseBody ? JSON.parse(responseBody) : null,
              headers: res.headers,
              statusCode: res.statusCode
            });
          });
        });
      });

      req.on('error', (error) => {
        server.close(() => reject(error));
      });

      if (payload) {
        req.write(payload);
      }

      req.end();
    });
  });
}

test('health endpoint returns service status', async () => {
  const response = await request('GET', '/api/health');

  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, {
    status: 'ok',
    service: 'bicxo-sprint-board-api'
  });
});

test('unknown routes return 404', async () => {
  const response = await request('GET', '/api/unknown');

  assert.equal(response.statusCode, 404);
  assert.equal(response.body.message, 'Route not found: GET /api/unknown');
});

test('cors allows configured frontend origin', async () => {
  const response = await request('GET', '/api/health', undefined, {
    origin: 'http://localhost:4200'
  });

  assert.equal(response.statusCode, 200);
  assert.equal(response.headers['access-control-allow-origin'], 'http://localhost:4200');
});
