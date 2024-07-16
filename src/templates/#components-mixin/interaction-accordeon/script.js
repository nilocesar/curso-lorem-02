events.on('ready', function() {
    if ($('.interaction-accordeon').length > 0) {
        $(function() {
            var contents = $('.accordeon-texto');
            var titles = $('.accordeon-title');

            titles.find('.seta-container').addClass('animated infinite pulse');

            titles.on('click', function() {
                var title = $(this);
                contents.filter(':visible').slideUp(function() {
                    $(this).prev('.accordeon-title').removeClass('is-opened');
                });
                var content = title.next('.accordeon-texto');
                if (!content.is(':visible')) {
                    content.slideDown(function() { title.addClass('is-opened') });
                }

                $(this).find('.seta-container').removeClass('animated infinite pulse');
            });
        });
    }
});
