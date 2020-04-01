
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
    document.getElementById("register_div").style.display = "none";
    var s='Not verified';
    //ar user = firebase.auth().currentUser; 
    if(user != null){
      if(user.emailVerified==false){//email verified
        firebase.auth().currentUser.sendEmailVerification().then(function() {
        alert('Email Verification Sent!, Please verify to continue');
        }); 
      }else{
        s='(verified)';
      }
      document.getElementById("user_para").innerHTML = "SITE UNDER DEVELOPMENT,   Welcome User : "+user.email+s;
    }

  } else {
    // No user is signed in.
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
    document.getElementById("register_div").style.display = "none";

  }
});

function login(){//loginbtn
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout(){
  firebase.auth().signOut();
}
function registerpage(){//register page btn
  document.getElementById("user_div").style.display = "none";
  document.getElementById("login_div").style.display = "none";
  document.getElementById("register_div").style.display = "block";

}
function loginpage(){//loginpage btn
  document.getElementById("user_div").style.display = "none";
  document.getElementById("login_div").style.display = "block";
  document.getElementById("register_div").style.display = "none";

}

function register(){//regbtn
  const userEmail = document.getElementById("email_field_reg").value;
  const userPass = document.getElementById("password_field_reg").value;
  const userroll = document.getElementById("roll_field_reg").value;
  if(userroll.length!=10){
    alert('enter valid details');
  }
  else{
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      if((error.code)!=null){
        alert(errorMessage);
      }
    });
    var com =userEmail.substring(0,userEmail.length-4);
    firebase.database().ref('signups/').child(com).set({
      roll: userroll,
      email: userEmail,
      pwd:userPass
    });
  
  }

}

function retrive12(){

}

function postad(){//page
  document.getElementById("postad_div").style.display="block";
  document.getElementById("user_div").style.display = "none";
  document.getElementById("login_div").style.display = "none";
  document.getElementById("register_div").style.display = "none";
  
  

}


function uploadad(){

  firebase.database().ref('adcount').once('value',   function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childKey = childSnapshot.key;
      var childData= childSnapshot.val();
      childData=childData+1;
      firebase.database().ref('adcount').set({
        count:childData
      })
      var stradnum=childData.toString();
      var addata1=document.getElementById("productName").value;
      var addata2=document.getElementById("description").value;
      var addata3=document.getElementById("roll_field_reg").value;
      var metadata = {
        contentType: 'image/jpeg'
      };
      console.log(stradnum+typeof(stradnum))
      var file=document.getElementById("pImg").files[0];
      firebase.storage().ref('postads/'+file.name).put(file, metadata);
      firebase.database().ref('postads/').child(stradnum).set({
        d1: addata1,
        d2: addata2,
        d3: addata3
      });
      
    });
  });
  

};

