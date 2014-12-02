$(document).ready(function() {

Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty");
    var question = Parse.Object.extend('Questions');
    var query = new Parse.Query(question);
    query.limit(500);
    query.find({
        success:function(examquestion){
            for(var i = 0; i<examquestion.length; i++){
                var container = "";    
                var s = getQuestionString(examquestion[i]);
                container += s;
                $('.Questions').append(container);
                container = "";
            }
        }
    })

    //about examtime


$('table').delegate('.trnormal','click', function() {
    $(this).addClass("trclick").siblings().removeClass("trclick");
    for (i = 0; i <= 4; i++) {

        $('.text').eq(i).val($('.trclick > td').eq(i).text());
    };
    $('#dif').html($('.trclick > td').eq(5).text());
    $('#ans').html($('.trclick > td').eq(6).text());
    var id = $(this).attr('id');
    localStorage['quesid'] = id;
});

$('#editbtn').click(function() {
	if($('#dif').html()=="選擇難易度" || $('#ans').html()=="選擇答案"){

	}
	else{
                for (i = 0; i <= 4; i++) {
                    $('.trclick > td').eq(i).text($('.text').eq(i).val());
                };
                $('.trclick > td').eq(5).text($('#dif').html());
                $('.trclick > td').eq(6).text($('#ans').html());
                var quesid = localStorage.getItem('quesid');
                var degree = 0;
                if($('#dif').html() == "難")
                    degree = 3;
                else if($('#dif').html() == "中")
                    degree = 2;
                else if($('#dif').html() == "易")
                    degree = 1;

                modifyq(quesid, $('.text').eq(0).val(), $('.text').eq(1).val(), $('.text').eq(2).val(), $('.text').eq(3).val(), $('.text').eq(4).val(), degree, $('#ans').html());
            }
});



$('#newbtn').click(function() {
	if($('#dif').html()=="請選擇" || $('#ans').html()=="請選擇"){

	}
	else
    	{
    		$('.trnormal').removeClass('trclick');
    	    	var tr = $("<tr class=\"trnormal trclick\"	>" 
    	        	+ "<td>" + $('.text').eq(0).val() + "</td>" 
    	        	+ "<td>" + $('.text').eq(1).val() + "</td>" 
    	        	+ "<td>" + $('.text').eq(2).val() + "</td>" 
    	        	+ "<td>" + $('.text').eq(3).val() + "</td>" 
    	        	+ "<td>" + $('.text').eq(4).val() + "</td>" 
    	        	+ "<td class=\"tdsmall\">" + $('#dif').html() + "</td>"
    	        	+ "<td class=\"tdsmall\">" + $('#ans').html() + "</td>"
    	        	+ "</tr>");
    	
    	       	$('table').append(tr);
                       var degree = 0;
                       if($('#dif').html() == "難")
                           degree = 3;
                       else if($('#dif').html() == "中")
                           degree = 2;
                       else if($('#dif').html() == "易")
                           degree = 1;
                       addq($('.text').eq(0).val(), $('.text').eq(1).val(), $('.text').eq(2).val(), $('.text').eq(3).val(), $('.text').eq(4).val(), degree, $('#ans').html());
    	 	};





 });





 $('#deletebtn').click(function() {
 	if(confirm("確定刪除？")){
 	    $('.trclick').remove();  
 	    $('.text').val("");
 	    $('#dif').html("選擇難易度");
 	    $('#ans').html("選擇答案");};
           var quesid = localStorage.getItem('quesid');
           deleteq(quesid);
});

 

 
});

function clean(){
	$('.text').val("");
    $('#dif').html("選擇難易度");
    $('#ans').html("選擇答案");
    $('.trnormal').removeClass('trclick');
};


function getQuestionString(data){
    var quesid = data.id;       
    var ques = data.get('Question');
    var optiona = data.get('OptionA');
    var optionb = data.get('OptionB');
    var optionc = data.get('OptionC');
    var optiond = data.get('OptionD');
    var degree = data.get('degree');
    var difficulties = "";
    if(degree == 1)
        difficulties = "易";
    else if(degree == 2)
        difficulties = "中";
    else
        difficulties = "難";

    var ans = data.get('Answer');

    var s1 = "<td>"+ques+"</h1>";
    var s2 = "<td>"+optiona+"</h2>";
    var s3 = "<td>"+optionb+"</h2>";
    var s4 = "<td>"+optionc+"</h2>";
    var s5 = "<td>"+optiond+"</h2>";
    var s6 = "<td class='tdsmall'>"+difficulties+"</h2>";
    var s7 = "<td class='tdsmall'>"+ans+"</h2>";

    var s = "<tr class='trnormal' id='" +quesid +"'>" + s1 + s2 + s3 + s4 + s5 + s6 + s7 + "</tr>";

    return s;
}

modifyq = function(questionid, ques, optiona, optionb, optionc, optiond, degree, ans){
    var questions = Parse.Object.extend('Questions');
    var query = new Parse.Query(questions);
    query.equalTo('objectId', questionid);
    query.first({
        success:function(question){
            question.set('Question', ques);
            question.set('OptionA', optiona);
            question.set('OptionB', optionb);
            question.set('OptionC', optionc);
            question.set('OptionD', optiond);
            question.set('degree', degree);
            question.set('Answer', ans);
                          question.save(null, {
                                    success:function(){
                                            alert("修改題目成功!");
                                    },
                                    error:function(error){
                                            console.log(error.toString());
                                    }
                          })
        }
    })
}

deleteq = function(questionid){
    var questions = Parse.Object.extend('Questions');
    var query = new Parse.Query(questions);
    query.equalTo('objectId', questionid);
    query.first({
        success:function(question){
            question.destroy({
                success:function(results){
                    alert("刪除題目成功!");
                },
                error:function(error){
                    console.log(error.toString());
                }
            })
        },
        error:function(error){
            console.log(error.toString());
        }
    })
}

addq = function(ques, optiona, optionb, optionc, optiond, degree, ans){
    var Question = Parse.Object.extend('Questions');
    var question = new Question();
    question.set('Question', ques);
    question.set('OptionA', optiona);
    question.set('OptionB', optionb);
    question.set('OptionC', optionc);
    question.set('OptionD', optiond);
    question.set('degree', degree);
    question.set('sealed', true);
    question.set('Answer', ans);
    question.save(null, {
        success:function(){
            alert("新增題目成功!為了與伺服器同步將自動刷新頁面。");
            window.location.assign("pageForAdministrator.html");
        },
        error:function(error){
            console.log(error.toString());
        }
    })
}

// =======================================================
var dropdowns = $(".dropdown");

// Onclick on a dropdown, toggle visibility
dropdowns.find("dt").click(function(){
    dropdowns.find("dd ul").hide();
    $(this).next().children().toggle();
});

// Clic handler for dropdown
dropdowns.find("dd ul li a").click(function(){
    var leSpan = $(this).parents(".dropdown").find("dt a span");
  
    // Remove selected class
    $(this).parents(".dropdown").find('dd a').each(function(){
    $(this).removeClass('selected');
  });
  
    // Update selected value
    leSpan.html($(this).html());
  
    // If back to default, remove selected class else addclass on right element
    if($(this).hasClass('default')){
    leSpan.removeClass('selected')
  }
    else{
        leSpan.addClass('selected');
        $(this).addClass('selected');
    }
  
    // Close dropdown
    $(this).parents("ul").hide();
});

// Close all dropdown onclick on another element
$(document).bind('click', function(e){
    if (! $(e.target).parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
});








