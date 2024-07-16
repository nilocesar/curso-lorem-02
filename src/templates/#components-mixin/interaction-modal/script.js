events.on('ready', function() {

    $("[data-modal]").each(function(i, element) {
        var $botao = $(element);
        var modal_id = $botao.attr('data-modal');
        var $popup = $(modal_id);
        $popup.hide().addClass('modal');
        $botao.on('click', function() {
            $botao.addClass('clicked');
            $popup.fadeIn();

            verifyClose($popup);
        });

        $botao.keydown(function(event) {
            if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") {
                $(this).click();
                event.preventDefault();
            }
        });


        $popup.find('.modal-close')
            .on('click', function() {
                $botao.removeClass('clicked');
                $popup.fadeOut();
            })

        $popup.find('.modal-close').keydown(function(event) {
            if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") {
                $(this).click();
                event.preventDefault();
            }
        });

        $botao.attr("role", "button");
        $popup.find('.modal-close').attr("role", "button");
        $popup.find('.modal-close').attr("aria-label", "Fechar modal.");

        var _tabndex = findLastIndex($popup);
        $popup.find('.modal-close').attr("tabindex", Math.round(_tabndex + 1));
    });


    function findLastIndex(element) {
        var tabMax = 0;
        $(element).find("*").each(function() {
            var tabAtual = Number($(this).attr('tabindex'));

            if (tabAtual != undefined) {
                if (tabAtual > tabMax) {
                    tabMax = tabAtual;
                }
            }

        });

        return tabMax;
    }

    function verifyClose(_pop) {

        var owl = _pop.find(".owl-carousel");
        if (owl.attr('md-carousel') == 1) {
            _pop.find(".modal-close").hide();
        }
        owl.on('changed.owl.carousel', function(event) {
            if ((event.item.index + 1) == event.item.count) {
                _pop.find(".modal-close").show();
                _pop.find(".modal-close").removeClass("hide");
            }
        })

        var accordeon = _pop.find('.container-accordeon .accordeon-title');
        if (accordeon.attr('md-accordeon') == 1) {
            _pop.find(".modal-close").hide();
        }
        
        accordeon.on('click', function() {

            $(this).addClass('open');

            var botoes = $(accordeon).toArray();
            var todosBotoesClicados = botoes.every(botao => {
                return $(botao).hasClass('open');
            });

            if (todosBotoesClicados) {
                _pop.find(".modal-close").show();
                _pop.find(".modal-close").removeClass("hide");
            }
        })
    }
})
