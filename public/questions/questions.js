let actualQuestion = 30;
let arrayIndex = 29;
let preguntaPorcentaje = 30;
let answers = [];
let language = localStorage.getItem("language");;
var userInfo;
var userKey;
var userInfo;
var eqReady = false;
var gritReady = false;
var leadershipReady = false;
var iqReady = false;
var jobReady = false;
var individualAttrition = 0;

//firebase stuff

function logout() {
    firebase.auth().signOut()
        .then(function (firebaseUser) {
            // Success 
            window.location.assign("../index.html");
        })
        .catch(function (error) {
            // Error Handling
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error : " + errorCode + " " + errorMessage);
        });
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        userKey = firebase.auth().currentUser.uid;
        loadUserInfo(user.uid, function (user) {
            userInfo = user;
        });
    } else {
        location.replace("../index.html");
    }
});

function loadUserInfo(uid, fn) {
    var docRef = firebase.firestore().collection("users-b2c").doc(uid);
    docRef.get().then(function (doc) {
        if (doc.exists) {
            cuUser = doc.data();
            fn(cuUser);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            fn(null);
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
        fn(null);
    });
}

function saveAnswersAndResults(answers){
    var gritAnswers = [];
    gritAnswers[0] = answers[0];
    gritAnswers[1] = answers[1];
    gritAnswers[2] = answers[2];
    gritAnswers[3] = answers[7];
    gritAnswers[4] = answers[15];
    gritAnswers[5] = answers[18];
    gritAnswers[6] = answers[20];
    gritAnswers[7] = answers[22];
    gritAnswers[8] = answers[23];
    gritAnswers[9] = answers[24];
    gritAnswers[10] = answers[25];
    gritAnswers[11] = answers[28];
    gritAnswers[12] = answers[30];
    gritAnswers[13] = answers[33];
    gritAnswers[14] = answers[37];
    gritAnswers[15] = answers[45];
    gritAnswers[16] = answers[46];
    gritAnswers[17] = answers[47];
    gritAnswers[18] = answers[48];
    var eqAnswers = [];
    eqAnswers[0] = answers[0];
    eqAnswers[1] = answers[2];
    eqAnswers[2] = answers[7];
    eqAnswers[3] = answers[13];
    eqAnswers[4] = answers[14];
    eqAnswers[5] = answers[22];
    eqAnswers[6] = answers[25];
    eqAnswers[7] = answers[30];
    eqAnswers[8] = answers[34];
    eqAnswers[9] = answers[36];
    eqAnswers[10] = answers[37];
    eqAnswers[11] = answers[38];
    eqAnswers[12] = answers[49];
    eqAnswers[13] = answers[50];
    eqAnswers[14] = answers[52];
    eqAnswers[15] = answers[53];
    eqAnswers[16] = answers[54];
    eqAnswers[17] = answers[55];
    eqAnswers[18] = answers[56];
    eqAnswers[19] = answers[59];
    var leadershipAnswers = [];
    var i = 0;
    while(i<40){
        leadershipAnswers[i] = answers[i];
        i++;
    }
    var iqAnswers = [];
    iqAnswers[0] = answers[4];
    iqAnswers[1] = answers[6];
    iqAnswers[2] = answers[14];
    iqAnswers[3] = answers[15];
    iqAnswers[4] = answers[20];
    iqAnswers[5] = answers[28];
    iqAnswers[6] = answers[29];
    var gritResults = calculateGrid(gritAnswers);
    var eqResults = calculateEQ(eqAnswers);
    var leadershipResults = calculateLeadership(leadershipAnswers);
    var iqResults = calculateIQ(iqAnswers);
    var jobResults = calculateJob();
    //Add to firebase
    var docRef = firebase.firestore().collection("users-b2c").doc(userKey);
    var docRefGrit = docRef.collection("Scores").doc("grit_scores");
    var docRefEQ = docRef.collection("Scores").doc("eq_scores");
    var docRefleadership = docRef.collection("Scores").doc("leadership_scores");
    var docRefIQ = docRef.collection("Scores").doc("iq_scores");
    var docRefJob = docRef.collection("Scores").doc("job_scores");
    individualAttrition = (1 - ((leadershipResults[9] * 0.1) + (leadershipResults[5] * 0.15) + (eqResults[5] * 0.15 + (gritResults[1] * 0.2) + (eqResults[1] * 0.1) + (gritResults[3] * 0.15) + (0.15 / gritResults[3]))));
    
    docRefJob.set({
        job_fitness_answers: jobResults
    })
        .then(function () {
            jobReady = true;
            toMain();
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        });

    docRefGrit.set({
        grit_profile : gritResults[0],
        personal_grit : gritResults[1],
        entr_grit : gritResults[2],
        overall_grit : gritResults[3],
        suggestions: gritResults[4],
        personal_grit_text: gritResults[5],
        entr_grit_text: gritResults[6]
    })
        .then(function (){
    docRef.update({
        grit_answered: true,
      })
       .then(function () {
           gritReady = true;
           toMain();
        })
        .catch(function (error) {
          console.error("Error updating document: ", error);
        });
    })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        });
    docRefEQ.set({
        eq_profile: eqResults[0],
        real_eq: eqResults[1],
        potential_eq: eqResults[2],
        suggestions: eqResults[3],
        description: eqResults[4],
        self_awarness: eqResults[5],
        self_managment: eqResults[6],
        social_awarness: eqResults[7],
        social_managment: eqResults[8]
    })
        .then(function () {
            docRef.update({
                eq_answered: true,
            })
                .then(function () {
                    eqReady = true;
                    toMain();
                })
                .catch(function (error) {
                    console.error("Error updating document: ", error);
                });
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        });
    docRefleadership.set({
        leadership_profile: leadershipResults[0],
        leadership_profile_description: leadershipResults[1],
        primary_trait: leadershipResults[2],
        secondary_trait: leadershipResults[3],
        communication_score: leadershipResults[4],
        confrontation_score: leadershipResults[5],
        team_score: leadershipResults[6],
        leedr_score: leadershipResults[7],
        leadership_score: leadershipResults[8],
        desition_making_score: leadershipResults[9]
    })
        .then(function () {
            docRef.update({
                leadership_answered: true,
            })
                .then(function () {
                    leadershipReady = true;
                    toMain();
                })
                .catch(function (error) {
                    console.error("Error updating document: ", error);
                });
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        });
    docRefIQ.set({
        iq_competencces: iqResults[0],
        suggestion_one: iqResults[1],
        suggestion_two: iqResults[2],
        suggestion_three: iqResults[3],
        business_instinct_correct: iqResults[4],
        one_time_desition_making_correct: iqResults[5],
        understands_diversity_correct: iqResults[6],
        problem_solving_correct: iqResults[7],
        innovation_understanding_correct: iqResults[8],
        buisness_inventivness_correct: iqResults[9],
        being_strategic_correct: iqResults[10]
    })
        .then(function () {
            docRef.update({
                iq_answered: true,
            })
                .then(function () {
                    iqReady = true;
                    toMain();
                })
                .catch(function (error) {
                    console.error("Error updating document: ", error);
                });
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        });
}
function toMain(){
    if (eqReady && gritReady && leadershipReady && iqReady && jobReady){
        saveAnswers();
        window.location.assign("../main/main.html");
    }
}
function saveAnswers(){
    var docRef = firebase.firestore().collection("users-b2c").doc(userKey)
    docRef.update({
        Answers: answers,
        individual_attrition: individualAttrition
    })
        .then(function () {
        })
        .catch(function (error) {
        console.error("Error updating document: ", error);
        });
    }
