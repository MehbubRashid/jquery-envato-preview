/*
 * Pure Javascript envato item preview plugin
 *
 * Copyright mobilerast mobilerast@gmail.com 
 * https://www.github.com/mehbubrashid/jquery-envato-preview
 *  https://github.com/rastmob
 *
 */

document.addEventListener("DOMContentLoaded", function() {
    "use strict";

    function envatoPreview() {
        document.querySelectorAll("[data-preview-url]").forEach(function(element) {
            element.addEventListener('mouseover', function(e) {
                var prevUrl = element.getAttribute('data-preview-url') || '';
                var itemName = element.getAttribute('data-item-name') || element.getAttribute('alt') || '';
                var itemAuthor = element.getAttribute('data-item-author') || '';
                var itemCat = element.getAttribute('data-item-category') || '';
                var itemCurrency = element.getAttribute('data-item-currency') || '';
                var itemCost = element.getAttribute('data-item-cost') || '';

                var html = '<div id="env-preview-div" class="env-preview-block env-theme-envato env-preview-shadow" style="">' +
                            '<img class="env-preview-image" src="' + prevUrl + '" alt="' + itemName + '" width="350px" height="auto" style="display:none;">' +
                            '<div class="env-preview-preloader"></div>' +
                            '<h3>' + itemName + '</h3>' +
                            '<div class="style-envato-info">' +
                            '<span class="style-envato-author">by ' + itemAuthor + '</span>' +
                            '<span class="style-envato-category">' + itemCat + '</span>' +
                            '</div>' +
                            '<div class="style-envato-price">' +
                            '<sup>' + itemCurrency + '</sup>' + itemCost +
                            '</div></div>';

                document.body.insertAdjacentHTML('beforeend', html);

                var $prev = document.getElementById('env-preview-div');
                adjustPreviewPosition($prev, e);

                var img = $prev.querySelector('img');
                img.onload = function() {
                    $prev.querySelector('.env-preview-image').style.display = 'block';
                    var preloader = $prev.querySelector('.env-preview-preloader');
                    if (preloader) preloader.remove();
                };
            });

            element.addEventListener('mouseout', function() {
                var $prev = document.getElementById('env-preview-div');
                if ($prev) $prev.remove();
            });
        });
    }

    function adjustPreviewPosition($prev, e) {
        var prevWidth = $prev.offsetWidth;
        var prevHeight = 300; // Assuming a fixed height
        var viewPortWidth = window.innerWidth;
        var viewPortHeight = window.innerHeight;
        var scrollY = window.scrollY;

        var left = e.pageX + 30;
        var top = e.pageY + 30;

        if (left + prevWidth > viewPortWidth) {
            left = e.pageX - prevWidth - 30;
        }

        if (top + prevHeight > scrollY + viewPortHeight) {
            top = e.pageY - prevHeight - 30;
        }

        $prev.style.top = `${top}px`;
        $prev.style.left = `${left}px`;
        $prev.style.display = 'block';
    }

    envatoPreview();
});
