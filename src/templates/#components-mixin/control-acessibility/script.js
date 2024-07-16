var _this;
var closeModalSaveLibras;

var tabOrderArray;
var tabIndice = -1;
var directions = false;
var timeOut;
var _this = this;
var acessOptions = {
    labels: {
        menuTitle: ' ',
        increaseText: 'Aumentar',
        decreaseText: 'Diminuir',
        increaseTextSpacing: 'Aumentar espaçamento das fontes',
        decreaseTextSpacing: 'Diminuir espaçamento das fontes',
        invertColors: 'Inverter cores',
        grayHues: 'Tonalidade cinza',
        underlineLinks: 'Sublinhar links',
        bigCursor: 'Aumentar o cursor',
        readingGuide: 'reading guide (in my language)',
        textToSpeech: 'text to speech (in my language)',
        speechToText: 'speech to text (in my language)'
    },
    textToSpeechLang: 'pt-BR',
    speechToTextLang: 'pt-BR',
    // textPixelMode: true,
    hotkeys: {
        enabled: true
    },
    icon: {
        circular: true,
        img: '',
        position: {
            top: {
                size: 0,
                units: 'px'
            },
            left: {
                size: 0,
                units: 'px'
            },
            type: 'fixed'
        }
    },
    modules: {
        increaseText: false,
        decreaseText: false,
        invertColors: true,
        increaseTextSpacing: true,
        decreaseTextSpacing: true,
        grayHues: true,
        underlineLinks: true,
        bigCursor: true,
        readingGuide: false,
        textToSpeech: false,
        speechToText: false
    },
    textPixelMode: true
};

vlibrasInit();

$(document).ready(function () {
    addAlert("Aguarde, carregando!");
});


events.on('ready', function () {

    var countPages = navigate.currentScreen.model.pages.length;
    var actualPage = Math.round(navigate.currentScreen.index + 1);
    var progress = Math.round(100 / countPages * actualPage);

    var engine_config = _this.engine_config.config.acessibility;

    if(engine_config) {
        if (! engine_config.vlibras) { // REMOVENDO O VLIBRAS, CASO ESTIVER CONFIGURADO COMO FALSE.
            $(".vlibras").remove();
        }
    
        if (! engine_config.customLibras) { // REMOVENDO O CUSTOM LIBRAS, CASO ESTIVER CONFIGURADO COMO FALSE.
            $(".btnLibras").remove();
            $(".librasDiv").remove();
        } else {
            initLibras(config);
        }
    }

    setTimeout(function () {
        addAlert('Carregamento finalizado! Você está na página ' + actualPage + ' de ' + countPages);
        createAriaPageInit();
        onePageTabIndexFix();
        setAcess();
        fixTabIndexInComponents();
        controlAcessibilityModal();

        // Descomentar esse código para carregar videos do vimeo

        // customLibras({
        //     type:"vimeo",
        //     vimeoAPICall: true,
        //     vimeo_client_id:"8ab4352eb2cf9ade920118edfc04c93c29783354",
        //     vimeo_user_id:"43873482",
        //     vimeo_acess_token:"8a907d2193715365d94f2206c2a8f888",
        //     vimeo_client_secret:"VLJbkbwsLkIOtAuJoIlx4TognW/NRYn7AhxDhTYpVeVpbSb2zL3ap31Wtl9UgfMEI5UM27gp61X46w/wpbChlW9B5SXeVRfGfI3wSjeDL1+WKK/kPb+YETrjG+3nm+Lu",
        //     vimeo_folder_id:"8449699"
        // });

        // Descomentar esse código para carregar videos de dentro do projeto (nome do vídeo precisa ser o mesmo do da tela)
        
        // customLibras({
        //     type:"mp4",
        // });

        // Descomentar esse código para carregar videos do Youtube
        
        // customLibras({
        //     type:"youtube",
        //     youtube_id_canal: '',
        //     youtube_key: '',
        // });

    }, 1000);
});


function vlibrasInit() {
    $('body').prepend(`
        <div vw class="enabled vlibras">
            <div vw-access-button class="active"></div>
            <div vw-plugin-wrapper>
                <div class="vw-plugin-top-wrapper"></div>
            </div>
        </div>
    `)
    $.getScript('https://vlibras.gov.br/app/vlibras-plugin.js', function () {
        new window.VLibras.Widget('https://vlibras.gov.br/app');
    });
}

