
$(document).ready(function() {
	Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty"); 
    localStorage.removeItem("sign");



    // ================================================================tabs交換效果
	var tab_now;
	$('.navbar').addClass('active').find('> .tabs div:eq(0)').addClass('current');
	//預設幫上面tabs選項第一個加上current這個class
	
	$('.tabs div a').click(function () { 
	 	var navbar = $(this).closest('.navbar'),            //就navbar 
	 		index = $(this).closest('div').index();			//點中的那個tab編號(0 or 1)
	 		         
	 	navbar.find('.tabs > div').removeClass('current');  //移除current
	 	$(this).closest('div').addClass('current');			//幫點中那一個tab加current

	 	if (index==1) {
	 		$(".tab_exams").slideUp(); 
	 		$(".tab_questions").slideDown();
	 	} else{
	 		$(".tab_questions").slideUp(); 
	 		$(".tab_exams").slideDown();
	 	};
		
	 	// g.preventDefault();                                 //不確定幹嘛...
	});

	function AddExam(id){
	    var newExamBlock=$('<div class ="blocks" id="'+id+'"><div class="icon-button three_points"><core-icon icon="more-vert"></core-icon><paper-ripple class="circle recenteringTouch" fit></paper-ripple></div><div class="icon-button trash_can"><core-icon icon="delete"></core-icon><paper-ripple class="circle recenteringTouch" fit></paper-ripple></div> <div class="fab green" id="attendbtn"><core-icon icon="create"></core-icon><paper-ripple class="circle recenteringTouch" fit></paper-ripple></div><div class="blocks_text"></div><div class="img_container"><img src   ="assets/1.jpg" /></div></div>');
	    $("#blocks_container").prepend(newExamBlock);
	 }


	    var exams = Parse.Object.extend("Exams");
	    var query = new Parse.Query(exams);
	    query.find({
	        success:function(exams){
	            for(var i = 0; i<exams.length; i++){
	                var examid = exams[i].id;
	                var examname = exams[i].get("examname");
	                var examtime = exams[i].get("examtime");
	                var examdate = exams[i].get("examdate");
	                AddExam(examid);
	                $("#"+examid+" div:eq(3)").append('<p class="blocks_title">'+examname+'</p><p>'+examtime+'  minutes</p><p>'+examdate+'</p>');
	            }
	        }
	    })
});

// =====================================================================預覽考試
$(document).on("click",".fab.green",function(e){
    Show_ConfirmPreview();
});

$(document).on("click",".inner-square.right",function(){
    Close_ConfirmPreview();
});


function Show_ConfirmPreview(){
    $('.tab_exams').toggleClass('blur');    
    $(".confirmPreview_wrapper").toggleClass("open");    
} 

function Close_ConfirmPreview(){
    $('.tab_exams').removeClass('blur');    
    $(".confirmPreview_wrapper").removeClass("open");
}


// ------------------------------------------------------------------------------threePoints

$(document).on('click', '.three_points', function(event) {
    Show_ThreePointsWrapper();
});

$(document).on('click', '#threePointsWrapper_closeBtn', function(){
    console.log("123");
    Close_ThreePointsWrapper();
});

function Show_ThreePointsWrapper(){
    $('.tab_exams').toggleClass('blur');    
    $("#modal_for_threePoints").toggleClass("open");    
}

function Close_ThreePointsWrapper(){
    $('.tab_exams').removeClass('blur');    
    $("#modal_for_threePoints").removeClass("open");
}





//=========================================================================刪除考試，按下垃圾桶
$(document).on("click",".trash_can",function(e){
    var examid = $(this).parent().attr('id');
    Show_ConfirmWrapper();
    // ------------------------------------------------------------刪除block
    var div_clicked=$(e.target).parent().parent('div');
    $(".inner-square.left").click(function(){   //點左邊，確認刪除
        var exam = Parse.Object.extend("Exams");
        var query = new Parse.Query(exam);
        query.equalTo('objectId', examid);
        query.first({
            success:function(exam){
                exam.destroy({
                    success:function(){
                        console.log("Delete exam success!");
                    }
                })
                var examname = exam.get("examname");
                var quesbank = Parse.Object.extend("QuesBank");
                var query = new Parse.Query(quesbank);
                query.equalTo('examname', examname);
                query.find({
                    success:function(ques){
                        for(var i = 0; i<ques.length; i++){
                            ques[i].destroy({
                                success:function(){
                                    console.log("Delete ques from quesbank success!");
                                }
                            })
                        }
                    }
                })
            }
        })

        div_clicked.remove();
        Close_ConfirmWrapper();
    });
});

