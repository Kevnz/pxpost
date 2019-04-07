# PxPost

![Build Status](https://img.shields.io/circleci/project/github/Kevnz/pxpost/master.svg)
[![Coverage Status](https://coveralls.io/repos/github/Kevnz/pxpost/badge.svg?branch=master)](https://coveralls.io/github/Kevnz/pxpost?branch=master)

A node module for using the Payment Express PXPost service for payment processing. Currently only supporting making payments.

## Install

```bash
$ npm install pxpost
```

## Usage

```javascript
var pxpost = require('pxpost')

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
  },
}, function (err, result) {
  if (err) {
    //do something
  } else {
    console.log(result.Authorized); //Will be 1 for successful transaction
  }
})
```

## Notes

If you are running in production it uses the Payment Express production URL, otherwise it uses the UAT url.