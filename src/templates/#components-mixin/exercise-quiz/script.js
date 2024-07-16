events.on('ready', function() {

    $('.container-exercise-quiz').each(function(indice, item) {

        //console.log('quiz ' + window.uid + ' ' + indice);

        var _template = this;
        var quizID = indice;
        var uidPAGE = window.uid;
        var countAlternativesCorrect = 0;
        var repeat = 0;
        var repeatCache = 0;
        var repeatInit = 0;
        var standardBtn = ($(_template).attr('standardBtn')) ? $(_template).attr('standardBtn') : 'confirmar';
        var repeatBtn = ($(_template).attr('repeatBtn')) ? $(_template).attr('repeatBtn') : 'refazer';
        var cacheBtn = ($(_template).attr('cacheBtn')) ? $(_template).attr('cacheBtn') : 'rever';
        var pesoQuestion = ($(_template).attr('peso')) ? $(_template).attr('peso') : -1;

        var pesoActive = false;

        if ($(_template).attr('repeat')) {
            repeat = parseInt($(this).attr('repeat'));
            repeatInit = parseInt($(this).attr('repeat'));
            repeatCache = parseInt($(this).attr('repeat'));
        }

        reset();
        getCache();

        function reset() {

            $(_template).find('.feedback').addClass('hide');
            $(_template).find('.button-confirm').text(standardBtn);

            countAlternativesCorrect = 0;
            $(_template).find('.container-alternative').each(function() {
                if (parseInt($(this).attr('status-alternative')) == 1) {
                    countAlternativesCorrect++;
                }
            });
        }

        $(_template).find('.container-alternative').on('click', function() {

            if (countAlternativesCorrect == 1) {
                $(_template).find('.container-alternative').removeClass('actived');
            }

            if ($(this).hasClass('actived')) {
                $(this).removeClass('actived');
            } else {
                $(this).addClass('actived');
            }

            $(_template).find('.button-confirm').removeClass('hide');
        });

        $(_template).find('.button-confirm').on('click', function() {
            var countQuestionResponse = 0;
            var pesoAlternativa = 0;

            $(_template).find('.actived').each(function() {
                if (parseInt($(this).attr('status-alternative')) == 1) {
                    countQuestionResponse++;
                } else {
                    countQuestionResponse--;
                }

                if ($(this).attr('peso-alternative')) {
                    pesoActive = true;
                    pesoAlternativa += parseInt($(this).attr('peso-alternative'));
                }
            });

            if (pesoActive) {
                $(_template).attr('peso-altenative', pesoAlternativa);
            }

            if (countQuestionResponse === countAlternativesCorrect) {
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

            setTimeout(function() {
                $('.container-arrow-right').addClass('hide');
            }, 1000 * 0.2);

        });

        $(_template).find('.modal-close').addClass('modal-close-feed');
        $(_template).find('.modal-close-feed').removeClass('modal-close');

        $(_template).find('.modal-close-feed').on('click', function() {

            reset();
            if (repeat <= 0) {
                $(_template).find('.container-alternative').addClass('respondido');
                $(_template).find('.button-confirm').text(cacheBtn);


                $('.container-arrow-right').removeClass('hide');

                saveCache();
            } else {
                $(_template).find('.container-alternative').removeClass('respondido');
                $(_template).find('.button-confirm').text(repeatBtn);

                $(_template).find('.button-confirm').addClass('hide');
                $(_template).find('.container-alternative').removeClass('actived');

                repeat--;
                repeatCache--;
            }
        });

        function getCache() {
          /// Objeto recuperado do suspendata
          if ($(_template).attr('cache')) {
            if (scorm.loadObject('quiz')) {

              var quiz = JSON.parse(scorm.loadObject('quiz'));

              if (quiz.length > 0){
                $.each(quiz, function(indice, item) {
                  if (item.uid == uidPAGE && item.q == quizID) {
                    $(_template).find('.container-alternative').addClass('respondido');
                    $(_template).find('.button-confirm').removeClass('hide');
                    $(_template).find('.button-confirm').text(cacheBtn);

                    repeat = 0;
                    repeatInit = 0;
                    repeatCache = 0;

                    setTimeout(function() {
                        $('.container-arrow-right').removeClass('hide');
                    }, 1000 * 1);


                    $(_template).find('.container-alternative').each(function(indice, alten) {
                        var altCache = item.a;
                        for (var i = 0; i <= altCache.length; i++) {
                            if (indice == altCache[i]) {
                                $(alten).addClass('actived');
                            }
                        }
                    });
                  }
                })
              }
            }
          }
        }

        function saveCache() {
            //// informação para caso precise salvar no suspendata
            if ($(_template).attr('cache')) {

                var quiz = [];
                var alternativaCache = [];
                if (scorm.loadObject('quiz')) {
                    quiz = JSON.parse(scorm.loadObject('quiz'));
                }

                $(_template).find('.container-alternative').each(function(indice) {
                    if ($(this).hasClass('actived')) {
                        alternativaCache.push(indice)
                    }
                });

                // console.log(quiz)
                $.each(quiz, function(indice, item) {
                    //console.log(item)
                    if (item.uid == uidPAGE && item.q == quizID) {
                        quiz.splice(indice, 1);
                    }
                })

                var _obj = {
                    uid: uidPAGE,
                    q: quizID,
                    a: alternativaCache,
                    r: parseInt($(_template).attr('res-feed')),
                    t: repeatInit - repeatCache,
                };

                //Peso da Questao
                if (pesoQuestion > -1) {
                    _obj.pq = parseInt(pesoQuestion);
                }

                //Peso das Alternativas
                if (pesoActive) {
                    var peso_alt = $(_template).attr('peso-altenative');
                    _obj.pa = parseInt(peso_alt);
                }

                quiz.push(_obj);

                //console.log(quiz);
                scorm.saveObject('quiz', JSON.stringify(quiz));
                questionTrigger();
            };
        }
    });

  questionTrigger();
  function questionTrigger() {
    if (scorm.loadObject('quiz')) {

      var quiz = JSON.parse(scorm.loadObject('quiz'));
      var quizOpen = [];
      var totalQestao = quiz.length;
      var totalErros = 0;
      var totalCorretas = 0;
      var pesoQuestao = 0;
      var pesoQuestaoStatus = false;
      var pesoAlternativa = 0;
      var pesoAlternativaStatus = false;

      $.each(quiz, function(indice, item) {

          var it_quiz = {
              uidPAGE: item.uid,
              quizID: item.q,
              alternativas: item.a,
              status: item.r,
              tentativas: item.t
          }

          if (item.r == 0) totalErros += 1;
          if (item.r == 1) totalCorretas += 1;
          if (item.pq) {
              pesoQuestao += parseInt(item.pq);
              pesoQuestaoStatus = true;
              it_quiz.pesoQuestao = item.pq;
          }
          if (item.pa) {
              pesoAlternativa += parseInt(item.pa);
              pesoAlternativaStatus = true;
              it_quiz.pesoAlternativa = item.pa;
          }

          quizOpen.push(it_quiz);
      })

      var obj = {
          quiz: quizOpen,
          total: totalQestao,
          erradas: totalErros,
          corretas: totalCorretas,
          porcentagem: parseInt((totalCorretas / totalQestao) * 100)
      };

      if (pesoQuestaoStatus) {
          obj.totalPesoQuestao = pesoQuestao;
      }

      if (pesoAlternativaStatus) {
          obj.totalPesoAlternativas = pesoAlternativa;
      }

      //console.log(obj);
      events.emit('quiz', obj);
    }
  }

});

events.on('quiz', function(e) {
    // console.log('quiz');
    // console.log(e);
});

// events.emit('quiz-reset');
events.on('quiz-reset', function() {
    console.log('quiz-reset');
    scorm.removeObject("quiz");
});
