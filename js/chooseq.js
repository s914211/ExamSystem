$(document).ready(function(){
    Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty");
    var question = Parse.Object.extend('Questions');
    var query = new Parse.Query(question);
    query.equalTo('ExamType', 1);
    query.limit(40);
    query.find({
        success:function(examquestion){
        	for(var i = 0; i<examquestion.length; i++){
        	    var container = "";
        	    var s = getQuestionString(examquestion);
        	    container += s;
                 var string = "<div id='questions'>" + container + "</div>";
                 $('.Questions').append(string);
                 container = "";
        	}
        }
    })
})

function getQuestionString(data){
    var question = data.get('Question');
    var questionpic = data.get('QuestionPicture');
    var optiona = data.get('OptionA');
    var optionb = data.get('OptionB');
    var optionc = data.get('OptionC');
    var optiond = data.get('OptionD');
    var optionapic = data.get('OptionAPicture');
    var optionbpic = data.get('OptionBPicture');
    var optioncpic = data.get('OptionCPicture');
    var optiondpic = data.get('OptionDPicture');

    if(questionpic == undefined)
    	questionpic = "";
    else if(optionapic == undefined)
    	optionapic = "";
    else if(optionbpic == undefined)
    	optionbpic = "";
     else if(optioncpic == undefined)
    	optioncpic = "";
    else if(optiondpic == undefined)
    	optiondpic = "";    	   	    

    var s1 = "<h1 id='ques'>"+question+"</h1>";
    var s2 = "<img src='"+questionpic+"'>";
    var s3 = "<h2 id='optiona'>"+optiona+"</h2>";
    var s4 = "<img src='"+optionapic+"'>";
    var s5 = "<h2 id='optionb'>"+optionb+"</h2>";
    var s6 = "<img src='"+optionbpic+"'>";
    var s7 = "<h2 id='optionc'>"+optionc+"</h2>";
    var s8 = "<img src='"+optioncpic+"'>";
    var s9 = "<h2 id='optiond'>"+optiond+"</h2>";
    var s10 = "<img src='"+optiondpic+"'>";

    var s = "<div id='question'" + s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8 + s9 + s10 + "</div>";

    return s;
}