//Firebase stuff end
function getAge() {
    var today = new Date();
    var birthDate = new Date(userInfo.birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
//Algoriithms
function calculateJob(){
    questionsJob = [0,2,7,11,13,18,21,23,27,30];
    correctAnswers = ["2","2","1","1","2","1","1","1","1","2"];
    var rigthAnswers = [];
    for(var i = 0; i <questionsJob.length; i++){
        var actualQuestion = questionsJob[i];
        var ca = correctAnswers[i];
        if (answers[actualQuestion].localeCompare(ca) == 0){
            rigthAnswers[i] = 2;
        }
        else{
            rigthAnswers[i] = 0;
        }
    }
    return rigthAnswers;
}
function calculateIQ(IQAnswers){
    correctAnswers = ["2","1","2","2","2","2","1"];
    reco = ["IQSugerencia_Business_instincts", "IQSugerencia_On_time_decision_making", "IQSugerencia_Understands_Diversity", "IQSugerencia_Problem_solving", "IQSugerencia_Innovation_Understanding", "IQSugerencia_Business_Inventiveness", "IQSugerencia_Being_Strategic"];
    var correctlyAnswered = [];
    var contador = 0;
    for (var i = 0; i < IQAnswers.length; i++) {
        var ca = correctAnswers[i];
        if (IQAnswers[i].localeCompare(ca) == 0) {
            contador++;
            correctlyAnswered[i] = true;
        }
        else{
            correctlyAnswered[i] = false;
        }
    }
    var temp = 0;
    var recoOne = "";
    var reconTwo = "";
    var recoThree = "";
    if(correctlyAnswered[0] && temp < 3){
        recoOne = reco[0];
        temp++;
    }
    if (!correctlyAnswered[1] && temp < 3) {
        if (recoOne.localeCompare("") == 0){
            recoOne = reco[1];
            temp++;
        }
        else{
            reconTwo = reco[1];
            temp++;
        }
    }
    if (!correctlyAnswered[2] && temp < 3) {
        if (recoOne.localeCompare("") == 0) {
            recoOne = reco[2];
            temp++;
        }
        else if (reconTwo.localeCompare("") == 0){
            reconTwo = reco[2];
            temp++;
        }
        else{
            recoThree = reco[2];
            temp++;
        }    
    }
    if (!correctlyAnswered[3] && temp < 3) {
        if (recoOne.localeCompare("") == 0) {
            recoOne = reco[3];
            temp++;
        }
        else if (reconTwo.localeCompare("") == 0) {
            reconTwo = reco[3];
            temp++;
        }
        else {
            recoThree = reco[3];
            temp++;
        }     
     }
    if (!correctlyAnswered[4] && temp < 3) {
        if (recoOne.localeCompare("") == 0) {
            recoOne = reco[4];
            temp++;
        }
        else if (reconTwo.localeCompare("") == 0) {
            reconTwo = reco[4];
            temp++;
        }
        else {
            recoThree = reco[4];
            temp++;
        }  
    }
    if (!correctlyAnswered[5] && temp < 3) {
        if (recoOne.localeCompare("") == 0) {
            recoOne = reco[5];
            temp++;
        }
        else if (reconTwo.localeCompare("") == 0) {
            reconTwo = reco[5];
            temp++;
        }
        else {
            recoThree = reco[5];
            temp++;
        }  
    }
    if (!correctlyAnswered[6] && temp < 3) {
        if (recoOne.localeCompare("") == 0) {
            recoOne = reco[6];
            temp++;
        }
        else if (reconTwo.localeCompare("") == 0) {
            reconTwo = reco[6];
            temp++;
        }
        else {
            recoThree = reco[6];
            temp++;
        }      
    }
    if(temp ==0){
        recoOne = "You are great";
    }
    var competences = "IQCompetences_" + contador.toString();
    return [competences, recoOne, reconTwo, recoThree, correctlyAnswered[0], correctlyAnswered[1], correctlyAnswered[2], correctlyAnswered[3], correctlyAnswered[4], correctlyAnswered[5], correctlyAnswered[6]];
}
function calculateLeadership(leadershipAnswers){
    correctAnswers = ["2","1","2","2","2","2","1","1","1","2","1","1","1","2","2","2","1","1","1","2","2","1","2","1","2","1","1","1","2","1","2","2","1","2","1","1","2","1","2"];
    var answersScore = [];
    leedrClusterQuestions = [0,2,7,25,30,38];
    confrontationClusterQuestions = [1,6,10,20,23,29,32,33];
    desicionClusterQuestions = [3,4,5,15,16,21];
    teamsClusterQuestions = [8,12,13,14,17,31,34,37];
    leadershipClusterQuestions = [9,19,22,26,27,28,36];
    communicationClusterQuestions = [11,18,24,35];
    var leedrScore = 0;
    var confrontationScore = 0;
    var desicionScore = 0;
    var teamsScore = 0;
    var leadershipScore = 0;
    var communicationScore = 0;
    for(var i = 0; i < leadershipAnswers.length; i++){
        var ca = correctAnswers[i];
        if(leedrClusterQuestions.includes(i)){
            if (leadershipAnswers[i].localeCompare(ca) == 0){
                leedrScore++;
                answersScore[i] = 1;
            }
            else {
                answersScore[i] = 0;
            }
        }
        else if (confrontationClusterQuestions.includes(i)) {
            if (leadershipAnswers[i].localeCompare(ca) == 0) {
                confrontationScore++;
                answersScore[i] = 1;
            }
            else {
                answersScore[i] = 0;
            }
        }
        else if (desicionClusterQuestions.includes(i)) {
            if (leadershipAnswers[i].localeCompare(ca) == 0) {
                desicionScore++;
                answersScore[i] = 1;
            }
            else {
                answersScore[i] = 0;
            }
        }
        else if (teamsClusterQuestions.includes(i)) {
            if (leadershipAnswers[i].localeCompare(ca) == 0) {
                teamsScore++;
                answersScore[i] = 1;
            }
            else {
                answersScore[i] = 0;
            }
        }
        else if (leadershipClusterQuestions.includes(i)) {
            if (leadershipAnswers[i].localeCompare(ca) == 0) {
                leadershipScore++;
                answersScore[i] = 1;
            }
            else {
                answersScore[i] = 0;
            }
        }
        else if (communicationClusterQuestions.includes(i)) {
            if (leadershipAnswers[i].localeCompare(ca) == 0) {
                communicationScore++;
                answersScore[i] = 1;
            }
            else {
                answersScore[i] = 0;
            }
        }

    }
    //check confrontation
    var confrontationAddition = 0;
    if(answersScore[1] == 1 && answersScore[16]==1 && answersScore[27] == 1){
        confrontationAddition = confrontationAddition + 1;
    }
    else if (answersScore[1] == 1 && answersScore[16] == 0 && answersScore[27] == 0) {
        confrontationAddition = confrontationAddition - 1;
    }
    else{
        confrontationAddition = confrontationAddition;
    }
    if (answersScore[6] == 1 && answersScore[10] == 1 && answersScore[16] == 1) {
        confrontationAddition = confrontationAddition + 1;
    }
    else if (answersScore[6] == 1 && answersScore[10] == 0 && answersScore[16] == 0) {
        confrontationAddition = confrontationAddition - 1;
    }
    else {
        confrontationAddition = confrontationAddition;
    }
    if (answersScore[10] == 1 && answersScore[6] == 1 && answersScore[33] == 1) {
        confrontationAddition = confrontationAddition + 1;
    }
    else if (answersScore[10] == 1 && answersScore[6] == 0 && answersScore[33] == 0) {
        confrontationAddition = confrontationAddition - 1;
    }
    else {
        confrontationAddition = confrontationAddition;
    }
    if (answersScore[20] == 1 && answersScore[15] == 1 && answersScore[29] == 1) {
        confrontationAddition = confrontationAddition + 1;
    }
    else if (answersScore[20] == 1 && answersScore[15] == 0 && answersScore[29] == 0) {
        confrontationAddition = confrontationAddition - 1;
    }
    else {
        confrontationAddition = confrontationAddition;
    }
    if (answersScore[23] == 1 && answersScore[37] == 1 && answersScore[30] == 1) {
        confrontationAddition = confrontationAddition + 1;
    }
    else if (answersScore[23] == 1 && answersScore[37] == 0 && answersScore[30] == 0) {
        confrontationAddition = confrontationAddition - 1;
    }
    else {
        confrontationAddition = confrontationAddition;
    }
    if (answersScore[29] == 1 && answersScore[4] == 1 && answersScore[20] == 1) {
        confrontationAddition = confrontationAddition + 1;
    }
    else if (answersScore[29] == 1 && answersScore[4] == 0 && answersScore[20] == 0) {
        confrontationAddition = confrontationAddition - 1;
    }
    else {
        confrontationAddition = confrontationAddition;
    }
    if (answersScore[32] == 1 && answersScore[15] == 1 && answersScore[27] == 1) {
        confrontationAddition = confrontationAddition + 1;
    }
    else if (answersScore[32] == 1 && answersScore[15] == 0 && answersScore[27] == 0) {
        confrontationAddition = confrontationAddition - 1;
    }
    else {
        confrontationAddition = confrontationAddition;
    }
    if (answersScore[33] == 1 && answersScore[10] == 1 && answersScore[38] == 1) {
        confrontationAddition = confrontationAddition + 1;
    }
    else if (answersScore[33] == 1 && answersScore[10] == 0 && answersScore[38] == 0) {
        confrontationAddition = confrontationAddition - 1;
    }
    else {
        confrontationAddition = confrontationAddition;
    }
    //Correcion leedr   
    var leedrAddition = 0;
    if (answersScore[0] == 1 && answersScore[34] == 1 && answersScore[17] == 1) {
        leedrAddition = leedrAddition + 1;
    }
    else if (answersScore[0] == 1 && answersScore[34] == 0 && answersScore[17] == 0) {
        leedrAddition = leedrAddition - 1;
    }
    else {
        leedrAddition = leedrAddition;
    }
    if (answersScore[2] == 1 && answersScore[18] == 1 && answersScore[27] == 1) {
        leedrAddition = leedrAddition + 1;
    }
    else if (answersScore[2] == 1 && answersScore[18] == 0 && answersScore[27] == 0) {
        leedrAddition = leedrAddition - 1;
    }
    else {
        leedrAddition = leedrAddition;
    }
    if (answersScore[7] == 1 && answersScore[4] == 1 && answersScore[37] == 1) {
        leedrAddition = leedrAddition + 1;
    }
    else if (answersScore[7] == 1 && answersScore[4] == 0 && answersScore[37] == 0) {
        leedrAddition = leedrAddition - 1;
    }
    else {
        leedrAddition = leedrAddition;
    }
    if (answersScore[25] == 1 && answersScore[30] == 1 && answersScore[28] == 1) {
        leedrAddition = leedrAddition + 1;
    }
    else if (answersScore[25] == 1 && answersScore[30] == 0 && answersScore[28] == 0) {
        leedrAddition = leedrAddition - 1;
    }
    else {
        leedrAddition = leedrAddition;
    }
    if (answersScore[30] == 1 && answersScore[37] == 1 && answersScore[34] == 1) {
        leedrAddition = leedrAddition + 1;
    }
    else if (answersScore[30] == 1 && answersScore[37] == 0 && answersScore[34] == 0) {
        leedrAddition = leedrAddition - 1;
    }
    else {
        leedrAddition = leedrAddition;
    }
    if (answersScore[38] == 1 && answersScore[33] == 1 && answersScore[21] == 1) {
        leedrAddition = leedrAddition + 1;
    }
    else if (answersScore[38] == 1 && answersScore[33] == 0 && answersScore[21] == 0) {
        leedrAddition = leedrAddition - 1;
    }
    else {
        leedrAddition = leedrAddition;
    }
    //Corrections check
    leedrScore = leedrScore + leedrAddition;
    confrontationScore = confrontationScore + confrontationAddition;
    if (leedrScore > leedrClusterQuestions.length){
        leedrScore = leedrClusterQuestions.length;
    }
    else if(leedrScore < 0){
        leedrScore = 0;
    }
    else{
    }
    if (confrontationScore > confrontationClusterQuestions.length){
        confrontationScore = confrontationClusterQuestions.length;
    } 
    else if(confrontationScore < 0){
        confrontationScore = 0;
    }
    else{}
    leedrScore = leedrScore/leedrClusterQuestions.length;
    confrontationScore = confrontationScore/confrontationClusterQuestions.length;
    desicionScore = desicionScore/desicionClusterQuestions.length;
    teamsScore = teamsScore/teamsClusterQuestions.length;
    leadershipScore = leadershipScore/leadershipClusterQuestions.length;
    communicationScore = communicationScore/communicationClusterQuestions.length;
    var leedrScoreDis = 0;
    var confrontationScoreDis = 0;
    var desicionScoreDis = 0;
    var teamsScoreDis = 0;
    var leadershipScoreDis = 0;
    var communicationScoreDis = 0;
    if(leedrScore >= 0.75){
        leedrScoreDis = 3;
    }
    else if(leedrScore >= 0.55){
        leedrScoreDis = 2
    }
    else{
        leedrScoreDis = 1;
    }

    if (confrontationScore >= 0.75) {
        confrontationScoreDis = 3;
    }
    else if (confrontationScore >= 0.55) {
        confrontationScoreDis = 2
    }
    else {
        confrontationScoreDis = 1;
    }

    if (desicionScore >= 0.75) {
        desicionScoreDis = 3;
    }
    else if (desicionScore >= 0.55) {
        desicionScoreDis = 2
    }
    else {
        desicionScoreDis = 1;
    }

    if (teamsScore >= 0.75) {
        teamsScoreDis = 3;
    }
    else if (teamsScore >= 0.55) {
        teamsScoreDis = 2
    }
    else {
        teamsScoreDis = 1;
    }

    if (leadershipScore >= 0.75) {
        leadershipScoreDis = 3;
    }
    else if (leadershipScore >= 0.55) {
        leadershipScoreDis = 2
    }
    else {
        leadershipScoreDis = 1;
    }

    if (communicationScore >= 0.75) {
        communicationScoreDis = 3;
    }
    else if (communicationScore >= 0.55) {
        communicationScoreDis = 2
    }
    else {
        communicationScoreDis = 1;
    }
    var x = communicationScoreDis + confrontationScoreDis + teamsScoreDis - 2;
    var y = leadershipScoreDis + desicionScoreDis + leedrScoreDis - 2;
    var profile = "";
    var profileDescripcion = "";
    if((x>=2 && x<=3 && y>=6)||(x<=1 && y>=4)){
        profile = "LeadershipProfile_Eager_Instructor";
        profileDescripcion = "LeadershipProfile_Eager_Instructor_Description";
    }
    else if ((x>= 2 && x <=3 && y >=4 && y<=5)){
        profile = "LeadershipProfile_Passionate_Evaluator";
        profileDescripcion = "LeadershipProfile_Passionate_Evaluator_Description";
    }
    else if ((x >= 6 && y >= 4) || (x >= 4 && y >= 6)) {
        profile = "LeadershipProfile_Prominent_Organiser";
        profileDescripcion = "LeadershipProfile_Prominent_Organiser_Description";
    }
    else if ((x>=4&& x <= 5 && y <=5 && y>=4)) {
        profile = "LeadershipProfile_Decisive_Coordinator";
        profileDescripcion ="LeadershipProfile_Decisive_Coordinator_Description";
    }
    else if (x<=3 && x >= 2 && y<=3 && y>=2) {
        profile = "LeadershipProfile_Honest_Broker";
        profileDescripcion = "LeadershipProfile_Honest_Broker_Description";
    }
    else if ((x<=1 && y<= 3)||(y<=1 && x<=3)) {
        profile = "LeadershipProfile_Fierce_Fighter";
        profileDescripcion = "LeadershipProfile_Fierce_Fighter_Description";
    }
    else if (x<=5 && x>= 4 && y >=2 && y<=3) {
        profile = "LeadershipProfile_Outgoing_Promoter";
        profileDescripcion ="LeadershipProfile_Outgoing_Promoter_Description";
    }
    else{
        profile = "LeadershipProfile_Trusted_Adviser";
        profileDescripcion = "LeadershipProfile_Trusted_Adviser_Description";
    }
    var primaryTrait = "";
    var secondaryTrait = "";
    if(x>=y){
        primaryTrait = "X" + communicationScoreDis.toString() + confrontationScoreDis.toString() + teamsScoreDis.toString();
        secondaryTrait = "Y" + leedrScoreDis.toString() + leadershipScoreDis.toString() + desicionScoreDis.toString(); 
    }
    else{
        secondaryTrait = "X" + communicationScoreDis.toString() + confrontationScoreDis.toString() + teamsScoreDis.toString();
        primaryTrait = "Y" + leedrScoreDis.toString() + leadershipScoreDis.toString() + desicionScoreDis.toString(); 
    }
    return [profile, profileDescripcion, primaryTrait, secondaryTrait, communicationScore, confrontationScore, teamsScore, leedrScore, leadershipScore, desicionScore];

}
function calculateEQ(eqAnswers){
    correctAnswers = ["2", "2", "1", "2", "2", "2", "1", "2", "1", "2", "1", "2", "1", "2", "2", "1", "1", "2", "2", "2"]
    socialManagmentQuestions = [0,1,4,7,13];
    selfAwarnessQuestions = [11,12,16,17,19];
    selfManagmentQuestion = [3,5,6,9,14];
    socialAwarnessQuestion = [2,8,10,15,18];
    bonuses = [];
    if ((userInfo.responsability).localeCompare("Individual Contributor: no people in charge") == 0){
        bonuses = [0.16,0.29,0,0.07,0.09,0.1,0.13,0.16,0.1,0.04,0.18,0,0,0,0.04,0.29,0,0,0,0];
    }
    else if ((userInfo.responsability).localeCompare("Middle Manager: manager of small teams") == 0){
        bonuses = [0.16,0.29,0.17,0.21,0.09,0.1,0.13,0.3,0.1,0.21,0.03,0,0,0,0.08,0.29,0,0,0,0];
    }
    else if ((userInfo.responsability).localeCompare("Senior Manager: manager of large teams or companies") == 0){
        bonuses = [0.16,0.29,0.17,0.07,0.09,0.1,0.25,0.16,0.1,0.04,0.03,0,0,0,0.04,0.3,0,0,0,0];
    }
    var socialManagmentScore = 0;
    var socialManagmentScoreWithBonus = 0;
    var selfManagmentScore = 0;
    var selfManagmentScoreWithBonus = 0;
    var socialAwarnessScore = 0;
    var socialAwarnessScoreWithBonus = 0;
    var selfAwarnessScore = 0;
    var selfAwarnessScoreWithBonus = 0;
    var i;
    for(i in socialManagmentQuestions){
        var temp = socialManagmentQuestions[i];
        var ca = correctAnswers[temp];
        if (eqAnswers[temp].localeCompare(ca) == 0){
            socialManagmentScore = socialManagmentScore + 1;
            socialManagmentScoreWithBonus = socialManagmentScoreWithBonus + 1 + bonuses[temp];
        }
    }
    var j;
    for (j in selfAwarnessQuestions) {
        var temp = selfAwarnessQuestions[j];
        var ca = correctAnswers[temp];
        if (eqAnswers[temp].localeCompare(ca) == 0) {
            selfAwarnessScore = selfAwarnessScore + 1;
            selfAwarnessScoreWithBonus = selfAwarnessScoreWithBonus + 1 + bonuses[temp];
        }
    }
    var k;
    for (k in socialAwarnessQuestion) {
        var temp = socialAwarnessQuestion[k];
        var ca = correctAnswers[temp];
        if (eqAnswers[temp].localeCompare(ca) == 0) {
            socialAwarnessScore = socialAwarnessScore + 1;
            socialAwarnessScoreWithBonus = socialAwarnessScoreWithBonus + 1 + bonuses[temp];
        }
    }
    var t;
    for (t in selfManagmentQuestion) {
        var temp = selfManagmentQuestion[t];
        var ca = correctAnswers[temp];
        if (eqAnswers[temp].localeCompare(ca) == 0) {
            selfManagmentScore = selfManagmentScore + 1;
            selfManagmentScoreWithBonus = selfManagmentScoreWithBonus + 1 + bonuses[temp];
        }
    }
    socialManagmentScore = socialManagmentScore /5;
    selfAwarnessScore  = selfAwarnessScore/5;
    socialAwarnessScore = socialAwarnessScore/5;
    selfManagmentScore = selfManagmentScore/5;  
    var realEQ = 0.25 * (socialManagmentScore + selfAwarnessScore + socialAwarnessScore + selfManagmentScore );
    if(selfAwarnessScoreWithBonus < socialAwarnessScoreWithBonus){
        socialAwarnessScoreWithBonus = selfAwarnessScoreWithBonus;
    }
    if(selfManagmentScoreWithBonus < socialManagmentScoreWithBonus){
        socialAwarnessScoreWithBonus = selfManagmentScoreWithBonus;
    }
    var eqPotential = 0.25*((selfAwarnessScoreWithBonus/5)+ (socialManagmentScoreWithBonus/5) + (socialAwarnessScoreWithBonus/5)+(selfManagmentScoreWithBonus/5));
    if (eqPotential > 1){
        eqPotential = 1;
    }
    if(eqPotential < realEQ){
        eqPotential = realEQ;
    }
    var profile = "";
    var recomendation = "";
    var description= "";
    if(realEQ < 0.42){
        profile = "EQProfile_Foal";
        description ="EQProfile_Foal_Description";
    }
    else if(realEQ<0.56){
        profile = "EQProfile_Patrician";
        description = "EQProfile_Patrician_Description";
    }
    else if(realEQ < 0.71){
        profile = "EQProfile_Templar";
        description = "EQProfile_Templar_Description";
    }
    else if(realEQ < 0.9){
        profile = "EQProfile_Master";
        description = "EQProfile_Master_Description";
    }
    else{
        profile = "EQProfile_Virtuoso";
        description = "EQProfile_Virtuoso_Description";
    }

    //recomendations
    if (selfAwarnessScore <= 0.4 && selfManagmentScore <= 0.4 && socialAwarnessScore <= 0.4 && socialManagmentScore <= 0.4) {
        recomendation = "EQEmotional_FTP3";
    }
    else if (selfAwarnessScore <= 0.4 && selfManagmentScore <= 0.4) {
        recomendation = "EQEmotional_FTP2";
    }
    else if (selfAwarnessScore <= 0.4) {
        recomendation = "EQEmotional_FTP1";
    }
    else if (selfAwarnessScore > 0.4 && selfManagmentScore > 0.4 && socialAwarnessScore > 0.4 && socialManagmentScore > 0.4 && selfAwarnessScore <= 0.6 && selfManagmentScore <= 0.6 && socialAwarnessScore <= 0.6 && socialManagmentScore <= 0.6) {
        recomendation = "EQEmotional_PTT3";
    }
    else if (selfAwarnessScore > 0.4 && selfManagmentScore > 0.4 && selfAwarnessScore <= 0.6 && selfManagmentScore <= 0.6) {
        recomendation = "EQEmotional_PTT2";
    }
    else if (selfAwarnessScore <= 0.6) {
        recomendation = "EQEmotional_PTT1";
    }
    else if (socialManagmentScore <= 0.6) {
        recomendation = "EQEmotional_AM2";
    }
    else if (socialAwarnessScore <= 0.6) {
        recomendation = "EQEmotional_AM1";
    }
    else{
        recomendation = "EQEmotional_AV1";
    }

    if(realEQ >= 0.9){
        recomendation = "You are nailing it";
    }
    var result = [profile, realEQ, eqPotential, recomendation, description, selfAwarnessScore, selfManagmentScore, socialAwarnessScore, socialManagmentScore];
    return result;
}
//grit
function calculateGrid(gritAnswers){
    var results = [];
    //Personal grit score
    var personalGrit = 0;
    //correct anwers
    correctAnswers = ["2","1","2","1","2","1","2","2","1","2","1","2","2","2","1"];
    var i = 0;
    while(i<15){
        if (gritAnswers[i].localeCompare(correctAnswers[i]) == 0){
            personalGrit = personalGrit + 1;
        }
        i++;
    }
    results[1] = (personalGrit/correctAnswers.length);
    //Entrepenurial grit
    var entrGrit = 0.0;
    var isOld = (getAge() > 30);
    while(i<19){
        if (gritAnswers[i].localeCompare("4,3,2,1") == 0){
            entrGrit = entrGrit + 1;
        }
        else if (gritAnswers[i].localeCompare("4,2,3,1")==0){
            if (isOld) {
                entrGrit = entrGrit + 0.7;
            }
            else {
                entrGrit = entrGrit + 0.8;
            }
        }
        else if (gritAnswers[i].localeCompare("4,1,3,2") == 0) {
            if (isOld) {
                entrGrit = entrGrit + 0.4;
            }
            else {
                entrGrit = entrGrit + 0.5;
            }
        }
        else if (gritAnswers[i].localeCompare("4,1,2,3") == 0) {
            if (isOld) {
                entrGrit = entrGrit + 0.25;
            }
            else {
                entrGrit = entrGrit + 0.4;
            }
        }
        else if (gritAnswers[i].localeCompare("3,4,2,1") == 0) {
            if (isOld) {
                entrGrit = entrGrit + 0.2;
            }
            else {
                entrGrit = entrGrit + 0.35;
            }
        }
        else if (gritAnswers[i].localeCompare("4,3,1,2") == 0) {
            if (isOld) {
                entrGrit = entrGrit + 0.5;
            }
            else {
                entrGrit = entrGrit + 0.6;
            }
        }
        else if (gritAnswers[i].localeCompare("3,4,1,2") == 0) {
            if (isOld) {
                entrGrit = entrGrit + 0.15;
            }
            else {
                entrGrit = entrGrit + 0.3;
            }
        }
        if(i == 16){
            i = 17;
        }
        else{
            i++;
        }
    }
    if (gritAnswers[16].localeCompare("5,4,3,2,1") == 0) {
        entrGrit = entrGrit + 1;
    }
    else if (gritAnswers[16].localeCompare("5,4,2,3,1") == 0) {
        if(isOld){
            entrGrit = entrGrit + 0.7;
        }
        else{
            entrGrit = entrGrit + 0.8;
        }
    }
    else if (gritAnswers[16].localeCompare("5,4,3,1,2") == 0) {
        if (isOld) {
            entrGrit = entrGrit + 0.6;
        }
        else {
            entrGrit = entrGrit + 0.75;
        }
    }
    else if (gritAnswers[16].localeCompare("5,3,4,2,1") == 0) {
        if (isOld) {
            entrGrit = entrGrit + 0.5;
        }
        else {
            entrGrit = entrGrit + 0.6;
        }
    }
    else if (gritAnswers[16].localeCompare("5,2,4,3,1") == 0) {
        if (isOld) {
            entrGrit = entrGrit + 0.35;
        }
        else {
            entrGrit = entrGrit + 0.5;
        }
    }
    else if (gritAnswers[16].localeCompare("5,1,4,3,2") == 0) {
        if (isOld) {
            entrGrit = entrGrit + 0.25;
        }
        else {
            entrGrit = entrGrit + 0.4;
        }
    }
    else if (gritAnswers[16].localeCompare("5,3,2,4,1") == 0) {
        if (isOld) {
            entrGrit = entrGrit + 0.2;
        }
        else {
            entrGrit = entrGrit + 0.25;
        }
    }
    else if (gritAnswers[16].localeCompare("5,2,3,4,1") == 0) {
        if (isOld) {
            entrGrit = entrGrit + 0.2;
        }
        else {
            entrGrit = entrGrit + 0.25;
        }
    }
    else if (gritAnswers[16].localeCompare("4,5,3,2,1") == 0) {
        if (isOld) {
            entrGrit = entrGrit + 0.1;
        }
        else {
            entrGrit = entrGrit + 0.2;
        }
    }
    results[2] = (entrGrit/4);
    var overallGrit = 0.5 * ((entrGrit / 4) + (personalGrit / 15));
    results[3] = overallGrit;
    if(overallGrit <= 0.4){
        results[0] = "GRITProfile_0-40";
        results[4] = "GRITOveral_0-40_";
    }
    else if(overallGrit <= 0.6){
        results[0] = "GRITProfile_41-60";
        results[4] = "GRITOveral_41-60_";
    }
    else if (overallGrit <= 0.74) {
        results[0] = "GRITProfile_61-74";
        results[4] = "GRITOveral_61-74_";
    }
    else if (overallGrit <= 0.85) {
        results[0] = "GRITProfile_75-85";
        results[4] = "GRITOveral_75-85_";
    }
    else{
        results[0] = "GRITProfile_86-100";
        results[4] = "GRITOveral_86-100_";
    }
    
    if (results[1] <= 0.4) {
        results[5] = "GRITPersonal_0-40";
    }
    else if (results[1] <= 0.6) {
        results[5] = "GRITPersonal_41-60";
    }
    else if (results[1] <= 0.74) {
        results[5] = "GRITPersonal_61-74";
    }
    else if (results[1] <= 0.85) {
        results[5] = "GRITPersonal_75-86";
    }
    else{
        results[5] = "GRITPersonal_86-100";
    }

    if (results[2] <= 0.4) {
        results[6] = "GRITEntrepreneurial_0-40";
    }
    else if (results[2] <= 0.6) {
        results[6] = "GRITEntrepreneurial_41-60";
    }
    else if (results[2] <= 0.74) {
        results[6] = "GRITEntrepreneurial_61-74";
    }
    else if (results[2] <= 0.85) {
        results[6] = "GRITEntrepreneurial_75-85";
    }
    else{
        results[6] = "GRITEntrepreneurial_86-100";
    }

    return results;
}
function finishQuestionary(answers) {
    document.getElementById("questionsPre").style.display = "none";
    document.getElementById("questionsPos").style.display = "block";
    saveAnswersAndResults(answers);
    loadingScreen(language);
}

function translateText(lang) {
    language = lang;
    translator.lang(lang);
    localStorage.setItem("language", lang);
    interfaceQuestionTypeShow(questionType(actualQuestion));
    document.getElementById("orderQuestionsInstructions").innerHTML = translateByID("orderQuestionsInstructions", language);
    document.getElementById("nextBut").innerHTML = translateByID("Siguiente", language);
    document.getElementById("nextBut2").innerHTML = translateByID("Siguiente", language);
}

function checkLoggedin() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            user = firebase.auth().currentUser;

        } else {
            location.replace("../index.html");
        }
    });
}


