/* ----------------------------------------
   Public Vars
--------------------------------------- */
var frameHeight 	= $(window).height();
var frameWidth 		= $(window).width();
var logo			= $(".logo-w-shadow");
var bigCta			= $("#big-cta");

// Resizer
function resizer(e) {
	var frameHeight = $(window).height();
	var frameWidth = $(window).width();

	//$("#top").css('height', frameHeight);
	//$(".space").css('height', frameHeight);
    //$(".carbon").css('height', frameHeight);

}

/* ----------------------------------------
   Init
--------------------------------------- */

function init() {

    resizer();

}

$(document).ready(function(){

    init();

    // Smooth scroll to anchors
	$('.smooth').click(function() {
	  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {

	    var target = $(this.hash);
	    target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	    if (target.length) {
	      $('html,body').animate({
	        scrollTop: target.offset().top
	      }, 1000, "easeOutQuad");
	      return false;
	    }
	  }
	});

});

$( window ).resize(function() {
	resizer();
});


$(window).scroll( function() {

	if ($(window).scrollTop() > frameHeight - 10) {
		// Fires when scrolling down past initial frame height
	}
	else if ( $(window).scrollTop() < 100 ) {
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

});
