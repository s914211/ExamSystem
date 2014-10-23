$(document).ready(function(){
    Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty");
    var current_user = Parse.User.current();
    if(current_user){
        var examrecord = Parse.Object.extend("ExamRecord");
        var query = new Parse.Query(examrecord);
        query.equalTo('user', current_user);
        query.find({
        	success:function(examrecord){

        	},
        	error:function(error){
        	    console.log(error.toString());
        	}
        })
    }
})