// 1 - Seleccion multiple
// 2 - Ordenar 4 preguntas
// 3 - Ordenar 5 preguntas
// 4 - No existe
function questionType(question) {
    
    if (question <= 39 || question === 50 || question === 51 || (question >= 53 && question <= 57) || question === 60) {
        return 1;
    } else if (question === 46 || question === 48 || question === 49) {
        return 2;
    } else if (question === 47 || question === 61 || question === 62 || question == 63 || question == 64 || question == 65) {
        return 3;
    } else {
        return 4;
    }
}

function setFirstQuestion() {
    let questionType1 = questionType(actualQuestion);
    interfaceQuestionTypeShow(questionType1);
    setPercentageBar(0);
}
function setPercentageBar(percentage){
    $('#progressBar').attr('aria-valuenow', percentage).css('width', percentage+"%");
    document.getElementById("progressBar").innerHTML = percentage+"%";
    document.getElementById("preguntaActual").innerHTML= (preguntaPorcentaje)+"/64"
}
function nextQuestion() {
    
    let questionType1 = questionType(actualQuestion);
    if (actualQuestion < 65) {
        preguntaPorcentaje++;
        if (questionType1 === 1) {
            if ($('input[name=radio]:checked').val() == undefined) {
                window.alert("Please answer the question");
            } else {
                answers[arrayIndex] = $('input[name=radio]:checked').val();
                arrayIndex++;
                actualQuestion++;
            }
        } else if (questionType1 === 2) {
            let q1order = document.getElementById("q1order").value;
            let q2order = document.getElementById("q2order").value;
            let q3order = document.getElementById("q3order").value;
            let q4order = document.getElementById("q4order").value;
            if ((q1order == "") || (q2order == "") || (q3order == "") || (q4order == "")) {
                window.alert("Please answer the questions");
            } else {
                answers[arrayIndex] = q1order + "," + q2order + "," + q3order + "," + q4order;
                arrayIndex++;
                actualQuestion++;
            }

        } else if (questionType1 === 3) {
            let q1order = document.getElementById("q1order").value;
            let q2order = document.getElementById("q2order").value;
            let q3order = document.getElementById("q3order").value;
            let q4order = document.getElementById("q4order").value;
            let q5order = document.getElementById("q5order").value;
            if ((q1order == "") || (q2order == "") || (q3order == "") || (q4order == "") || (q5order == "")) {
                window.alert("Please answer the questions");
            } else {
                answers[arrayIndex] = q1order + "," + q2order + "," + q3order + "," + q4order + "," + q5order;
                arrayIndex++;
                actualQuestion++;
            }
        } else {
            while (true) {
                answers[arrayIndex] = "undefined";
                arrayIndex++;
                actualQuestion++;
                if (questionType(actualQuestion) != 4)
                    break
            }
            preguntaPorcentaje--
        }
        questionType1 = questionType(actualQuestion);
        interfaceQuestionTypeShow(questionType1);
        setPercentageBar(Math.round((preguntaPorcentaje/65)*100));
    } else {
        if (actualQuestion === 65)
        {
            document.getElementById("nextBut").innerHTML = "finish"
            document.getElementById("nextBut2").innerHTML = "finish"
            actualQuestion++;
        }
        //////////////////////////////////////////////
        ///TERMINA EL CUESTIONARIO
        //////////////////////////////////////////////
        else{
            finishQuestionary(answers);
        }

    }
    
}



