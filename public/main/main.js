var testAnswered;
var userInfo;
var uUid;
firebase.auth().onAuthStateChanged(function (user) {
    uUid = user.uid;
    if (user) {
        // User is signed in.
        loadUserInfo(user.uid, function (us, val) {
            userInfo = us;
            testAnswered = val;
            loadIface();
            document.getElementById("main-wrapper").style.display = "block";
            document.getElementById("coolLoading").style.display = "none";
        });

    } else {
        location.replace("../index.html");
    }
});
var jobFitnessResults = [1, 2, 1, 0, 1, 2, 1, 0, 1, 2];

var leadershipProfile = "Resolve";
var leadershipDescription = "Resolve";
var leadershipPrincipal = "Resolve";
var leadershipSecondary = "Resolve";
var leadershipLeedrScore = 0;
var leadershipCommunicationScore = 0;
var leadershipLeadershipScore = 0;
var leadershipDecitionScore = 0;
var leadershipConfrontationScore = 0;
var leadershipTeamsScore = 0;

var eqProfile = "Resolve";
var eqDescription = "Resolve";
var eqAnalisis = "Resolve";
var eqRealEQ = 0;
var eqPotentialEQ = 0;
var eqSelfAwarness = 0;
var eqSelfManagment = 0;
var eqSocialAwarness = 0;
var eqSocialManagment = 0;

var IqDescrpition = "Resolve";
var IQsuggestionOne = "Resolve";
var IQsuggestionTwo = "Resolve";
var IQsuggestionThree = "Resolve";
var IQHas = [false, false, false, false, false, false, false];
var gritProfile = "Resolve";
var gritSuggestions = "Resolve";
var gritDescriptionPer = "Resolve";
var gritDescrptionEntre = "Resolve";
var personalGritValue = 0;
var jobFitnessValue = 0;
var entrepreneurialGritValue = 0;
var totalGritValue = 0;

var chartClusterLeadershipGraph1;
var chartSpiderLeadershipGraph1;
var chartClusterEQGraph1;
var chartProfileEQGraph1;
var chartPersonal;
var charEntrepreneurial;
var chartTotal;

var financialProfile = "Resolve";
var financialDescriptioin = "Resolve";

var jobBottomOne = "Resolve";
var jobBottomTwo = "Resolve";
var jobBottomThree = "Resolve";
var jobTopOne = "Resolve";
var jobTopTwo = "Resolve";
var jobTopThree = "Resolve";
var jobQuickWinsOne = "Resolve";
var jobQuickWinsTwo = "Resolve";
var jobQuickWinsYhree = "Resolve";
var jobPercentage = 0;

var chartSpiderLeadership = "Resolve";
var chartClusterLeadership = "Resolve";
var chartClusterEQ;
var chartProfileEQ;
var cUUser;
var chartFinancial;
let language = localStorage.getItem("language");
var chartProfileEQData = [{
        "profile": "Your Results",
        "Value": 0
    },
    {
        "profile": "Your Potential",
        "Value": 0
    }
];
var chartClusterLeadershipData = [{
        "profile": "LEEDR",
        "Your results": 0,
        "Benchmark": 0
    },
    {
        "profile": "Communication",
        "Your results": 0,
        "Benchmark": 0
    },
    {
        "profile": "Leadership",
        "Your results": 0,
        "Benchmark": 0
    },
    {
        "profile": "Decision Making",
        "Your results": 0,
        "Benchmark": 0
    },
    {
        "profile": "Confrontation",
        "Your results": 0,
        "Benchmark": 0
    },
    {
        "profile": "Teams",
        "Your results": 0,
        "Benchmark": 0
    }
];
var chartClusterEQData = [{
        "profile": "Self Awareness",
        "Your results": 0,
        "Your potential": 0
    },
    {
        "profile": "Self Management",
        "Your results": 0,
        "Your potential": 0
    },
    {
        "profile": "Social Awareness",
        "Your results": 0,
        "Your potential": 0
    },
    {
        "profile": "Social Management",
        "Your results": 0,
        "Your potential": 0
    },
];


var chartDataLeadershipSpider = [{
        "profile": "LEEDR",
        "percentages": 0,
        "Benchmark": 0
    },
    {
        "profile": "Communication",
        "percentages": 0,
        "Benchmark": 0
    },
    {
        "profile": "Leadership",
        "percentages": 0,
        "Benchmark": 0
    },
    {
        "profile": "Decision Making",
        "percentages": 0,
        "Benchmark": 0
    },
    {
        "profile": "Confrontation",
        "percentages": 0,
        "Benchmark": 0
    },
    {
        "profile": "Teams",
        "percentages": 0,
        "Benchmark": 0
    }
];

var chartClusterEQData;
var chartClusterLeadershipData;
var chartDataLeadershipSpider;
var chartDataFinancial;
var chartProfileEQData;

function startDataArrays() {
    language = localStorage.getItem("language");
    chartProfileEQData = [{
            "profile": "Your Results",
            "Value": 0
        },
        {
            "profile": "Your Potential",
            "Value": 0
        }
    ];
    chartClusterLeadershipData = [{
            "profile": "LEEDR",
            "Your results": 0,
            "Benchmark": 0
        },
        {
            "profile": "Communication",
            "Your results": 0,
            "Benchmark": 0
        },
        {
            "profile": "Leadership",
            "Your results": 0,
            "Benchmark": 0
        },
        {
            "profile": "Decision Making",
            "Your results": 0,
            "Benchmark": 0
        },
        {
            "profile": "Confrontation",
            "Your results": 0,
            "Benchmark": 0
        },
        {
            "profile": "Teams",
            "Your results": 0,
            "Benchmark": 0
        }
    ];
    chartClusterEQData = [{
            "profile": "Self Awareness",
            "Your results": 0,
            "Benchmark": 0
        },
        {
            "profile": "Self Management",
            "Your results": 0,
            "Benchmark": 0
        },
        {
            "profile": "Social Awareness",
            "Your results": 0,
            "Benchmark": 0
        },
        {
            "profile": "Social Management",
            "Your results": 0,
            "Benchmark": 0
        },
    ];


    chartDataLeadershipSpider = [{
            "profile": "LEEDR",
            "percentages": 0,
            "Benchmark": 0
        },
        {
            "profile": "Communication",
            "percentages": 0,
            "Benchmark": 0
        },
        {
            "profile": "Leadership",
            "percentages": 0,
            "Benchmark": 0
        },
        {
            "profile": "Decision Making",
            "percentages": 0,
            "Benchmark": 0
        },
        {
            "profile": "Confrontation",
            "percentages": 0,
            "Benchmark": 0
        },
        {
            "profile": "Teams",
            "percentages": 0,
            "Benchmark": 0
        }
    ];

    chartDataFinancial = [{
        "profile": "Remaining",
        "value": 0
    }, {
        "profile": "Your Journey",
        "value": 0
    }];

}

