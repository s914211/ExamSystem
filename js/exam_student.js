Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty");

$(document).ready(function(){
    var exams = Parse.Object.extend('Exams');
    var query = new Parse.Query(exams);
    query.find({
        success:function(exams){
        	for(var i = 0; i<exams.length; i++){
        	    //show all exams
        	}
        },
        error:function(error){
        	console.log(error.toString());
        }
    })
})

function signupexam(){
    var exams = Parse.Object.extend('Exams');
    var query = new Parse.Query(exams);
    query.equalTo('examname', /*examname*/);
    query.first({
        success:function(exam){
            var Examrecord = Parse.Object.extend('ExamRecord');
            var examrecord = new Examrecord();
            examrecord.set('exam', exam);
            examrecord.set('user', Parse.User.current());
            examrecord.save(null,{
                success:function(result){
                    console.log("Examrecord record success!");
                },
                error:function(error){
                    console.log(error.toString());
                }
            })
        }
    })
}