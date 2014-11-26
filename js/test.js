// =================================================================pagination







$('.pagination li').on('click', function(e) {
    $(".pagination li").removeClass('active');
    $(this).addClass('active');
});



// =================================================================pagination-arrows

// var pr = document.querySelector('.paginate.left');
// var pl = document.querySelector('.paginate.right');

// pr.onclick = slide.bind(this, -1);
// pl.onclick = slide.bind(this, 1);

// var index = 0,
//     total = 5;

// function slide(offset) {
//     index = Math.min(Math.max(index + offset, 0), total - 1);

//     document.querySelector('.counter').innerHTML = (index + 1) + ' / ' + total;

//     pr.setAttribute('data-state', index === 0 ? 'disabled' : '');
//     pl.setAttribute('data-state', index === total - 1 ? 'disabled' : '');
// }

// slide(0);









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
    radioclick();
    rightclickout();
    $('#bigdiv,.arrow').fadeOut(100);
    $('.notification').fadeIn(100);
    $('.notification').fadeOut(2000);
    $('#bigdiv,.arrow').fadeIn(2000);


    $('#bigdiv').delegate('.answer', 'click', function() {


        userans[$('.active').children('a').text()][5] = $(this).children('.choice').text();
    });



    $('body').delegate('.pagination>li,#pre,#next', 'click', function() {

        $('.span,.qussmall').fadeOut(10);
        $('.span,.qussmall').fadeIn(100);
        $('.testnumber').text("");
        useranswer();
        content();
    });


    $('.left,.right').width($(window).width() * 0.07);
    $('.left,.right').height($(window).width() * 0.07);


    $(document).delegate('#pre', 'click', function() {
        if ($('.active').children('a').text() == "1") {
            alert('這是第一題');
        } else if ($('.active').children('a').text() == "21") {
            $('.testnumber').text("");

            $('.Q1_Q20 li').last().addClass('activetoken');
            $('.active').removeClass('active');
            $('.activetoken').addClass('active').removeClass('activetoken');
            useranswer();
            content();
        } else {

            $('.testnumber').text("");

            $('.active').prev().addClass('activetoken');
            $('.active').removeClass('active');
            $('.activetoken').addClass('active').removeClass('activetoken');
            useranswer();
            content();
        }
    });


    $(document).delegate('#next', 'click', function() {
        if ($('.active').children('a').text() == "40") {
            alert("已經是最後一題");
        } else if ($('.active').children('a').text() == "20") {
            $('.testnumber').text("");

            $('.Q21_Q40 li').first().addClass('activetoken');
            $('.active').removeClass('active');
            $('.activetoken').addClass('active').removeClass('activetoken');
            useranswer();
            content();
        } else {

            $('.testnumber').text("");

            $('.active').next().addClass('activetoken');
            $('.active').removeClass('active');
            $('.activetoken').addClass('active').removeClass('activetoken');
            useranswer();
            content();
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
    $('.testnumber').text("第" + $('.active').children('a').text() + "題");
    if (userans[$('.active').children('a').text()][5]) {
        switch (userans[$('.active').children('a').text()][5]) {
            case "A":
                cleanradio();

                $("#options_A").attr("checked", true);
                $('#options_A + label').css({
                    "background": "#7EB634",
                    "border-color": "#7EB634",
                    "box-shadow": "0 0 0 -1px #FFF inset",
                    "color": "#FFF"
                });
                break;
            case "B":
                cleanradio();
                $("#options_B").attr("checked", true);
                $('#options_B + label').css({
                    "background": "#7EB634",
                    "border-color": "#7EB634",
                    "box-shadow": "0 0 0 -1px #FFF inset",
                    "color": "#FFF"
                });
                break;
            case "C":
                cleanradio();
                $("#options_C").attr("checked", true);
                $('#options_C + label').css({
                    "background": "#7EB634",
                    "border-color": "#7EB634",
                    "box-shadow": "0 0 0 -1px #FFF inset",
                    "color": "#FFF"
                });
                break;
            case "D":
                cleanradio();
                $("#options_D").attr("checked", true);
                $('#options_D + label').css({
                    "background": "#7EB634",
                    "border-color": "#7EB634",
                    "box-shadow": "0 0 0 -1px #FFF inset",
                    "color": "#FFF"
                });
                break;
        }

    } else {
        cleanradio();
        $("input[type=radio]").attr("checked", false);
    }
}

function save() {



    var localexamname = localStorage.getItem("examname");
    var question = Parse.Object.extend('QuesBank');
    var query = new Parse.Query(question);
    query.equalTo("examname", "測試用");
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
    $('.qussmall').text(userans[$('.active').children('a').text()][0]);
    $('.spanA').text(userans[$('.active').children('a').text()][1]);
    $('.spanB').text(userans[$('.active').children('a').text()][2]);
    $('.spanC').text(userans[$('.active').children('a').text()][3]);
    $('.spanD').text(userans[$('.active').children('a').text()][4]);
}

function calculatescore() {
    var localexamname = localStorage.getItem("examname");
    var question = Parse.Object.extend('QuesBank');
    var query = new Parse.Query(question);
    query.equalTo("examname", localexamname);
    query.ascending("no");
    query.find({
        success: function(examquestion) {
            var correctnum = 0;
            for (var i = 1; i <= examquestion.length; i++) {
                var quesanswer = examquestion[i].get('Answer');
                if (quesanswer == userans[i][5]) {
                    correctnum++;
                }
            }
            var exam = Parse.Object.extend('Exams');
            var query = new Parse.Query(exam);
            query.equalTo("examname", localexamname);
            query.find({
                success: function(exam) {
                    var examrecord = Parse.Object.extend('ExamRecord');
                    var query = new Parse.Query(examrecord);
                    query.equalTo("user", Parse.User.current());
                    query.equalTo("exam", exam);
                    query.first({
                        success: function(userrecord) {
                            userrecord.set("score", correctnum);
                            userrecord.save(null, {
                                success: function(result) {
                                    console.log("User exam score save success!");
                                }
                            })
                        }
                    })
                }
            })
        }
    })
}

function radioclick() {
    $("input[type=radio]").click(function() {
        cleanradio();
        $(this).next('.choice').css({
                    "background": "#7EB634",
                    "border-color": "#7EB634",
                    "box-shadow": "0 0 0 -1px #FFF inset",
                    "color": "#FFF"
                });
    })
}

function cleanradio() {
    $('label').css({
        "display": "inline-block",
        "width": "50px",
        "line-height": "50px",
        "text-align": "center",
        "border": "1px solid #999",
        "border-radius": "50%",
        "box-shadow": "0 0 0 45px #FFF inset",
        "transition": "200ms all",
        "cursor": "pointer",
        "color": "#000"
    });
}

function rightclickout() {
    var omitformtags=["input", "textarea", "select"]

omitformtags=omitformtags.join("|")

function disableselect(e){
if (omitformtags.indexOf(e.target.tagName.toLowerCase())==-1)
return false
}

function reEnable(){
return true
}

if (typeof document.onselectstart!="undefined")
document.onselectstart=new Function ("return false")
else{
document.onmousedown=disableselect
document.onmouseup=reEnable
}

}