/* ----------------------------------------
   Public Vars
--------------------------------------- */
var frameHeight 	= $(window).height();
var frameWidth 		= $(window).width();
var mainNav			= $("#main-navigation");
var logo			= $(".logo-w-shadow");
var bigCta			= $("#big-cta");
var nav 			= $("#main-navigation");
var hLogo 			= $(".horizontal-logo");
var hamburger		= $("#hamburger");
var mobileNav		= $(".mobile-nav ul");
var startButton		= $("#start-button");
var consoleIll		= $("#console-illustration");
var tmNotTilting	= $(".treadmill-not-tilting");
var tmTilting		= $(".treadmill-tilting");

// Set globablly accessible variables
var scrollerOffset;

// Resizer
function resizer(e) {
	var frameHeight = $(window).height();
	var frameWidth = $(window).width();

	// Keep the smooth scroll offset the correct height
	if ( frameWidth >= 940 ) {

		scrollerOffset = 87;

	} else if ( frameWidth < 940 ) {

		scrollerOffset = 50;

	}
}

// Video BG and HUD Control
function videoStarter() {

	$('#hero').vide({
		mp4:'videos/headerloop4.mp4',
		ogv:'videos/headerloop4.ogv',
		webm:'videos/headerloop4.webm'
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

	$('.media-slider').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 1,
		responsive: [
		{
		  breakpoint: 768,
		  settings: {
		    slidesToShow: 1,
		    slidesToScroll: 1
		  }
	  }]
	});

	$('#accordion').find('.accordion-toggle').click(function(){

      //Expand or collapse this panel
      $(this).next().slideToggle('fast');

      //Hide the other panels
      $(".accordion-content").not($(this).next()).slideUp('fast');

    });

	// Mobile Nav
	hamburger.click(function(e) {

		e.preventDefault();

		if ( hamburger.hasClass("icon-menu") ) {

			hamburger.removeClass("icon-menu");
			hamburger.addClass("icon-cross");

			mobileNav.slideDown();

		} else {

			hamburger.removeClass("icon-cross");
			hamburger.addClass("icon-menu");

			mobileNav.slideUp();

		}

	});

	// Animation init
	startButton.click(function(e) {
		e.preventDefault();

		if ( consoleIll.hasClass("active")) {

			consoleIll.removeClass("active");
			tmTilting.fadeOut();
			tmNotTilting.fadeIn();

		} else {

			consoleIll.addClass("active");
			tmTilting.fadeIn();
			tmNotTilting.fadeOut();

		}
	});

	// Form handling
	$("#submit_btn").click(function() {
        //get input field values
        var user_name       = $('input[name=name]').val();
        var user_email      = $('input[name=email]').val();
        var user_message    = $('textarea[name=message]').val();

        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if(user_name===""){
            $('input[name=name]').css('border-color','red');
            proceed = false;
        }
        if(user_email===""){
            $('input[name=email]').css('border-color','red');
            proceed = false;
        }
        if(user_message==="") {
            $('textarea[name=message]').css('border-color','red');
            proceed = false;
        }

        //everything looks good! proceed...
        if(proceed)
        {
            //data to be sent to server
            post_data = {'userName':user_name, 'userEmail':user_email, 'userMessage':user_message};

            //Ajax post data to server
            $.post('contact_me.php', post_data, function(response){

                //load json data from server and output message
                if(response.type == 'error')
                {
                    output = '<div class="error">'+response.text+'</div>';
                }else{

                    output = '<div class="success">'+response.text+'</div>';

                    //reset values in all input fields
                    $('#contact_form input').val('');
                    $('#contact_form textarea').val('');
                }

                $("#result").hide().html(output).slideDown();
            }, 'json');

        }
    });

    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form input, #contact_form textarea").keyup(function() {
        $("#contact_form input, #contact_form textarea").css('border-color','');
        $("#result").slideUp();
    });

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
	          scrollTop: target.offset().top - scrollerOffset
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
		// For mobile
		mobileNav.slideUp();
		hamburger.removeClass("icon-cross");
		hamburger.addClass("icon-menu");
	  });

});

$( window ).resize(function() {
	resizer();
});


$(window).scroll( function() {

	scrollCheck();

});
