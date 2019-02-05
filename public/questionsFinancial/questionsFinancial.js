let actualQuestion = 66;
let arrayIndex = 0;
let answers = [];
let language = localStorage.getItem("language");
var userInfo;
var userKey;
var userInfo;

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
function saveAnswersAndResults(){
    var results = 0;
    if (answers[0].localeCompare("6") == 0){
        results = results +1;
    }
    var resTwo = answers[1];
    if(resTwo.localeCompare("1") == 0){
        results = results + 1;
    }
    else if (resTwo.localeCompare("2") == 0) {
        results = results + 2;
    }
    else if (resTwo.localeCompare("3") == 0) {
        results = results + 3;
    }
    else {
        results = results + 4;
    }
    var resThree = answers[2];
    if (resThree.localeCompare("1") == 0) {
        results = results + 1;
    }
    else if (resThree.localeCompare("2") == 0) {
        results = results + 2;
    }
    else if (resThree.localeCompare("3") == 0) {
        results = results + 3;
    }
    else {
        results = results + 4;
    }
    if(answers[3].localeCompare("6")== 0){
        results = results + 1;
    }
    var resFive = answers[4];
    if (resFive.localeCompare("1") == 0) {
        results = results + 1;
    }
    else if (resFive.localeCompare("2") == 0) {
        results = results + 2;
    }
    else if (resFive.localeCompare("3") == 0) {
        results = results + 3;
    }
    else if (resFive.localeCompare("4") == 0) {
        results = results + 4;
    }
    else if (resFive.localeCompare("5") == 0) {
        results = results + 5;
    }
    else {
        results = results + 6;
    }
    var resSix = answers[5];
    if (resSix.localeCompare("1") == 0) {
        results = results + 4;
    }
    else if (resSix.localeCompare("2") == 0) {
        results = results + 3;
    }
    else if (resSix.localeCompare("3") == 0) {
        results = results + 2;
    }
    else if (resSix.localeCompare("4") == 0) {
        results = results + 8;
    }
    else if (resSix.localeCompare("5") == 0) {
        results = results + 1;
    }
    else if (resSix.localeCompare("6") == 0) {
        results = results + 7;
    }
    else if (resSix.localeCompare("7") == 0) {
        results = results + 5;
    }
    else {
        results = results + 6;
    }
    var resSeven = answers[6];
    if (resSeven.localeCompare("1") == 0) {
        results = results + 1;
    }
    else if (resSeven.localeCompare("2") == 0) {
        results = results + 2;
    }
    else if (resSeven.localeCompare("3") == 0) {
        results = results + 3;
    }
    else {
        results = results + 4;
    }
    var resEigth = answers[7];
    if (resEigth.localeCompare("1") == 0) {
        results = results + 1;
    }
    else if (resEigth.localeCompare("2") == 0) {
        results = results + 2;
    }
    else if (resEigth.localeCompare("3") == 0) {
        results = results + 3;
    }
    else if (resEigth.localeCompare("4") == 0) {
        results = results + 4;
    }
    else if (resEigth.localeCompare("5") == 0) {
        results = results + 5;
    }
    else {
        results = results + 6;
    }
    var resultsScore = results/34;
    return [results, resultsScore];
}
function finishQuestionary() {
    document.getElementById("questionsPre").style.display = "none";
    document.getElementById("questionsPos").style.display = "block";
    var financialAnswers = saveAnswersAndResults();
    loadingScreen(language);
    var docRef = firebase.firestore().collection("users-b2c").doc(userKey);
    var docRefFinancial = docRef.collection("Scores").doc("financial_scores");
    docRefFinancial.set({
        financial_answers: answers,
        financial_score: financialAnswers[1],
        financial_percentage_score: financialAnswers[0]
    })
        .then(function () {
            docRef.update({
                financial_answered: true
            })
                .then(function () {
                    window.location.href = "../main/main.html";
                })
                .catch(function (error) {
                    console.error("Error updating document: ", error);
                });
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        });

}

