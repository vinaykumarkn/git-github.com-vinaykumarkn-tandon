// Header megamenu js 
        $(document).ready(function () {
            var timeoutId;

            $('.megamenu-btn, .mega-menu').hover(
                function () {
                    clearTimeout(timeoutId);
                    $('.mega-menu').addClass('show');
                },
                function () {
                    timeoutId = setTimeout(function () {
                        $('.mega-menu').removeClass('show');
                    }, 200);
                }
            );
        });
 

/* ye-edit */
document.addEventListener("DOMContentLoaded", function () {
    var dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(function (dropdown) {
        dropdown.addEventListener('mouseenter', function () {
            this.querySelector('.mega-menu.dropdown-menu').classList.add('show');
        });
        dropdown.addEventListener('mouseleave', function () {
            this.querySelector('.mega-menu.dropdown-menu').classList.remove('show');
        });
    });
});


// Header megamenu js