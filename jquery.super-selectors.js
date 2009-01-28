/**
 * Super Selectors
 * A jQuery plugin enabling better CSS selector support for older browsers
 *  by leveraging jQuery's excellent selectors
 * 
 * Version 0.1
 * Author: Chris Patterson
 *
 * License: GPL 3 http://www.gnu.org/licenses/gpl-3.0.html
 * 
 **/
(function($){
  $.fn.superSelectify = function(options) {

	// Safari loads things in parallel, so we have to wait for everything to finish before proceeding
	// otherwise it thinks there are no stylesheets
   if (jQuery.browser.safari && document.readyState != "complete"){
     setTimeout( arguments.callee, 100 );
     return;
   }

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
	 fileInputClass: "file" 
  };
  
  var options = $.extend(defaults, options);

	// Initialize Arrays for storing Matches
	var emptyMatches = [];
	var firstMatches = [];
	var lastMatches = [];
	var oddMatches = [];
	var evenMatches = [];
	var nextMatches = [];
	var siblingMatches = [];
	var firstChildMatches = [];
	var lastChildMatches = [];
	var onlyChildMatches = [];
	var directChildMatches = [];
	var textInputMatches = [];
	var passwordInputMatches = [];
	var radioInputMatches = [];
	var checkboxInputMatches = [];
	var submitInputMatches = [];
	var imageInputMatches = [];
	var resetInputMatches = [];
	var buttonInputMatches = [];
	var fileInputMatches = [];
	
	function getMatches(CSS) {
		
		var emptyMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*:empty/gi);
		if(emptyMatch) emptyMatches[emptyMatches.length]=emptyMatch;

		var firstMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*:first[^-]/gi);
		if(firstMatch) firstMatches[firstMatches.length]=firstMatch;

		var lastMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*:last[^-]/gi);
		if(lastMatch) lastMatches[lastMatches.length]=lastMatch;

		var oddMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*:nth-child(odd)/gi);
		if(oddMatch) oddMatches[oddMatches.length]=oddMatch;

		var evenMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*:nth-child(even)/gi);
		if(evenMatch) evenMatches[evenMatches.length]=evenMatch;

		var nextMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*?\+\s?[a-zA-Z0-9\.-_\+\~#]*/gi);
		if(nextMatch) nextMatches[nextMatches.length]=nextMatch;

		var siblingMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*?\~\s?[a-zA-Z0-9\.-_\+\~#]*/gi);
		if(siblingMatch) siblingMatches[siblingMatches.length]=siblingMatch;

		var firstChildMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*:first-child/gi);
		if(firstChildMatch) firstChildMatches[firstChildMatches.length]=firstChildMatch;

		var lastChildMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*:last-child/gi);
		if(lastChildMatch) lastChildMatches[lastChildMatches.length]=lastChildMatch;

		var onlyChildMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*:only-child/gi);
		if(onlyChildMatch) onlyChildMatches[onlyChildMatches.length]=onlyChildMatch;

		var directChildMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*?\>\s?[a-zA-Z0-9\.-_\+\~#]*/gi);
		if(directChildMatch) directChildMatches[directChildMatches.length]=directChildMatch;

		var textInputMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*input\[type="text"\]/gi);
		if(textInputMatch) textInputMatches[textInputMatches.length]=textInputMatch;

		var passwordInputMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*input\[type="password"\]/gi);
		if(passwordInputMatch) passwordInputMatches[passwordInputMatches.length]=passwordInputMatch;

		var radioInputMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*input\[type="radio"\]/gi);
		if(radioInputMatch) radioInputMatches[radioInputMatches.length]=radioInputMatch;

		var checkboxInputMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*input\[type="checkbox"\]/gi);
		if(checkboxInputMatch) checkboxInputMatches[checkboxInputMatches.length]=checkboxInputMatch;

		var submitInputMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*input\[type="submit"\]/gi);
		if(submitInputMatch) submitInputMatches[submitInputMatches.length]=submitInputMatch;

		var imageInputMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*input\[type="image"\]/gi);
		if(imageInputMatch) imageInputMatches[imageInputMatches.length]=imageInputMatch;

		var resetInputMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*input\[type="reset"\]/gi);
		if(resetInputMatch) resetInputMatches[resetInputMatches.length]=resetInputMatch;

		var buttonInputMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*button/gi);
		if(buttonInputMatch) buttonInputMatches[buttonInputMatches.length]=buttonInputMatch;

		var fileInputMatch = CSS.match(/[a-zA-Z0-9\.-_\+\~#\s]*input\[type="file"\]/gi);
		if(fileInputMatch) fileInputMatches[fileInputMatches.length]=fileInputMatch;
		
	}
	
	if($.browser.msie) {
		// Internet Explorer requires quite a bit more handholding.
		// Among other charming quirks, it replaces all unknown selectors with "UNKNOWN"
		// So we have to load all the CSS separately. 
		var thisCSS = "";
		var allCSS = "";
		try {
		  var httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
		} catch (e) {
		  // ActiveX disabled
		}
		var RELATIVE = /^[\w\.]+[^:]*$/;
		function makePath(href, path) {
		  if (RELATIVE.test(href)) href = (path || "") + href;
		  return href;
		};

		function getPath(href, path) {
		  href = makePath(href, path);
		  return href.slice(0, href.lastIndexOf("/") + 1);
		};

		function getCSS(stylesheet) {
			if (stylesheet.href) {
				var RELATIVE = /^[\w\.]+[^:]*$/;
				var docURL = String(window.location);
				var href = (RELATIVE.test(stylesheet.href)) ? (docURL.slice(0, docURL.lastIndexOf("/") + 1) + stylesheet.href) : stylesheet.href;
				try {
				    httpRequest.open("GET", href, false);
				    httpRequest.send();
				    if (httpRequest.status == 0 || httpRequest.status == 200) {
				      thisCSS = httpRequest.responseText;
				    }
				} catch (e) {
				  // ignore errors
				};
			} else {
				thisCSS = stylesheet.cssText;
			}
			return thisCSS;
		};

		for (stylesheet=0;stylesheet<document.styleSheets.length;stylesheet++) {
      allCSS += getCSS(document.styleSheets[stylesheet]);
    }

		var importedCSS = allCSS.match(/([a-zA-Z0-9\.\-_\+]*.css)/gi);

		if (importedCSS) {
			var fakeStyleSheet = [];
			for (stylesheet=0;stylesheet<importedCSS.length;stylesheet++) {
				fakeStyleSheet['href'] = importedCSS[stylesheet];
				allCSS += getCSS(fakeStyleSheet);
	    }	
		}

		getMatches(allCSS);

	} else { //all other browsers

		function ruleIterator(sheet) {
			var css = sheet.cssRules;
			for(var rule=0;rule<css.length;rule++) {
				if(css[rule].styleSheet) ruleIterator(css[rule].styleSheet);
				if(css[rule].selectorText == null) continue;
				getMatches(css[rule].selectorText);
			}
		}

		for(stylesheet=0;stylesheet<document.styleSheets.length;stylesheet++) {
			ruleIterator(document.styleSheets[stylesheet]);
		};
	}

	// Add classes to all matched elements
	$(emptyMatches.join(", ")).addClass(options.emptyClass);	
	$(firstMatches.join(", ")).addClass(options.firstClass);
	$(lastMatches.join(", ")).addClass(options.lastClass);
	$(oddMatches.join(", ")).addClass(options.oddClass);
	$(evenMatches.join(", ")).addClass(options.evenClass);
	$(nextMatches.join(", ")).addClass(options.nextClass);
	$(siblingMatches.join(", ")).addClass(options.siblingClass);
	$(firstChildMatches.join(", ")).addClass(options.firstChildClass);
	$(lastChildMatches.join(", ")).addClass(options.lastChildClass);
	$(onlyChildMatches.join(", ")).addClass(options.onlyChildClass);
	$(directChildMatches.join(", ")).addClass(options.directChildClass);
	$(lastChildMatches.join(", ")).addClass(options.lastChildClass);
	$(textInputMatches.join(", ")).addClass(options.textInputClass);
	$(passwordInputMatches.join(", ")).addClass(options.passwordInputClass);
	$(radioInputMatches.join(", ")).addClass(options.radioInputClass);
	$(checkboxInputMatches.join(", ")).addClass(options.checkboxInputClass);
	$(submitInputMatches.join(", ")).addClass(options.submitInputClass);
	$(imageInputMatches.join(", ")).addClass(options.imageInputClass);
	$(resetInputMatches.join(", ")).addClass(options.resetInputClass);
	$(buttonInputMatches.join(", ")).addClass(options.buttonInputClass);
	$(fileInputMatches.join(", ")).addClass(options.fileInputClass);
	
};

})(jQuery);