function setProfileEQData(values) {
    chartProfileEQData[0]["Value"] = values[0];
    chartProfileEQData[1]["Value"] = values[1];
    return chartProfileEQData;
}

function setchartDataFinancial(values) {
    chartDataFinancial[0]["value"] = values[0];
    chartDataFinancial[1]["value"] = values[1];
    return chartDataFinancial;
}

function setChartClusterLeadershipData(results, benchmark) {
    for (i = 0; i < results.length; i++) {
        chartClusterLeadershipData[i]["Your results"] = results[i];
        chartClusterLeadershipData[i]["Benchmark"] = benchmark[i];
    }
    return chartClusterLeadershipData
}

function setChartClusterEQData(results, potentials) {
    for (i = 0; i < results.length; i++) {
        chartClusterEQData[i]["Your results"] = results[i];
        chartClusterEQData[i]["Benchmark"] = potentials[i];
    }
    return chartClusterEQData;
}

function setChartDataLeadershipSpider(percentages, benchmark) {
    for (i = 0; i < percentages.length; i++) {
        chartDataLeadershipSpider[i]["percentages"] = percentages[i];
        chartDataLeadershipSpider[i]["Benchmark"] = benchmark[i];
    }
    return chartDataLeadershipSpider;
}

function setTextsLeadership(perfil, descripcion, rasgoPrincipal, rasgoSecundario) {
    document.getElementById("perfilLeadership").innerHTML = translateByID(perfil, language);
    document.getElementById("descriptionTextLeadership").innerHTML = translateByID(descripcion, language);
    document.getElementById("treatPrincipalTextLeadership").innerHTML = translateByID(rasgoPrincipal, language);
    document.getElementById("treatSecundaryTextLeadership").innerHTML = translateByID(rasgoSecundario, language);
}

function setTextsEQ(perfil, descripcion, analisisEmocional) {
    document.getElementById("perfilEQ").innerHTML = translateByID(perfil, language);
    document.getElementById("descriptionTextEQ").innerHTML = translateByID(descripcion, language);
    document.getElementById("emotionalAnalisisTextEQ").innerHTML = translateByID(analisisEmocional, language);

}

//TODO 
function setTextsIQ(descripcion, sugerencias, iqHass) {
    document.getElementById("descriptionTextIQ").innerHTML = translateByID(descripcion, language);
    document.getElementById("suggestionsTextIQ").innerHTML = translateByID(sugerencias, language);

    for (i = 0; i < iqHass.length; i++) {
        if (iqHass[i]) {
            document.getElementById("Iq" + (i + 1) + "Has").classList.add('dotChecked');
            document.getElementById("Iq" + (i + 1) + "Hasnt").classList.add('dotUnchecked');
        } else {
            document.getElementById("Iq" + (i + 1) + "Hasnt").classList.add('dotChecked');
            document.getElementById("Iq" + (i + 1) + "Has").classList.add('dotUnchecked');
        }
    }
}

function setTextsGRIT(perfil, suggestions, descriptionPersonalGRIT, descriptionEntrepreneurialGRIT) {
    document.getElementById("perfilGRIT").innerHTML = translateByID(perfil, language);
    document.getElementById("suggestionsTextGRIT").innerHTML = translateByID(suggestions, language);
    document.getElementById("descriptionPersonalGRIT").innerHTML = translateByID(descriptionPersonalGRIT, language);
    document.getElementById("descriptionEntrepreneurialGRIT").innerHTML = translateByID(descriptionEntrepreneurialGRIT, language);
}

function setTextsFinancial(perfil, descripcion) {
    document.getElementById("perfilFinancial").innerHTML = translateByID(perfil, language);
    document.getElementById("descriptionTextFinanciero").innerHTML = translateByID(descripcion, language);
}

function setTextJobFit(tasks, resultTask, percentage) {
    let job = "";
    let jobPend = "";
    let jobOMW = "";
    let jobSuccess = "";
    for (i = 0; i < tasks.length; i++) {
        job = "job" + (i + 1);
        jobPend = "jobpend" + (i + 1);
        jobOMW = "jobomw" + (i + 1);
        jobSuccess = "jobsuccess" + (i + 1);
        document.getElementById(job).innerHTML = translateByID(tasks[i], language);
        setInitialTaskValue(resultTask[i], jobPend, jobOMW, jobSuccess);
    }
    setPercentage(percentage);
}

function setTaskValue(result, jobpend, jobomw, jobsuccess) {
    let numberQuestion = parseInt(jobpend.replace("jobpend", ""));
    jobFitnessResults[numberQuestion - 1] = result;
    setPercentage(calculatePercentage());
    if (result === 0) {
        document.getElementById(jobpend).classList.add('dotChecked');
        document.getElementById(jobpend).classList.remove('dotUncheckedGray');
        document.getElementById(jobomw).classList.add('dotUncheckedGray');
        document.getElementById(jobomw).classList.remove('dotChecked');
        document.getElementById(jobsuccess).classList.remove('dotChecked');
        document.getElementById(jobsuccess).classList.add('dotUncheckedGray');
    } else if (result === 1) {
        document.getElementById(jobpend).classList.remove('dotChecked');
        document.getElementById(jobpend).classList.add('dotUncheckedGray');
        document.getElementById(jobomw).classList.remove('dotUncheckedGray');
        document.getElementById(jobomw).classList.add('dotChecked');
        document.getElementById(jobsuccess).classList.remove('dotChecked');
        document.getElementById(jobsuccess).classList.add('dotUncheckedGray');
    } else if (result === 2) {
        document.getElementById(jobpend).classList.remove('dotChecked');
        document.getElementById(jobpend).classList.add('dotUncheckedGray');
        document.getElementById(jobomw).classList.add('dotUncheckedGray');
        document.getElementById(jobomw).classList.remove('dotChecked');
        document.getElementById(jobsuccess).classList.add('dotChecked');
        document.getElementById(jobsuccess).classList.remove('dotUncheckedGray');
    }
    saveAnswersJob()
    
}

function saveAnswersJob(){
    var docRef = firebase.firestore().collection("users-b2c").doc(uUid).collection("Scores").doc("job_scores");
        docRef.update({
            job_fitness_answers: jobFitnessResults,
        })
            .then(function () {

            })
            .catch(function (error) {
                console.error("Error updating document: ", error);
            });
}

function setInitialTaskValue(result, jobpend, jobomw, jobsuccess) {
    if (result === 0) {
        document.getElementById(jobpend).classList.add('dotChecked');
        document.getElementById(jobomw).classList.add('dotUncheckedGray');
        document.getElementById(jobsuccess).classList.add('dotUncheckedGray');
    } else if (result === 1) {
        document.getElementById(jobpend).classList.add('dotUncheckedGray');
        document.getElementById(jobomw).classList.add('dotChecked');
        document.getElementById(jobsuccess).classList.add('dotUncheckedGray');
    } else if (result === 2) {
        document.getElementById(jobpend).classList.add('dotUncheckedGray');
        document.getElementById(jobomw).classList.add('dotUncheckedGray');
        document.getElementById(jobsuccess).classList.add('dotChecked');
    }
}


