Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty");

addnewques = function(examname, easynum, normalnum, hardnum){
    var Newquesbank = Parse.Object.extend("'" + examname + "'");
    var newquesbank = new Newquesbank();
    var questions = Parse.Object.extend('Questions');
    var easyques = new Parse.Query(questions);
    easyques.equalTo('degree', 1);
    easyques.equalTo('sealed', false);
    easyques.limit(easynum);
    var normalques = new Parse.Query(questions);
    normalques.equalTo('degree', 2);
    normalques.equalTo('sealed', false);
    normalques.limit(normalnum);
    var hardques = new Parse.Query(questions);
    hardques.equalTo('degree', 3);
    hardques.equalTo('sealed', false);
    hardques.limit(hardnum);

    var mainQuery = Parse.Query.or(easyques, normalques, hardques);
    mainQuery.find({
        success:function(examquestion){
            for(var i = 0; i<examquestion.length; i++){
                var question = examquestion[i].get('Question');
                var optiona = examquestion[i].get('OptionA');
                var optionb = examquestion[i].get('OptionB');
                var optionc = examquestion[i].get('OptionC');
                var optiond = examquestion[i].get('OptionD');
                var answer = examquestion[i].get('Answer');
                newquesbank.set('Question', question);
                newquesbank.set('OptionA', optiona);
                newquesbank.set('OptionB', optionb);
                newquesbank.set('OptionC', optionc);
                newquesbank.set('OptionD', optiond);
                newquesbank.set('Answer', answer);
                //sealed the selected question
                examquestion[i].set('sealed', true);
            }
        },
        error:function(error){
            unsealed();
            alert("Unsealed questions success! Please Click the button again to finish the process.");
        }
    })
}

unsealed = function(){
    var questions = Parse.Object.extend('Questions');
    var query = new Parse.Query(questions);
    query.find({
        success:function(examquestion){
            for(var i = 0; i<examquestion.length; i++){
                examquestion[i].set('sealed', false);
            }
        }
    })
}

/*addnewques = function(examquestionbank, questionbankeasy, easynum, questionbanknormal, normalnum, questionbankhard, hardnum){
    var Newquesbank = Parse.Object.extend("'"+examquestionbank+"'");
    var newquesbank = new Newquesbank();
    var questions = Parse.Object.extend("'"+questionbankeasy+"'");
    var query = new Parse.Query(questions);
    query.equalTo('sealed', false);
    query.limit(easynum);
    query.find({
        success:function(examquestion){
        	for(var i = 0; i<examquestion.length; i++){
        	    var question = examquestion[i].get('Question');
        	    var optiona = examquestion[i].get('OptionA');
        	    var optionb = examquestion[i].get('OptionB');
        	    var optionc = examquestion[i].get('OptionC');
        	    var optiond = examquestion[i].get('OptionD');
        	    var answer = examquestion[i].get('Answer');
        	    newquesbank.set('Question', question);
        	    newquesbank.set('OptionA', optiona);
        	    newquesbank.set('OptionB', optionb);
        	    newquesbank.set('OptionC', optionc);
        	    newquesbank.set('OptionD', optiond);
        	    newquesbank.set('Answer', answer);
                //sealed the selected question
                examquestion[i].set('sealed', true);
        	}
        },
        error:function(error){
            unsealed(questionbankeasy);
            alert("Unsealed questions success! Please Click the button again to finish the process.");
        }
    })
    var questions = Parse.Object.extend("'"+questionbanknormal+"'");
        var query = new Parse.Query(questions);
        query.equalTo('sealed', false);
        query.limit(normalnum);
        query.find({
            success:function(examquestion){
                for(var i = 0; i<examquestion.length; i++){
                    var question = examquestion[i].get('Question');
                    var optiona = examquestion[i].get('OptionA');
                    var optionb = examquestion[i].get('OptionB');
                    var optionc = examquestion[i].get('OptionC');
                    var optiond = examquestion[i].get('OptionD');
                    var answer = examquestion[i].get('Answer');
                    newquesbank.set('Question', question);
                    newquesbank.set('OptionA', optiona);
                    newquesbank.set('OptionB', optionb);
                    newquesbank.set('OptionC', optionc);
                    newquesbank.set('OptionD', optiond);
                    newquesbank.set('Answer', answer);
                    //sealed the selected question
                    examquestion[i].set('sealed', true);
                }
            },
            error:function(error){
                unsealed(questionbanknormal);
                alert("Unsealed questions success! Please Click the button again to finish the process.");
            }
        })
    var questions = Parse.Object.extend("'"+questionbankhard+"'");
    var query = new Parse.Query(questions);
    query.equalTo('sealed', false);
    query.limit(hardnum);
    query.find({
        success:function(examquestion){
            for(var i = 0; i<examquestion.length; i++){
                var question = examquestion[i].get('Question');
                var questionpic = examquestion[i].get('QuestionPicture');
                var optiona = examquestion[i].get('OptionA');
                var optionb = examquestion[i].get('OptionB');
                var optionc = examquestion[i].get('OptionC');
                var optiond = examquestion[i].get('OptionD');
                var answer = examquestion[i].get('Answer');
                newquesbank.set('Question', question);
                newquesbank.set('OptionA', optiona);
                newquesbank.set('OptionB', optionb);
                newquesbank.set('OptionC', optionc);
                newquesbank.set('OptionD', optiond);
                newquesbank.set('Answer', answer);
                //sealed the selected question
                examquestion[i].set('sealed', true);
            }
        },
        error:function(error){
            unsealed(questionbankhard);
            alert("Unsealed questions success! Please Click the button again to finish the process.");
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
}*/