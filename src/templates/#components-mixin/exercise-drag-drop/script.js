events.on('ready', function() {

    $('.exercise-drag-drop').each(function(indice, item) {

        //console.log('quiz ' + window.uid + ' ' + indice);

        var _template = this;
        var quizID = indice;
        var uidPAGE = window.uid;
        var repeat = 0;
        var maxItensInAlvo = ($(_template).attr('maxItensInAlvo')) ? $(_template).attr('maxItensInAlvo') : 1;
        var featuredClass = ($(_template).attr('featuredClass')) ? $(_template).attr('featuredClass') : "featured-item";

        var relacionarExerc = ($(_template).attr('relacionar')) ? $(_template).attr('relacionar') : false;
        var randomExerc = ($(_template).attr('random')) ? $(_template).attr('random') : false;

        var standardBtn = ($(_template).attr('standardBtn')) ? $(_template).attr('standardBtn') : 'confirmar';
        var repeatBtn = ($(_template).attr('repeatBtn')) ? $(_template).attr('repeatBtn') : 'refazer';
        var cacheBtn = ($(_template).attr('cacheBtn')) ? $(_template).attr('cacheBtn') : 'rever';
        var pesoQuestion = ($(_template).attr('peso')) ? $(_template).attr('peso') : -1;

        var infoClass = ($(_template).attr('infoClass')) ? $(_template).attr('infoClass') : false;
        var infoTxt = ($(_template).attr('infoTxt')) ? $(_template).attr('infoTxt') : 'Arraste os elementos';

        // ///Informação das variaveis do CSS(structure.less)
        // // :root {
        // //     --mobile: @mobile;
        // //     --tablet: @tablet;
        // //     --notebook: @notebook;
        // //     --desktop: @desktop;
        // // }
        function css_var(_name, _value) {
            var gcs = getComputedStyle(document.documentElement).getPropertyValue(_name);
            return (parseInt(gcs)) ? parseInt(gcs) : _value;
        }

        //verifica a resolução min com base na variavel do CSS Tablet( tema > structure.less )
        var resolucaoMin = (css_var('--tablet', '900') >= $(window).width()) ? true : false;

        if (resolucaoMin)
            $(_template).parent().find("." + infoClass).html(infoTxt);

        if ($(_template).attr('repeat')) {
            repeat = parseInt($(this).attr('repeat'));
            repeatInit = parseInt($(this).attr('repeat'));
        }

        reset();
        getCache();

        function reset() {

            $(_template).find('.feedback').addClass('hide');
            $(_template).find('.button-confirm').text(standardBtn);

            $(_template).find('.arraste').each(function(indice, item) {

                var parent = $(item)[0].parentInit;
                $(parent).find('.cloneItens').remove();
                $(parent).append(item);
                $(item).removeAttr("encap");
            });

            $(_template).find('.alvo').each(function(indice, item) {

                $(item).find('.arraste').remove();

                $(_template).find('.arraste').each(function() {
                    var _arraste = $(this).attr('arraste');
                    $(item).removeAttr("a" + _arraste);
                })

            })
        }

        function getCache() {

        }

        if (randomExerc) {
            $(_template).find('.col-itens').html(
                $(_template).find('.col-itens .container-item').sort(function() {
                    return Math.random() - 0.5;
                })
            );
        }

        $(_template).drag_drop_exerc({
            itemClass: 'dragDrop_element',
            featuredItemClass: featuredClass,
            confirmarClass: 'confirmar',
            limiteAlvo: parseInt(maxItensInAlvo), /// quantidade de elementos que cabe em cada alvo
            relacionar: relacionarExerc,
            call: function(e) {
                if (e.action.status == 'init') {}
                if (e.action.status == 'confirmar') {
                    //e.action.response

                    if (e.action.response == true) {
                        $(_template).attr('res-feed', 1);
                        $(_template).find('.feedback-positive').removeClass('hide');
                        repeat = 0;

                    } else {
                        $(_template).attr('res-feed', 0);

                        // Quando a questao tiver refazer é preciso cadastrar 
                        // cada feed negativo. ex: '.feedback-negative1', '.feedback-negative2' ate 10 Ex.:9999 passa a ser um feed só 
                        if (repeatInit > 0 && repeatInit <= 10) {
                            $(_template).find('.feedback-negative').addClass('hide');
                            var feedCurrent = repeatInit - repeat + 1;
                            $(_template).find('.feedback-negative' + feedCurrent).removeClass('hide');
                        } else // apenas um refazer
                        {
                            $(_template).find('.feedback-negative').removeClass('hide');
                        }

                    }
                }
            }
        });

        $(_template).find('.modal-close').addClass('modal-close-feed');
        $(_template).find('.modal-close-feed').removeClass('modal-close');

        $(_template).find('.modal-close-feed').on('click', function() {

            reset();
            if (repeat <= 0) {
                $(_template).find('.container-alternative').addClass('respondido');
                $(_template).find('.button-confirm').text(cacheBtn);

                //saveCache();
            } else {
                $(_template).find('.container-alternative').removeClass('respondido');
                $(_template).find('.button-confirm').text(repeatBtn);

                $(_template).find('.button-confirm').addClass('hide');
                $(_template).find('.container-alternative').removeClass('actived');

                repeat--;
            }
        });

    });

});
