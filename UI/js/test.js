$(document).ready(function() {
	$('.answer').click(function() {
		$(this).addClass("answerclick").siblings().removeClass("answerclick");
		$(".qusanswer").text($(this).children(".choice").text());
	});

	$('.number').click(function(){
		$(this).addClass('numberclick').siblings().removeClass('numberclick');
		$('.testnumber').text("第" + $(this).text() + "題，" + "你選擇的答案是");
	});

	$('.left,.right').width($(window).width()* 0.07);
	$('.left,.right').height($(window).width()* 0.07);

	$('.left').click(function(){
		if($('.numberclick').text() == "1"){
			alert('這是第一題');
		}

		else{
			$('.numberclick').prev().addClass('numbertoken');
			$('.numberclick').removeClass('numberclick');
			$('.numbertoken').addClass('numberclick').removeClass('numbertoken');
			$('.testnumber').text("第" + $('.numberclick').text() + "題，" + "你選擇的答案是");


			
		}
	});

	$('.right').click(function(){
		if($('.numberclick').text() == "40"){
			alert("已經是最後一題");
		}

		else{
			$('.numberclick').next().addClass('numbertoken');
			$('.numberclick').removeClass('numberclick');
			$('.numbertoken').addClass('numberclick').removeClass('numbertoken');
			$('.testnumber').text("第" + $('.numberclick').text() + "題，" + "你選擇的答案是");

		}

	});	



});

$(window).resize(function(){
	$('.left,.right').width($(window).width()* 0.07);
	$('.left,.right').height($(window).width()* 0.07);
});