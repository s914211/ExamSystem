$(document).ready(function() {

$('.trnormal').on('click', function() {
    $(this).addClass("trclick").siblings().removeClass("trclick");
    for (i = 0; i <= 4; i++) {

        $('.text').eq(i).val($('.trclick > td').eq(i).text());
    };
});

$('#editbtn').click(function() {
    for (i = 0; i <= 4; i++) {

        $('.trclick > td').eq(i).text($('.text').eq(i).val());
    };
});


    $('#newbtn').click(function() {
    	$('.trnormal').removeClass('trclick');
    	var tr = $("<tr class=\"trnormal trclick\"	>" 
        	+ "<td>" + $('.text').eq(0).val() + "</td>" 
        	+ "<td>" + $('.text').eq(1).val() + "</td>" 
        	+ "<td>" + $('.text').eq(2).val() + "</td>" 
        	+ "<td>" + $('.text').eq(3).val() + "</td>" 
        	+ "<td>" + $('.text').eq(4).val() + "</td>" 
        	+ "</tr>");

       	$('table').append(tr);
 		
 		tr.on('click', function() {

 		    $(this).addClass("trclick").siblings().removeClass("trclick");
 		    for (i = 0; i <= 4; i++) {

 		        $('.text').eq(i).val($('.trclick > td').eq(i).text());
 		    };
 		});

 });

 $('#deletebtn').click(function() {

     if (confirm("確定刪除？")) {
         $('.trclick').remove();
     };
 });

});
