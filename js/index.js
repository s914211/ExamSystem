
$(document).ready(function() { 

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

// function Delete_Exam(e){           //用e指定滑鼠點擊目標
// 	$(e.target).parent().parent('div').remove();	
// }


//=================================================================================新增考試
$(document).on("click",".add",function(){
	Open_ModalWrapper();
});
$(document).on("click",".btn_nextModal",function(){
	var nowState="state2";
	$(".form_step1").toggleClass(nowState);
	$(".form_step2").toggleClass(nowState);
	$(".btn_submitModal").toggleClass(nowState);
	$(".btn_nextModal").toggleClass(nowState);
});
$(document).on("click",".btn_submitModal",function(){
	AddExam();
	Close_ModalWrapper();
});
$(document).on("click",".btn_close",function(){
	Close_ModalWrapper();
});

function Open_ModalWrapper(){
	$('.modal-wrapper').toggleClass('open');
	$('.tab_exams').toggleClass('blur');	
}
function Close_ModalWrapper(){
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
 	var newExamBlock=$('<div class ="blocks"><div class="icon-button three_points"><core-icon icon="more-vert"></core-icon><paper-ripple class="circle recenteringTouch" fit></paper-ripple></div><div class="icon-button trash_can"><core-icon icon="delete"></core-icon><paper-ripple class="circle recenteringTouch" fit></paper-ripple></div> <div class="fab green"><core-icon icon="create"></core-icon><paper-ripple class="circle recenteringTouch" fit></paper-ripple></div></div>');
	$(".tab_exams").prepend(newExamBlock);
 }

