$(document).ready(function() {
    Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty");
    var exam = Parse.Object.extend('Exams');
    var query = new Parse.Query(exam);    
    query.find({
        success: function(exams) {    

            for (j = 0; j < exams.length; j++) {
                var examname = exams[j].get('examname');
                var examdate = exams[j].get('examdate');
                var examtime = exams[j].get('examtime');
                var examblock = '<div class="blocks"><div class="icon-button three_points"><core-icon icon="more-vert"></core-icon><paper-ripple class="circle recenteringTouch" fit></paper-ripple></div><div class="fab green"><core-icon icon="assignment"></core-icon><paper-ripple class="circle recenteringTouch" fit></paper-ripple></div><div class="blocks_text"><p class="blocks_title">'+examname+'</p><p class"blocks_date">'+examdate+'</p><p class="blocks_time">'+examtime+'</p></div><div class="img_container"><img src="assets/1.jpg" /></div></div>';

        	$(".tab_exams").append(examblock);
            }
        }  

    });
    var he = "nima";



// ================================================================tabs交換效果
var tab_now;
$('.navbar').addClass('active').find('> .tabs div:eq(0)').addClass('current');
//預設幫上面tabs選項第一個加上current這個class

$('.tabs div a').click(function() {
    var navbar = $(this).closest('.navbar'), //就navbar 
        index = $(this).closest('div').index(); //點中的那個tab編號(0 or 1)

    navbar.find('.tabs > div').removeClass('current'); //移除current
    $(this).closest('div').addClass('current'); //幫點中那一個tab加current

    if (index == 1) {
        $(".tab_exams").slideUp();
        $(".tab_questions").slideDown();
    } else {
        $(".tab_questions").slideUp();
        $(".tab_exams").slideDown();
    };

    // g.preventDefault();                                 //不確定幹嘛...
});

$('.tab_exams').delegate('.green','click',function() {
$(this).removeClass('green').addClass('red').html('<core-icon icon="create" aria-label="create" role="img"><svg viewBox="0 0 24 24" height="100%" width="100%" preserveAspectRatio="xMidYMid meet" fit="" style="pointer-events: none; display: block;"><g><path d="M3 17.25v3.75h3.75l11.06-11.06-3.75-3.75-11.06 11.06zm17.71-10.21c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></g></svg></core-icon>');

});

//=========================================================================刪除考試，按下垃圾桶
$(document).on("click",".red",Show_Confirm);

function Show_Confirm(e){
	Show_ConfirmWrapper();
	// ------------------------------------------------------------刪除block
	var div_clicked=$(e.target).parent('.blocks');
	$(".inner-square.left").click(function(){   //點左邊，確認刪除
		div_clicked.remove();
		Close_ConfirmWrapper();
	});
}
//----------------------------------------------------------------點右邊沒事        (我先註解掉，你要用就改)
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

function Delete_Exam(e){           //用e指定滑鼠點擊目標
	$(e.target).parent().parent('div').remove();	
}

//=================================================================================新增考試
$(document).on("click", ".add", function() {
    Open_ModalWrapper();
});
$(document).on("click", ".btn_nextModal", function() {
    var nowState = "state2";
    $(".form_step1").toggleClass(nowState);
    $(".form_step2").toggleClass(nowState);
    $(".btn_submitModal").toggleClass(nowState);
    $(".btn_nextModal").toggleClass(nowState);
});
$(document).on("click", ".btn_submitModal", function() {
    AddExam();
    Close_ModalWrapper();
});
$(document).on("click", ".btn_close", function() {
    Close_ModalWrapper();
});

function Open_ModalWrapper() {
    $('.modal-wrapper').toggleClass('open');
    $('.tab_exams').toggleClass('blur');
}

function Close_ModalWrapper() {
    $(".modal-wrapper").removeClass("open");
    $(".tab_exams").removeClass("blur");
    Back_To_State1();
}

function Back_To_State1() {
    $(".form_step1").removeClass("state2");
    $(".btn_nextModal").removeClass("state2");
    $(".form_step2").removeClass("state2");
    $(".btn_submitModal").removeClass("state2");
}

function AddExam() {
    var newExamBlock = $('<div class ="blocks"><div class="icon-button three_points"><core-icon icon="more-vert"></core-icon><paper-ripple class="circle recenteringTouch" fit></paper-ripple></div><div class="icon-button trash_can"><core-icon icon="delete"></core-icon><paper-ripple class="circle recenteringTouch" fit></paper-ripple></div> <div class="fab green"><core-icon icon="create"></core-icon><paper-ripple class="circle recenteringTouch" fit></paper-ripple></div></div>');
    $(".tab_exams").append(newExamBlock);
}


});
