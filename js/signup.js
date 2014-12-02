$(document).ready(function(){
  Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty");

  signup = function(){
              
        if(document.getElementById('signuppassword').value != document.getElementById('signupcpassword').value){
              //alert('密碼不一樣，請確認密碼是一樣的！！');
              sweetAlert("Oops...", "密碼不一樣，請確認密碼是一樣的！", "error");
        }
        else{
          var user = new Parse.User();
              user.set("username", document.getElementById('signupemail').value);
              user.set("password", document.getElementById('signuppassword').value);
              user.set("phonenum", document.getElementById('signuptel').value);
              user.set("email", document.getElementById('signupemail').value);
              user.signUp(null, {
                  success: function(user){
                    swal("Good job!", "註冊成功！", "success");
                    setTimeout(function(){
                      window.location.assign("index.html");      
                    },1500); 
                  },
                  error: function(user, error){
                    sweetAlert("Oops...", "Email格式或是密碼有錯誤喔！", "error");
                    //alert("Error: " + error.code + " " + error.message);
                  }
              });
        }
  };

  document.getElementById("signupbtn").addEventListener("click", signup);

  login = function(){
    var userid = document.getElementById('username').value;
    var userpassword = document.getElementById('password').value;
    if(userid == "admin" && userpassword =="admin"){
        Parse.User.logIn(userid,userpassword,{
        success:function(){
          window.location.assign("pageForAdministrator.html");
        },
        error:function(user, error){
          alert("Error: " + error.code + " " + error.message);
        }
      })
    }
    else{
        Parse.User.logIn(userid,userpassword,{
          success:function(){
            window.location.assign("pageForStudent.html");
          },
          error:function(user, error){
            sweetAlert("Oops...", "帳號或是密碼有錯誤喔！", "error");
            //alert("Error: " + error.code + " " + error.message);
          }
        })
    }
  };


  document.getElementById("loginbtn").addEventListener("click", login);

  $("#account, #loginpass").keyup(function(event){
      if(event.keyCode == 13){
          $("#loginbtn").click();
      }
  });

})