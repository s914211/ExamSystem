$(document).ready(function() {
    $('.trnormal').click(function() {

        $(this).addClass("trclick").siblings().removeClass("trclick");
        for (i = 0; i <= 4; i++) {

            $('.text').eq(i).val($('.trclick > td').eq(i + 1).text());
        };
    });

    $('#editbtn').click(function() {
        for (i = 0; i <= 4; i++) {

            $('.trclick > td').eq(i + 1).text($('.text').eq(i).val());
        };
    });
    $('#newbtn').click(function() {
        $('table').append("<tr class=\"trnormal\"><td>" + $('.trnormal').last().find('td').eq(0).text() + "</td><td>2</td><td>3</td>4<td>5</td><td>6</td><td>7</td></tr>");

    });

});
