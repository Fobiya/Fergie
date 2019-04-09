// var settings ****************************************************
var $header = $('header');
var $brand = $('.branding');
var $logoLG = $('.logo-lg');
var $logoSM = $('.logo-sm');
var $overlay = $('<div class="overlay"></div>');
var $menu = $('.mobileMenu');
var $ul = $('<ul></ul>');
// code setting  (mobile menu )*************************************


// 01. append overlay div (see overlay var) to body
$("body").append($overlay);

// 02. lock page scroll whe the mobile menu is active, Given a jQuery object that represents a set of DOM elements, the .add() method constructs a new jQuery object from the union of those elements and the ones passed into the method.
$overlay.add($menu).on('scroll touchmove mousewheel', function (event) {
    event.preventDefault();
});

// 03. on mobile button press, slide menu in and show overlay
$('#mobileButton').click(function(event){
  event.preventDefault();
  //Show the overlay and we add some opacity animation
  $overlay.show().animate({ opacity: 0.8, }, 100);
  //Togle class
  $menu.toggleClass( "slideOut" );      
});

// 04. on overlay click, close menu and hide overlay
$overlay.click(function(){
  //Hide the overlay and set opacity to 0
  $overlay.hide().animate({ opacity: 0, }, 100);
  //Togle class
  $menu.toggleClass( "slideOut" );  
});

// 05. obtain menu links from .listMenu and copy them to the mobile menu (Traversing the DOM)
$menu.append($ul);
$('.listMenu a').each( function () {
    var $anchor = $(this);
    var $li = $('<li></li>');
    $anchor.clone().appendTo($li);
    $ul.append($li);
});

// 06. we add the class stick to the fixed header to change his appearance and the apparence of their content on scroll
$(window).scroll(function() {
if ($(this).scrollTop() > 3){
    $($header).addClass("stick");
    $($brand).addClass('stick')
    $($logoLG).hide();
    $($logoSM).show(); 
  }
  else {
    $($header).removeClass("stick");
    $($brand).removeClass('stick');  
    $($logoSM).hide();
    $($logoLG).show();
  }
});