/*!
 * sidebar.js
 *
 * Copyright 2010, Rüdiger Appel
 * http://www.3quarks.com
 * Published under Creative Commons 3.0 License.
 *
 * Date: 2010-05-01
 * Version: 1.0.0
 */

$(window).scroll(function() {   
  var sidebar = $('#sidebar');
  if (sidebar) {
	  sidebar.stop(true, false).delay(300).animate({ 'paddingTop': $(window).scrollTop() + 'px' }, 300);
  }
});
