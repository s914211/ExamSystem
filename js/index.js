
$(document).ready(function() { 
	var page_height=$(window).height();
	var pade_width=$(window).width();
	$("#blocks_container").css("height",page_height-56);

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
});

//=========================================================================刪除考試，按下垃圾桶
$(document).on("click",".trash_can",Show_Confirm);

function Show_Confirm(e){
	Show_ConfirmWrapper();
	// ------------------------------------------------------------刪除block
	var div_clicked=$(e.target).parent().parent('div');
	$(".inner-square.left").click(function(){   //點左邊，確認刪除
		div_clicked.remove();
		Close_ConfirmWrapper();
	});
}
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
$(document).on("click",".add",function(){
	Open_ModalWrapper();
});
$(document).on("click",".btn_nextModal",function(){
	exam_name=$("#examname").val();
	time_needed=$("#examtime").val();
	exam_date=$("#examdate").val();
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
	hard=$("#hardnum").val();
	normal=$("#normalnum").val();
	easy=$("#easynum").val();
	var numhard = parseInt(hard);
    var numnormal = parseInt(normal);
    var numeasy = parseInt(easy);
	if(numhard + numnormal + numeasy == 40){
		blocks_number++;
		AddExam();
		$("#blocks_added_"+blocks_number+" div:eq(3)").append('<p class="blocks_title">'+exam_name+'</p><p>'+time_needed+'  minutes</p><p>'+exam_date+'</p>');
		Close_ModalWrapper();
		forreload();
	}
});
$(document).on("click",".btn_close",function(){
	Close_ModalWrapper();
});

function Open_ModalWrapper(){
	$('.modal-wrapper').toggleClass('open');
	$('.tab_exams').toggleClass('blur');	
}
function Close_ModalWrapper(){
	$("input").val("");
	$(".modal-wrapper").removeClass("open");
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
 	var newExamBlock=$('<div class ="blocks" id="blocks_added_'+blocks_number+'"><div class="icon-button three_points"><core-icon icon="more-vert"></core-icon><paper-ripple class="circle recenteringTouch" fit></paper-ripple></div><div class="icon-button trash_can"><core-icon icon="delete"></core-icon><paper-ripple class="circle recenteringTouch" fit></paper-ripple></div> <div class="fab green"><core-icon icon="create"></core-icon><paper-ripple class="circle recenteringTouch" fit></paper-ripple></div><div class="blocks_text"></div><div class="img_container"><img src   ="assets/1.jpg" /></div></div>');
	$("#blocks_container").prepend(newExamBlock);
 }

function onlyNum(){  //限制input輸入數字
	if(!(event.keyCode==46)&&!(event.keyCode==8)&&!(event.keyCode==37)&&!(event.keyCode==39))
	if(!((event.keyCode>=48&&event.keyCode<=57)||(event.keyCode>=96&&event.keyCode<=105)))
	event.returnValue=false;
}

function forreload() {
    location.reload();
}