function interfaceQuestionTypeShow(question) {
    if (question === 1) {
        document.getElementById("orderQuest").style.display = "none";
        document.getElementById("radioButtonsQuest").style.display = "block";
        document.getElementById("checkQ1").innerHTML = translateByID("A" + actualQuestion + "A", language);
        document.getElementById("checkQ2").innerHTML = translateByID("A" + actualQuestion + "B", language);
        document.getElementById("questionMultiple").innerHTML = translateByID("Q" + actualQuestion, language);
        $('input[name=radio]:checked').prop('checked', false);
    } else if (question === 2) {
        document.getElementById("orderQuest").style.display = "block";
        document.getElementById("radioButtonsQuest").style.display = "none";
        document.getElementById("q5div").style.display = "none";
        document.getElementById("q5div2").style.display = "none";
        document.getElementById("q1orderText").innerHTML = translateByID("A" + actualQuestion + "A", language);
        document.getElementById("q2orderText").innerHTML = translateByID("A" + actualQuestion + "B", language);
        document.getElementById("q3orderText").innerHTML = translateByID("A" + actualQuestion + "C", language);
        document.getElementById("q4orderText").innerHTML = translateByID("A" + actualQuestion + "D", language);
        document.getElementById("questionOrder").innerHTML = translateByID("Q" + actualQuestion, language);
        document.getElementById("q1order").value = "";
        document.getElementById("q2order").value = "";
        document.getElementById("q3order").value = "";
        document.getElementById("q4order").value = "";
    } else if (question === 3) {
        document.getElementById("orderQuest").style.display = "block";
        document.getElementById("radioButtonsQuest").style.display = "none";
        document.getElementById("q5div").style.display = "block";
        document.getElementById("q5div2").style.display = "block";
        document.getElementById("q1orderText").innerHTML = translateByID("A" + actualQuestion + "A", language);
        document.getElementById("q2orderText").innerHTML = translateByID("A" + actualQuestion + "B", language);
        document.getElementById("q3orderText").innerHTML = translateByID("A" + actualQuestion + "C", language);
        document.getElementById("q4orderText").innerHTML = translateByID("A" + actualQuestion + "D", language);
        document.getElementById("q5orderText").innerHTML = translateByID("A" + actualQuestion + "E", language);
        document.getElementById("questionOrder").innerHTML = translateByID("Q" + actualQuestion, language);
        document.getElementById("q1order").value = "";
        document.getElementById("q2order").value = "";
        document.getElementById("q3order").value = "";
        document.getElementById("q4order").value = "";
        document.getElementById("q5order").value = "";

    }



}

