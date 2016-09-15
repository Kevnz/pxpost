[![Build Status](https://travis-ci.org/Kevnz/pxpost.png?branch=master)](https://travis-ci.org/Kevnz/pxpost)
# pxpost

A node module for using the Payment Express PXPost service for payment processing. Currently only supporting making payments.

## Install
```bash
$ npm install pxpost --save
```

## Usage
```javascript 
var pxpost = require('pxpost');
pxpost.submit({
    user: 'PaymentExpressUser',
    password: 'PaymentExpressPassword',
    amount: '100.00',
    currency: 'NZD', //defaults to NZD
    transactionType: 'purchase', //default and currently only supported option
    reference: 'Merchant Reference',
    card: {
        name: 'John Doe',
        number: '4716710503591290',
        expiry:'1015',
        cvc2: '123'
    }
} ,function (err, result) {
    if (err) {
        //do something
    } else {
        console.log(result.Authorized); //Will be 1 for successful transaction
    }
});
