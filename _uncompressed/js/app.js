/* ----------------------------------------
   Public Vars
--------------------------------------- */
var frameHeight 	= $(window).height();
var frameWidth 		= $(window).width();
var logo			= $(".logo-w-shadow");
var bigCta			= $("#big-cta");
var nav 			= $("#main-navigation");
var hLogo 			= $(".horizontal-logo");

// Resizer
function resizer(e) {
	var frameHeight = $(window).height();
	var frameWidth = $(window).width();
}

// Video BG and HUD Control
function videoStarter() {

	$('#hero').vide({
		mp4:'videos/headerloop4.mp4',
		ogv:'videos/headerloop4.ogv',
		webm:'videos/headerloop4.webm',
		//poster:'images/tn-video-poster.jpg',
		}, {
		loop: true,
		muted: true,
		autoplay: true,
		posterType: "jpg",
		className: "tn-video"
	});

}

function scrollCheck() {

	if ($(window).scrollTop() > frameHeight - 100) {
		// Fires when scrolling down past initial frame height
		nav.addClass("below-hero");
		hLogo.addClass("reveal-logo");
	}
	else if ($(window).scrollTop() < frameHeight - 100) {
		nav.removeClass("below-hero");
		hLogo.removeClass("reveal-logo");
	}

	if ( $(window).scrollTop() < 100 ) {
		logo.removeClass("fade-off");
		logo.addClass("fade-on");

		bigCta.removeClass("fade-off");
		bigCta.addClass("fade-on");
	}
	else if ( $(window).scrollTop() > 100 ) {
		logo.removeClass("fade-on");
		logo.addClass("fade-off");

		bigCta.removeClass("fade-on");
		bigCta.addClass("fade-off");
	}
}

/* ----------------------------------------
   Init
--------------------------------------- */

function init() {

    resizer();
	videoStarter();
	scrollCheck();

}

$(document).ready(function(){

    init();

	// Select all links with hashes
	$('a[href*="#"]')
	  // Remove links that don't actually link to anything
	  .not('[href="#"]')
	  .not('[href="#0"]')
	  .click(function(event) {
	    // On-page links
	    if (
	      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
	      &&
	      location.hostname == this.hostname
	    ) {
	      // Figure out element to scroll to
	      var target = $(this.hash);
	      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
	      // Does a scroll target exist?
	      if (target.length) {
	        // Only prevent default if animation is actually gonna happen
	        event.preventDefault();
	        $('html, body').animate({
	          scrollTop: target.offset().top - 87
	        }, 1000, function() {
	          // Callback after animation
	          // Must change focus!
	          var $target = $(target);
	          $target.focus();
	          if ($target.is(":focus")) { // Checking if the target was focused
	            return false;
	          } else {
	            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
	            $target.focus(); // Set focus again
	          };
	        });
	      }
	    }
	  });

});

$( window ).resize(function() {
	resizer();
});


$(window).scroll( function() {

	scrollCheck();

});
