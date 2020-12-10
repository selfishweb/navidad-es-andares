jQuery(function ($) {
    'use strict';

    preloadGifs();

    //#main-slider
    $(function () {
    });

    $('.window-height').height($(window).height());

    // accordian
    $('.accordion-toggle').on('click', function () {
        $(this).closest('.panel-group').children().each(function () {
            $(this).find('>.panel-heading').removeClass('active');
        });

        $(this).closest('.panel-heading').toggleClass('active');
    });

    // Contact form
    var form = $('#main-contact-form');
    form.submit(function (event) {
        event.preventDefault();
        var form_status = $('<div class="form_status"></div>');
        $.ajax({
            url: $(this).attr('action'),

            beforeSend: function () {
                form.prepend(form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn());
            }
        }).done(function (data) {
            form_status.html('<p class="text-success">' + data.message + '</p>').delay(3000).fadeOut();
        });
    });

    $('.owl-carousel').owlCarousel({
        loop:true,
        margin:0,
        nav:false,
        items:1,
        autoplay: true,
        autoplayTimeout:5000,
        autoplayHoverPause:false
    })

    //goto top
    $('.gototop').click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $("body").offset().top
        }, 500);
    });

    //Pretty Photo
    $("a[rel^='prettyPhoto']").prettyPhoto({
        social_tools: false
    });
});

// MAPA

$( "#interior-link" ).click(function() {
     $('#interior').fadeIn();
     $('#exterior').hide();
});
$( "#exterior-link" ).click(function() {
     $('#interior').hide();
     $('#exterior').fadeIn();
});


// Mapa movil
$( "#ver-mapa-movil" ).click(function() {
     $('#mapawrapper-movil').fadeIn();
});
$( "#mapa-movil-close" ).click(function() {
     $('#mapawrapper-movil').fadeOut();
});

// Controles mapa
var zoom = 1;
$( "#zoom-mas" ).click(function() {
   if (zoom >= 1 && zoom <= 2.5) {
     zoom += 0.5;
     $('#mapa').css('transform', 'scale('+zoom+')')
     console.log(zoom);
   }
});
$( "#zoom-menos" ).click(function() {
   if (zoom > 1 && zoom <= 3) {
    zoom -= 0.5;
     $('#mapa').css('transform', 'scale('+zoom+')')
    }
});

// Controles mapa movil
var zoom = 1;
$( "#zoom-mas-movil" ).click(function() {
   if (zoom >= 1 && zoom <= 2.5) {
     zoom += 0.5;
     $('#mapa-movil').css('transform', 'scale('+zoom+')')
     console.log(zoom);
   }
});
$( "#zoom-menos-movil" ).click(function() {
   if (zoom > 1 && zoom <= 3) {
    zoom -= 0.5;
     $('#mapa-movil').css('transform', 'scale('+zoom+')')
    }
});


function preloadGifs(){
  var getGif = function() {
    var gif = [];
    $('figure img').each(function() {
      var data = $(this).attr('data-alt');
      gif.push(data);
      console.log("xgif "+ data);
    });
    return gif;
  }
  var gif = getGif();

  var image = [];
  $.each(gif, function(index) {
    image[index]     = new Image();
    image[index].src = gif[index];
  });
}

$('figure').on('click', function() {
   var $this   = $(this),
           $index  = $this.index(),
           id = $(this).attr('id');
           $img    = $this.children('img'),
           $imgSrc = $img.attr('src'),
           $imgAlt = $img.attr('data-alt'),
           $imgExt = $imgAlt.split('-');

    $("#acc-navidad-mapa-popup").position({
        my:        "left top",
        at:        "right top",
        of:         $img, // or $("#otherdiv")
        collision: "fit"
    });
   console.log($imgExt[1]);

    $.getJSON( "js/data.json", {
      format: "json"
    })
      .done(function( data ) {
        $.each( data.items, function( i, item ) {
          if (item.id == id) {
            $img.attr('src', $img.data('alt')).attr('data-alt', $imgSrc);
            $('#acc-navidad-mapa-popup').fadeIn();
            $( ".pop-close" ).attr("id", "pop-close-"+id);
            $( "#pop-imagen img" ).attr( "src", item.img ).appendTo( "#pop-imagen" );
            $( "#pop-titulo h3" ).html( item.titulo );
            $( "#pop-desc p" ).html( item.desc );
          }
        });
      })
      .fail(function() { alert("error"); })
});

$( ".pop-close").click(function() {
  $("#acc-navidad-mapa-popup").css('left', 0);
  $("#acc-navidad-mapa-popup").css('top', 0);
  $('#acc-navidad-mapa-popup').hide();

  var idc = $(this).attr("id");
  var idclose = idc.split('-');
  var idcc = idclose[2];

  $fimg = $('#'+idcc).children('img');
  $fimgAlt = $('#'+idcc+' img').attr('data-alt');

  console.log(idc);
  console.log($fimgAlt);
  $fimg.attr('src', $fimgAlt).attr('data-alt', $fimg.data('alt'));
});



// pop up Contacto
$( "#ver-contacto" ).click(function(e) {
  e.preventDefault();
    $('#overlay').show();
    $('#contact-page').fadeIn();
});

$( "#pop-close-contacto" ).click(function() {
   $('#contact-page').fadeOut();
   $('#overlay').hide();
});
