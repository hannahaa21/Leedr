var userName;
var userLastName;
var userEmail;
var userPassword;
var userPasswordConfirm;
var userGender;
var userBirthday;
var userCompany;
var userIndustry;
var userCountry;
var userRole;
var userResponsabiliti;
var accountType;
var dataInDb = false;
var db = firebase.firestore();
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    if (dataInDb) {
      window.location.assign("../main/main.html");
    }
    //User is not signed in
    if (user != null) {
      var email = user.email;
    }

  } else {
    // No user is signed in.
  }
});


function login() {
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  accountType = document.getElementById("usertype").options[document.getElementById("usertype").selectedIndex].value;
  if (accountType === "admin")
  {
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then(function (firebaseUser) {
      // Success 
      console.log("Hola ");
      console.log(firebaseUser.user.uid);
      // El usuario existe ahora se revisa si esta en la db de admin
      var docRef = db.collection("users-b2b").doc(firebaseUser.user.uid);
      docRef.get().then(function (doc) {
        if (doc.exists) {
              window.location.assign("../mainAdmin/main.html");
          } else {
          // no existe el documento entonces no es un admin
          window.alert("You are not a registered administrator");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });

      
    })
    .catch(function (error) {
      // Error Handling
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error Here: " + errorCode + " " + errorMessage);
    });
    ///VALIDAR LOGIN CON ADMIN
  }
  else{
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass)
    .then(function (firebaseUser) {
      // Success 
      window.location.assign("../main/main.html");
    })
    .catch(function (error) {
      // Error Handling
      var errorCode = error.code;
      var errorMessage = error.message;
      window.alert("Error : " + errorCode + " " + errorMessage);
    });
  }
  
}

function translateByID(index, lang) {
  return dict[index][lang];
}

function register() {
  userCompany = document.getElementById("company").options[document.getElementById("company").selectedIndex].value;
  userIndustry = document.getElementById("industry").options[document.getElementById("industry").selectedIndex].value;
  userCountry = document.getElementById("country").options[document.getElementById("country").selectedIndex].value;
  userRole = document.getElementById("role").options[document.getElementById("role").selectedIndex].value;
  userResponsabiliti = document.getElementById("responsibility").options[document.getElementById("responsibility").selectedIndex].value;
  //The user didnt fill all the data
  if ((userCompany == "") || (userGender == "") || (userIndustry == "") || (userRole == "") || (userResponsabiliti == "")) {
    window.alert("Error : You are missing something in the registry");
  }
  //The user password and confirmation password arent the same

  //Everything is ok
  else {
    firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword).then(function () {
        firebase.firestore().collection("users-b2c").doc(firebase.auth().currentUser.uid).set({
            name: userName,
            last_name: userLastName,
            email: userEmail,
            country: userCountry,
            birthday: userBirthday,
            company: userCompany,
            gender: userGender,
            industry: userIndustry,
            role: userRole,
            responsability: userResponsabiliti,
            leadership_answered: false,
            eq_answered: false,
            iq_answered: false,
            grit_answered: false,
            financial_answered: false
          })
          .then(function () {
            dataInDb = true;
            window.location.assign("../main/main.html");
            console.log("Document successfully written!");
          })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        window.alert("Error : " + errorMessage + " " + errorCode);
      });
  }
}

function registerTab() {
  document.getElementById("login_div").style.display = "none";
  document.getElementById("register_div").style.display = "block";

}

function loginTab() {
  document.getElementById("login_div").style.display = "block";
  document.getElementById("register_div").style.display = "none";
}

function tutorial() {
  userName = document.getElementById("first_name_register").value;
  userLastName = document.getElementById("last_name_register").value;
  userEmail = document.getElementById("email_register").value;
  userPassword = document.getElementById("password_register").value;
  userPasswordConfirm = document.getElementById("password_confirm").value;
  userGender = document.getElementById("gender").options[document.getElementById("gender").selectedIndex].value;
  userBirthday = document.getElementById("birth_date").value;
  //The user didnt fill all the data
  if ((userName == "") || (userLastName == "") || (userEmail == "") || (userPassword == "") || (userPasswordConfirm == "") ||
    (userCountry == "") || (userBirthday == "")) {
    window.alert("Error : You are missing something in the registry");
  }
  //The user password and confirmation password arent the same
  else if (userPassword != userPasswordConfirm) {
    window.alert("Error : Your passwords dont match");
  }
  else if (userPassword.length<6) {
    window.alert("Error : Password must be 6 or more characters long");
  } else {
    document.getElementById("bg").style.display = "none";
    document.getElementById("tutorial").style.display = "block";
    let i = 1;
    while (i < 8) {
      let tt = "tt" + i;
      let td = "td" + i;
      let imgt = "imgt"+i;
      let tutorialTitulo = "tutorialTitulo" + i;
      let tutorialDesc = "tutorialDesc" + i;
      
      if (i<7)
      {
        let srci = dict[imgt][languageIndex];
        document.getElementById(imgt).src = srci;
      }
      document.getElementById(tt).innerHTML = translateByID(tutorialTitulo, languageIndex);
      document.getElementById(td).innerHTML = translateByID(tutorialDesc, languageIndex);
      i++;
    }
  }

}

function showSecondRegister() {
  document.getElementById("bg").style.display = "block";
  document.getElementById("tutorial").style.display = "none";
  document.getElementById("login_div").style.display = "none";
  document.getElementById("register_div").style.display = "none";
  document.getElementById("register_div2").style.display = "block";
}

jQuery(document).ready(function () {

  document.getElementById("tutorial").style.display = "none";
  document.getElementById("bg").style.display = "block";
  var set_lang = function (dictionary) {
    $("[data-translate]").each(function () {
      if ($(this).is("input")) {
        $(this).attr('placeholder', dictionary[$(this).data("translate")])
      } else {
        $(this).text(dictionary[$(this).data("translate")])
      }
    })
  };

  // Swap languages when menu changes
  $("#language").on("change", function () {
    var language = $(this).val().toLowerCase();

    if (dictionary.hasOwnProperty(language)) {
      set_lang(dictionary[language]);
    }
  });

  // Set initial language to English
  set_lang(dictionary.en);

});

function checkLoggedin() {
  document.getElementById("login_div").style.display = "block";
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      if (dataInDb) {
        // User is signed in.
        window.location.assign("../main/main.html");
        user = firebase.auth().currentUser;
      }
    } else {
      document.getElementById("login_div").style.display = "block";
    }
  });
}
