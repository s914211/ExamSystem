$(document).ready(function() {
    Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty");

    var question = Parse.Object.extend('example');
        var query = new Parse.Query(question);
        query.equalTo('no', '1');
        query.first({
            success:function(examquestion){
                var ques = examquestion.get('Question');
                var optiona = examquestion.get('OptionA');
                var optionb = examquestion.get('OptionB');
                var optionc = examquestion.get('OptionC');
                var optiond = examquestion.get('OptionD'); 
                document.getElementById("bigdiv").innerHTML = "<div class='question'> <div class='quscontent'>"+ques + " </div> </div> <div class='content'> <div class='answer A'> <div class='choiceimg'></div>"+optiona+" <span class='choice'>A</span> </div> <div class='answer B'> <div class='choiceimg'></div>"+optionb+" <span class='choice'>B</span> </div> <div class='answer C'><div class='choiceimg'></div>"+optionc+"<span class='choice'>C</span></div><div class='answer D'><div class='choiceimg'></div>"+optiond+"<span class='choice'>D</span></div></div>";
            }
        })

    $('.answer').click(function() {
        $(this).addClass("answerclick").siblings().removeClass("answerclick");
        $(".qusanswer").text($(this).children(".choice").text());
        ans[$('.numberclick').text()][6] = $(this).children('.choice').text();
    });



    $('.number,.left,.right').click(function() {
        for (i = 1; i <= 40; i++) {
            if (ans[i][6]) {
                $('.number').eq(i - 1).addClass('ansslecet');
            }
        }
        $('.answer').removeClass('answerclick');
        $('.testnumber').text("");
        $('.qusanswer').text("");
        $(this).addClass('numberclick').siblings().removeClass('numberclick');
        useranswer();

        var question = Parse.Object.extend('example');
        var query = new Parse.Query(question);
        query.equalTo('no', $(this).text());
        query.first({
            success:function(examquestion){
                var ques = examquestion.get('Question');
                var optiona = examquestion.get('OptionA');
                var optionb = examquestion.get('OptionB');
                var optionc = examquestion.get('OptionC');
                var optiond = examquestion.get('OptionD'); 
                document.getElementById("bigdiv").innerHTML = "<div class='question'> <div class='quscontent'>"+ques + " </div> </div> <div class='content'> <div class='answer A'> <div class='choiceimg'></div>"+optiona+" <span class='choice'>A</span> </div> <div class='answer B'> <div class='choiceimg'></div>"+optionb+" <span class='choice'>B</span> </div> <div class='answer C'><div class='choiceimg'></div>"+optionc+"<span class='choice'>C</span></div><div class='answer D'><div class='choiceimg'></div>"+optiond+"<span class='choice'>D</span></div></div>";
            }
        })


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
            useranswer();



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
            useranswer();

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

function useranswer() {
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
