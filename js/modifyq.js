Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty");

modifyq = function(){
    var questions = Parse.Object.extend('Questions');
    var query = new Parse.Query(questions);
    query.find({
    	success:function(allquestion){
    		for(var i = 0; i<allquestion.length; i++){
    			questions.set('Question', "front-end question");
    			questions.set('OptionA', "front-end optiona");
    			questions.set('OptionB', "front-end optionb");
    			questions.set('OptionC', "front-end optionc");
    			questions.set('OptionD', "front-end optiond");
    			questions.set('Answer', "front-end answer");
    		}
    	}
    })
}