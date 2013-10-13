var pxpost = require('../index');
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
} ,function (err, result) {
    if (err) {
        //do something
        console.log(err);
    } else {
        console.log(result);
        console.log(result.Authorized);//Will be 1 for successful transaction

    }
});