function previousQuestion() {
    if (actualQuestion > 1) {
        preguntaPorcentaje--;
        arrayIndex--;
        answers.pop();
        actualQuestion--;
        while (true) {
            if (questionType(actualQuestion) != 4)
                break
            actualQuestion--;
        }
        interfaceQuestionTypeShow(questionType(actualQuestion));
        setPercentageBar(Math.round((preguntaPorcentaje/65)*100));
    }
}

function translateByID(index, lang) {
    return dict[index][lang];
}

var checkmarkIdPrefix = "loadingCheckSVG-";
var checkmarkCircleIdPrefix = "loadingCheckCircleSVG-";
var verticalSpacing = 50;

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function createSVG(tag, properties, opt_children) {
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", tag);
    for (prop in properties) {
        newElement.setAttribute(prop, properties[prop]);
    }
    if (opt_children) {
        opt_children.forEach(function (child) {
            newElement.appendChild(child);
        })
    }
    return newElement;
}

function createPhraseSvg(phrase, yOffset) {
    var text = createSVG("text", {
        fill: "white",
        x: 50,
        y: yOffset,
        "font-size": 18,
        "font-family": "Arial"
    });
    text.appendChild(document.createTextNode(phrase + "..."));
    return text;
}
function createCheckSvg(yOffset, index) {
    var check = createSVG("polygon", {
        points: "21.661,7.643 13.396,19.328 9.429,15.361 7.075,17.714 13.745,24.384 24.345,9.708 ",
        fill: "rgba(255,255,255,1)",
        id: checkmarkIdPrefix + index
    });
    var circle_outline = createSVG("path", {
        d: "M16,0C7.163,0,0,7.163,0,16s7.163,16,16,16s16-7.163,16-16S24.837,0,16,0z M16,30C8.28,30,2,23.72,2,16C2,8.28,8.28,2,16,2 c7.72,0,14,6.28,14,14C30,23.72,23.72,30,16,30z",
        fill: "white"
    })
    var circle = createSVG("circle", {
        id: checkmarkCircleIdPrefix + index,
        fill: "rgba(255,255,255,0)",
        cx: 16,
        cy: 16,
        r: 15
    })
    var group = createSVG("g", {
        transform: "translate(10 " + (yOffset - 20) + ") scale(.9)"
    }, [circle, check, circle_outline]);
    return group;
}

