//@codekit-prepend "jquery.js", "jquery.history.js", "jquery.cookie.js", "prettify/prettify.js";
jQuery(window).load(function() {
	//jQuery('#target').fadeIn('normal');
	jQuery('#debug').text('page loaded');
});
jQuery(document).ready(function () {
	
	// PageLoad function
	// This function is called when:
	// 1. after calling $.historyInit();
	// 2. after calling $.historyLoad();
	// 3. after pushing "Go Back" button of a browser
	
	//fade time, used for page loads
	var fadeTime = 0.3;//in seconds
		fadeTime = fadeTime * 1000;//transforms the value into miliseconds

	//Target
	var target = '#target';
		
	var siteTitle = jQuery('title').text();
		
	//define window title, the function grabs the attribute data-title or, if its non existent, grabs the title
	function pageTitle() {
		var dataTitle = jQuery('a[href="' + document.location.hash + '"]').attr('data-title');
		var hrefTitle = jQuery('a[href="' + document.location.hash + '"]').attr('title');

		if (dataTitle) {
			document.title = dataTitle + ' | ' + siteTitle;
		} else if (hrefTitle) {
			document.title = hrefTitle + ' | ' + siteTitle;
		}
	}
	
	//adds text to a div
	var $test = document.location.hash;
	jQuery('#debug').text($test);

	function pageload(hash) {
		
		//Call function to define window title based in the hyperlink title or data-title
		pageTitle();
		
		if(hash) {
			// restore ajax loaded state
			jQuery(target).load(hash + ".html", function (response, status, xhr) {
				prettyPrint();
				jQuery('a[href="#"]').click(function () { return false; });
				if (status === "error") {
					var msg = "Sorry but there was an error: ";
					if (xhr.status === 0) {
						jQuery("#target").html('<div class="error"><p>Page not found.</p></div>');
					} else {
						jQuery("#target").html('<div class="error"><p>' + msg + xhr.status + " " + xhr.statusText + '</p></div>');
					}
				}
			});
		} else {
			jQuery(window).load(function() {
				jQuery('nav li:first-child').children('a').click();
				prettyPrint();
			});
			
	    }
	}

	//add current class on the corresponding link on page load
	jQuery('a[href="' + document.location.hash + '"]').addClass('current');
	
    // Initialize history plugin.
    // The callback is called at once by present location.hash. 
    jQuery.history.init(pageload);
    
    // set onlick event for navigation buttons, triggers the add/remove class in the menu and fades and loads the content
    jQuery("nav a").click(function () {
    	// 
    	var hash = this.href;
    	hash = hash.replace(/^.*#/, '');
    	
    	//Removes and adds current class to menu
    	jQuery('nav a').removeClass('current');
    	jQuery(this).addClass('current');
    	
    	//on click, fade to transparent, load page and back to full opacity
    	jQuery(target).fadeTo(fadeTime, 0, function() {
    	
			// moves to a new page. 
    		// pageload is called at once.
    		jQuery.history.load(hash);
		
    	}).fadeTo(fadeTime, 1);;//makes content visible again after being loaded
    	
    	return false;
    });
});


//Modal Window to ie7 users
jQuery(document).ready(function () {
	jQuery('.modal').css({'margin-top' : -jQuery('#ie-notice').outerHeight()/2, 'margin-left' : -jQuery('#ie-notice').outerWidth()/2});

	var modalBox = '#ie-notice';
	var modalOverlay = '.overlay';
	var modalClose = jQuery(modalBox).children('.close');
	//jQuery(modalBox + ',' + modalOverlay).show();
	
	jQuery(modalClose).click(function () {
	    jQuery(modalBox + ',' + modalOverlay).fadeOut('slow', function () {
	    	jQuery(this).remove();
	    	jQuery.cookie('js_modal', 'closed', { path: '/'});
	    });
	    return false;
	});
	
	if (jQuery.cookie('js_modal') === 'closed') {
		jQuery(modalBox).remove();
		jQuery(modalOverlay).remove();
	} else {
		
	}

});