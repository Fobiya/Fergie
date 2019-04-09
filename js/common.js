var _d = document,
    _p = _d.querySelector(".preloader");
setTimeout(function() {
    _p.classList.add("is-loaded");
}, 3000);

// MODAL START

var modalTriggerBts = $('a[data-type="cd-modal-trigger"]'),
    coverLayer = $('.cd-cover-layer');

var duration = 600,
    epsilon = (1000 / 60 / duration) / 4,
    firstCustomMinaAnimation = bezier(.63, .35, .48, .92, epsilon);

modalTriggerBts.each(function() {
    initModal($(this));
});

function initModal(modalTrigger) {
    var modalTriggerId = modalTrigger.attr('id'),
        modal = $('.cd-modal[data-modal="' + modalTriggerId + '"]'),
        svgCoverLayer = modal.children('.cd-svg-bg'),
        paths = svgCoverLayer.find('path'),
        pathsArray = [];
    //store Snap objects
    pathsArray[0] = Snap('#' + paths.eq(0).attr('id')),
        pathsArray[1] = Snap('#' + paths.eq(1).attr('id')),
        pathsArray[2] = Snap('#' + paths.eq(2).attr('id'));

    //store path 'd' attribute values   
    var pathSteps = [];
    pathSteps[0] = svgCoverLayer.data('step1');
    pathSteps[1] = svgCoverLayer.data('step2');
    pathSteps[2] = svgCoverLayer.data('step3');
    pathSteps[3] = svgCoverLayer.data('step4');
    pathSteps[4] = svgCoverLayer.data('step5');
    pathSteps[5] = svgCoverLayer.data('step6');

    //open modal window
    modalTrigger.on('click', function(event) {
        event.preventDefault();
        modal.addClass('modal-is-visible');
        coverLayer.addClass('modal-is-visible');
        animateModal(pathsArray, pathSteps, duration, 'open');
    });

    //close modal window
    modal.on('click', '.trigger-close', function(event) {
        event.preventDefault();
        modal.removeClass('modal-is-visible');
        coverLayer.removeClass('modal-is-visible');
        animateModal(pathsArray, pathSteps, duration, 'close');
    });
}

function animateModal(paths, pathSteps, duration, animationType) {
    var path1 = (animationType == 'open') ? pathSteps[1] : pathSteps[0],
        path2 = (animationType == 'open') ? pathSteps[3] : pathSteps[2],
        path3 = (animationType == 'open') ? pathSteps[5] : pathSteps[4];
    paths[0].animate({ 'd': path1 }, duration, firstCustomMinaAnimation);
    paths[1].animate({ 'd': path2 }, duration, firstCustomMinaAnimation);
    paths[2].animate({ 'd': path3 }, duration, firstCustomMinaAnimation);
}

function bezier(x1, y1, x2, y2, epsilon) {
    //https://github.com/arian/cubic-bezier
    var curveX = function(t) {
        var v = 1 - t;
        return 3 * v * v * t * x1 + 3 * v * t * t * x2 + t * t * t;
    };

    var curveY = function(t) {
        var v = 1 - t;
        return 3 * v * v * t * y1 + 3 * v * t * t * y2 + t * t * t;
    };

    var derivativeCurveX = function(t) {
        var v = 1 - t;
        return 3 * (2 * (t - 1) * t + v * v) * x1 + 3 * (-t * t * t + 2 * v * t) * x2;
    };

    return function(t) {

        var x = t,
            t0, t1, t2, x2, d2, i;

        // First try a few iterations of Newton's method -- normally very fast.
        for (t2 = x, i = 0; i < 8; i++) {
            x2 = curveX(t2) - x;
            if (Math.abs(x2) < epsilon) return curveY(t2);
            d2 = derivativeCurveX(t2);
            if (Math.abs(d2) < 1e-6) break;
            t2 = t2 - x2 / d2;
        }

        t0 = 0, t1 = 1, t2 = x;

        if (t2 < t0) return curveY(t0);
        if (t2 > t1) return curveY(t1);

        // Fallback to the bisection method for reliability.
        while (t0 < t1) {
            x2 = curveX(t2);
            if (Math.abs(x2 - x) < epsilon) return curveY(t2);
            if (x > x2) t0 = t2;
            else t1 = t2;
            t2 = (t1 - t0) * .5 + t0;
        }

        // Failure
        return curveY(t2);

    };
};