//----------------------------------------------------------------點右邊沒事
$(document).on("click",".inner-square.right",function(){
	Close_ConfirmWrapper();
});

function Show_ConfirmWrapper(){
	$('.tab_exams').toggleClass('blur');	
	$(".confirmCircle_wrapper").toggleClass("open");	
}

function Close_ConfirmWrapper(){
	$('.tab_exams').removeClass('blur');	
	$(".confirmCircle_wrapper").removeClass("open");
}


//=================================================================================新增考試
$(document).on("click",".add_blocks",function(){
	Open_ModalWrapper();
});
$(document).on("click",".btn_nextModal",function(){
	var exam_name=$("#exam_name").val();
	var time_needed=$("#exam_time").val();
	var exam_date=$("#exam_date").val();
	if(exam_name && time_needed && exam_date != ""){
		var nowState="state2";
		$(".form_step1").toggleClass(nowState);
		$(".form_step2").toggleClass(nowState);
		$(".btn_submitModal").toggleClass(nowState);
		$(".btn_nextModal").toggleClass(nowState);
	}
	else{
		alert("請確認每個欄位皆有輸入值！");
	}
});

blocks_number=0;
$(document).on("click",".btn_submitModal",function(){
	var hard=$("#hardnum").val();
	var normal=$("#normalnum").val();
	var easy=$("#easynum").val();
	var numhard = parseInt(hard);
	var numnormal = parseInt(normal);
	var numeasy = parseInt(easy);
	if(numhard + numnormal + numeasy == 40){
                    if(addnewques(exam_name, time_needed, exam_date, easy, normal, hard)){
                        
                    }
                    else{
                        setTimeout(function(){
                            if(localStorage.getItem("sign") != "no"){
                                addnewexam(exam_name, time_needed, exam_date);
                                /*blocks_number++;
                                AddExam();
                                $("#blocks_added_"+blocks_number+" div:eq(3)").append('<p class="blocks_title">'+exam_name+'</p><p>'+time_needed+'  minutes</p><p>'+exam_date+'</p>');*/
                                Close_ModalWrapper();
                            }
                            else{
                                Close_ModalWrapper();
                            }
                        },1000); 
                    }
	}
	else{
		alert("抽題總數不為40，請重新輸入抽題數目！");
	}
});
$(document).on("click",".btn_close",function(){
	Close_ModalWrapper();
});

function Open_ModalWrapper(){
	$('#modal_for_add').toggleClass('open');
	$('.tab_exams').toggleClass('blur');	
}
function Close_ModalWrapper(){
	$("input").val("");
	$("#modal_for_add").removeClass("open");
	$(".tab_exams").removeClass("blur");
	Back_To_State1();
}
function Back_To_State1(){
	$(".form_step1").removeClass("state2");
	$(".btn_nextModal").removeClass("state2");
	$(".form_step2").removeClass("state2");
	$(".btn_submitModal").removeClass("state2");
}
function AddExam(){
 	var newExamBlock=$('<div class ="blocks" id="blocks_added_'+blocks_number+'"><div class="icon-button three_points"><core-icon icon="more-vert"></core-icon><paper-ripple class="circle recenteringTouch" fit></paper-ripple></div><div class="icon-button trash_can"><core-icon icon="delete"></core-icon><paper-ripple class="circle recenteringTouch" fit></paper-ripple></div> <div class="fab green" id="attendbtn"><core-icon icon="create"></core-icon><paper-ripple class="circle recenteringTouch" fit></paper-ripple></div><div class="blocks_text"></div><div class="img_container"><img src   ="assets/1.jpg" /></div></div>');
	$("#blocks_container").prepend(newExamBlock);
 }