function calculatePercentage() {
    totalpercentage = 0;
    for (i = 0; i < jobFitnessResults.length; i++) {
        if (jobFitnessResults[i] === 2) {
            totalpercentage += 10;
        }
    }
    return totalpercentage;
}

function cashFlow() {
    let salary = parseInt(document.getElementById("salary_field").value);
    let passiveIncome = parseInt(document.getElementById("pasIncome_field").value);
    let expenses = parseInt(document.getElementById("expenses_field").value);
    let cashFlow = (passiveIncome - expenses);
    let financialFreedom = Math.round((passiveIncome / expenses) * 100);
    let financialFreedomRemain = Math.round((1 - (passiveIncome / expenses)) * 100);
    let totalIncome = (salary + passiveIncome);
    if (financialFreedom >= 100) {
        document.getElementById("libertyFreedom").innerHTML = translateByID("libertyFreedom100", language);
    } else if (financialFreedom === 0) {
        document.getElementById("libertyFreedom").innerHTML = translateByID("libertyFreedom0", language);
    } else {
        document.getElementById("libertyFreedom").innerHTML = translateByID("libertyFreedom", language) + financialFreedomRemain + "%";
    }

    document.getElementById("totalIncome").innerHTML = totalIncome + "$";
    document.getElementById("cashFlow").innerHTML = cashFlow + "$";
    //PIE CHART
    chartFinancial.dataProvider = [];
    let pieExpenses = [financialFreedom, financialFreedomRemain];
    chartFinancial.dataProvider.push(setchartDataFinancial(pieExpenses)[0]);
    chartFinancial.dataProvider.push(setchartDataFinancial(pieExpenses)[1]);
    chartFinancial.validateData();
}

function showStart() {
    document.getElementById("leaderbox").style.display = "none";
    document.getElementById("eqbox").style.display = "none";
    document.getElementById("iqbox").style.display = "none";
    document.getElementById("resolvebox").style.display = "none";
    document.getElementById("financialbox").style.display = "none";
    document.getElementById("jobbox").style.display = "none";
    document.getElementById("initialbox").style.display = "block";
}

function showLeader() {
    document.getElementById("leaderbox").style.display = "block";
    document.getElementById("eqbox").style.display = "none";
    document.getElementById("jobbox").style.display = "none";
    document.getElementById("iqbox").style.display = "none";
    document.getElementById("resolvebox").style.display = "none";
    document.getElementById("financialbox").style.display = "none";
    document.getElementById("initialbox").style.display = "none";
    showStatsByAnsweredTest(userInfo.leadership_answered, "Leader");
}

function showiq() {
    document.getElementById("leaderbox").style.display = "none";
    document.getElementById("eqbox").style.display = "none";
    document.getElementById("iqbox").style.display = "block";
    document.getElementById("jobbox").style.display = "none";
    document.getElementById("resolvebox").style.display = "none";
    document.getElementById("financialbox").style.display = "none";
    document.getElementById("initialbox").style.display = "none";
    showStatsByAnsweredTest(userInfo.iq_answered, "IQ");
}

function showeq() {
    document.getElementById("leaderbox").style.display = "none";
    document.getElementById("eqbox").style.display = "block";
    document.getElementById("iqbox").style.display = "none";
    document.getElementById("jobbox").style.display = "none";
    document.getElementById("resolvebox").style.display = "none";
    document.getElementById("financialbox").style.display = "none";
    document.getElementById("initialbox").style.display = "none";
    showStatsByAnsweredTest(userInfo.eq_answered, "EQ");
}

function showResolve() {
    document.getElementById("leaderbox").style.display = "none";
    document.getElementById("eqbox").style.display = "none";
    document.getElementById("iqbox").style.display = "none";
    document.getElementById("jobbox").style.display = "none";
    document.getElementById("resolvebox").style.display = "block";
    document.getElementById("financialbox").style.display = "none";
    document.getElementById("initialbox").style.display = "none";
    showStatsByAnsweredTest(userInfo.grit_answered, "GRIT");

}

function showFinancial() {
    document.getElementById("leaderbox").style.display = "none";
    document.getElementById("eqbox").style.display = "none";
    document.getElementById("iqbox").style.display = "none";
    document.getElementById("jobbox").style.display = "none";
    document.getElementById("resolvebox").style.display = "none";
    document.getElementById("financialbox").style.display = "block";
    document.getElementById("initialbox").style.display = "none";
    showStatsByAnsweredTest(userInfo.financial_answered, "Financial");

}

function showJobFitness() {
    document.getElementById("leaderbox").style.display = "none";
    document.getElementById("eqbox").style.display = "none";
    document.getElementById("iqbox").style.display = "none";
    document.getElementById("jobbox").style.display = "block";
    document.getElementById("resolvebox").style.display = "none";
    document.getElementById("financialbox").style.display = "none";
    document.getElementById("initialbox").style.display = "none";
    showStatsByAnsweredTest(userInfo.grit_answered, "JobFit");

}
var set_lang = function (dictionary) {
    $("[data-translate]").each(function () {
        if ($(this).is("input")) {
            $(this).attr('placeholder', dictionary[$(this).data("translate")])
        } else {
            $(this).text(dictionary[$(this).data("translate")])
        }
    })
};

function translateChartById(dict,chart){
    for (i = 0; i < chart.length; i++) {
        chart[i]["profile"] = translateByID(dict+i,language);
    }
    return chart
}

