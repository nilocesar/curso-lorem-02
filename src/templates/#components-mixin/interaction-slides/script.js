events.on('ready', function() {
    $('.owl-carousel').each(function() {

        var _show = ($(this).attr('show') > 1) ? $(this).attr('show') : "slide";
        var _loop = ($(this).attr('loop')) ? $(this).attr('loop') : false;
        var _nav = ($(this).attr('nav')) ? $(this).attr('nav') : true;
        var _dots = ($(this).attr('dots')) ? $(this).attr('dots') : true;
        var _margin = ($(this).attr('margin')) ? $(this).attr('margin') : 0;
        var _center = ($(this).attr('center')) ? $(this).attr('center') : true;
        var _auto = ($(this).attr('autoplay')) ? $(this).attr('autoplay') : false;

        if (_show == "slide") {
            $(this).owlCarousel({
                loop: _loop,
                margin: _margin,
                nav: _nav,
                dots: _dots,
                autoplay: _auto,
                // autoWidth: true,
                responsive: {
                    0: {
                        items: 1
                    },
                    550: {
                        items: 1
                    },
                    900: {
                        items: 1
                    }
                }
            })
        } else // verificação caso seja um carousel 
        {
            $(this).addClass('model-carousel');
            $(this).owlCarousel({
                loop: _loop,
                margin: _margin,
                center: _center,
                autoplay: _auto,
                nav: _nav,
                dots: _dots,
                responsive: {
                    0: {
                        items: 1
                    },
                    550: {
                        items: 1
                    },
                    900: {
                        items: _show
                    }
                }
            })

            if (_nav)
                $(this).find('.owl-nav').removeClass('disabled');

            if (_dots)
                $(this).find('.owl-dots').removeClass('disabled');

            $(this).on('changed.owl.carousel', function(event) {

                if (_nav)
                    $(this).find('.owl-nav').removeClass('disabled');

                if (_dots)
                    $(this).find('.owl-dots').removeClass('disabled');

            });

            var _this = this;
            $(window).resize(function() {
                if (this.resizeTO) clearTimeout(this.resizeTO);
                this.resizeTO = setTimeout(function() {

                    if (_nav)
                        $(_this).find('.owl-nav').removeClass('disabled');

                    if (_dots)
                        $(_this).find('.owl-dots').removeClass('disabled');

                }, 1000 * 1);
            });
        }

    })

    $(".owl-next").empty();
    $(".owl-next").append("<img width='50%' height='100%' src='../../assets/img/arrow-slider.svg'/>");

    $(".owl-prev").empty();
    $(".owl-prev").append("<img width='50%' height='auto' src='../../assets/img/arrow-slider.svg'/>");
    $(".owl-prev").css('transform', 'scaleX(-1)');
});
