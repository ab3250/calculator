/*!
 * iphone.js
 *
 * Copyright 2010, Ruediger Appel
 * http://www.3quarks.com
 * Published under Creative Commons 3.0 License.
 *
 * Date: 2010-09-30
 * Version: 1.0.0
 */

$(document).ready(function() {
//  if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) {
  if (isMobileSafari()) {
    // fix the label problem
    $('label[for]').click(function () {
      var id = '#' + $(this).attr('for');
      if (!($(id + '[type=radio], ' + id + '[type=checkbox]').attr('selected', !$(id).attr('selected')))) {
        $(id)[0].focus();
      }
    });
  }
});

function isMobileSafari() {
  return navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i);
}