// MODAL END

$(document).ready(function(e) { e("#cd-phone").mask("(999) 99-999-99", { placeholder: " " }), e("#cd-phone-1").mask("(999) 99-999-99", { placeholder: " " }), e("#cd-phone-2").mask("(999) 99-999-99", { placeholder: " " }), e("#cd-phone-3").mask("(999) 99-999-99", { placeholder: " " }), e("#cd-phone-4").mask("(999) 99-999-99", { placeholder: " " }), e("#cd-phone-5").mask("(999) 99-999-99", { placeholder: " " }), e("#cd-phone-6").mask("(999) 99-999-99", { placeholder: " " }), e("#cd-phone-7").mask("(999) 99-999-99", { placeholder: " " }), e("#cd-phone-8").mask("(999) 99-999-99", { placeholder: " " }), e("#cd-phone-9").mask("(999) 99-999-99", { placeholder: " " }), e("#cd-phone-10").mask("(999) 99-999-99", { placeholder: " " }), e("#cd-phone-11").mask("(999) 99-999-99", { placeholder: " " }), e("#cd-phone-12").mask("(999) 99-999-99", { placeholder: " " }), e("#cd-phone-13").mask("(999) 99-999-99", { placeholder: " " }) });

// VIDEO START

$(document).ready(function() {

    function isIE() {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    }

    window.isIEOld = isIE() && isIE() < 9;
    window.isiPad = navigator.userAgent.match(/iPad/i);
    var img = $('.video').data('placeholder'),
        video = $('.video').data('video'),
        noVideo = $('.video').data('src'),
        el = '';
    if ($(window).width() > 1024 && !isIEOld /*&& !isiPad*/ ) {
        el += '<video autoplay loop poster="' + img + '">';
        el += '<source src="' + video + '" type="video/mp4">';
        el += '</video>';
    } else {
        el = '<div class="video-element" style="background-image: url(' + noVideo + ')"></div>';
    }

    $('.video').prepend(el);

    muteVideo();

    function muteVideo() {
        var video = document.querySelector('#home-page-video video');
        var audio = document.querySelector('#audio-file-home');
        var mute = document.querySelector('#mute');

        if (mute != null) {
            mute.addEventListener('click', function(e) {
                if (mute.classList.contains('mute')) {
                    mute.setAttribute('class', 'mute-active');
                    video.muted = false;
                    audio.muted = false;
                } else {
                    mute.setAttribute('class', 'mute');
                    video.muted = true;
                    audio.muted = true;
                }
            });
        }
    }

    if ($(window).width() < 1024) {
        var audioFile = document.querySelector('#audio-file-home');
        if (audioFile != null) {
            audioFile.muted = true;
        }
    }

    $(function() {
        $('#mute').on('click', function(event) {
            event.preventDefault();
            $(".opacity_trick").toggleClass('back_again');
        });
    });

    // VIDEO END

    $(document).ready(function() {
        $("a.feedback").fancybox();
        $("a.grouped_elements").fancybox();
        $("a.modall_pad").fancybox({
            padding: 0,
            margin: 0
        });
        $("a#inline").fancybox({
            'hideOnContentClick': true
        });
        $("a.group").fancybox({
            'transitionIn': 'none',
            'transitionOut': 'none',
            'speedIn': 600,
            'speedOut': 200,
            'overlayShow': true
        });
        $(".single_4").fancybox({
            helpers: {
                title: {
                    type: 'over'
                }
            }
        });
        $(".single_3").fancybox({
            helpers: {
                title: {
                    type: 'over'
                }
            }
        });
    });

    $("#user-one").submit(function() {
        console.log('sent');
        //      $.ajax({
        //          type: "POST",
        //          url: "mail.php",
        //          data: $(this).serialize()
        //      }).done(function() {
        //          $("#user-next").trigger("reset");
        //          alert( "Your message has been sent" );
        //      });
        //      return false;
    });
    //
    //  $("#user-next").submit(function() {
    //      $.ajax({
    //          type: "POST",
    //          url: "mail.php",
    //          data: $(this).serialize()
    //      }).done(function() {
    //          $("#user-next").trigger("reset");
    //          alert( "Your message has been sent" );
    //      });
    //     return false;
    // });
    //
    //
    //  $("#openModal").submit(function() {
    //      $.ajax({
    //          type: "POST",
    //          url: "mail.php",
    //          data: $(this).serialize()
    //      }).done(function() {
    //          $("#openModal").trigger("reset");
    //          alert( "Your message has been sent" );
    //      });
    //      return false;
    //  });

    $(function() {
        $("[name=send]").click(function() {
            $(":input.error").removeClass('error');
            $(".allert").remove();

            var error;
            var btn = $(this);
            var ref = btn.closest('form').find('[required]');
            var form = $(this).closest('form');
            var msg = btn.closest('form').find('input');
            var send_btn = btn.closest('form').find('[name=send]');
            var send_options = btn.closest('form').find('[name=campaign_token]');
            var name = btn.closest('form').find('[name=name]').val();
            var goal = btn.closest('form').find('[name=goal]').val();
            // var text = btn.closest('form').find('[name=t]').val();
            // var tnh = btn.closest('form').find('[name=tnh]').val();
            //
            $(ref).each(function() {
                if ($(this).val() == '') {
                    var errorfield = $(this);
                    $(this).addClass('error').parent('.field').append('<div class="allert"><span>Fill this field</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
                    error = 1;
                    $(":input.error:first").focus();
                    return;
                } else {
                    var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                    if ($(this).attr("type") == 'email') {
                        if (!pattern.test($(this).val())) {
                            $("[name=email]").val('');
                            $(this).addClass('error').parent('.field').append('<div class="allert"><span>Fill this field</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
                            error = 1;
                            $(":input.error:first").focus();
                        }
                    }
                    //var patterntel = /^()[0-9]{9,18}/i;
                    var patterntel = /^([0-9_()+\.-]{2,4})/i;
                    if ($(this).attr("type") == 'tel') {
                        if (!patterntel.test($(this).val())) {
                            $("[name=phone]").val('');
                            $(this).addClass('error').parent('.field').append('<div class="allert"><span>Fill this field</span><i class="fa fa-exclamation-triangle" aria-hidden="true"></i></div>');
                            error = 1;
                            $(":input.error:first").focus();
                        }
                    }
                }
            });
            if (!(error == 1)) {
                // $(send_btn).each(function() {
                //     $(this).attr('disabled', true);
                // });
                $(send_options).each(function() {
                    if ($(this).val() == '') {
                        $.ajax({
                            type: 'POST',
                            url: 'mail.php',
                            data: msg,
                            success: function() {
                                $('form').trigger("reset");
                                setTimeout(function() { $("[name=send]").removeAttr("disabled"); }, 1000);
                                setTimeout(function() { jQuery.fancybox.close(); }, 30000);
                                $(".trigger-close").click();
                                $.fancybox.open('<center class="success_cell"><div class="name_user"></div><a href="http:\/\/fergie.com" class="trigger-close"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></a><p class="look-out t-up">Thank you</p></center>');

                            },
                            error: function(xhr, str) {
                                alert('Возникла ошибка: ' + xhr.responseCode);
                            }
                        });
                    } else {
                        $.ajax({
                            type: 'POST',
                            url: 'mail.php',
                            data: msg,
                            success: $.ajax({
                                type: 'POST',
                                url: 'https://app.getresponse.com/add_subscriber.html',
                                data: msg,
                                statusCode: {
                                    0: function() {
                                        $('form').trigger("reset");
                                        setTimeout(function() { $("[name=send]").removeAttr("disabled"); }, 1000);
                                        setTimeout(function() { jQuery.fancybox.close(); }, 30000);
                                        $(".trigger-close").click();
                                        $.fancybox.open('<center class="success_cell"><div class="name_user"></div><a href="http:\/\/fergie.com" class="trigger-close"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></a><p class="look-out t-up">Thank you</p></center>');

                                    }
                                }
                            }),
                            error: function(xhr, str) {
                                alert('Возникла ошибка: ' + xhr.responseCode);
                            }
                        });
                    }
                });
            }
            // return false;
        })
    });
});

function set(obj) {
    var id = obj.title;
    $('.pacet').val(id);
}

function setbtn(obj) {
    var id = obj.title;
    $('.pacet').val("Кнопка: " + id);
}