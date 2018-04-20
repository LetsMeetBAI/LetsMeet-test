/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
  var config = {
    apiKey: "AIzaSyAxteQnfJWDilWg9SoCPX9kpB3RkTutde4",
    authDomain: "letmeet-bai.firebaseapp.com",
    databaseURL: "https://letmeet-bai.firebaseio.com",
    projectId: "letmeet-bai",
    storageBucket: "letmeet-bai.appspot.com",
    messagingSenderId: "688044304067"
  };
  firebase.initializeApp(config);
  //var firebase = require("firebase");
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
	document.getElementById("meet_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.displayName;
	  if (email_id!=null){
		  var email_id = user.displayName;
	  }else {
		  email_id = user.email;
	  }
      document.getElementById("user_para").innerHTML = "Welcome " + email_id;

    }

  } else {
    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
	document.getElementById("meet_div").style.display = "none";
  }
});

document.getElementById("loginbtn").addEventListener("click", login);
document.getElementById("tologinbtn").addEventListener("click", tologinpage);
document.getElementById("registerbtn").addEventListener("click", register);
document.getElementById("googloginbtn").addEventListener("click", googlogin);
document.getElementById("faceloginbtn").addEventListener("click", facelogin);
document.getElementById("userinfopagebtn").addEventListener("click", userinfopage);
document.getElementById("showeventbtn").addEventListener("click", showevent);
document.getElementById("addeventpagebtn").addEventListener("click", addeventpage);
document.getElementById("letsmeetbtn").addEventListener("click", letsmeet);
document.getElementById("logoutbtn").addEventListener("click", logout);

