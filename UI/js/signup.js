Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty");

signup = function(){
            
      if(document.getElementById('signuppassword').value != document.getElementById('signupcpassword').value){
            alert('密碼不一樣，請確認密碼是一樣的！！');
      }
      else{
        var user = new Parse.User();
            user.set("userid", document.getElementById('signupid').value);
            user.set("username", document.getElementById('signupname').value);
            user.set("password", document.getElementById('password').value);
            user.set("phonenum", document.getElementById('signuptel').value);
            user.set("email", document.getElementById('signupemail').value);
            user.set("gender", document.getElementById('signupgender').value);
            user.signUp(null, {
                success: function(user){
                  alert('success!!');
                  window.location.assign("UI/index.html");
                },
                error: function(user, error){
                  alert('fail');
                }
            });
      }
};

document.getElementById("signupbtn").addEventListener("click", signup);

login = function(){
  var userid = document.getElementById('loginid');
  var userpassword = document.getElementById('loginpassword');
  Parse.User.logIn(userid,userpassword,{
    success:function(){
      alert("login success!");
    },
    error:function(){
      alert("Login failed!");
    }
  })
};

document.getElementById("loginbtn").addEventListener("click", login);

/*login = function(){
    var user = Parse.Object.extend('User');
    var query = new Parse.Query(user);
    query.find({
        success:function(userdata){
            for(var i = 0; i < userdata.length; i++){
                 var username = userdata[i].get('username');
                 var password = userdata[i].get('password');
                 if(username == 'front-end username'){
                      if(password != 'front-end password'){
                          alert("You have the wrong password!");
                      }
                      else{
                          window.location.assign("");
                      }
                 }
                 else{
                     alert("You have the wrong username!");
                 }
            }
        }
    })
}*/