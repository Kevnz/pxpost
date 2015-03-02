

var proxyquire =  require('proxyquire');
var test = require("tap").test;

test("PxPost tests", function(te) {
    var returnedResponse = require('fs').readFileSync('./results.xml', {encoding: 'utf8'});
    var pxpost = proxyquire("../index.js", { 'request' : function (opts, callback) {
        callback(null, null, returnedResponse);
    }});

    test("Make sure PxPost Returns a valid response", function (t) {
        t.plan(2);
        console.log('Make sure mongo collection is a collection')
        console.log(module); 
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
                console.log(result);
                console.log(result.Authorized);//Will be 1 for successful transaction
                t.ok(result.Authorized === 1);
            }
        });
    });

 

    te.end();
})