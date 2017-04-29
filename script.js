jQuery('document').ready(function(){
    var $window = jQuery(window);
    var $progressBar = jQuery('.js-progress-bar');
    var $bannerMenu = jQuery('.js-banner-menu');
    var $section = jQuery('.js-section');
    var $home = jQuery('.js-home');

    // Initialize the page render
    $home.css(
        'height',
        $window.height())
    ;

    jQuery('.js-section-motivation').css(
        'height',
        $window.height() / 2
    );

    Typed.new('.js-typist', {
        strings: jQuery('.js-typist').data('typist').split(','),
        typeSpeed: 0,
        backDelay: 2000,
        loop: true
    });

    // Click on a link of the menu listener
    jQuery('.js-menu-link').click(function(){
        jQuery('html, body').animate(
            {scrollTop: (jQuery(this.hash).position().top) + "px"},
            700
        );
        return false;
    });

    // Scroll listener
    $window.scroll(function () {
        var windowsTop = $window.scrollTop();
        var windowsBottom = windowsTop + $window.height();

        if (windowsTop + 40 >= $home.height()) {
            $bannerMenu.addClass('o-banner--shown');
        } else {
            $bannerMenu.removeClass('o-banner--shown');
        }

        $section.each(function() {
            if(windowsBottom >= jQuery(this).position().top) {
                jQuery('.js-menu-link').each(function() {
                    jQuery(this).removeClass('c-menu__link--highlight');
                });
                jQuery('.js-menu-link[href="#' + $(this).attr('id') + '"]').addClass('c-menu__link--highlight');
            }
        });

        $progressBar.each(function(){
            var progressBarTop = jQuery(this).offset().top;
            var progressBarBottom = progressBarTop + jQuery(this).height();
            if (windowsBottom > progressBarTop && windowsTop < progressBarBottom)
            {
                if (!jQuery(this).hasClass('js-progress-bar__has-loaded'))
                {
                    jQuery(this).addClass('js-progress-bar__has-loaded');
                    progressBar(jQuery(this).find('.js-progress-bar__to-load'));
                }
            }
            else
            {
                jQuery(this).removeClass('js-progress-bar__has-loaded');
            }
        });


    });

    // Resize listener
    $window.resize(function() {
        jQuery('.js-home').css(
            'height',
            jQuery(window).height()
        );
        jQuery('.js-section-motivation').css(
            'height',
            $window.height() / 2
        );
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
