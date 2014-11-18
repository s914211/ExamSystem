$(document).ready(function(){
  Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty");

  signup = function(){
              
        if(document.getElementById('signuppassword').value != document.getElementById('signupcpassword').value){
              alert('密碼不一樣，請確認密碼是一樣的！！');
        }
        else{
          var user = new Parse.User();
              user.set("username", document.getElementById('signupemail').value);
              user.set("name", document.getElementById('signupname').value);
              user.set("password", document.getElementById('signuppassword').value);
              user.set("phonenum", document.getElementById('signuptel').value);
              user.set("email", document.getElementById('signupemail').value);
              user.set("gender", document.getElementById('signupgender').value);
              user.set("idcardnum", document.getElementById('signupid').value);
              user.signUp(null, {
                  success: function(user){
                    alert('success!!');
                    window.location.assign("index.html");
                  },
                  error: function(user, error){
                    alert("You have the wrong email or password!");
                    //alert("Error: " + error.code + " " + error.message);
                  }
              });
        }
  };

  document.getElementById("signupbtn").addEventListener("click", signup);

  login = function(){
    var userid = document.getElementById('loginid').value;
    var userpassword = document.getElementById('loginpassword').value;
    if(userid == "admin" && userpassword =="admin"){
        Parse.User.logIn(userid,userpassword,{
        success:function(){
          window.location.assign("attendexam.html");
        },
        error:function(user, error){
          alert("Error: " + error.code + " " + error.message);
        }
      })
    }
    else{
        Parse.User.logIn(userid,userpassword,{
          success:function(){
            window.location.assign("attendexam.html");
          },
          error:function(user, error){
            alert("You have the wrong email or password!");
            //alert("Error: " + error.code + " " + error.message);
          }
        })
    }
  };


  document.getElementById("loginbtn").addEventListener("click", login);
})