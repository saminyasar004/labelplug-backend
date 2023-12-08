# API Base URL

`https://api.example.com`

## Database Tables

1. `admin` - The system super admin table
1. `users` - The web application's user table
1. `labels` - All the labels will be stored in here
1. `addresses` - The address book of all user

## Admin Model

The system can only contain one admin. The system admin will only can create at the time while system will boot for the first time.

1. `id` - unique id - `number`
1. `fullName` - full name - `string`
1. `email` - email (unique) - `string`
1. `password` - password (minimum 8 characters long, should be include alphaneumeric) - `string`

## User Model

1. `id` - unique id - `number`
1. `fullName` - full name - `string`
1. `email` - email (unique) - `string`
1. `password` - password (minimum 8 characters long, should be include alphaneumeric) - `string`
1. `companyName` - valid company name - `string`
1. `phone` - phone number 14 digit - `string`
1. `tosAgreement` - term of service agreement - `boolean`
1. `balance` - balance - `string`
1. `label`
1. `address`

## Label Model

1. `id` - unique id - `number`
1. `width` - width in cm - `number`
1. `height` - height in cm - `number`
1. `length` - lenght in cm - `number`
1. `weight` - weight in cm - `number`
1. `type` - express | normal - `enum`
1. `service` - ups | usps | dhl - `string`
1. `additionalInsurance` - (applicable if the package will be more heavy than requirement) - `number`
1. `originalPrice` - original price of the product - `number`
1. `customFee` - will be calculated according the product size, shipping details and original price - `number`
1. `totalFee` - the total fee - `number`

# Address Model

1. `id` - unique id
1. `fullname`
1. `phone` - (optional)
1. `taxId` - (optional)
1. `address`
1. `city`
1. `state`
1. `zipCode`
1. `country`

## Status

-   [x] Admin Register, Login, Update functionality
-   [x] User Register, Login, Update functionality
-   [ ] Label Create, Read, Update, Delete functionality
-   [ ] Adress Create, Read, Update, Delete functionality