function onlyNum(){  //限制input輸入數字
	if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39))
	if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
	event.returnValue=false;
}








// ==================================================================================back end
addnewques = function(examname, examtime, examdate, easynum, normalnum, hardnum){
    var count = 0;
    var questions = Parse.Object.extend('Questions');
    var easyques = new Parse.Query(questions);
    easyques.equalTo('degree', 1);
    easyques.equalTo('sealed', false);
    easyques.limit(easynum);
    easyques.find({
        success:function(easyquestion){
            if(easyquestion.length<easynum){
                    unsealed(1);
                    localStorage.setItem("sign", "no");
                    alert("There's no enough questions in question bank. Unsealing now~");
            }
            else{
                for(var i = 0; i<easyquestion.length; i++){
                    var Newques = Parse.Object.extend("QuesBank");
                    var newques = new Newques();
                    var question = easyquestion[i].get('Question');
                    var optiona = easyquestion[i].get('OptionA');
                    var optionb = easyquestion[i].get('OptionB');
                    var optionc = easyquestion[i].get('OptionC');
                    var optiond = easyquestion[i].get('OptionD');
                    var answer = easyquestion[i].get('Answer');
                    count++;
                    if(count<10)
                        count = "0"+count;
                    /*var today = new Date();
                    var dd = today.getDate();
                    var mm = today.getMonth()+1; //January is 0!
                    var yyyy = today.getFullYear();

                    if(dd<10) {
                        dd='0'+dd
                    } 

                    if(mm<10) {
                        mm='0'+mm
                    } 
                    today = yyyy + '-' + mm + '-' + dd;
                    console.log(today);*/
                    newques.set('examname', examname);
                    newques.set('Question', question);
                    newques.set('OptionA', optiona);
                    newques.set('OptionB', optionb);
                    newques.set('OptionC', optionc);
                    newques.set('OptionD', optiond);
                    newques.set('Answer', answer);
                    newques.set('no', ""+count+"");
                    newques.save(null, {
                        success:function(){
                            //console.log("update new easyques success!");
                        },
                        error:function(error){
                            unsealed(1);
                        }
                    })
                    easyquestion[i].set('sealed', true);
                    easyquestion[i].save(null,{
                        success:function(){
                            //console.log("question sealed success!");
                        },
                        error:function(error){

                        }
                    })
                }
                if(easynum != 0){
                    alert("EasyQues query success!");
                    var sign = "ok";
                    return sign;  
                }     
            }
        }
    })

    var questions = Parse.Object.extend('Questions');
    var normalques = new Parse.Query(questions);
    normalques.equalTo('degree', 2);
    normalques.equalTo('sealed', false);
    normalques.limit(normalnum);
    normalques.find({
        success:function(normalquestion){
            if(normalquestion.length<normalnum){
                    unsealed(2);
                    localStorage.setItem("sign", "no");
                    alert("There's no enough questions in question bank. Unsealing now~");           
            }
            else{
                for(var i = 0; i<normalquestion.length; i++){
                    var Newques = Parse.Object.extend("QuesBank");
                    var newques = new Newques();
                    var question = normalquestion[i].get('Question');
                    var optiona = normalquestion[i].get('OptionA');
                    var optionb = normalquestion[i].get('OptionB');
                    var optionc = normalquestion[i].get('OptionC');
                    var optiond = normalquestion[i].get('OptionD');
                    var answer = normalquestion[i].get('Answer');
                    count++;
                    if(count<10)
                        count = "0"+count;
                    newques.set('examname', examname);
                    newques.set('Question', question);
                    newques.set('OptionA', optiona);
                    newques.set('OptionB', optionb);
                    newques.set('OptionC', optionc);
                    newques.set('OptionD', optiond);
                    newques.set('Answer', answer);
                    newques.set('no', ""+count+"");
                    newques.save(null, {
                        success:function(){
                            //console.log("update new normalques success!");
                        },
                        error:function(error){
                            unsealed(2);
                        }
                    })
                    normalquestion[i].set('sealed', true);
                    normalquestion[i].save(null,{
                        success:function(){
                            //console.log("question sealed success!");
                        },
                        error:function(error){

                        }
                    })
                }
                if(normalnum != 0){
                    alert("NormalQues query success!");
                }
            }
        }
    })

    var questions = Parse.Object.extend('Questions');
    var hardques = new Parse.Query(questions);
    hardques.equalTo('degree', 3);
    hardques.equalTo('sealed', false);
    hardques.limit(hardnum);
    hardques.find({
        success:function(hardquestion){
            if(hardquestion.length<hardnum){
                unsealed(3);
                localStorage.setItem("sign", "no");
                alert("There's no enough questions in question bank. Unsealing now~");
            }
            else{
                for(var i = 0; i<hardquestion.length; i++){
                    var Newques = Parse.Object.extend("QuesBank");
                    var newques = new Newques();
                    var question = hardquestion[i].get('Question');
                    var optiona = hardquestion[i].get('OptionA');
                    var optionb = hardquestion[i].get('OptionB');
                    var optionc = hardquestion[i].get('OptionC');
                    var optiond = hardquestion[i].get('OptionD');
                    var answer = hardquestion[i].get('Answer');
                    count++;
                    if(count<10)
                        count = "0"+count;
                    newques.set('examname', examname);
                    newques.set('Question', question);
                    newques.set('OptionA', optiona);
                    newques.set('OptionB', optionb);
                    newques.set('OptionC', optionc);
                    newques.set('OptionD', optiond);
                    newques.set('Answer', answer);
                    newques.set('no', ""+count+"");
                    newques.save(null, {
                        success:function(){
                            //console.log("update new hardques success!");
                        },
                        error:function(error){
                            unsealed(3);
                        }
                    })
                    hardquestion[i].set('sealed', true);
                    hardquestion[i].save(null,{
                        success:function(){
                            //console.log("question sealed success!");
                        },
                        error:function(error){

                        }
                    })
                }
                if(hardnum != 0){
                    alert("HardQues query success!");
                }
            }
        }
    })
}

