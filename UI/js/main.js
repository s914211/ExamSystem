//-------------------------------------------------template
var $content = $('header .content'),
    $blur = $('header .overlay'),
    wHeight = $(window).height();

$(window).on('resize', function() {
    wHeight = $(window).height();
});

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

function Scroller() {
    this.latestKnownScrollY = 0;
    this.ticking = false;
}

Scroller.prototype = {

    init: function() {
        window.addEventListener('scroll', this.onScroll.bind(this), false);
        $blur.css('background-image', $('header:first-of-type').css('background-image'));
    },


    onScroll: function() {
        this.latestKnownScrollY = window.scrollY;
        this.requestTick();
    },


    requestTick: function() {
        if (!this.ticking) {
            window.requestAnimFrame(this.update.bind(this));
        }
        this.ticking = true;
    },

    update: function() {
        var currentScrollY = this.latestKnownScrollY;
        this.ticking = false;


        var slowScroll = currentScrollY / 2,
            blurScroll = currentScrollY * 2,
            opaScroll = 1.4 - currentScrollY / 400;
        if (currentScrollY > wHeight)
            $('nav').css('position', 'fixed');
        else
            $('nav').css('position', 'absolute');

        $content.css({
            'transform': 'translateY(' + slowScroll + 'px)',
            '-moz-transform': 'translateY(' + slowScroll + 'px)',
            '-webkit-transform': 'translateY(' + slowScroll + 'px)',
            'opacity': opaScroll
        });

        $blur.css({
            'opacity': blurScroll / wHeight
        });
    }
};


var scroller = new Scroller();
scroller.init();


//-----------------------------------------------------log in

if ($(this).hasClass("is-on")) {
    // $(".signup-fields").slideUp();
    $(this).removeClass('is-on').html("sign up");
    $('.signup-fields').removeClass('is-on');
    $('#submit').attr('value', 'log in');
    $('#verb').html('continue');
} else {
    // $(".signup-fields").slideDown();
    $(this).addClass('is-on').html("nevermind, log in");
    $('.signup-fields').addClass('is-on');
    $('#submit').attr('value', 'sign up');
    $('#verb').html('begin');
}

$('document').ready(function() {
    $(this).hover(function() {
        $('.biggest-container body').height($(window).height());
        $('.biggest-container body').width($(window).width());
    });

    $(window).resize(function() {

        $('.logintext').width($('.container').width() * 0.8);
    });

});
