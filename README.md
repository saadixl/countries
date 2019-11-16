# countries
Get countries by country name, country code, currency, continent, capital.

## How to install
```
$ npm install @saadixl/countries --save
```
or
```
$ yarn add @saadixl/countries
```

## How to use
Include `countries` in your module
```
const countries = require('@saadixl/countries');
```
### For getting info about one country

**What can be passed as string parameter?**
- Country code, example: "BD"
- ISO Country code, example: "SGP"
- Capital name, example: "DHAKA"

*Note that the parameter is case insensitive*

You can get information about a country by passing **country code** or **country name** or **country iso code** or **capital** as string parameter. For example, if you pass **Bangladesh** as a parameter like this:
```
countries("Bangladesh")
```
or you pass the country code of Bangladesh like:
```
countries("bd")
```

You will get the following object as result.
```
{ 
  capital: 'Dhaka',
  continentCode: 'AS',
  continentName: 'Asia',
  countryCodeISO: 'BGD',
  currencyCode: 'BDT',
  name: 'Bangladesh',
  names: [ 'Bangladesh', 'People Republic of Bangladesh' ],
  phoneCode: '880'
 }
  ```

Which means, it doesn't matter what format data you have an what format data you need, you will get it!


### For getting a list of country

**What can be passed as config?**
- `currency` can be currency code, currency name
- `continent` can be continent code, continent name

*Note that you can pass both currency and continent together*

Suppose, you need all the country codes of Europe or you need all the country names who uses USD. Firstly, you can pass a config object while calling `countries`. A config object can have currency and continent for now. Once you pass a config object, now you can call some methods like:
- `getAll()`
- `getCountryCodes()`
- `getISOCountryCodes()`
- `getCountryNames()`
- `getPhoneCodes()`
- `getCapitals()`

Or you can call `getCapitals(property)` where `property` can be any property inside the country object. For example if we really want to find all the country names who uses USD, we call:
```
countries({currency: "USD"})
```
It will return the following list:
```
[ 
  'American Samoa',
  'Bonaire, Sint Eustatius and Saba',
  'Ecuador',
  'Federated States of Micronesia',
  'Guam',
  'British Indian Ocean Territory',
  'Marshall Islands',
  'Northern Mariana Islands',
  'Puerto Rico',
  'Palau',
  'El Salvador',
  'Turks and Caicos Islands',
  'Timor-Leste',
  'United States Minor Outlying Islands',
  'United States of America',
  'British Virgin Islands',
  'Virgin Islands, U.S.' 
  ]
  ```
Just to make it little more interesting, we can try to find out all the country codes of the countries who uses USD as their currency but they are part of the Ocenia continent. To do that we call:
```
countries({currency: "USD", continent: "Oc"}).getCountryCodes()
```

I am planning to add region soon. I am developing this because I have not found everything in one place before. That's why taking things into own hands!
