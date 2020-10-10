$(window).on("scroll touchmove", function () {
    $('#header').toggleClass('tiny', $(document).scrollTop() > 0);
    $('#secondary-header').toggleClass('hide-on-scroll', $(document).scrollTop() > 0);
    $('#gravatar').toggleClass('gravatar-on-scroll', $(document).scrollTop() > 0);
});
