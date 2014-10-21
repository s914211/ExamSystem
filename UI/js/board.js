$(document).ready(function() {

$('.trnormal').on('click', function() {
    $(this).addClass("trclick").siblings().removeClass("trclick");
    for (i = 0; i <= 4; i++) {

        $('.text').eq(i).val($('.trclick > td').eq(i).text());
    };
    $('#dif').val($('.trclick > td').eq(5).text());
    $('#ans').val($('.trclick > td').eq(6).text());
});

$('#editbtn').click(function() {
    for (i = 0; i <= 4; i++) {

        $('.trclick > td').eq(i).text($('.text').eq(i).val());
    };
    $('.trclick > td').eq(5).text($('#dif').val());
    $('.trclick > td').eq(6).text($('#ans').val());

});



$('#newbtn').click(function() {
    	$('.trnormal').removeClass('trclick');
    	var tr = $("<tr class=\"trnormal trclick\"	>" 
        	+ "<td>" + $('.text').eq(0).val() + "</td>" 
        	+ "<td>" + $('.text').eq(1).val() + "</td>" 
        	+ "<td>" + $('.text').eq(2).val() + "</td>" 
        	+ "<td>" + $('.text').eq(3).val() + "</td>" 
        	+ "<td>" + $('.text').eq(4).val() + "</td>" 
        	+ "<td class=\"tdsmall\">" + $('#dif').val() + "</td>"
        	+ "<td class=\"tdsmall\">" + $('#ans').val() + "</td>"
        	+ "</tr>");

       	$('table').append(tr);
 		
 		tr.on('click', function() {

 		    $(this).addClass("trclick").siblings().removeClass("trclick");
 		    for (i = 0; i <= 4; i++) {

 		        $('.text').eq(i).val($('.trclick > td').eq(i).text());
 		    };
    			$('#dif').val($('.trclick > td').eq(5).text());
   				$('#ans').val($('.trclick > td').eq(6).text()); 		    
 		});

 });



 $('#deletebtn').click(function() {
    $('.trclick').remove();  
    $('.text').val("");
    $('#dif').val("請選擇");
    $('#ans').val("請選擇");
});

 

 
});

function clean(){
	$('.text').val("");
    $('#dif').val("請選擇");
    $('#ans').val("請選擇");
};
