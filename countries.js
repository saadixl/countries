/*
  Pre-processing the data once the file is loaded
*/
// Including the data
const data = require('./data');
// Seperating the country codes as keys
const dataCountryCodes = Object.keys(data);
// Seperating the country object array
let dataCountryValues = getCountryValues();


// List class to allow users get list of properties from the resulted list
class List {
  constructor(list) {
    this.list = list;
  }

  getAll() {
    return this.list;
  }

  getCountryCodes() {
    return this.getProperties("countryCode");
  }

  getISOCountryCodes() {
    return this.getProperties("countryCodeISO");
  }

  getCountryNames() {
    return this.getProperties("name");
  }

  getPhoneCodes() {
    return this.getProperties("phoneCode");
  }

  getCapitals() {
    return this.getProperties("capital");
  }

  getProperties(propertyName) {
    return this.list.map((country) => {
      return country[propertyName];
    });
  }
}

// Searcher class to search countries based on parameters
class Searcher {
  constructor(param) {
    this.param = param;
  }

  performSearch() {
    const paramType = typeof(this.param);
    if(paramType === "string") {
      return this.getCountry(this.param);
    } else if(paramType === "object") {
      return this.listCountries(this.param);
    } else {
      console.error('Invalid parameter passed');
      return null;
    }
  }

  getCountry(param) {
    const paramUpper = param.toUpperCase();
    const resultedCountryCode = dataCountryCodes.filter((countryCode) => {
      const country = data[countryCode];
      const countryNames = convertArrayOfStringsToUpperCases(country.names);
      return countryCode.toUpperCase() === paramUpper || // Check if matches to country code
             (country.countryCodeISO === paramUpper) || // Check if matches to iso country code
             (countryNames.indexOf(paramUpper) > -1) || // Check if available inside names
             (country.capital && country.capital.toUpperCase() === paramUpper); // Check if matches to capital
    });
    return data[resultedCountryCode];
  }

  listCountries(param) {
    let { currency, continent } = param;
    try {
      let result = dataCountryValues;
      // filter by currency
      if(currency) {
        currency = currency.toUpperCase();
        result = dataCountryValues.filter((country) => {
          return country.currencyCode === currency || (country.currencyName && country.currencyName.toUpperCase() === currency);
        });
      }
      // filter by region
      // TODO
      // if(region) {
      //   result = genericFilter(result, "region", region);
      // }
      // filter by continent
      if(continent) {
        if(continent.length > 2) {
          result = genericFilter(result, "continentName", continent);
        } else {
          result = genericFilter(result, "continentCode", continent);
        }
      }
      return new List(result);
    } catch(e) {
      console.error('Invalid parameter passed');
      return null;
    }
  }
}

/*
  Helper functions
*/

// FUnction to filter on country list based on properties
function genericFilter(arr, key, value) {
  value = value.toUpperCase();
  return arr.filter((item) => {
    return item[key].toUpperCase() === value;
  });
}

// Function to inject the country codes inside
function getCountryValues() {
  return dataCountryCodes.map((countryCode) => {
    return {
      ...data[countryCode],
      countryCode
    };
  });
}

// It does exactly what the name says ;)
function convertArrayOfStringsToUpperCases(arr) {
  if(!arr || !arr.length) {
    return [];
  } else {
    return arr.map((item) => {
      return item.toUpperCase();
    });
  }
}

/*
  Entry point
*/
module.exports = ((param) => {
  return new Searcher(param).performSearch();
});