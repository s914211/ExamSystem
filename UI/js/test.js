$(document).ready(function() {


    $('.answer').click(function() {
        $(this).addClass("answerclick").siblings().removeClass("answerclick");
        $(".qusanswer").text($(this).children(".choice").text());
        ans[$('.numberclick').text()][6] = $(this).children('.choice').text();
    });



    $('.number').click(function() {

        $('.answer').removeClass('answerclick');
        $('.testnumber').text("");
        $('.qusanswer').text("");
        $(this).addClass('numberclick').siblings().removeClass('numberclick');
        $('.testnumber').text("第" + $(this).text() + "題，" + "你選擇的答案是");
        if (ans[$('.numberclick').text()][6]) {
            switch (ans[$('.numberclick').text()][6]) {
                case "A":
                    $('.A').addClass('answerclick');
                    $('.qusanswer').text(ans[$('.numberclick').text()][6]);
                    break;
                case "B":
                    $('.B').addClass('answerclick');
                    $('.qusanswer').text(ans[$('.numberclick').text()][6]);
                    break;
                case "C":
                    $('.C').addClass('answerclick');
                    $('.qusanswer').text(ans[$('.numberclick').text()][6]);
                    break;
                case "D":
                    $('.D').addClass('answerclick');
                    $('.qusanswer').text(ans[$('.numberclick').text()][6]);
                    break;
            }

        }
        for(i = 1; i <= 40; i++)
	{
		if(ans[i][6]){
			$('.number').eq(i-1).addClass('ansslecet');
		}
	}
    });

    $('.left,.right').width($(window).width() * 0.07);
    $('.left,.right').height($(window).width() * 0.07);

    $('.left').click(function() {
        if ($('.numberclick').text() == "1") {
            alert('這是第一題');
        } else {
        	$('.answer').removeClass('answerclick');
        	$('.testnumber').text("");
        	$('.qusanswer').text("");
            $('.numberclick').prev().addClass('numbertoken');
            $('.numberclick').removeClass('numberclick');
            $('.numbertoken').addClass('numberclick').removeClass('numbertoken');
            $('.testnumber').text("第" + $('.numberclick').text() + "題，" + "你選擇的答案是");
            if (ans[$('.numberclick').text()][6]) {
            switch (ans[$('.numberclick').text()][6]) {
                case "A":
                    $('.A').addClass('answerclick');
                    $('.qusanswer').text(ans[$('.numberclick').text()][6]);
                    break;
                case "B":
                    $('.B').addClass('answerclick');
                    $('.qusanswer').text(ans[$('.numberclick').text()][6]);
                    break;
                case "C":
                    $('.C').addClass('answerclick');
                    $('.qusanswer').text(ans[$('.numberclick').text()][6]);
                    break;
                case "D":
                    $('.D').addClass('answerclick');
                    $('.qusanswer').text(ans[$('.numberclick').text()][6]);
                    break;
            }
        }



        }
    });

    $('.right').click(function() {
        if ($('.numberclick').text() == "40") {
            alert("已經是最後一題");
        } else {
        	$('.answer').removeClass('answerclick');
        	$('.testnumber').text("");
        	$('.qusanswer').text("");
            $('.numberclick').next().addClass('numbertoken');
            $('.numberclick').removeClass('numberclick');
            $('.numbertoken').addClass('numberclick').removeClass('numbertoken');
            $('.testnumber').text("第" + $('.numberclick').text() + "題，" + "你選擇的答案是");
            if (ans[$('.numberclick').text()][6]) {
            switch (ans[$('.numberclick').text()][6]) {
                case "A":
                    $('.A').addClass('answerclick');
                    $('.qusanswer').text(ans[$('.numberclick').text()][6]);
                    break;
                case "B":
                    $('.B').addClass('answerclick');
                    $('.qusanswer').text(ans[$('.numberclick').text()][6]);
                    break;
                case "C":
                    $('.C').addClass('answerclick');
                    $('.qusanswer').text(ans[$('.numberclick').text()][6]);
                    break;
                case "D":
                    $('.D').addClass('answerclick');
                    $('.qusanswer').text(ans[$('.numberclick').text()][6]);
                    break;
            }
        }

        }



    });
	
	


});

$(window).resize(function() {
    $('.left,.right').width($(window).width() * 0.07);
    $('.left,.right').height($(window).width() * 0.07);
});


var ans = new Array();
for (i = 1; i <= 40; i++) {
    ans[i] = Array(6);
}
