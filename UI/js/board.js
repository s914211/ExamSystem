$(document).ready(function() {
    $('.trnormal').click(function() {

        $(this).addClass("trclick").siblings().removeClass("trclick");
        for (i = 0; i <= 4; i++) {

            $('.text').eq(i).val($('.trclick > td').eq(i).text());
        };
    });

    $('button').click(function(){
    	for (i = 0; i <= 4; i++) {

            $('.trclick > td').eq(i).text($('.text').eq(i).val());
        };
    })
});
