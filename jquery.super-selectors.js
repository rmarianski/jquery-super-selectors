/**
 * Super Selectors
 * A jQuery plugin enabling better CSS selector support for older browsers
 *  by leveraging jQuery's excellent selectors
 * 
 * Version 0.8
 * Author: Chris Patterson
 *
 * License: GPL 3 http://www.gnu.org/licenses/gpl-3.0.html
 * 
 **/
(function($){
  $.fn.superSelectify = function(options) {

  var defaults = {
   emptyClass: "empty",
   firstClass: "first",
   lastClass: "last",
   oddClass: "odd",
   evenClass: "even",
   nextClass: "next",
   siblingClass: "sibling",
   firstChildClass: "first-child",
   lastChildClass: "last-child",
   onlyChildClass: "only-child",
   directChildClass: "child", /* For parent > child */
   textInputClass: "text",
   passwordInputClass: "password",
   radioInputClass: "radio",
   checkboxInputClass: "checkbox",
   submitInputClass: "submit",
   imageInputClass: "image",
   resetInputClass: "reset",
   buttonInputClass: "button",
   fileInputClass: "file",
   manualSelectors: false,
   forceStylesheetParsing: false,
	 additionalClassHash: {} /* To allow specification of regular expressions & classes to extend SuperSelectors */
  };
  
  var options = $.extend(defaults, options);

  
  function getMatches(CSS) {
	
    function _match_item(reg, option) {
		  var itemMatch = CSS.match(reg);
		  if(itemMatch) itemMatch=itemMatch.join(", ");
		  $(itemMatch).addClass(options[option])
		}
		
    _match_item(/[a-zA-Z0-9._+~#:\s-]*:empty/gi, 'emptyClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*:first[^-]/gi, 'firstClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*:last[^-]/gi, 'lastClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*:nth-child(odd)/gi, 'oddClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*:nth-child(even)/gi, 'evenClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*?\+\s?[a-zA-Z0-9._+~#:-]*/gi, 'nextClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*?\~\s?[a-zA-Z0-9._+~#:-]*/gi, 'siblingClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*:first-child/gi, 'firstChildClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*:last-child/gi, 'lastChildClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*:only-child/gi, 'onlyChildClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*\>\s?[a-zA-Z0-9._+~#:-]*/gi, 'directChildClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*input\[type="text"\]/gi, 'textInputClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*input\[type="password"\]/gi, 'passwordInputClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*input\[type="radio"\]/gi, 'radioInputClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*input\[type="checkbox"\]/gi, 'checkboxInputClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*input\[type="submit"\]/gi, 'submitInputClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*input\[type="image"\]/gi, 'imageInputClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*input\[type="reset"\]/gi, 'resetInputClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*button/gi, 'buttonInputClass');
		_match_item(/[a-zA-Z0-9._+~#:\s-]*input\[type="file"\]/gi, 'fileInputClass');

    // Check for any imports within the passes CSS
    // Only IE should ever hit this (other browsers 
    //  will return them within ruleIterator)
    var importedCSS = CSS.match(/([a-zA-Z0-9\.\-_\+]*.css)/gi);

    if (importedCSS) {
      var fakeStyleSheet = [];
      for (stylesheet=0;stylesheet<importedCSS.length;stylesheet++) {
        fakeStyleSheet['href'] = importedCSS[stylesheet];
        getCSS(fakeStyleSheet);
      }  
    }

  }

	// Needed for non-IE browsers, as they don't support the cssText method for full stylesheets
  function ruleIterator(sheet) {
    var css = sheet.cssRules;
    for(var rule=0;rule<css.length;rule++) {
      if(css[rule].styleSheet) getCSS(css[rule].styleSheet);
      if(css[rule].selectorText == null) continue;
      getMatches(css[rule].selectorText);
    }
  }

	// Retrieve the CSS if it's a link or import, otherwise process the embedded CSS
  function getCSS(sheet) {
    if(sheet.href) {
      var RELATIVE = /^[\w\.]+[^:]*$/;
      var docURL = String(window.location);
      var href = (RELATIVE.test(sheet.href)) ? (docURL.slice(0, docURL.lastIndexOf("/") + 1) + sheet.href) : sheet.href;
      $.ajax({ url: href, success: function(response){ getMatches(response); } });
    } else {
      if(sheet.cssText) {
        getMatches(sheet.cssText);
      } else {
        ruleIterator(sheet);
      }
    } 
  }


  // If manual selectors have been provided, apply those first
  if(options.manualSelectors) getMatches(options.manualSelectors);
  
  // Only parse the stylesheets if no manual selectors are provided, or the user is forcing the behavior
  if(!options.manualSelectors || options.forceStylesheetParsing) {
	
	  // Safari loads things in parallel, so we have to wait for everything to finish before proceeding
	  // otherwise it thinks there are no stylesheets
	   if (jQuery.browser.safari && document.readyState != "complete"){
	     setTimeout( arguments.callee, 100 );
	     return;
	   }

    for(stylesheet=0;stylesheet<document.styleSheets.length;stylesheet++) {
      getCSS(document.styleSheets[stylesheet]);
    };
  }

};

})(jQuery);
