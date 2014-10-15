$(document).ready(function() {
    $('.trnormal').click(function() {

        $(this).addClass("trclick").siblings().removeClass("trclick");
        for (i = 0; i <= 4; i++) {
        	
            $('.text').eq(i).text($('.trclick > td').eq(i).text());
        };
    });
});
