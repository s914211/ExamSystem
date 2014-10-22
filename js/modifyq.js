Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty");

modifyq = function(){
    var questions = Parse.Object.extend('Questions');
    var query = new Parse.Query(questions);
    query.equalTo('objectId', "front-end choose question");
    query.first({
    	success:function(question){
    		question.set('Question', "front-end question");
    		question.set('OptionA', "front-end optiona");
    		question.set('OptionB', "front-end optionb");
    		question.set('OptionC', "front-end optionc");
    		question.set('OptionD', "front-end optiond");
    		question.set('Answer', "front-end answer");
                          question.save(null, {
                                    success:function(){
                                            console.log("modifyq success!");
                                    },
                                    error:function(error){
                                            console.log(error.toString());
                                    }
                          })
    	}
    })
}

addq = function(){
    var Question = Parse.Object.extend('Questions');
    var question = new Question();
    question.set('Question', "new question");
    question.set('OptionA', "new optiona");
    question.set('OptionB', "new optionb");
    question.set('OptionC', "new optionc");
    question.set('OptionD', "new optiond");
    question.set('Answer', "new answer");
    question.save(null, {
        success:function(){
            console.log("add question success!");
            //window.location.href="http://s914211.github.io/ExamSystem/dashboard.html";
        },
        error:function(error){
            console.log(error.toString());
        }
    })
}

deleteq = function(){
    var questions = Parse.Object.extend('Questions');
    var query = new Parse.Query(questions);
    query.equalTo('objectId', "front-end question");
    query.first({
        success:function(question){
            question.destroy({
                success:function(results){
                    console.log("delete question success!");
                },
                error:function(error){
                    console.log(error.toString());
                }
            })
        },
        error:function(error){
            console.log(error.toString());
        }
    })
}