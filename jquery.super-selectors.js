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
	
	// [FIXME] is there *really* no better way to do this than iterating through every rule of every stylesheet? document.styleSheets[index].cssText would be a great candidate, but it only works on IE
	for(stylesheet=0;stylesheet<document.styleSheets.length;stylesheet++) {
		var sheet=document.styleSheets[stylesheet];					
		var css = sheet.cssRules;
			for(rule=0;rule<css.length;rule++) {
				var emptyMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*:empty/gi);
			  if(emptyMatch) emptyMatches[emptyMatches.length]=emptyMatch;
			
		  	var firstMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*:first/gi);
				if(firstMatch) firstMatches[firstMatches.length]=firstMatch;

				var lastMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*:last/gi);
				if(lastMatch) lastMatches[lastMatches.length]=lastMatch;

				var oddMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*:nth-child(odd)/gi);
				if(oddMatch) oddMatches[oddMatches.length]=oddMatch;

				var evenMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*:nth-child(even)/gi);
				if(evenMatch) evenMatches[evenMatches.length]=evenMatch;

				var nextMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*?\+\s?[a-zA-Z0-9\.-_\+\~#]*/gi);
				if(nextMatch) nextMatches[nextMatches.length]=nextMatch;

				var siblingMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*?\~\s?[a-zA-Z0-9\.-_\+\~#]*/gi);
				if(siblingMatch) siblingMatches[siblingMatches.length]=siblingMatch;

				var firstChildMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*:first-child/gi);
				if(firstChildMatch) firstChildMatches[firstChildMatches.length]=firstChildMatch;

				var lastChildMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*:last-child/gi);
				if(lastChildMatch) lastChildMatches[lastChildMatches.length]=lastChildMatch;

				var onlyChildMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*:only-child/gi);
				if(onlyChildMatch) onlyChildMatches[onlyChildMatches.length]=onlyChildMatch;

				var directChildMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*?\>\s?[a-zA-Z0-9\.-_\+\~#]*/gi);
				if(directChildMatch) directChildMatches[directChildMatches.length]=directChildMatch;
				
				var textInputMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*input\[type="text"\]/gi);
				if(textInputMatch) textInputMatches[textInputMatches.length]=textInputMatch;

				var passwordInputMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*input\[type="password"\]/gi);
				if(passwordInputMatch) passwordInputMatches[passwordInputMatches.length]=passwordInputMatch;

				var radioInputMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*input\[type="radio"\]/gi);
				if(radioInputMatch) radioInputMatches[radioInputMatches.length]=radioInputMatch;

				var checkboxInputMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*input\[type="checkbox"\]/gi);
				if(checkboxInputMatch) checkboxInputMatches[checkboxInputMatches.length]=checkboxInputMatch;

				var submitInputMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*input\[type="submit"\]/gi);
				if(submitInputMatch) submitInputMatches[submitInputMatches.length]=submitInputMatch;

				var imageInputMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*input\[type="image"\]/gi);
				if(imageInputMatch) imageInputMatches[imageInputMatches.length]=imageInputMatch;

				var resetInputMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*input\[type="reset"\]/gi);
				if(resetInputMatch) resetInputMatches[resetInputMatches.length]=resetInputMatch;

				var buttonInputMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*button/gi);
				if(buttonInputMatch) buttonInputMatches[buttonInputMatches.length]=buttonInputMatch;

				var fileInputMatch = css[rule].selectorText.match(/[a-zA-Z0-9\.-_\+\~#\s]*input\[type="file"\]/gi);
				if(fileInputMatch) fileInputMatches[fileInputMatches.length]=fileInputMatch;
		}
	};

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