function addPhrasesToDocument(phrases) {
    phrases.forEach(function (phrase, index) {
        var yOffset = 30 + verticalSpacing * index;
        document.getElementById("phrases").appendChild(createPhraseSvg(phrase, yOffset));
        document.getElementById("phrases").appendChild(createCheckSvg(yOffset, index));
    });
}

function easeInOut(t) {
    var period = 200;
    return (Math.sin(t / period + 100) + 1) / 2;
    
}

function loadingScreen(lang)
{
    var english = shuffleArray(["Feeding unicorns", "Grabbing tasks", "Collating conversations", "Reticulating splines", "Pondering emptiness", "Considering alternatives", "Shuffling bits", "Celebrating moments", "Generating phrases", "Simulating workflow", "Empowering humanity", "Being aspirational", "Doing the hokey pokey", "Bueller", "Cracking jokes", "Slacking off"]);
    var spanish =  shuffleArray(["Alimentando unicornios", "Agarrando Tareas", "Cotejando charlas", "Reticulando splines", "Ponderando vac�o", "Considerando alternativas", "Reorganizando bits", "Celebrando momentos", "Generando frases", "Simulando flujos", "Empoderandonos", "Siendo aspiracional", "Haciendo hokey pokey", "Trabajando", "Craqueando bromas", "Aflojando"]);
    let phrases;
    if(lang ==="es")
    {
        phrases = spanish;
    }
    else
    {
        phrases = english;
    }
    addPhrasesToDocument(phrases);
    var start_time = new Date().getTime();
    var upward_moving_group = document.getElementById("phrases");
    upward_moving_group.currentY = 0;
    var checks = phrases.map(function (_, i) {
        return { check: document.getElementById(checkmarkIdPrefix + i), circle: document.getElementById(checkmarkCircleIdPrefix + i) };
    });
    
    function animateLoading() {
        var now = new Date().getTime();
        upward_moving_group.setAttribute("transform", "translate(0 " + upward_moving_group.currentY + ")");
        upward_moving_group.currentY -= 1.35 * easeInOut(now);
        checks.forEach(function (check, i) {
            var color_change_boundary = - i * verticalSpacing + verticalSpacing + 15;
            if (upward_moving_group.currentY < color_change_boundary) {
                var alpha = Math.max(Math.min(1 - (upward_moving_group.currentY - color_change_boundary + 15) / 30, 1), 0);
                check.circle.setAttribute("fill", "rgba(255, 255, 255, " + alpha + ")");
                var check_color = [Math.round(255 * (1 - alpha) + 120 * alpha), Math.round(255 * (1 - alpha) + 154 * alpha)];
                check.check.setAttribute("fill", "rgba(255, " + check_color[0] + "," + check_color[1] + ", 1)");
            }
        })
        if (now - start_time < 30000 && upward_moving_group.currentY > -710) {
            requestAnimationFrame(animateLoading);
            window.location.href = "../main/main.html";
        }
        
    }
}
