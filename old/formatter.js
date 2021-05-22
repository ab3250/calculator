/*!
 * formatter.js
 *
 * Copyright 2010, Rüdiger Appel
 * http://www.3quarks.com
 * Published under Creative Commons 3.0 License.
 *
 * Date: 2010-05-01
 * Version: 1.0.0
 */

Number.prototype.format = function(fractionDigits, decimalPoint) {
  var fractionDigits = isNaN(fractionDigits = Math.abs(fractionDigits)) ? 2 : fractionDigits;
  var decimalPoint   = (decimalPoint === undefined) ? "," : decimalPoint;
  return this.toFixed(fractionDigits).replace(/\./, decimalPoint);
};

String.prototype.parse = function(fractionDigits, defaultValue) {
  var fractionDigits = isNaN(fractionDigits = Math.abs(fractionDigits)) ? 2 : fractionDigits;
  var value = parseFloat(this.replace(/,/, '.')); // <- verbessern
  return isNaN(value) ? (isNaN(defaultValue) ? 0 : defaultValue) : parseFloat(value.toFixed(fractionDigits));
};
     