addnewexam = function(examname, examtime, examdate){
    var Exams = Parse.Object.extend('Exams');
    var exams = new Exams();
    exams.set('examname', examname);
    exams.set('examtime', parseInt(examtime));
    exams.set('examdate', examdate.toString());
    exams.save(null, {
        success:function(){
            alert("Add new exam success!");
            setTimeout(function(){
                alert("Auto refresh the page!");
                location.reload();
            },3500); 
        },
        error:function(error){
            console.log("Error: " + error.code + " " + error.message);
        }
    })
}

unsealed = function(degree){
    var questions = Parse.Object.extend('Questions');
    var query = new Parse.Query(questions);
    query.equalTo('degree', degree);
    query.find({
        success:function(examquestion){
            for(var i = 0; i<examquestion.length; i++){
                examquestion[i].set('sealed', false);
                examquestion[i].save(null, {
                    success:function(){
                        console.log("unsealed success!");
                    }
                })
            }
            alert("Unsealed success! Please enter exam data again!");
            Close_ModalWrapper();
        }
    })
}

//about attend a exam

/*$(document).on("click","#attendbtn",function(){
    var examid = $(this).parent().attr('id');
    var exam = Parse.Object.extend("Exams");
    var query = new Parse.Query(exam);
    query.equalTo("objectId", examid);
    query.first({
        success:function(exam){
            var Examrecord = Parse.Object.extend("ExamRecord");
            var examrecord = new Examrecord();
            examrecord.set("user", Parse.User.current());
            examrecord.set("exam", exam);
            examrecord.save(null,{
                success:function(result){
                    console.log("attend exam success!");
                }
            })
        }
    })
});*/

//show test

$(document).on("click","#attendbtn",function(){
    var examid = $(this).parent().attr('id');
    var exam = Parse.Object.extend("Exams");
    var query = new Parse.Query(exam);
    query.equalTo("objectId", examid);
    query.first({
        success:function(exam){
            var examname = exam.get("examname");
            localStorage.setItem("examname", examname);
        }
    })    
});

$(document).on("click","#confirmexam",function(){
    window.location.assign("test.html");
});