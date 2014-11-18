















// =================================================================pagination







$('.pagination li').on('click', function(e){
  $(".pagination li").removeClass('active');
  $(this).addClass('active');  
})



// =================================================================pagination-arrows

var pr = document.querySelector( '.paginate.left' );
var pl = document.querySelector( '.paginate.right' );

pr.onclick = slide.bind( this, -1 );
pl.onclick = slide.bind( this, 1 );

var index = 0, total = 5;

function slide(offset) {
  index = Math.min( Math.max( index + offset, 0 ), total - 1 );

  document.querySelector( '.counter' ).innerHTML = ( index + 1 ) + ' / ' + total;

  pr.setAttribute( 'data-state', index === 0 ? 'disabled' : '' );
  pl.setAttribute( 'data-state', index === total - 1 ? 'disabled' : '' );
}

slide(0);











$(document).ready(function() {
    Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty");
    var localexamname = localStorage.getItem("examname");
    var question = Parse.Object.extend('QuesBank');
    var query = new Parse.Query(question);
    query.equalTo("examname", localexamname);
    query.equalTo("no", "01");
    query.first({
        success: function(examquestion) {
            $('.qussmall').text(examquestion.get('Question'));
            $('.spanA').text(examquestion.get('OptionA'));
            $('.spanB').text(examquestion.get('OptionB'));
            $('.spanC').text(examquestion.get('OptionC'));
            $('.spanD').text(examquestion.get('OptionD'));
        }
    });
    save();
    $('#bigdiv,.arrow').fadeOut(100);
    $('.notification').fadeIn(100);
    $('.notification').fadeOut(2000);
    $('#bigdiv,.arrow').fadeIn(2000);


    $('#bigdiv').delegate('.answer', 'click', function() {
        $(this).addClass("answerclick").siblings().removeClass("answerclick");
        $(".qusanswer").text($(this).children(".choice").text());
        userans[$('.numberclick').text()][5] = $(this).children('.choice').text();
    });



    $('body').delegate('.number,.left,.right', 'click', function() {

        for (i = 1; i <= 40; i++) {
            if (userans[i][5]) {
                $('.number').eq(i - 1).addClass('ansslecet');
            }
        }
        $('.span,.qussmall').fadeOut(10);
        $('.span,.qussmall').fadeIn(100);
        $('.answer').removeClass('answerclick');
        $('.testnumber').text("");
        $('.qusanswer').text("");
        $(this).addClass('numberclick').siblings().removeClass('numberclick');
        useranswer();
        content();
    });


    $('.left,.right').width($(window).width() * 0.07);
    $('.left,.right').height($(window).width() * 0.07);


    $('.arrow').delegate('.left', 'click', function() {
        if ($('.numberclick').text() == "1") {
            alert('這是第一題');
        } else {
            $('.answer').removeClass('answerclick');
            $('.testnumber').text("");
            $('.qusanswer').text("");
            $('.numberclick').prev().addClass('numbertoken');
            $('.numberclick').removeClass('numberclick');
            $('.numbertoken').addClass('numberclick').removeClass('numbertoken');
        }
    });


    $('.arrow').delegate('.right', 'click', function() {
        if ($('.numberclick').text() == "40") {
            alert("已經是最後一題");
        } else {
            $('.answer').removeClass('answerclick');
            $('.testnumber').text("");
            $('.qusanswer').text("");
            $('.numberclick').next().addClass('numbertoken');
            $('.numberclick').removeClass('numberclick');
            $('.numbertoken').addClass('numberclick').removeClass('numbertoken');
        }
    });


    var con = ".header,.exam,.question,.content,.footer";
    var click = ".number,.arrow,.answer";

    $('.handin').click(function() {
        $(con).addClass('opacity');
        $('.handlog').slideDown(200);
        $(click).hide();
    });

    $('.handno').click(function() {
        $(con).toggleClass('opacity');
        $('.handlog').slideUp(200);
        $(click).show();
    });


});

$(window).resize(function() {
    $('.left,.right').width($(window).width() * 0.07);
    $('.left,.right').height($(window).width() * 0.07);
});


var userans = new Array();
for (i = 1; i <= 40; i++) {
    userans[i] = Array(6);
}

function useranswer() {
    $('.testnumber').text("第" + $('.numberclick').text() + "題，" + "你選擇的答案是");
    if (userans[$('.numberclick').text()][5]) {
        switch (userans[$('.numberclick').text()][5]) {
            case "A":
                $('.A').addClass('answerclick');
                $('.qusanswer').text(userans[$('.numberclick').text()][5]);
                break;
            case "B":
                $('.B').addClass('answerclick');
                $('.qusanswer').text(userans[$('.numberclick').text()][5]);
                break;
            case "C":
                $('.C').addClass('answerclick');
                $('.qusanswer').text(userans[$('.numberclick').text()][5]);
                break;
            case "D":
                $('.D').addClass('answerclick');
                $('.qusanswer').text(userans[$('.numberclick').text()][5]);
                break;
        }

    }
}

function save() {



    var localexamname = localStorage.getItem("examname");
    var question = Parse.Object.extend('QuesBank');
    var query = new Parse.Query(question);
    query.ascending("no");
    query.find({
        success: function(examquestion) {
            for (var i = 1; i <= examquestion.length; i++) {

                userans[i][0] = examquestion[i - 1].get('Question');
                userans[i][1] = examquestion[i - 1].get('OptionA');
                userans[i][2] = examquestion[i - 1].get('OptionB');
                userans[i][3] = examquestion[i - 1].get('OptionC');
                userans[i][4] = examquestion[i - 1].get('OptionD');
            }
        }
    });

}

function content() {
    $('.qussmall').text(userans[$('.numberclick').text()][0]);
    $('.spanA').text(userans[$('.numberclick').text()][1]);
    $('.spanB').text(userans[$('.numberclick').text()][2]);
    $('.spanC').text(userans[$('.numberclick').text()][3]);
    $('.spanD').text(userans[$('.numberclick').text()][4]);
}