function customLibras(configs) {
    $('body').prepend(`
        <div class="btnLibras"></div>
        <div class="librasDiv ui-widget-content">
            <div class="crop">
                <div class="video"></div>
            </div>
            <div class="controls">
                <div class="control closeLibras" onClick="closeLibras()"></div>
                <div class="control arraste"></div>
            </div>
        </div>
    `)

    $(".librasDiv").draggable();

    _this = window;

    var config = {
        type: configs.type,

        vimeoAPICall: configs.vimeoAPICall,
        vimeo_client_id: configs.vimeo_client_id,
        vimeo_user_id: configs.vimeo_user_id,
        vimeo_acess_token: configs.vimeo_acess_token,
        vimeo_client_secret: configs.vimeo_client_secret,
        vimeo_folder_id: configs.vimeo_folder_id,

        youtube_id_canal: configs.youtube_id_canal,
        youtube_key: configs.youtube_key,
    }

    initLibras(config);
    callLibras(_this.uid);
    searchDataLibras(_this);

    $(".modal-close").click(function () {
        if (!$(this).hasClass("nextBt")) {
            if (closeModalSaveLibras != null && closeModalSaveLibras != "" && closeModalSaveLibras != undefined) {
                callLibras(closeModalSaveLibras);
            } else {
                callLibras(_this.uid);
            }
        }
    });

    setActiveLibrasBt($(".btnLibras"));
}


function createAriaPageInit() {
    var nav_current = navigate.currentScreen.index + 1;
    var nav_all = navigate.currentScreen.pages.length;

    if (nav_all > 1) {

        $("body").prepend(`<span id="ariaInit" style="position:absolute; top:0; left:0; opacity:0.1;"></span>`);
        $('#ariaInit').attr('tabindex', 1);

        if (nav_current == 1) {
            $('#ariaInit').attr('aria-label', `Tela ${nav_current} de ${nav_all}. Para navegar no treinamento utilize apenas o TAB.`);
        } else {
            $('#ariaInit').attr('aria-label', `Tela ${nav_current} de ${nav_all}.`);
        }
    }
}

function getFirstTabElement() {
    var element = null;
    $("*").each(function () {
        if ($(this).attr("tabindex") == 1 || $(this).attr("tabindex") == "1") {
            element = $(this);
        }
    });
    return element;
}

function setAcess() {

    $(window).keyup(function (evt) {
        clearTimeout(timeOut);
        directions = true;

        if (evt.which == 37 || evt.which == 38) {
            //PREV
            focusElement("prev");
        }

        if (evt.which == 39 || evt.which == 40) {
            //NEXT
            focusElement("next");
        }

        timeOut = setTimeout(function () {
            directions = false;
        }, 100);
    });

    $("*").each(function () {
        if ($(this).attr("alt") != undefined && $(this).attr("aria-label") == undefined) {
            $(this).attr("aria-label", $(this).attr("alt"));
        }

        if ($(this).attr("onclick")) {

            $(this).keydown(function (event) {
                if (event.key === " " || event.key === "Enter" || event.key === "Spacebar") {
                    $(this).click();
                    event.preventDefault();
                }
            });

            $(this).attr("role", "button");
        }

        if ($(this).get(0).tagName == "BUTTON") {
            $(this).attr("role", "button");
        }
    });

    document.onkeydown = function (e) {
        if (e.keyCode === 13) {
            document.activeElement.click();
        }
    };

    $("*").each(function () {
        if ($(this).data("modal")) {
            $(this).click(function () {
                $($(this).data("modal")).focus();
            });
        }
    });

    $("*").focusin(function () {
        var index = $(this).attr("tabIndex");

        if (index != undefined && directions == false) {
            tabIndice = index - 1;
        }
    });



    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) { //Caso seja IE
        $('.icone-active-help-25').attr("aria-hidden", "true");
        $('.icone-active-help-25').attr("tabindex", -1);
    } else {
        new Accessibility(acessOptions);
        $("._access-icon").empty();
        $('._access-menu').attr("aria-hidden", "true");
        $('._access-menu').attr("tabindex", -1);

        $('._access-menu').find("i").attr("aria-hidden", "true");
        $('._access-menu').find("i").attr("tabindex", -1);

        $('._access-menu').find("ul").attr("aria-hidden", "true");
        $('._access-menu').find("ul").attr("tabindex", -1);

        $('._access-menu').find("ul").find('li').attr("aria-hidden", "true");
        $('._access-menu').find("ul").find('li').attr("tabindex", -1);
    }




    bridge.hiddeViewsFromReaderScreen();

}

function hiddenElementesFromReader(ignoreId) {
    $("*").each(function () {
        if ($(this) != $(ignoreId)) {
            $(this).attr("aria-hidden", "true");
            $(this).attr("tabindex", "-1");
        }
    });
}

function findLastIndex(element) {
    var tabMax = 0;
    $(element).find("*").each(function () {
        var tabAtual = Number($(this).attr('tabindex'));

        if (tabAtual != undefined) {
            if (tabAtual > tabMax) {
                tabMax = tabAtual;
            }
        }
    });
    return tabMax;
}