function translateCharts()
{
    //Leadership

    translateChartById("chartClusterLeadership", chartClusterLeadershipData);
    chartClusterLeadership.removeGraph(chartClusterLeadershipGraph1)
    chartClusterLeadershipGraph1 = new AmCharts.AmGraph();
    chartClusterLeadershipGraph1.type = "column";
    chartClusterLeadershipGraph1.title = translateByID("chartClusterLeadershipTittle1",language);
    chartClusterLeadershipGraph1.valueField = "Your results";
    chartClusterLeadershipGraph1.balloonText = translateByID("chartClusterLeadershipTittle1",language)+":[[value]]";
    chartClusterLeadershipGraph1.lineAlpha = 0;
    chartClusterLeadershipGraph1.fillColors = "#ADD981";
    chartClusterLeadershipGraph1.fillAlphas = 1;
    chartClusterLeadership.addGraph(chartClusterLeadershipGraph1); 
    chartClusterLeadership.validateData();
    
    chartSpiderLeadership.removeGraph(chartSpiderLeadershipGraph1);
    chartSpiderLeadershipGraph1 = new AmCharts.AmGraph();
    chartSpiderLeadershipGraph1.valueField = "percentages";
    chartSpiderLeadershipGraph1.bullet = "round";
    chartSpiderLeadershipGraph1.balloonText = "[[value]]% "+translateByID("chartSpiderLeadershipTittle1",language);
    chartSpiderLeadership.addGraph(chartSpiderLeadershipGraph1);
    translateChartById("chartClusterLeadershipSpider", chartDataLeadershipSpider);
    chartSpiderLeadership.validateData();
    
    
    
    // EQ

    chartClusterEQ.removeGraph(chartClusterEQGraph1);
    chartClusterEQGraph1 = new AmCharts.AmGraph();
    chartClusterEQGraph1.type = "column";
    chartClusterEQGraph1.title = translateByID("chartClusterEQTittle1",language);
    chartClusterEQGraph1.valueField = "Your results";
    chartClusterEQGraph1.balloonText = translateByID("chartClusterEQTittle1",language)+": [[value]]";
    chartClusterEQGraph1.lineAlpha = 0;
    chartClusterEQGraph1.fillColors = "#ADD981";
    chartClusterEQGraph1.fillAlphas = 1;
    chartClusterEQ.addGraph(chartClusterEQGraph1);
    translateChartById("chartClusterEQ", chartClusterEQData);
    chartClusterEQ.validateData();

    chartProfileEQ.removeGraph(chartProfileEQGraph1);
    chartProfileEQGraph1 = new AmCharts.AmGraph();
    chartProfileEQGraph1.title = translateByID("chartProfileEQGraph1Tittle1",language);
    chartProfileEQGraph1.valueField = "Value";
    chartProfileEQGraph1.type = "column";
    chartProfileEQGraph1.balloonText = translateByID("chartProfileEQGraph1Tittle1",language)+": [[Value]]";
    chartProfileEQGraph1.lineAlpha = 0;
    chartProfileEQGraph1.fillColors = "#bf1c25";
    chartProfileEQGraph1.fillAlphas = 1;
    chartProfileEQ.addGraph(chartProfileEQGraph1);
    translateChartById("chartProfileEQ", chartProfileEQData);
    chartProfileEQ.validateData();
    
    //Financial
    
    translateChartById("chartFinancial", chartDataFinancial);
    chartFinancial.validateData();

    //GRIT
    getChart("chartPiePersonalGRIT")["titles"][0]["text"]=translateByID("chartPersonalGRITTittle1",language);
    getChart("chartPiePersonalGRIT").validateData();
    getChart("chartPiePersonalGRIT").validateNow();
    getChart("chartPieEntrepreneurialGRIT")["titles"][0]["text"]=translateByID("chartEntrepreneurialGRITTittle1",language);
    getChart("chartPieEntrepreneurialGRIT").validateData();
    getChart("chartPieEntrepreneurialGRIT").validateNow();
    getChart("chartPieTotalGRIT")["titles"][0]["text"]=translateByID("chartTotalGRITTittle1",language);
    getChart("chartPieTotalGRIT").validateData();
    getChart("chartPieTotalGRIT").validateNow();
}

function translateText(lang) {
    // Swap languages when menu changes
    set_lang(dictionary[lang]);
    localStorage.setItem("language", lang);
    language = lang;
    translator.lang(lang);
    document.getElementById("dropdownMenuLink").innerHTML = translateByID("Language", language);
    document.getElementById("logoutNav").innerHTML = translateByID("Logout", language);
  
    // Leadership
    document.getElementById("perfilLeadership").innerHTML = translateByID(leadershipProfile, language);
    document.getElementById("treatPrincipalTextLeadership").innerHTML = translateByID(leadershipPrincipal, language);
    document.getElementById("treatSecundaryTextLeadership").innerHTML = translateByID(leadershipSecondary, language);
    document.getElementById("descriptionTextLeadership").innerHTML = translateByID(leadershipDescription, language);
    
    // EQ
    document.getElementById("perfilEQ").innerHTML = translateByID(eqProfile, language);
    document.getElementById("descriptionTextEQ").innerHTML = translateByID(eqDescription, language);
    document.getElementById("emotionalAnalisisTextEQ").innerHTML = translateByID(eqAnalisis, language);
    
    // IQ
    document.getElementById("descriptionTextIQ").innerHTML = translateByID(IqDescrpition, language);
    document.getElementById("suggestionsTextIQ").innerHTML = translateByID(IQsuggestionOne, language);

    // GRIT
    document.getElementById("perfilGRIT").innerHTML = translateByID(gritProfile, language);
    document.getElementById("suggestionsTextGRIT").innerHTML = translateByID(gritSuggestions, language);
    document.getElementById("descriptionPersonalGRIT").innerHTML = translateByID(gritDescriptionPer, language);
    document.getElementById("descriptionEntrepreneurialGRIT").innerHTML = translateByID(gritDescrptionEntre, language);

    //FINANCIAL
    document.getElementById("perfilFinancial").innerHTML = translateByID(financialProfile, language);
    
    //Charts
    translateCharts()
}

function showStatsByAnsweredTest(answeredTest, typeName) {
    if (answeredTest) {
        document.getElementById("btnJourney" + typeName).style.display = "none";
        document.getElementById("statsTest" + typeName).style.display = "block";

        if (typeName === "GRIT") {
            document.getElementById("textoDescGRID").style.display = "none";
            document.getElementById("textoDescGRID12").style.display = "block";
        }
        if (typeName != "Financial") {
            document.getElementById("infoTest" + typeName).style.display = "block";
        }
        if (typeName == "Financial") {
            document.getElementById("rowFinanciero").style.display = "none";
        }
    } else {
        document.getElementById("btnJourney" + typeName).style.display = "block";
        document.getElementById("statsTest" + typeName).style.display = "none";

        if (typeName != "Financial") {
            document.getElementById("infoTest" + typeName).style.display = "none";
        }
    }

}

function getChart(id) {
    var allCharts = AmCharts.charts;
    for (var i = 0; i < allCharts.length; i++) {
        if (id == allCharts[i].div.id) {
            return allCharts[i];
        }
    }
}
function createPieChart(title, id, color, valuePie, chartPie) {
    chartPie = AmCharts.makeChart(id, {
        type: "gauge",
        titles: [{
            "text": title,
            "size": 20
        }],

        axes: [{
            startValue: 0,
            axisThickness: 1,
            endValue: 100,
            valueInterval: 10,
            bottomTextYOffset: -20,
            bottomText: "0%",

            bands: [{
                    startValue: 0,
                    endValue: 100,
                    color: color,
                },

                //#ea3838
                //color: "#ea3838",

            ]
        }],

        arrows: [{}]
    });

    setInterval(randomValue, 2000);

    // set random value
    function randomValue() {
        var value = valuePie;
        chartPie.arrows[0].setValue(value);
        chartPie.axes[0].setBottomText(value + "%");
    }
}