function letsmeet(){
	window.location.replace('addmeeting.html');
	
}
function addeventpage(){
	window.location.replace('addevent.html');
	
}
function userinfopage(){
	window.location.replace('editprofile.html');
	//var p1 = new Promise((resolve,reject)=>{
	//document.getElementById("edituser_div").style.display = "block";
	//document.getElementById("showuser_div").style.display = "none";
	//});
	//p1.then(function(){
	//window.location.replace('editprofile.html');
	//});
}
function edituserinfo(){
	document.getElementById("edituser_div").style.display = "block";
	document.getElementById("showuser_div").style.display = "none";
	document.getElementById("user_div").style.display = "none";
}
function showuserinfo(){
	document.getElementById("edituser_div").style.display = "none";
	document.getElementById("showuser_div").style.display = "block";
	document.getElementById("user_div").style.display = "none";
	var database = firebase.database();
	var userId = firebase.auth().currentUser.uid;
	return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
	var username_profile = (snapshot.val() && snapshot.val().username) || 'Anonymous';
	var hobby_profile = (snapshot.val() && snapshot.val().hobby ) || 'Anonymous';
	var języki_profile = (snapshot.val() && snapshot.val().języki) || 'Anonymous';
	var płeć_profile = (snapshot.val() && snapshot.val().płeć) || 'Anonymous';
	document.getElementById("username_profile").innerHTML=username_profile;
	document.getElementById("hobby_profile").innerHTML=hobby_profile;
	document.getElementById("języki_profile").innerHTML=języki_profile;
	document.getElementById("płeć_profile").innerHTML=płeć_profile;
	//console.log(username); //działa!
	//console.log(hobby);
	//console.log(języki);
	//console.log(płeć);
	});
	
}
function tologinpage(){
	//window.location.replace('login.html');
	document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "none";
	document.getElementById("meet_div").style.display = "block";
}
function toindexpage(){
	window.location.replace('index.html');
}
function login(){
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
   });
	//toindexpage();
}
function register(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    window.alert("Error : " + errorMessage);
  });

}
function facelogin(){
	FB.init({
    appId      : '1583806705075141',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.6'
    });     
	
	FB.Event.subscribe('auth.authResponseChange', checkLoginState);
	function checkLoginState(event) {
  if (event.authResponse) {
    // User is signed-in Facebook.
    var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
      unsubscribe();
      // Check if we are already signed-in Firebase with the correct user.
      if (!isUserEqual(event.authResponse, firebaseUser)) {
        // Build Firebase credential with the Facebook auth token.
        var credential = firebase.auth.FacebookAuthProvider.credential(
            event.authResponse.accessToken);
        // Sign in with the credential from the Facebook user.
        firebase.auth().signInWithCredential(credential).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
      } else {
        // User is already signed-in Firebase with the correct user.
      }
    });
  } else {
    // User is signed-out of Facebook.
    firebase.auth().signOut();
  }
}
}
function facelogin1(){
	var provider = new firebase.auth.FacebookAuthProvider();
	firebase.auth().signInWithPopup(provider).then(function(result) {
  var token = result.credential.accessToken;

  var user = result.user;

}).catch(function(error) {

  var errorCode = error.code;
  var errorMessage = error.message;
  var email = error.email;
  var credential = error.credential;
});
}
function googlogin(){
  var provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


   firebase.auth().signInWithRedirect(provider);
	firebase.auth().getRedirectResult().then(function(result)  {
        if (result.credential) {
          var token = result.credential.accessToken;
          document.getElementById('quickstart-oauthtoken').textContent = token;
        } else {
          document.getElementById('quickstart-oauthtoken').textContent = 'null';
        }
        var user = result.user;
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
         var email = error.email;
        var credential = error.credential;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          console.error(error);
        }
      });
}
window.fbAsyncInit = function() {
    FB.init({
      appId      : '1583806705075141',
      cookie     : true,
      xfbml      : true,
      version    : '{latest-api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
function logout(){
  firebase.auth().signOut();
}
function addevent(){
	
	var ref = firebase.database().ref();
	var user = firebase.auth().currentUser;
	var eventUser = document.getElementById("event_user").value;
	var eventName = document.getElementById("event_name").value;
	var eventStartDate = document.getElementById("event_from").value;
	var eventEndDate = document.getElementById("event_until").value;
	var eventText = document.getElementById("event_text").value;
	var eventLocation = document.getElementById("event_location").value;
	var eventLink = document.getElementById("event_link").value;

	var postsRef = ref.child("events");
  var newPostRef = postsRef.push();
  newPostRef.set({
    Nazwa: [eventName],
    DataOd: [eventStartDate],
    DataDo: [eventEndDate],
    Opis: [eventText],
    Lokalizacji: [eventLocation],
    Autor: [eventUser],	
	Link: [eventLink]
  }, function(error){
            if (error) {
             console.error(error)
             return
            }
            window.location.replace('index.html');
            //add upload function here
			window.alert("Wydarzenie dodane");
        });
}

function addmeeting(){
	
	var ref = firebase.database().ref();
	var user = firebase.auth().currentUser;
	var meetUser = document.getElementById("meet_user").value;
	var meetName = document.getElementById("meet_name").value;
	var meetStartDate = document.getElementById("meet_from").value;
	var meetEndDate = document.getElementById("meet_until").value;
	var meetText = document.getElementById("meet_text").value;
	var meetLocation = document.getElementById("meet_location").value;

	var postsRef = ref.child("meetings");
  var newPostRef = postsRef.push();

  newPostRef.set({
    Nazwa: [meetName],
    DataOd: [meetStartDate],
    DataDo: [meetEndDate],
    Opis: [meetText],
    Lokalizacji: [meetLocation],
    Autor: [meetUser],	
  }, function(error){
            if (error) {
             console.error(error)
             return
            }
            window.location.replace('index.html');
            //add upload function here
			window.alert("Spotkanie dodane");
        });
}
function showmeet(){
	var leadsRef = database.ref('meetings');
leadsRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
    });
});
}
function showevent(){
	var leadsRef = database.ref('events');
	leadsRef.on('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      var childData = childSnapshot.val();
    });
});
}
function userinfo(){
	firebase.auth().onAuthStateChanged((user) => {
	if (user) {
	var ref = firebase.database().ref();
	var database = firebase.database();
	var UserName = document.getElementById("UserName").value;
	var plec = document.getElementById("sex").value;
	var hobby = document.getElementById("hobby");
	var jezyki = document.getElementById("languages");
    var selected1 = [];
	var selected2 = [];
    for (var i = 0; i < jezyki.length; i++) {
        if (jezyki.options[i].selected) selected1.push(jezyki.options[i].value);
    }
	for (var i = 0; i < hobby.length; i++) {
        if (hobby.options[i].selected) selected2.push(hobby.options[i].value);
    }
	console.log(selected1);
	firebase.database().ref('users/' + user.uid).set({
    username: UserName,
    płeć:plec,
	hobby:selected2,
	języki:selected1	
  });
  
};
})
}