function controlAcessibilityModal() {

    $(".modal").each(function () {
        var _tabndex = findLastIndex($(this));
        $(this).find('.modal-close').attr("tabindex", Math.round(_tabndex + 1));
        $(this).find('.modal-close').attr("aria-label", "Fechar modal.");
    });

    ///controle de modal para retornar a tela principal
    $(".modal .modal-close").on('click', function () {
        document.activeElement.tabIndex = $('body').attr('tabIndexModal');
    })

    $("*").each(function () {
        ///controle do modal para a acessibility
        if ($(this).attr("data-modal")) {
            var _modalCurrent = null;
            var _elemTabModal = {
                ind: 99999999,
                item: null
            };
            $(this).on('click', function () {
                //grava o ultimo tabindex antes de entrar no modal
                $('body').attr('tabIndexModal', document.activeElement.tabIndex);
                _modalCurrent = $(this).attr("data-modal");

                $(_modalCurrent).find("*").each(function (indice, item) {
                    if (parseInt($(item).attr('tabindex')) > -1) {
                        ///verifica qual o menor tab index dentro do modal e joga o foco pra ele
                        if (_elemTabModal.ind > $(item).attr('tabindex')) {
                            _elemTabModal.ind = $(item).attr('tabindex');
                            _elemTabModal.item = $(item);
                        }
                    }
                });

                _elemTabModal.item.focus();
            });
        }
    })

    $("*").focusin(function () {
        var modal = $(this).data("modal");

        if ($(this).hasClass("modal-close")) {
            $(".modal").css("display", "none");
            addAlert("Janela de conteúdo fechada.");
        }

        if (modal != undefined) {
            $(".modal").css("display", "none");

            $(this).click(function () {
                addAlert("Janela de conteúdo aberta.");
            });

        }
    });

}

function fixTabIndexInComponents() {
    $('button').find("*").each(function () {
        $(this).removeAttr("tabindex");
    });
    $('a').find("*").each(function () {
        $(this).removeAttr("tabindex");
    });
}

function onePageTabIndexFix() {
    var countTb = 20;
    var sections = $('section');

    for (var i = 0; i < sections.length; i++) {
        var _element = sections[i];
        $(_element).find("*").each(function () {

            if ($(this).attr("tabindex") != undefined &&
                $(this).attr("tabindex") != -1 &&
                $(this).attr("tabindex") != "-1" &&
                $(this).attr("tabindex") != "") {
                $(this).attr("tabindex", countTb++);
            }
        });
    }
}

function focusElement(direction) {
    tabOrderArray = getTabOrderArray();
    $(window).keypress(function (evt) {
        clearTimeout(timeOut);
        directions = true;

        if (evt.which == 37 || evt.which == 38) {
            //PREV
            focusElement("prev");
        }

        if (evt.which == 39 || evt.which == 40) {
            //NEXT
            focusElement("next");
        }

        timeOut = setTimeout(function () {
            directions = false;
        }, 100);
    });
    $("*").focusin(function () {
        var index = $(this).attr("tabIndex");

        if (index != undefined && directions == false) {
            tabIndice = index - 1;
        }
    });

    if (direction == "next") {
        tabIndice++;

        if (tabIndice > tabOrderArray.length - 1) {
            tabIndice = 0;
        }
    } else if (direction == "prev") {
        tabIndice--;

        if (tabIndice < 0) {
            tabIndice = tabOrderArray.length - 1;
        }
    }

    if (tabOrderArray[tabIndice] != undefined) {
        tabOrderArray[tabIndice].element.focus();
    } else {
        tabOrderArray[0].element.focus();
    }
}

function getTabOrderArray() {
    var focussableElements = '*';
    var lastIndex = 0;
    var arrTabs = [];
    $(focussableElements).each(function () {
        if ($(this).attr("tabindex") != undefined && $(this).attr("tabindex") != 0 && $(this).attr("tabindex") > lastIndex && $(this).attr("tabindex") != NaN) {
            arrTabs.push({
                element: $(this),
                index: $(this).attr("tabindex") < 10 ? 0 + $(this).attr("tabindex") : $(this).attr("tabindex")
            });
        }
    });
    arrTabs = arrTabs.sort(compareValues('index'));
    return arrTabs;
}

function compareValues(key) {
    var order = arguments.length <= 1 || arguments[1] === undefined ? 'asc' : arguments[1];
    return function innerSort(a, b) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            // property doesn't exist on either object
            return 0;
        }

        var varA = typeof a[key] === 'string' ? a[key].toUpperCase() : a[key];
        var varB = typeof b[key] === 'string' ? b[key].toUpperCase() : b[key];
        var comparison = 0;

        if (varA > varB) {
            comparison = 1;
        } else if (varA < varB) {
            comparison = -1;
        }

        return order === 'desc' ? comparison * -1 : comparison;
    };
}

function removeOldAlert() {
    var oldAlert = document.getElementById("alert");
    if (oldAlert) {
        document.body.removeChild(oldAlert);
    }
}

function addAlert(aMsg) {
    removeOldAlert();
    var newAlert = document.createElement("div");
    newAlert.setAttribute("role", "alert");
    newAlert.setAttribute("id", "alert");
    var msg = document.createTextNode(aMsg);
    newAlert.appendChild(msg);
    document.body.appendChild(newAlert);
    $("#alert").css("opacity", "0");

    setTimeout(function () {
        removeOldAlert();
    }, 4000);
}