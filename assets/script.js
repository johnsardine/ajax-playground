jQuery(document).ready(function () {
	
	// PageLoad function
	// This function is called when:
	// 1. after calling $.historyInit();
	// 2. after calling $.historyLoad();
	// 3. after pushing "Go Back" button of a browser
	
	//Load Time
	var loadTime = 0.3;
		loadTime = loadTime * 1000;
	//Target
	var target = '#target';
	//Loading div
	var loading = '<div id="loading"></div>';
	
	var first_page = jQuery('nav li:first-child').children('a').attr('href');
		first_page = first_page.replace(/^.*#/, '');
		
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

	function pageload(hash) {
		
		//Call function to define window title based in the hyperlink title or data-title
		pageTitle();
		
		if(hash) {
			// restore ajax loaded state
			jQuery(target).html(loading);
			setTimeout(function () {
				jQuery(target).load(hash + ".html", function (response, status, xhr) {
					prettyPrint();
					$(".chzn-select").chosen();
					jQuery('a[href="#"]').click(function () { return false; });
					if (status === "error") {
						var msg = "Sorry but there was an error: ";
						if (xhr.status === 0) {
							$("#target").html('<div class="error"><p>Page not found.</p></div>');
						} else {
							$("#target").html('<div class="error"><p>' + msg + xhr.status + " " + xhr.statusText + '</p></div>');
						}
					}
				});
			}, loadTime);
		} else {
			prettyPrint();
			jQuery(target).html(loading);
			setTimeout(function () {
				jQuery('nav li:first-child').children('a').click();
				//jQuery(target).load(first_page +'.html', function () {
				//	prettyPrint();
				//	jQuery('a[href="#"]').click(function () { return false; });
				//});
			}, loadTime);
	    }
	}

	//add current page class on load
	jQuery('a[href="' + document.location.hash + '"]').addClass('current');
	
    // Initialize history plugin.
    // The callback is called at once by present location.hash. 
    jQuery.history.init(pageload);
    
    // set onlick event for buttons
    jQuery("nav a").click(function () {
    	// 
    	var hash = this.href;
    	hash = hash.replace(/^.*#/, '');
    	
    	//Removes and adds current class to menu
    	jQuery('nav a').removeClass('current');
    	jQuery(this).addClass('current');
    	
    	//Ads unnecessary loading message just to be more awesome
    	jQuery(target).html(loading);
    	
    	// moves to a new page. 
    	// pageload is called at once.
		setTimeout(function () {
   	    	jQuery.history.load(hash);
		}, loadTime);
    	
    	return false;
    });
});

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