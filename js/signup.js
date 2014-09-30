Parse.initialize("c1V2V3BZTN1lPM7G3L8cLNeI8EAV7XnlvOH4F5CG", "6ddAWuezFW3Bg3xOJa7ryzTSmMjP3ZB4fYJNFqty");

signup = function(){
            
      if(document.getElementById('password').value != document.getElementById('confirmpassword').value){
            alert('密碼不一樣，請確認密碼是一樣的！！');
      }
      else{
        var user = new Parse.User();
            user.set("username", document.getElementById('username').value);
            user.set("password", document.getElementById('password').value);
            user.signUp(null, {
                success: function(user){
                  alert('success!!');
                  //window.location.assign("LoginPage.html");
                },
                error: function(user, error){
                  alert('fail');
                }
            });
      }
};