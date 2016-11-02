const request = require('request');
const xml = require('xml');
const Parser = require('xml2js').Parser;

const url = 'https://sec.paymentexpress.com/pxpost.aspx';

module.exports = {
  submit: (details, callback) => {
    const dpsData = {
      Txn: [
        { PostUsername: details.user },
        { PostPassword: details.password },
        { CardHolderName: details.card.name },
        { CardNumber: details.card.number },
        { Amount: details.amount },
        { DateExpiry: details.card.expiry },
        { Cvc2: details.card.cvc2 },
        { InputCurrency: details.currency || 'NZD' },
        { TxnType: details.transactionType || 'Purchase' },
        { TxnId: details.transactionId || '' },
        { MerchentReference: details.reference }
      ]
    };
    request({
      uri: url,
      method: 'POST',
      body: xml(dpsData)
    }, (err, res, body) => {
      process.nextTick(() => {
        if (err) {
          process.nextTick(() => {
            callback(err);
          });
        } else {
          const parser = new Parser({ explicitArray: false });
          process.nextTick(() => {
            parser.parseString(body, (error, result) => {
              callback(null, result.Txn.Transaction);
            });
          });
        }
      });
    });
  }
};