function translateText(lang) {
    language = lang;
    localStorage.setItem("language", lang);
    translator.lang(lang);
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
function setPercentageBar(percentage){
    $('#progressBar').attr('aria-valuenow', percentage).css('width', percentage+"%");
    document.getElementById("progressBar").innerHTML = percentage+"%";
    document.getElementById("preguntaActual").innerHTML= (actualQuestion-65)+"/8"
}

// 1 - Seleccion multiple 4
// 2 - Ordenar 8 preguntas
// 3 - Seleccion multiple 6 preguntas
// 4 - No existe
function questionType(question) {

    if (question === 67 || question === 68 || question === 72) {
        return 1;
    } else if (question === 71) {
        return 2;
    } else if (question === 66 || question === 69 || question === 70 || question === 73) {
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

function nextQuestion() {
    let questionType1 = questionType(actualQuestion);
    if (actualQuestion < 73) {
        if (questionType1 === 1 || questionType1 === 2 || questionType1 === 3) {
            if ($('input[name=radio]:checked').val() == undefined) {
                window.alert("Please answer the question");
            } else {
                answers[arrayIndex] = $('input[name=radio]:checked').val();
                arrayIndex++;
                actualQuestion++;
            }
        } 
        questionType1 = questionType(actualQuestion);
        interfaceQuestionTypeShow(questionType1);
        setPercentageBar(Math.round(((actualQuestion-66)/8)*100));

    } else {
        if (actualQuestion === 73)
        {
            document.getElementById("nextBut").innerHTML = "finish"
            document.getElementById("nextBut2").innerHTML = "finish"
            answers[arrayIndex] = $('input[name=radio]:checked').val();
            setPercentageBar(Math.round(((actualQuestion - 66) / 8) * 100));
            actualQuestion++;
        }
        //////////////////////////////////////////////
        ///TERMINA EL CUESTIONARIO
        //////////////////////////////////////////////
        else{
            setPercentageBar(Math.round(((actualQuestion - 66) / 8) * 100));
            finishQuestionary();
        }

    }
}



function interfaceQuestionTypeShow(question) {
    if (question === 1) {
        document.getElementById("orderQuest").style.display = "none";
        document.getElementById("rc5").style.display = "none";
        document.getElementById("rc6").style.display = "none";
        document.getElementById("rc5A").style.display = "none";
        document.getElementById("rc6A").style.display = "none";
        document.getElementById("rc7").style.display = "none";
        document.getElementById("rc8").style.display = "none";
        document.getElementById("rc7A").style.display = "none";
        document.getElementById("rc8A").style.display = "none";
        document.getElementById("radioButtonsQuest").style.display = "block";
        document.getElementById("checkQ1").innerHTML = translateByID("A" + actualQuestion + "A", language);
        document.getElementById("checkQ2").innerHTML = translateByID("A" + actualQuestion + "B", language);
        document.getElementById("checkQ3").innerHTML = translateByID("A" + actualQuestion + "C", language);
        document.getElementById("checkQ4").innerHTML = translateByID("A" + actualQuestion + "D", language);
        document.getElementById("questionMultiple").innerHTML = translateByID("Q" + actualQuestion, language);
        $('input[name=radio]:checked').prop('checked', false);
    } else if (question === 2) {
        document.getElementById("orderQuest").style.display = "none";
        document.getElementById("rc5").style.display = "block";
        document.getElementById("rc6").style.display = "block";
        document.getElementById("rc5A").style.display = "block";
        document.getElementById("rc6A").style.display = "block";
        document.getElementById("rc7").style.display = "block";
        document.getElementById("rc8").style.display = "block";
        document.getElementById("rc7A").style.display = "block";
        document.getElementById("rc8A").style.display = "block";
        document.getElementById("radioButtonsQuest").style.display = "block";
        document.getElementById("checkQ1").innerHTML = translateByID("A" + actualQuestion + "A", language);
        document.getElementById("checkQ2").innerHTML = translateByID("A" + actualQuestion + "B", language);
        document.getElementById("checkQ3").innerHTML = translateByID("A" + actualQuestion + "C", language);
        document.getElementById("checkQ4").innerHTML = translateByID("A" + actualQuestion + "D", language);
        document.getElementById("checkQ5").innerHTML = translateByID("A" + actualQuestion + "E", language);
        document.getElementById("checkQ6").innerHTML = translateByID("A" + actualQuestion + "F", language);
        document.getElementById("checkQ7").innerHTML = translateByID("A" + actualQuestion + "G", language);
        document.getElementById("checkQ8").innerHTML = translateByID("A" + actualQuestion + "H", language);
        document.getElementById("questionMultiple").innerHTML = translateByID("Q" + actualQuestion, language);
        $('input[name=radio]:checked').prop('checked', false);
    } else if (question === 3) {
        document.getElementById("orderQuest").style.display = "none";
        document.getElementById("rc5").style.display = "block";
        document.getElementById("rc6").style.display = "block";
        document.getElementById("rc5A").style.display = "block";
        document.getElementById("rc6A").style.display = "block";
        document.getElementById("rc7").style.display = "none";
        document.getElementById("rc8").style.display = "none";
        document.getElementById("rc7A").style.display = "none";
        document.getElementById("rc8A").style.display = "none"; 
        document.getElementById("radioButtonsQuest").style.display = "block";
        document.getElementById("checkQ1").innerHTML = translateByID("A" + actualQuestion + "A", language);
        document.getElementById("checkQ2").innerHTML = translateByID("A" + actualQuestion + "B", language);
        document.getElementById("checkQ3").innerHTML = translateByID("A" + actualQuestion + "C", language);
        document.getElementById("checkQ4").innerHTML = translateByID("A" + actualQuestion + "D", language);
        document.getElementById("checkQ5").innerHTML = translateByID("A" + actualQuestion + "E", language);
        document.getElementById("checkQ6").innerHTML = translateByID("A" + actualQuestion + "F", language);
        document.getElementById("questionMultiple").innerHTML = translateByID("Q" + actualQuestion, language);
        $('input[name=radio]:checked').prop('checked', false);

    }



}

function previousQuestion() {
    if (actualQuestion > 66) {
        answers.pop();
        arrayIndex--;
        actualQuestion--;
        interfaceQuestionTypeShow(questionType(actualQuestion));
        setPercentageBar(Math.round(((actualQuestion-66)/8)*100));
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
    var spanish =  shuffleArray(["Alimentando unicornios", "Agarrando Tareas", "Cotejando charlas", "Reticulando splines", "Ponderando vacío", "Considerando alternativas", "Reorganizando bits", "Celebrando momentos", "Generando frases", "Simulando flujos", "Empoderandonos", "Siendo aspiracional", "Haciendo hokey pokey", "Trabajando", "Craqueando bromas", "Aflojando"]);
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
    //animateLoading();
}
//Cositas varias de firebase n stuff super stuff