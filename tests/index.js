const proxyquire = require('proxyquire').noPreserveCache();
const test = require('tap').test;
const fs = require('fs');

test('PxPost tests', (te) => {
  test('Make sure PxPost Returns a valid response', (t) => {
    t.plan(1);
    const returnedResponse = fs.readFileSync('./tests/results.xml', { encoding: 'utf8' });
    const pxpost = proxyquire('../index.js', {
      request: (opts, callback) => {
        callback(null, null, returnedResponse);
      }
    });
    pxpost.submit({
      user: '---',
      password: '---',
      amount: '100.00',
      currency: 'NZD', // defaults to NZD
      transactionType: 'Purchase', // default and currently only supported option
      reference: 'Merchant Reference',
      card: {
        name: 'John Doe',
        number: '4111111111111111 ',
        expiry: '1015',
        cvc2: '123'
      }
    }, (err, result) => {
      if (!err) {
        t.ok(result.Authorized == 1);
      }
    });
  });
  test('That PxPost handles an error', (t) => {
    const pxpost = proxyquire('../index.js', {
      request: (opts, callback) => {
        callback({ error: true }, null, null);
      }
    });
    t.plan(1);
    pxpost.submit({
      user: '---',
      password: '---',
      amount: '100.00',
      currency: 'NZD', // defaults to NZD
      transactionType: 'Purchase', // default and currently only supported option
      reference: 'Merchant Reference',
      card: {
        name: 'John Doe',
        number: '4111111111111111 ',
        expiry: '1015',
        cvc2: '123'
      }
    }, (err) => {
      if (err) {
        t.ok(err);
      }
    });
  });
  te.end();
});
