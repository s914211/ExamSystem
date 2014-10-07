Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty");

addnewques = function(examquestionbank, questionbank, num){
    var Newquesbank = Parse.Object.extend("'"+examquestionbank+"'");
    var newquesbank = new Newquesbank();
    var questions = Parse.Object.extend("'"+questionbank+"'");
    var query = new Parse.Query(questions);
    query.limit(num);
    query.find({
        success:function(examquestion){
        	for(var i = 0; i<examquestion.length; i++){
        	    var question = examquestion[i].get('Question');
        	    var questionpic = examquestion[i].get('QuestionPicture');
        	    var optiona = examquestion[i].get('OptionA');
        	    var optionb = examquestion[i].get('OptionB');
        	    var optionc = examquestion[i].get('OptionC');
        	    var optiond = examquestion[i].get('OptionD');
        	    var optionapic = examquestion[i].get('OptionAPicture');
        	    var optionbpic = examquestion[i].get('OptionBPicture');
        	    var optioncpic = examquestion[i].get('OptionCPicture');
        	    var optiondpic = examquestion[i].get('OptionDPicture');
        	    var answer = examquestion[i].get('Answer');
        	    newquesbank.set('Question', question);
        	    newquesbank.set('QuestionPicture', questionpic);
        	    newquesbank.set('OptionA', optiona);
        	    newquesbank.set('OptionB', optionb);
        	    newquesbank.set('OptionC', optionc);
        	    newquesbank.set('OptionD', optiond);
        	    newquesbank.set('OptionAPicture', optionapic);
        	    newquesbank.set('OptionBPicture', optionbpic);
        	    newquesbank.set('OptionCPicture', optioncpic);
        	    newquesbank.set('OptionDPicture', optiondpic);
        	    newquesbank.set('Answer', answer);
        	}
        }
    })
    //addnewexam
    var Exams = Parse.Object.extend('Exams');
    var exams = new Exams();
    exams.set('examname', "front-end examname");
    exams.set('examtime', "front-end examtime");
    exams.set('questionbank', examquestionbank);
    exams.save(null,{
        success:function(results){
            console.log("Add exam success!");
        },
        error:function(error){
        	console.log(error.toString());
        }
    })
}