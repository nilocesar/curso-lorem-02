events.on('ready', function() {

    var prevHide = $('body').attr('prev-hide');
    var nextHide = $('body').attr('next-hide');
    var prevPage = $('body').attr('prev-page');
    var nextPage = $('body').attr('next-page');

    var prevClass = '.container-arrow-left';
    var nextClass = '.container-arrow-right';

    control_nav(); // controle de navegação
    control_liberate(); // controle de liberar navegação

    function control_nav() {

        if (typeof prevHide !== 'undefined' && prevHide !== false) {
            $(prevClass).addClass('hide');
        }

        if (typeof nextHide !== 'undefined' && nextHide !== false) {
            $(nextClass).addClass('hide');
        }

        $(prevClass).on('click', function() {
            if (typeof prevPage !== 'undefined' && prevPage !== false) {
                if (prevPage != 'prev') {
                    navigate.goto(prevPage);
                } else {
                    navigate.prev();
                }
            } else {
                navigate.prev();
            }
        });

        $(nextClass).on('click', function() {
            if (typeof nextPage !== 'undefined' && nextPage !== false) {
                if (nextPage != 'prev') {
                    navigate.goto(nextPage);
                } else {
                    navigate.next();
                }
            } else {
                navigate.next();
            }
        });
    }

    function control_liberate() {

        var button = '.container-btn button';
        var accordeon = '.container-accordeon .accordeon-title';

        //verifica se tem mais de 1 página no curso
        var morePage = navigate.currentScreen.model.pages.length > 1;

        $(button).on('click', function() {
            $(this).removeClass('pulse infinite');
            $(this).addClass('open');
            cont_unlockedNext(button, morePage);
        });

        $('.modal').find(accordeon).attr('md-accordeon', 1);
        $(accordeon).on('click', function() {
            $(this).addClass('open');
            var mdAccordeon = $(this).attr('md-accordeon'); /// verificação se esta dentro de um modal

            if (!mdAccordeon) {
                cont_unlockedNext(accordeon, morePage);
            }
        })

        $('.modal').find(".owl-carousel").each(function() {
            $(this).attr('md-carousel', 1);
        });

        $('.owl-carousel').each(function() {
            var owl = $(this);
            var mdCarousel = owl.attr('md-carousel'); /// verificação se esta dentro de um modal

            owl.find('.owl-dot').attr('tabindex', '-1');
            owl.find('.owl-prev').attr('tabindex', '-1');
            owl.find('.owl-next').attr('tabindex', '-1');

            owl.on('changed.owl.carousel', function(event) {
                if ((event.item.index + 1) == event.item.count) {
                    ///verificaco se tem mais de uma página
                    if (morePage && !mdCarousel) {
                        $(nextClass).show();
                        $(nextClass).removeClass("hide");
                    }
                }
            })
        })

        if (morePage) {
            //Acessibildade em tela com slide, controle de liberar o avançar 
            $(document).on('keydown', function(e) {
                let key = e.which || e.keyCode;

                if (key == 9 || key == 37 || key == 38 || key == 39 || key == 40) {
                    $('.owl-carousel *').each(function() {
                        var element = $(this);

                        if (element.is(":focus")) {
                            $(nextClass).show();
                            $(nextClass).removeClass("hide");
                        }
                    })
                }
            });
        }

    }

    function cont_unlockedNext(_obj, morePage) {
        ///verificaco se tem mais de uma página
        if (morePage) {
            var nextHide = $('body').attr('next-hide');
            var nextClass = '.container-arrow-right';

            if (typeof nextHide !== 'undefined' && nextHide !== false) {

                var botoes = $(_obj).toArray();
                var todosBotoesClicados = botoes.every(botao => {
                    return $(botao).hasClass('open');
                });

                if (todosBotoesClicados) {
                    $(nextClass).show();
                    $(nextClass).removeClass("hide");
                }
            }
        }
    }
});
