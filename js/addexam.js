Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty");

$(document).ready(function(){
    /*var exams = Parse.Object.extend("Exams");
    var query = new Parse.Query(exams);
    query.find({
        success:function(exams){
            if(){
                //show the timer
            }
            else{
                //line up all exams and attend button
            }
        }
    })*/

    $("#submit").click(function(){
        var examname = document.getElementById("examname").value;
        var examtime = document.getElementById("examtime").value;
        var examdate = document.getElementById("examdate").value;
        var hard = document.getElementById("hardnum").value;
        var normal = document.getElementById("normalnum").value;
        var easy = document.getElementById("easynum").value;
        addnewques(examname, examtime, examdate, easy, normal, hard);
    })
})

addnewques = function(examname, examtime, examdate, easynum, normalnum, hardnum){
    var count = 0;
    var questions = Parse.Object.extend('Questions');
    var easyques = new Parse.Query(questions);
    easyques.equalTo('degree', 1);
    easyques.equalTo('sealed', false);
    easyques.limit(easynum);
    easyques.find({
        success:function(easyquestion){
            for(var i = 0; i<easyquestion.length; i++){
                var Newques = Parse.Object.extend("QuesBank");
                var newques = new Newques();
                var question = easyquestion[i].get('Question');
                var optiona = easyquestion[i].get('OptionA');
                var optionb = easyquestion[i].get('OptionB');
                var optionc = easyquestion[i].get('OptionC');
                var optiond = easyquestion[i].get('OptionD');
                var answer = easyquestion[i].get('Answer');
                count++;
                /*var today = new Date();
                var dd = today.getDate();
                var mm = today.getMonth()+1; //January is 0!
                var yyyy = today.getFullYear();

                if(dd<10) {
                    dd='0'+dd
                } 

                if(mm<10) {
                    mm='0'+mm
                } 
                today = yyyy + '-' + mm + '-' + dd;
                console.log(today);*/
                newques.set('examname', examname);
                newques.set('Question', question);
                newques.set('OptionA', optiona);
                newques.set('OptionB', optionb);
                newques.set('OptionC', optionc);
                newques.set('OptionD', optiond);
                newques.set('Answer', answer);
                newques.set('no', ""+count+"");
                newques.save(null, {
                    success:function(){
                        console.log("update new easyques success!");
                    },
                    error:function(error){
                        unsealed(1);
                    }
                })
            }
        }
    })

    var questions = Parse.Object.extend('Questions');
    var normalques = new Parse.Query(questions);
    normalques.equalTo('degree', 2);
    normalques.equalTo('sealed', false);
    normalques.limit(normalnum);
    normalques.find({
        success:function(normalquestion){
            for(var i = 0; i<normalquestion.length; i++){
                var Newques = Parse.Object.extend("QuesBank");
                var newques = new Newques();
                var question = normalquestion[i].get('Question');
                var optiona = normalquestion[i].get('OptionA');
                var optionb = normalquestion[i].get('OptionB');
                var optionc = normalquestion[i].get('OptionC');
                var optiond = normalquestion[i].get('OptionD');
                var answer = normalquestion[i].get('Answer');
                count++;
                newques.set('examname', examname);
                newques.set('Question', question);
                newques.set('OptionA', optiona);
                newques.set('OptionB', optionb);
                newques.set('OptionC', optionc);
                newques.set('OptionD', optiond);
                newques.set('Answer', answer);
                newques.set('no', ""+count+"");
                newques.save(null, {
                    success:function(){
                        console.log("update new normalques success!");
                    },
                    error:function(error){
                        unsealed(2);
                    }
                })
            }
        }
    })

    var questions = Parse.Object.extend('Questions');
    var hardques = new Parse.Query(questions);
    hardques.equalTo('degree', 3);
    hardques.equalTo('sealed', false);
    hardques.limit(normalnum);
    hardques.find({
        success:function(hardquestion){
            for(var i = 0; i<hardquestion.length; i++){
                var Newques = Parse.Object.extend("QuesBank");
                var newques = new Newques();
                var question = hardquestion[i].get('Question');
                var optiona = hardquestion[i].get('OptionA');
                var optionb = hardquestion[i].get('OptionB');
                var optionc = hardquestion[i].get('OptionC');
                var optiond = hardquestion[i].get('OptionD');
                var answer = hardquestion[i].get('Answer');
                count++;
                newques.set('examname', examname);
                newques.set('Question', question);
                newques.set('OptionA', optiona);
                newques.set('OptionB', optionb);
                newques.set('OptionC', optionc);
                newques.set('OptionD', optiond);
                newques.set('Answer', answer);
                newques.set('no', ""+count+"");
                newques.save(null, {
                    success:function(){
                        console.log("update new hardques success!");
                    },
                    error:function(error){
                        unsealed(3);
                    }
                })
            }
        }
    })

    

    //add new exam
    var Exams = Parse.Object.extend('Exams');
    var exams = new Exams();
    exams.set('examname', examname);
    exams.set('examtime', parseInt(examtime));
    exams.set('examdate', examdate.toString());
    exams.save(null, {
        success:function(){
            console.log("add new exam success!");
        },
        error:function(error){
            console.log("Error: " + error.code + " " + error.message);
        }
    })
}

unsealed = function(degree){
    var questions = Parse.Object.extend('Questions');
    var query = new Parse.Query(questions);
    query.equalTo('degree', degree);
    query.find({
        success:function(examquestion){
            for(var i = 0; i<examquestion.length; i++){
                examquestion[i].set('sealed', false);
                examquestion[i].save(null, {
                    success:function(){
                        console.log("unsealed success!");
                    }
                })
            }
        }
    })
}