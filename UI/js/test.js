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




});

$(window).resize(function(){
	$('.left,.right').width($(window).width()* 0.07);
	$('.left,.right').height($(window).width()* 0.07);
});