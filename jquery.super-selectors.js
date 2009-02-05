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
   fileInputClass: "file",
   manualSelectors: false,
   forceStylesheetParsing: false
  };
  
  var options = $.extend(defaults, options);

  
  function getMatches(CSS) {
    
    var emptyMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*:empty/gi);
    if(emptyMatch) emptyMatch=emptyMatch.join(", ");

    var firstMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*:first[^-]/gi);
    if(firstMatch) firstMatch=firstMatch.join(", ");

    var lastMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*:last[^-]/gi);
    if(lastMatch) lastMatch=lastMatch.join(", ");

    var oddMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*:nth-child(odd)/gi);
    if(oddMatch) oddMatch=oddMatch.join(", ");

    var evenMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*:nth-child(even)/gi);
    if(evenMatch) evenMatch=evenMatch.join(", ");

    var nextMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*?\+\s?[a-zA-Z0-9\.\-_\+\~#]*/gi);
    if(nextMatch) nextMatch=nextMatch.join(", ");

    var siblingMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*?\~\s?[a-zA-Z0-9\.\-_\+\~#]*/gi);
    if(siblingMatch) siblingMatch=siblingMatch.join(", ");

    var firstChildMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*:first-child/gi);
    if(firstChildMatch) firstChildMatch=firstChildMatch.join(", ");

    var lastChildMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*:last-child/gi);
    if(lastChildMatch) lastChildMatch=lastChildMatch.join(", ");

    var onlyChildMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*:only-child/gi);
    if(onlyChildMatch) onlyChildMatch=onlyChildMatch.join(", ");

    var directChildMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*\>\s?[a-zA-Z0-9\.\-_\+\~#:]*/gi);
    if(directChildMatch) directChildMatch=directChildMatch.join(", ");

    var textInputMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*input\[type="text"\]/gi);
    if(textInputMatch) textInputMatch=textInputMatch.join(", ");

    var passwordInputMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*input\[type="password"\]/gi);
    if(passwordInputMatch) passwordInputMatch=passwordInputMatch.join(", ");

    var radioInputMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*input\[type="radio"\]/gi);
    if(radioInputMatch) radioInputMatch=radioInputMatch.join(", ");

    var checkboxInputMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*input\[type="checkbox"\]/gi);
    if(checkboxInputMatch) checkboxInputMatch=checkboxInputMatch.join(", ");

    var submitInputMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*input\[type="submit"\]/gi);
    if(submitInputMatch) submitInputMatch=submitInputMatch.join(", ");

    var imageInputMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*input\[type="image"\]/gi);
    if(imageInputMatch) imageInputMatch=imageInputMatch.join(", ");

    var resetInputMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*input\[type="reset"\]/gi);
    if(resetInputMatch) resetInputMatch=resetInputMatch.join(", ");

    var buttonInputMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*button/gi);
    if(buttonInputMatch) buttonInputMatch=buttonInputMatch.join(", ");

    var fileInputMatch = CSS.match(/[a-zA-Z0-9\.\-_\+\~#:\s]*input\[type="file"\]/gi);
    if(fileInputMatch) fileInputMatch=fileInputMatch.join(", ");

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

    // Add classes to all matched elements
    $(emptyMatch).addClass(options.emptyClass); 
    $(firstMatch).addClass(options.firstClass);
    $(lastMatch).addClass(options.lastClass);
    $(oddMatch).addClass(options.oddClass);
    $(evenMatch).addClass(options.evenClass);
    $(nextMatch).addClass(options.nextClass);
    $(siblingMatch).addClass(options.siblingClass);
    $(firstChildMatch).addClass(options.firstChildClass);
    $(lastChildMatch).addClass(options.lastChildClass);
    $(onlyChildMatch).addClass(options.onlyChildClass);
    $(directChildMatch).addClass(options.directChildClass);
    $(lastChildMatch).addClass(options.lastChildClass);
    $(textInputMatch).addClass(options.textInputClass);
    $(passwordInputMatch).addClass(options.passwordInputClass);
    $(radioInputMatch).addClass(options.radioInputClass);
    $(checkboxInputMatch).addClass(options.checkboxInputClass);
    $(submitInputMatch).addClass(options.submitInputClass);
    $(imageInputMatch).addClass(options.imageInputClass);
    $(resetInputMatch).addClass(options.resetInputClass);
    $(buttonInputMatch).addClass(options.buttonInputClass);
    $(fileInputMatch).addClass(options.fileInputClass); 
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
    for(stylesheet=0;stylesheet<document.styleSheets.length;stylesheet++) {
      getCSS(document.styleSheets[stylesheet]);
    };
  }

};

})(jQuery);
