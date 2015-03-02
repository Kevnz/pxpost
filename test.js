

var proxyquire =  require('proxyquire');
var test = require("tap").test;
var returnedResponse = require('fs').readFileSync('./tests/results.xml', {encoding: 'utf8'});

var pxpost = proxyquire("./index.js", { 'request' : function (opts, callback) {
    callback(null, null, returnedResponse);
}});

test("PxPost tests", function(te) {

    test("Make sure PxPost Returns a valid response", function (t) {
        t.plan(1);

        pxpost.submit({
            user: '---',
            password: '---',
            amount: '100.00',
            currency: 'NZD', //defaults to NZD
            transactionType: 'Purchase', //default and currently only supported option
            reference: 'Merchant Reference',
            card: {
                name: 'John Doe',
                number: '4111111111111111 ',
                expiry:'1015',
                cvc2: '123'
            }
        }, function (err, result) {
            if (err) {
                //do something
                console.log(err);
            } else {
                t.ok(result.Authorized == 1);
            }
        });

 
    });

 

    te.end();
})