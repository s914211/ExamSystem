$(document).ready(function(){
    Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty");
    var question = Parse.Object.extend('Questions');
    var query = new Parse.Query(question);
    //query.equalTo('ExamType', 1);
    query.limit(40);
    query.find({
        success:function(examquestion){
        	for(var i = 0; i<examquestion.length; i++){
        	    var container = "";
                 console.log(examquestion);
                 var ques = examquestion.get('Question');
                 var questionpic = examquestion.get('QuestionPicture');
                 var optiona = examquestion.get('OptionA');
                 var optionb = examquestion.get('OptionB');
                 var optionc = examquestion.get('OptionC');
                 var optiond = examquestion.get('OptionD');
                 var optionapic = examquestion.get('OptionAPicture');
                 var optionbpic = examquestion.get('OptionBPicture');
                 var optioncpic = examquestion.get('OptionCPicture');
                 var optiondpic = examquestion.get('OptionDPicture');

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

        	    var s = getQuestionString(ques, questionpic, optiona, optionapic, optionb, optionbpic, optionc, optioncpic, optiond, optiondpic);
        	    container += s;
                 var string = "<div id='questions'>" + container + "</div>";
                 $('.Questions').append(string);
                 container = "";
        	}
        }
    })
})

function getQuestionString(ques, questionpic, optiona,optionapic, optionb,optionbpic, optionc,optioncpic,optiond,optiondpic){   	    
    var s1 = "<h1 id='ques'>"+ques+"</h1>";
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