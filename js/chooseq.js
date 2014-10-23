$(document).ready(function(){
    Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty");
    var question = Parse.Object.extend('Questions');
    var query = new Parse.Query(question);
    //query.equalTo('ExamType', 1);
    query.find({
        success:function(examquestion){
        	for(var i = 0; i<examquestion.length; i++){
        	    var container = "";    
        	    var s = getQuestionString(examquestion[i]);
        	    container += s;
                 var string = "<div id='questions'>" + container + "</div>";
                 $('.Questions').append(string);
                 container = "";
        	}
        }
    })

    //about examtime
    

})

function getQuestionString(data){   	
    var ques = data.get('Question');
    var optiona = data.get('OptionA');
    var optionb = data.get('OptionB');
    var optionc = data.get('OptionC');
    var optiond = data.get('OptionD');

    var s1 = "<h1 id='ques'>"+ques+"</h1>";
    var s2 = "<h2 id='optiona'>"+optiona+"</h2>";
    var s3 = "<h2 id='optionb'>"+optionb+"</h2>";
    var s4 = "<h2 id='optionc'>"+optionc+"</h2>";
    var s5 = "<h2 id='optiond'>"+optiond+"</h2>";

    var s = "<div id='question'" + s1 + s2 + s3 + s4 + s5  + "</div>";

    return s;
}