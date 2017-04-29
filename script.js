jQuery('document').ready(function(){

    var nav = $('.c-menu');

    jQuery('.js-home').css('height', (jQuery(window).height()));
    jQuery('.js-section-motivation').css('height', (jQuery(window).height() / 2));


    jQuery('.js-menu-link').click(function(){
        jQuery('html, body').animate({scrollTop: (jQuery(this.hash).position().top - 40) + "px"}, 700);
        return false;
    });

    jQuery(window).scroll(function () {
        var windowsTop = jQuery(window).scrollTop();
        var windowsBottom = windowsTop + jQuery(window).height();
        var sectionSkillsTop = jQuery('.js-section-skills').offset().top;
        var sectionSkillsBottom = sectionSkillsTop + jQuery('.js-section-skills').height();

        if (windowsTop > 300) {
            nav.addClass('c-menu--shown');
        } else {
            nav.removeClass('c-menu--shown');
        }

        jQuery('.js-section').each(function() {
            if(windowsBottom / 2 >= jQuery(this).position().top) {
                jQuery('.js-menu-link').each(function() {
                    jQuery(this).removeClass('c-menu__link--highlight');
                });
                jQuery('.js-menu-link[href="#' + $(this).attr('id') + '"]').addClass('c-menu__link--highlight');
            }
        });


        if (windowsBottom > sectionSkillsTop && windowsTop < sectionSkillsBottom)
        {
            if (!jQuery('.js-section-skills').hasClass('js-progress-bar-loaded'))
            {
                jQuery('.js-section-skills').addClass('js-progress-bar-loaded');
                jQuery.each(jQuery('.js-progress-bar'),function(){
                    progressBar(jQuery(this));
                });
            }
        }
        else
        {
            jQuery('.js-section-skills').removeClass('js-progress-bar-loaded');
        }
    });

    jQuery(window).resize(function() {
        jQuery('.js-home').css('height', (jQuery(window).height()));
        jQuery('.js-section-motivation').css('height', (jQuery(window).height() / 2));
    });

    Typed.new('.js-typist', {
        strings: jQuery('.js-typist').data('typist').split(','),
        typeSpeed: 0,
        backDelay: 2000,
        loop: true
    });
});

function progressBar(element) {
    var maxWidth = element.data('value');
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= maxWidth)
        {
            clearInterval(id);
        }
        else
        {
            width++;
            element.css('width',width + '%');
        }
    }
}
