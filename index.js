var request = require('request');
var xml = require('xml');
var url = 'https://sec.paymentexpress.com/pxpost.aspx';

var txtTypes = ['Purchase', 'Auth', 'Complete', 'Refund', 'Validate'];
var SUCCESS_STATUS = 1;
var FAIL_STATUS = 0;

module.exports = {
    submit: function (details, callback) {
        var dpsData = {
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
        }, function (err, res, body) {
            process.nextTick(function () {
                if(err) {
                    process.nextTick(function(){
                        callback(err);
                    });
                } else {
                    var parser = new require('xml2js').Parser({ explicitArray: false});
                    process.nextTick(function(){
                        parser.parseString(body, function (error, result){
                            console.log(result);
                            callback(null, result.Txn.Transaction);
                        });
                    });
                }

            });
        });
    }
};