//FIREBASE STUFF


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

function loadUserInfo(uid, fn) {
    var docRef = firebase.firestore().collection("users-b2c").doc(uid);
    var docRefGrit = docRef.collection("Scores").doc("grit_scores");
    var docRefEQ = docRef.collection("Scores").doc("eq_scores");
    var docRefleadership = docRef.collection("Scores").doc("leadership_scores");
    var docRefIQ = docRef.collection("Scores").doc("iq_scores");
    var docRefJob = docRef.collection("Scores").doc("job_scores");
    var docRefFin = docRef.collection("Scores").doc("financial_scores");
    var cuUser;
    docRef.get().then(function (doc) {
        if (doc.exists) {
            cuUser = doc.data();
            if (cuUser.eq_answered) {
                if(cuUser.financial_answered){
                    docRefFin.get().then(function(doc){
                        if(doc.exists){
                            var financialScore = doc.data().financial_score;

                            financialProfile = getFinancialProfile(financialScore)[0];
                            financialDescriptioin = getFinancialProfile(financialScore)[1];
                        }
                        else{

                        }
                    })
                        .catch(function (error) {
                            console.log("Error getting document:", error);
                        });
                }
                docRefGrit.get().then(function (doc) {
                    if (doc.exists) {
                        gritProfile = doc.data().grit_profile;
                        gritSuggestions = doc.data().suggestions + (Math.floor(Math.random() * (4 - 1 + 1)) + 1);
                        gritDescriptionPer = doc.data().personal_grit_text;
                        gritDescrptionEntre = doc.data().entr_grit_text;
                        personalGritValue = (doc.data().personal_grit * 100).toFixed(2);
                        entrepreneurialGritValue = (doc.data().entr_grit * 100).toFixed(2);
                        if(entrepreneurialGritValue < 40){
                            entrepreneurialGritValue = 40;
                        }
                        totalGritValue = (doc.data().overall_grit * 100).toFixed(2);
                        docRefEQ.get().then(function (doc) {
                            if (doc.exists) {
                                eqProfile = doc.data().eq_profile;
                                eqDescription = doc.data().description;
                                eqAnalisis = doc.data().suggestions;
                                eqRealEQ = doc.data().real_eq * 100;
                                eqPotentialEQ = doc.data().potential_eq * 100;
                                eqSelfAwarness = doc.data().self_awarness * 100;
                                eqSelfManagment = doc.data().self_managment * 100;
                                eqSocialAwarness = doc.data().social_awarness * 100;
                                eqSocialManagment = doc.data().social_managment * 100;
                                docRefleadership.get().then(function (doc) {
                                    if (doc.exists) {
                                        leadershipProfile = doc.data().leadership_profile;
                                        leadershipDescription = doc.data().leadership_profile_description;
                                        leadershipPrincipal = doc.data().primary_trait;
                                        leadershipSecondary = doc.data().secondary_trait;
                                        leadershipLeedrScore = doc.data().team_score * 100;
                                        leadershipCommunicationScore = doc.data().communication_score * 100;
                                        leadershipLeadershipScore = doc.data().leadership_score * 100;
                                        leadershipDecitionScore = doc.data().desition_making_score * 100;
                                        leadershipConfrontationScore = doc.data().confrontation_score * 100;
                                        leadershipTeamsScore = doc.data().team_score * 100;
                                        docRefIQ.get().then(function (doc) {
                                            if (doc.exists) {
                                                IqDescrpition = doc.data().iq_competencces;
                                                IQsuggestionOne = doc.data().suggestion_one;
                                                IQsuggestionTwo = doc.data().suggestion_two;
                                                IQsuggestionThree = doc.data().suggestion_three;
                                                IQHas = [doc.data().being_strategic_correct, doc.data().business_instinct_correct, doc.data().buisness_inventivness_correct, doc.data().innovation_understanding_correct, doc.data().one_time_desition_making_correct, doc.data().problem_solving_correct, doc.data().understands_diversity_correct];

                                                docRefJob.get().then(function (doc) {
                                                    if (doc.exists) {
                                                        jobFitnessResults = doc.data().job_fitness_answers;
                                                        var percentage = 0;
                                                        for(var i = 0; i < jobFitnessResults.length; i++){
                                                            if(jobFitnessResults[i]==2){
                                                                percentage += 10;
                                                            }
                                                        }
                                                        var quickWins = [];
                                                        var resAnswer = "";
                                                        questionsJob = [0, 2, 7, 11, 13, 18, 21, 23, 27, 30];
                                                        responsability = cuUser.responsability;
                                                        if (responsability.localeCompare("Middle Manager: manager of small teams") == 0 ){
                                                            resAnswer = "Quick_Win_MM_"
                                                        }
                                                        else if (responsability.localeCompare("Individual Contributor: no people in charge") == 0){
                                                            resAnswer = "Quick_Win_IC_";
                                                        }
                                                        else{
                                                            resAnswer = "Quick_Win_SM_";
                                                        }
                                                        for(var j = 0; j < questionsJob.length; j ++){
                                                            var question = questionsJob[j] + 1;
                                                            var temp = resAnswer + question;
                                                            quickWins[j] = temp; 
                                                        }
                                                        setTextJobFit(quickWins, jobFitnessResults, percentage)

                                                        fn(cuUser, true);
                                                    } else {
                                                        // doc.data() will be undefined in this case
                                                        console.log("No such document!");
                                                        fn(cuUser, false);
                                                    }
                                                }).catch(function (error) {
                                                    console.log("Error getting document:", error);
                                                    fn(cuUser, false);
                                                });
                                            } else {
                                                // doc.data() will be undefined in this case
                                                console.log("No such document!");
                                                fn(cuUser, false);
                                            }
                                        }).catch(function (error) {
                                            console.log("Error getting document:", error);
                                            fn(cuUser, false);
                                        });
                                    } else {
                                        // doc.data() will be undefined in this case
                                        console.log("No such document!");
                                        fn(cuUser, false);
                                    }
                                }).catch(function (error) {
                                    console.log("Error getting document:", error);
                                    fn(cuUser, false);
                                });
                            } else {
                                // doc.data() will be undefined in this case
                                console.log("No such document!");
                                fn(cuUser, false);
                            }
                        }).catch(function (error) {
                            console.log("Error getting document:", error);
                            fn(cuUser, false);
                        });
                    } else {
                        // doc.data() will be undefined in this case
                        console.log("No such document!");
                        fn(cuUser, false);
                    }
                }).catch(function (error) {
                    console.log("Error getting document:", error);
                    fn(null, false);
                });
            } else {
                fn(cuUser, false);
            }
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            fn(null, false);
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
        fn(null, false);
    });
}
//End of firebase stuff

function translateByID(index, lang) {
    return dict[index][lang];
}
$(document).ready(function () {

    // Variables
    var clickedTab = $(".tabs > .active");
    var tabWrapper = $(".tab__content");
    var activeTab = tabWrapper.find(".active");
    var activeTabHeight = activeTab.outerHeight();

    // Show tab on page load
    activeTab.show();

    // Set height of wrapper on page load
    tabWrapper.height(activeTabHeight);

    $(".tabs > li").on("click", function () {

        // Remove class from active tab
        $(".tabs > li").removeClass("active");

        // Add class active to clicked tab
        $(this).addClass("active");

        // Update clickedTab variable
        clickedTab = $(".tabs .active");

        // fade out active tab
        activeTab.fadeOut(250, function () {

            // Remove active class all tabs
            $(".tab__content > li").removeClass("active");

            // Get index of clicked tab
            var clickedTabIndex = clickedTab.index();

            // Add class active to corresponding tab
            $(".tab__content > li").eq(clickedTabIndex).addClass("active");

            // update new active tab
            activeTab = $(".tab__content > .active");

            // Update variable
            activeTabHeight = activeTab.outerHeight();

            // Animate height of wrapper to new tab height
            tabWrapper.stop().delay(50).animate({
                height: activeTabHeight
            }, 500, function () {

                // Fade in active tab
                activeTab.delay(50).fadeIn(250);

            });
        });
    });

    // Variables
    var colorButton = $(".colors li");

    colorButton.on("click", function () {

        // Remove class from currently active button
        $(".colors > li").removeClass("active-color");

        // Add class active to clicked button
        $(this).addClass("active-color");

        // Get background color of clicked
        var newColor = $(this).attr("data-color");

        // Change background of everything with class .bg-color
        $(".bg-color").css("background-color", newColor);

        // Change color of everything with class .text-color
        $(".text-color").css("color", newColor);
    });
});
//Traido del html
window.onload = function () {
    document.getElementById("main-wrapper").style.display = "none";
    document.getElementById("coolLoading").style.display = "block";
    startDataArrays();
    showStart();
};
var translator = $('body').translate({
    lang: localStorage.getItem("language"),
    t: dict
});
$(document).ready(function () {
    $('.dropdown-submenu a.test').on("click", function (e) {
        $(this).next('ul').toggle();
        e.stopPropagation();
        e.preventDefault();
    });
});



function loadIface() {
    var set_lang = function (dictionary) {
        $("[data-translate]").each(function () {
            if ($(this).is("input")) {
                $(this).attr('placeholder', dictionary[$(this).data("translate")])
            } else {
                $(this).text(dictionary[$(this).data("translate")])
            }
        })
    };



    // Set initial language to English
    set_lang(dictionary.es);
    
    ///////////////////////////
    // Chart Spider Leadership
    //////////////////////////

    // RADAR CHART
    chartSpiderLeadership = new AmCharts.AmRadarChart();
    ///////////////////////////////////////////////////////////////////////////////////
    /////ACA SE INGRESAN COMO PARÁMETRO LOS VALORES OBTENIDOS DE LA ARAÑA EN LEADERSHIP
    /////setChartDataLeadershipSpider (percentages, benchmark)
    ///////////////////////////////////////////////////////////////////////////////////
    chartSpiderLeadership.dataProvider = setChartDataLeadershipSpider([leadershipLeedrScore, leadershipCommunicationScore, leadershipLeadershipScore, leadershipDecitionScore, leadershipConfrontationScore, leadershipTeamsScore], [58.83, 52, 70.51, 75.23,
        72.75, 72.95
    ]);
    chartSpiderLeadership.categoryField = "profile";
    chartSpiderLeadership.startDuration = 2;

    // VALUE AXIS
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisAlpha = 0.15;
    valueAxis.minimum = 0;
    valueAxis.dashLength = 3;
    valueAxis.axisTitleOffset = 20;
    valueAxis.gridCount = 5;
    chartSpiderLeadership.addValueAxis(valueAxis);

    // GRAPH
    chartSpiderLeadershipGraph1 = new AmCharts.AmGraph();
    chartSpiderLeadershipGraph1.valueField = "percentages";
    chartSpiderLeadershipGraph1.bullet = "round";
    chartSpiderLeadershipGraph1.balloonText = "[[value]]% "+translateByID("chartSpiderLeadershipTittle1",language);
    chartSpiderLeadership.addGraph(chartSpiderLeadershipGraph1);
    var graph2 = new AmCharts.AmGraph();
    graph2.valueField = "Benchmark";
    graph2.bullet = "round";
    graph2.balloonText = "[[value]]% Benchmark";
    chartSpiderLeadership.addGraph(graph2);

    // WRITE
    chartSpiderLeadership.write("chartSpiderLeadership");


    ////////////////////////////
    // Chart Cluster Leadership
    ///////////////////////////

    // SERIAL CHART
    chartClusterLeadership = new AmCharts.AmSerialChart();
    ///////////////////////////////////////////////////////////////////////////////////
    /////ACA SE INGRESAN COMO PARÁMETRO LOS VALORES OBTENIDOS DEL CLUSTER EN LEADERSHIP
    /////setChartClusterLeadershipData(results, benchmark)
    ///////////////////////////////////////////////////////////////////////////////////
    chartClusterLeadership.dataProvider = setChartClusterLeadershipData([leadershipLeedrScore, leadershipCommunicationScore, leadershipLeadershipScore, leadershipDecitionScore, leadershipConfrontationScore, leadershipTeamsScore], [
        58.83, 52, 70.51, 75.23, 72.75, 72.95
    ]);
    chartClusterLeadership.categoryField = "profile";
    chartClusterLeadership.startDuration = 1;
    chartClusterLeadership.plotAreaBorderColor = "#DADADA";
    chartClusterLeadership.plotAreaBorderAlpha = 1;
    // this single line makes the chart a bar chart
    chartClusterLeadership.rotate = true;

    // AXES
    // Category
    var categoryAxis = chartClusterLeadership.categoryAxis;
    categoryAxis.gridPosition = "start";
    categoryAxis.gridAlpha = 0.1;
    categoryAxis.axisAlpha = 0;

    // Value
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisAlpha = 0;
    valueAxis.gridAlpha = 0.1;
    valueAxis.position = "top";
    chartClusterLeadership.addValueAxis(valueAxis);

    // GRAPHS
    // first graph
    chartClusterLeadershipGraph1 = new AmCharts.AmGraph();
    chartClusterLeadershipGraph1.type = "column";
    chartClusterLeadershipGraph1.title = translateByID("chartClusterLeadershipTittle1",language);;
    chartClusterLeadershipGraph1.valueField = "Your results";
    chartClusterLeadershipGraph1.balloonText = translateByID("chartClusterLeadershipTittle1",language)+":[[value]]";
    chartClusterLeadershipGraph1.lineAlpha = 0;
    chartClusterLeadershipGraph1.fillColors = "#ADD981";
    chartClusterLeadershipGraph1.fillAlphas = 1;
    chartClusterLeadership.addGraph(chartClusterLeadershipGraph1);

    // second graph
    chartClusterLeadershipgraph2 = new AmCharts.AmGraph();
    chartClusterLeadershipgraph2.type = "column";
    chartClusterLeadershipgraph2.title = "Benchmark";
    chartClusterLeadershipgraph2.valueField = "Benchmark";
    chartClusterLeadershipgraph2.balloonText = "Benchmark:[[value]]";
    chartClusterLeadershipgraph2.lineAlpha = 0;
    chartClusterLeadershipgraph2.fillColors = "#81acd9";
    chartClusterLeadershipgraph2.fillAlphas = 1;
    chartClusterLeadership.addGraph(chartClusterLeadershipgraph2);

    // LEGEND
    var legend = new AmCharts.AmLegend();
    chartClusterLeadership.addLegend(legend);

    chartClusterLeadership.creditsPosition = "top-right";

    // WRITE
    chartClusterLeadership.write("chartClusterLeadership");

    ////////////////////
    // Chart Cluster EQ
    ////////////////////

    // SERIAL CHART
    chartClusterEQ = new AmCharts.AmSerialChart();
    ///////////////////////////////////////////////////////////////////////////////////
    /////ACA SE INGRESAN COMO PARÁMETRO LOS VALORES OBTENIDOS DEL CLUSTER EN EQ
    /////setChartClusterEQData(results, potentials)
    ///////////////////////////////////////////////////////////////////////////////////

    chartClusterEQ.dataProvider = setChartClusterEQData([eqSelfAwarness, eqSelfManagment, eqSocialAwarness, eqSocialManagment], [46.8, 58.72, 44.04, 56.36]);
    chartClusterEQ.categoryField = "profile";
    chartClusterEQ.startDuration = 1;
    chartClusterEQ.plotAreaBorderColor = "#DADADA";
    chartClusterEQ.plotAreaBorderAlpha = 1;
    // this single line makes the chart a bar chart
    chartClusterEQ.rotate = true;

    // AXES
    // Category
    var categoryAxis = chartClusterEQ.categoryAxis;
    categoryAxis.gridPosition = "start";
    categoryAxis.gridAlpha = 0.1;
    categoryAxis.axisAlpha = 0;

    // Value
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisAlpha = 0;
    valueAxis.gridAlpha = 0.1;
    valueAxis.position = "top";
    chartClusterEQ.addValueAxis(valueAxis);

    // GRAPHS
    // first graph
    chartClusterEQGraph1 = new AmCharts.AmGraph();
    chartClusterEQGraph1.type = "column";
    chartClusterEQGraph1.title = translateByID("chartClusterEQTittle1",language);
    chartClusterEQGraph1.valueField = "Your results";
    chartClusterEQGraph1.balloonText = translateByID("chartClusterEQTittle1",language)+":[[value]]";
    chartClusterEQGraph1.lineAlpha = 0;
    chartClusterEQGraph1.fillColors = "#ADD981";
    chartClusterEQGraph1.fillAlphas = 1;
    chartClusterEQ.addGraph(chartClusterEQGraph1);

    // second graph
    var graph2 = new AmCharts.AmGraph();
    graph2.type = "column";
    graph2.title = "Benchmark";
    graph2.valueField = "Benchmark";
    graph2.balloonText = "Benchmark:[[value]]";
    graph2.lineAlpha = 0;
    graph2.fillColors = "#81acd9";
    graph2.fillAlphas = 1;
    chartClusterEQ.addGraph(graph2);

    // LEGEND
    var legend = new AmCharts.AmLegend();
    chartClusterEQ.addLegend(legend);

    chartClusterEQ.creditsPosition = "top-right";

    // WRITE
    chartClusterEQ.write("chartClusterEQ");
    ///////////////////////////
    // Chart Pies Financial
    //////////////////////////

    chartFinancial = new AmCharts.AmPieChart();
    chartFinancial.dataProvider = setchartDataFinancial([13, 87]);
    chartFinancial.titleField = "profile";
    chartFinancial.valueField = "value";
    chartFinancial.outlineColor = "#FFFFFF";
    chartFinancial.outlineAlpha = 0.8;
    chartFinancial.outlineThickness = 2;

    // WRITE
    chartFinancial.write("chartFinancial");
    ////////////////////
    // Chart Profile EQ
    ////////////////////

    // SERIAL chart
    chartProfileEQ = new AmCharts.AmSerialChart();
    ///////////////////////////////////////////////////////////////////////////////////
    /////ACA SE INGRESAN COMO PARÁMETRO LOS VALORES OBTENIDOS DEL SERIAL CHART PROFILE EN EQ
    /////setProfileEQData(values)
    ///////////////////////////////////////////////////////////////////////////////////

    chartProfileEQ.dataProvider = setProfileEQData([eqRealEQ, eqPotentialEQ]);
    chartProfileEQ.categoryField = "profile";
    // this single line makes the chartProfileEQ a bar chartProfileEQ,
    // try to set it to false - your bars will turn to columns
    chartProfileEQ.rotate = true;
    // the following two lines makes chartProfileEQ 3D
    chartProfileEQ.depth3D = 20;
    chartProfileEQ.angle = 30;

    // AXES
    // Category
    var categoryAxis = chartProfileEQ.categoryAxis;
    categoryAxis.gridPosition = "start";
    categoryAxis.axisColor = "#DADADA";
    categoryAxis.fillAlpha = 1;
    categoryAxis.gridAlpha = 0;
    categoryAxis.fillColor = "#FAFAFA";

    
    // GRAPH
    chartProfileEQGraph1 = new AmCharts.AmGraph();
    chartProfileEQGraph1.title = translateByID("chartProfileEQGraph1Tittle1",language);
    chartProfileEQGraph1.valueField = "Value";
    chartProfileEQGraph1.type = "column";
    chartProfileEQGraph1.balloonText = translateByID("chartProfileEQGraph1Tittle1",language)+": [[Value]]";
    chartProfileEQGraph1.lineAlpha = 0;
    chartProfileEQGraph1.fillColors = "#bf1c25";
    chartProfileEQGraph1.fillAlphas = 1;
    chartProfileEQ.addGraph(chartProfileEQGraph1);

    chartProfileEQ.creditsPosition = "top-right";

    // WRITE
    chartProfileEQ.write("chartProfileEQ");

    ///////////////////////////
    // Chart Pies GRIT
    //////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
    /////ACA SE DEFINEN EN LAS VARIABLES LOS VALORES PARA CADA UNO DE LOS GRIT
    ///////////////////////////////////////////////////////////////////////////////////


    
    createPieChart( translateByID("chartPersonalGRITTittle1",language), "chartPiePersonalGRIT", "#00CC00", personalGritValue,
        chartPersonal);
    createPieChart(translateByID("chartEntrepreneurialGRITTittle1",language), "chartPieEntrepreneurialGRIT", "#00CC00",
        entrepreneurialGritValue, charEntrepreneurial);
    createPieChart(translateByID("chartTotalGRITTittle1",language), "chartPieTotalGRIT", "#ea3838", totalGritValue, chartTotal);
    // createPieChart("Job Fitness Progress", "chartPieJobFit", "#00CC00", jobPercentage,
    // chartJobFit);
    ///////////////////////////////////////////////////////////////////////////////////
    /////ACA SE DEFINEN LOS TEXTOS DE CADA UNO DE LOS VIEWS.
    ////setTextsLeadership(perfil, descripcion, rasgoPrincipal, rasgoSecundario)
    ////setTextsEQ(perfil, descripcion, analisisEmocional)
    ////setTextsIQ(descripcion, sugerencias, iqHass)
    ////setTextsGRIT(perfil, suggestions, descriptionPersonalGRIT, descriptionEntrepreneurialGRIT)
    ////setTextsFinancial(perfil, descripcion)
    ///////////////////////////////////////////////////////////////////////////////////
    setTextsLeadership(leadershipProfile, leadershipDescription, leadershipPrincipal, leadershipSecondary);
    setTextsEQ(eqProfile, eqDescription, eqAnalisis);
    setTextsIQ(IqDescrpition, IQsuggestionOne, IQHas);
    setTextsGRIT(gritProfile, gritSuggestions, gritDescriptionPer, gritDescrptionEntre);
    setTextsFinancial(financialProfile, financialDescriptioin);
    translateCharts();
}
var colorInc = 100 / 3;
function setPercentage(percentage) {
    if (percentage != "" &&
        !isNaN(percentage) &&
        percentage <= 100 &&
        percentage >= 0) {
        var valOrig = percentage;
        percentage = 100 - percentage;

        if (valOrig == 0) {
            $("#percent-box").val(0);
            $(".progress .percent").text(0 + "%");
        } else $(".progress .percent").text(valOrig + "%");

        $(".progress").parent().removeClass();
        $(".progress .water").css("top", percentage + "%");

        if (valOrig < 31)
            $(".progress").parent().addClass("grayer");
        else if (valOrig < 61)
            $(".progress").parent().addClass("grayMid");
        else if (valOrig < 81)
            $(".progress").parent().addClass("blueMid");
        else
            $(".progress").parent().addClass("blueTop");
    } else {
        $(".progress").parent().removeClass();
        $(".progress").parent().addClass("green");
        $(".progress .water").css("top", 100 - 67 + "%");
        $(".progress .percent").text(67 + "%");
        $("#percent-box").val("");
    }
}
function questionsFinancial(){
    if (!userInfo.leadership_answered){
        window.alert("Porfavor responda antes los otros examenes antes de responder este.");
    }
    else{
         location.replace('../questionsFinancial/questionsFinancial.html');
    }
}

function getFinancialProfile(financialPercentage){
    var realCombination = [];
    if(eqRealEQ <= 40){
        realCombination[0] = 1;
    }
    else if(eqRealEQ <= 70){
        realCombination[0] = 2;
    }
    else{
        realCombination[0] = 3;
    }
    if (totalGritValue <= 40){
        realCombination[1] = 4;
    }
    else if(totalGritValue <= 74){
        realCombination[1] = 5
    }
    else{
        realCombination[1] = 6;
    }
    if(financialPercentage <= 0.33){
        realCombination[2] = 7;
    }
    else if(financialPercentage <= 0.66){
        realCombination[2] = 8;
    }
    else{
        realCombination[2] = 9;
    }
    var prom_bronce = [[1,4,7],[2,4,7]];
    var prom_plata = [[2, 4, 8], [3, 4, 8]];
    var prom_oro = [[3, 4, 7], [3, 5, 7]];
    var prom_platino = [[3, 4, 9]];
    var pusher_bronce = [[1, 5, 7], [1, 6, 7]];
    var pusher_plata = [[1, 4, 8], [1, 4,9],[1,5,8],[1,5,9]];
    var pusher_oro = [[1, 6, 8], [1, 6, 9]];
    var pusher_platino = [[2, 6, 7], [2, 5, 7]];
    var empresario_plata = [[3, 6, 7]];
    var empresario_oro = [[2, 5, 8], [2, 6, 8],[3,5,8],[3,6,8]];

    var res = [];
    if(prom_bronce.includes(realCombination)){
        res[0] = "FinancialProfile_Promoter_Bronze";
        res[1] = "FinancialProfile_Promoter_Bronze_description"; 
    }
    else if (prom_plata.includes(realCombination)) {
        res[0] = "FinancialProfile_Promoter_Silver";
        res[1] = "FinancialProfile_Promoter_Silver_description";
    }
    else if (prom_oro.includes(realCombination)) {
        res[0] = "FinancialProfile_Promoter_Gold";
        res[1] = "FinancialProfile_Promoter_Gold_description";
    }
    else if (prom_platino.includes(realCombination)) {
        res[0] = "FinancialProfile_Promoter_Platinum";
        res[1] = "FinancialProfile_Promoter_Platinum_description";
    }
    else if (pusher_bronce.includes(realCombination)) {
        res[0] = "FinancialProfile_Pusher_Bronze";
        res[1] = "FinancialProfile_Pusher_Bronze_description";
    }
    else if (pusher_plata.includes(realCombination)) {
        res[0] = "FinancialProfile_Pusher_Silver";
        res[1] = "FinancialProfile_Pusher_Silver_description";
    }
    else if (pusher_oro.includes(realCombination)) {
        res[0] = "FinancialProfile_Pusher_Gold";
        res[1] = "FinancialProfile_Pusher_Gold_description";
    }
    else if (pusher_platino.includes(realCombination)) {
        res[0] = "FinancialProfile_Pusher_Platinum";
        res[1] = "FinancialProfile_Pusher_Platinum_description";
    }
    else if (empresario_plata.includes(realCombination)) {
        res[0] = "FinancialProfile_Entrepreneur_Silver";
        res[1] = "FinancialProfile_Entrepreneur_Silver_description";
    }
    else if (empresario_oro.includes(realCombination)) {
        res[0] = "FinancialProfile_Entrepreneur_Gold";
        res[1] = "FinancialProfile_Entrepreneur_Gold_description";
    }
    else{
        res[0] = "FinancialProfile_Entrepreneur_Platinum";
        res[1] = "FinancialProfile_Entrepreneur_Platinum_description";
    }
    return res;

   
}
