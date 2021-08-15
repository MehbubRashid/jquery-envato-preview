/*
 * JQuery envato item preview plugin
 *
 * Copyright Mehbub Rashid (email: mehbub.rabu@gmail.com)
 * https://www.github.com/mehbubrashid/jquery-envato-preview
 *
 */

(function($){
    "use strict";

    $.fn.envatoPreview = function() {

        $(this).on('mouseover', function(e){
            
            var html = '<div id="env-preview-div" class="env-preview-block env-theme-envato  env-preview-shadow" style=""><img class="env-preview-image" src="https://www.divdojo.com/wp-content/uploads/2019/10/3357768-590x300.jpg" alt="Pawsitive - Photography WordPress Theme" width="500px" height="auto" style="display:none;"><div class="env-preview-preloader"></div><h3>Pawsitive - Photography WordPress Theme</h3><div class="style-envato-info"><span class="style-envato-author">by admin</span><span class="style-envato-category">PSD Templates</span></div><div class="style-envato-price"><sup>$</sup>Free</div></div>'
            $('body').append(html);

            var $prev = $('#env-preview-div');
            var prevWidth = $prev.width();
            var prevHeight = 300;
            var viewPortBottom = window.scrollY + window.innerHeight;
            var viewPortTop = window.scrollY;

            var left = e.pageX + 30;
            var top = e.pageY + 30;
            
            // If not enough space in right, but has space in left, move the preview to left
            if ( left + prevWidth > $(window).width() && prevWidth <= $(window).width()) {
                // If enough space in the left to fit the entire preview, move it to the left entirely.
                if ( left - 30 >= prevWidth + 30 + $(this).width() ) {
                    left = left - prevWidth - 60 - $(this).width();
                }
                else {
                    // Reduce the left value until it doesn't go out of the screen width
                    while(left - 30 + $(this).width() + prevWidth + 60 > $(window).width()) {
                        left--;
                    }
                }
            }

            // If not enough space in bottom, but has space in top, move the preview to top
            if ( top + prevHeight > viewPortBottom && prevHeight <= viewPortBottom) {
                // If enough space in the top to fit the entire preview, move it to the top entirely.
                if ( top - 30 - viewPortTop >= prevHeight + 30 + $(this).height() ) {
                    top = top - prevHeight - 60 - $(this).height();
                }
                else {
                    // Reduce the top value until it doesn't go out of the screen height
                    while(top - 30 + $(this).height() + prevHeight + 60 > viewPortBottom) {
                        top--;
                    }
                }
            }


            $prev.css({
                width: 'auto',
                height: 'auto',
                top: top + 'px',
                left: left + 'px',
                display: 'block',
            });


            $prev.find('img').on('load', function(){
                $prev.find('.env-preview-image').show();
                $prev.find('.env-preview-preloader').remove();
            });
        });

        

        $(this).on('mouseout', function(e){
            $('#env-preview-div').remove();
        });
        
        
        return this;
    }

})(jQuery);