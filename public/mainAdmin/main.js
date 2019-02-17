var testAnswered;
var usersInfo = [];
var usersName = [];
var groupsName = [];

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        loadUserInfo(user.uid, function (us) {
            usersInfo = us;
            usersInfo.forEach(user => {
                var tempName = String(user.name)
                var tempGroup = String(user.role);
                if(!groups.includes(tempGroup)){
                    groups.push(tempGroup);
                }
                usersName.push(tempName);
            });
            loadUsersAndGroups();
            loadIface();
            document.getElementById("main-wrapper").style.display = "block";
            document.getElementById("coolLoading").style.display = "none";
        });

    } else {
        location.replace("../index.html");
    }
});
let selectedCompetences = [0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1]
let competenciesShown = false;
var graphSpider;
var graphSpider2;
var graphSpider3;
var valueAxisLeadership;
var valueAxisEQ;
var graphClusterEQ1;
var graphClusterEQ2;
var graphClusterEQ3;
var valueAxisGRIT;
var totalUsers = 100;
var leadershipProfile = "Resolve";
var leadershipDescription = "Resolve";
var leadershipPrincipal = "Resolve";
var leadershipSecondary = "Resolve";
let chartBenchmark;
let charGroup;
let chartJobFit;
let chartWearGeneral;
let chartSample;
let chartWearSample;
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
var benchmarkGritValue = 10;
var jobFitnessValue = 20;
var groupGritValue = 30;
var sampleGritValue = 40;

var financialProfile = "Resolve";

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

var generalWear = 10;
var sampleWear = 20;

var chartSpiderLeadership = "Resolve";
var chartBarLeadership = "Resolve";
var chartClusterEQ;
var chartProfileEQ;
var chartBarEQ;
var chartBarGRIT;
var cUUser;
var chartFinancial;
let language = localStorage.getItem("language");;
var chartProfileEQData = [{
        "potential": "Your Results",
        "Value": 0
    },
    {
        "potential": "Your Potential",
        "Value": 0
    }
];
var idLangchartBarGRITData = ["p1BarGritLang", "p2BarGritLang", "p3BarGritLang", "p4BarGritLang", "p5BarGritLang"]
var chartBarGRITData = [{
        "profile": "Questioner \n 0-40",
        "totalPeople": 0,
        "percentage": 0,
        "color": "#f62d51"
    },
    {
        "profile": "Follower \n 41-60",
        "totalPeople": 0,
        "percentage": 0,
        "color": "#f62d51"
    },
    {
        "profile": "Analyser \n 61-74",
        "totalPeople": 0,
        "percentage": 0,
        "color": "#f62d51"
    },
    {
        "profile": "Solver \n 75-85",
        "totalPeople": 0,
        "percentage": 0,
        "color": "#f62d51"
    },
    {
        "profile": "Ingenious \n 86-100",
        "totalPeople": 0,
        "percentage": 0,
        "color": "#f62d51"
    }
];

var idLangchartBarLeadershipData = ["p1BarLeadershipLang", "p2BarLeadershipLang", "p3BarLeadershipLang", "p4BarLeadershipLang", "p5BarLeadershipLang", "p6BarLeadershipLang", "p7BarLeadershipLang", "p8BarLeadershipLang"]

var chartBarLeadershipData = [{
        "profile": "Eager \n Instructor",
        "totalPeople": 0,
        "percentage": 0,
        "color": "#4fc3f7"
    },
    {
        "profile": "Passionate \n Evaluator",
        "totalPeople": 0,
        "percentage": 0,
        "color": "#4fc3f7"
    },
    {
        "profile": "Honest \n Broker",
        "totalPeople": 0,
        "percentage": 0,
        "color": "#4fc3f7"
    },
    {
        "profile": "Fierce \n Fighter",
        "totalPeople": 0,
        "percentage": 0,
        "color": "#4fc3f7"
    },
    {
        "profile": "Trusted \n Adviser",
        "totalPeople": 0,
        "percentage": 0,
        "color": "#4fc3f7"
    },
    {
        "profile": "Outgoing \n Promoter",
        "totalPeople": 0,
        "percentage": 0,
        "color": "#4fc3f7"
    },
    {
        "profile": "Decisive \n Coordinator",
        "totalPeople": 0,
        "percentage": 0,
        "color": "#4fc3f7"
    },
    {
        "profile": "Prominent \n Organiser",
        "totalPeople": 0,
        "color": "#4fc3f7"
    },

];
var idLangchartBarEQData = ["EQProfile_Foal", "EQProfile_Patrician", "EQProfile_Templar", "EQProfile_Master", "EQProfile_Virtuoso"]
var chartBarEQData = [{
        "profile": "Foal",
        "totalPeople": 0,
        "percentage": 0,
        "color": "#B0DE09"
    },
    {
        "profile": "Patrician",
        "totalPeople": 0,
        "percentage": 0,
        "color": "#04D215"
    },
    {
        "profile": "Templar",
        "totalPeople": 0,
        "percentage": 0,
        "color": "#0D8ECF"
    },
    {
        "profile": "Master",
        "totalPeople": 0,
        "percentage": 0,
        "color": "#FF0F00"
    },
    {
        "profile": "Virtuoso",
        "totalPeople": 0,
        "percentage": 0,
        "color": "#FF6600"
    }
];
var idLangchartClusterEQData = ["p1ClusterEQLang", "p2ClusterEQLang", "p3ClusterEQLang", "p4ClusterEQLang"];
var chartClusterEQData = [{
        "profile": "Self Awareness",
        "Group": 0,
        "Benchmark": 0,
        "Sample": 0
    },
    {
        "profile": "Self Management",
        "Group": 0,
        "Benchmark": 0,
        "Sample": 0
    },
    {
        "profile": "Social Awareness",
        "Group": 0,
        "Benchmark": 0,
        "Sample": 0
    },
    {
        "profile": "Social Management",
        "Group": 0,
        "Benchmark": 0,
        "Sample": 0
    }
];

var idLangchartDataLeadershipSpider = ["p1LeadershipSpiderLang", "p2LeadershipSpiderLang", "p3LeadershipSpiderLang", "p4LeadershipSpiderLang", "p5LeadershipSpiderLang", "p6LeadershipSpiderLang"];
var chartDataLeadershipSpider = [{
        "profile": "LEEDR",
        "Group": 0,
        "Benchmark": 0,
        "Sample": 0
    },
    {
        "profile": "Communication",
        "Group": 0,
        "Benchmark": 0,
        "Sample": 0
    },
    {
        "profile": "Leadership",
        "Group": 0,
        "Benchmark": 0,
        "Sample": 0
    },
    {
        "profile": "Decision Making",
        "Group": 0,
        "Benchmark": 0,
        "Sample": 0
    },
    {
        "profile": "Confrontation",
        "Group": 0,
        "Benchmark": 0,
        "Sample": 0
    },
    {
        "profile": "Teams",
        "Group": 0,
        "Benchmark": 0,
        "Sample": 0
    }
];

var chartClusterEQData;
var chartBarLeadershipData;
var chartDataLeadershipSpider;
var chartDataFinancial;
var chartProfileEQData;

function startDataArrays() {
    language = localStorage.getItem("language");
    chartProfileEQData = [{
            "potential": "Your Results",
            "Value": 0
        },
        {
            "potential": "Your Potential",
            "Value": 0
        }
    ];

    chartBarGRITData = [{
            "profile": "Questioner \n 0-40",
            "totalPeople": 0,
            "percentage": 0,
            "color": "#f62d51"
        },
        {
            "profile": "Follower \n 41-60",
            "totalPeople": 0,
            "percentage": 0,
            "color": "#f62d51"
        },
        {
            "profile": "Analyser \n 61-74",
            "totalPeople": 0,
            "percentage": 0,
            "color": "#f62d51"
        },
        {
            "profile": "Solver \n 75-85",
            "totalPeople": 0,
            "percentage": 0,
            "color": "#f62d51"
        },
        {
            "profile": "Ingenious \n 86-100",
            "totalPeople": 0,
            "percentage": 0,
            "color": "#f62d51"
        }
    ];

    chartBarLeadershipData = [{
            "profile": "Eager \n Instructor",
            "totalPeople": 0,
            "percentage": 0,
            "color": "#4fc3f7"
        },
        {
            "profile": "Passionate \n Evaluator",
            "totalPeople": 0,
            "percentage": 0,
            "color": "#4fc3f7"
        },
        {
            "profile": "Honest \n Broker",
            "totalPeople": 0,
            "percentage": 0,
            "color": "#4fc3f7"
        },
        {
            "profile": "Fierce \n Fighter",
            "totalPeople": 0,
            "percentage": 0,
            "color": "#4fc3f7"
        },
        {
            "profile": "Trusted \n Adviser",
            "totalPeople": 0,
            "percentage": 0,
            "color": "#4fc3f7"
        },
        {
            "profile": "Outgoing \n Promoter",
            "totalPeople": 0,
            "percentage": 0,
            "color": "#4fc3f7"
        },
        {
            "profile": "Decisive \n Coordinator",
            "totalPeople": 0,
            "percentage": 0,
            "color": "#4fc3f7"
        },
        {
            "profile": "Prominent \n Organiser",
            "totalPeople": 0,
            "color": "#4fc3f7"
        },

    ];

    chartBarEQData = [{
            "profile": "Foal",
            "totalPeople": 0,
            "percentage": 0,
            "color": "#343a40"
        },
        {
            "profile": "Patrician",
            "totalPeople": 0,
            "percentage": 0,
            "color": "#343a40"
        },
        {
            "profile": "Templar",
            "totalPeople": 0,
            "percentage": 0,
            "color": "#343a40"
        },
        {
            "profile": "Master",
            "totalPeople": 0,
            "percentage": 0,
            "color": "#343a40"
        },
        {
            "profile": "Virtuoso",
            "totalPeople": 0,
            "percentage": 0,
            "color": "#343a40"
        }
    ];
    chartClusterEQData = [{
            "profile": "Self Awareness",
            "Group": 0,
            "Benchmark": 0,
            "Sample": 0
        },
        {
            "profile": "Self Management",
            "Group": 0,
            "Benchmark": 0,
            "Sample": 0
        },
        {
            "profile": "Social Awareness",
            "Group": 0,
            "Benchmark": 0,
            "Sample": 0
        },
        {
            "profile": "Social Management",
            "Group": 0,
            "Benchmark": 0,
            "Sample": 0
        }
    ];


    chartDataLeadershipSpider = [{
            "profile": "LEEDR",
            "Group": 0,
            "Benchmark": 0,
            "Sample": 0
        },
        {
            "profile": "Communication",
            "Group": 0,
            "Benchmark": 0,
            "Sample": 0
        },
        {
            "profile": "Leadership",
            "Group": 0,
            "Benchmark": 0,
            "Sample": 0
        },
        {
            "profile": "Decision Making",
            "Group": 0,
            "Benchmark": 0,
            "Sample": 0
        },
        {
            "profile": "Confrontation",
            "Group": 0,
            "Benchmark": 0,
            "Sample": 0
        },
        {
            "profile": "Teams",
            "Group": 0,
            "Benchmark": 0,
            "Sample": 0
        }
    ];

    chartDataFinancial = [{
        name: "Remaining",
        value: 0
    }, {
        name: "Your Journey",
        value: 0
    }];

}

function translateChart(lang, chartData, chartName, profileName, languageIdData) {
    for (i = 0; i < chartData.length; i++) {
        chartData[i][profileName] = translateByID(languageIdData[i], lang);
        chartName.categoryField = profileName;
        chartName.validateData();
    }
}

function setProfileEQData(values) {
    chartProfileEQData[0]["Value"] = values[0];
    chartProfileEQData[1]["Value"] = values[1];
    return chartProfileEQData;
}

function setchartDataFinancial(values) {
    // chartDataFinancial[0]["value"] = values[0];
    // chartDataFinancial[1]["value"] = values[1];
    // return chartDataFinancial;
}

function setChartBarLeadershipData(totalPeople, percentage) {
    for (i = 0; i < totalPeople.length; i++) {
        chartBarLeadershipData[i]["totalPeople"] = totalPeople[i];
        chartBarLeadershipData[i]["percentage"] = percentage[i];
    }
    return chartBarLeadershipData
}

function setChartBarEQData(totalPeople, percentage) {
    for (i = 0; i < totalPeople.length; i++) {
        chartBarEQData[i]["totalPeople"] = totalPeople[i];
        chartBarEQData[i]["percentage"] = percentage[i];
    }
    return chartBarEQData
}

function setChartBarGRITData(totalPeople, percentage) {
    for (i = 0; i < totalPeople.length; i++) {
        chartBarGRITData[i]["totalPeople"] = totalPeople[i];
        chartBarGRITData[i]["percentage"] = percentage[i];
    }
    return chartBarGRITData
}

function setChartClusterEQData(groups, benchmarks, samples) {
    for (i = 0; i < groups.length; i++) {
        chartClusterEQData[i]["Group"] = groups[i];
        chartClusterEQData[i]["Benchmark"] = benchmarks[i];
        chartClusterEQData[i]["Sample"] = samples[i];
    }
    return chartClusterEQData;
}

function setChartSampleClusterEQData(samples) {
    for (i = 0; i <= groups.length; i++) {
        chartClusterEQData[i]["Sample"] = samples[i];
    }
    return chartClusterEQData;
}

function setChartDataSampleLeadershipSpider(sample) {
    for (i = 0; i < sample.length; i++) {
        chartDataLeadershipSpider[i]["Sample"] = sample[i];
    }
    return chartDataLeadershipSpider;
}

function setChartDataLeadershipSpider(group, benchmark, sample) {
    for (i = 0; i < group.length; i++) {
        chartDataLeadershipSpider[i]["Group"] = group[i];
        chartDataLeadershipSpider[i]["Benchmark"] = benchmark[i];
        chartDataLeadershipSpider[i]["Sample"] = sample[i];
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
function setTextsIQ(problemSolving, iqHass) {
    document.getElementById("problemSolvingIQ").innerHTML = translateByID(problemSolving, language);
    for (i = 0; i < iqHass.length; i++) {
        if (iqHass[i]) {
            document.getElementById("Iq" + (i + 1) + "HasG").classList.add('dotChecked');
            document.getElementById("Iq" + (i + 1) + "HasntG").classList.add('dotUnchecked');
        } else {
            document.getElementById("Iq" + (i + 1) + "HasntG").classList.add('dotChecked');
            document.getElementById("Iq" + (i + 1) + "HasG").classList.add('dotUnchecked');
        }
    }
}

function setTextsGRIT(perfil, suggestions, descriptionPersonalGRIT, descriptionEntrepreneurialGRIT) {
    document.getElementById("perfilGRIT").innerHTML = translateByID(perfil, language);
    document.getElementById("suggestionsTextGRIT").innerHTML = translateByID(suggestions, language);
    document.getElementById("descriptionPersonalGRIT").innerHTML = translateByID(descriptionPersonalGRIT, language);
    document.getElementById("descriptionEntrepreneurialGRIT").innerHTML = translateByID(descriptionEntrepreneurialGRIT, language);
}

function translateGraphs() {
    graphClusterEQ1.title = translateByID("Grupo", language);
    graphClusterEQ3.title = translateByID("Sample", language);

    graphSpider.title = translateByID("Grupo", language);
    graphSpider3.title = translateByID("Sample", language);
    valueAxisEQ.title = translateByID("NumberOfPeople", language);
    valueAxisLeadership.title = translateByID("NumberOfPeople", language);
    valueAxisGRIT.title = translateByID("NumberOfPeople", language);


    translateChart(language, chartBarGRITData, chartBarGRIT, "profile", idLangchartBarGRITData);
    translateChart(language, chartBarLeadershipData, chartBarLeadership, "profile", idLangchartBarLeadershipData);
    translateChart(language, chartBarEQData, chartBarEQ, "profile", idLangchartBarEQData);
    translateChart(language, chartClusterEQData, chartClusterEQ, "profile", idLangchartClusterEQData);
    translateChart(language, chartDataLeadershipSpider, chartSpiderLeadership, "profile", idLangchartDataLeadershipSpider);
}

function setTextsFinancial(perfil, descripcion) {
    document.getElementById("perfilFinancial").innerHTML = translateByID(perfil, language);
    document.getElementById("descriptionTextFinanciero").innerHTML = translateByID(descripcion, language);
}

function setTextsWear(highWear, midWear) {
    let highUsers = "";
    let midUsers = "";
    for (i = 0; i < highWear.length; i++) {
        highUsers = highUsers + "<br><br>" + highWear[i];
    }
    for (i = 0; i < midWear.length; i++) {
        midUsers = midUsers + "<br><br>" + midWear[i];
    }
    document.getElementById("namesHighWear").innerHTML = highUsers;
    document.getElementById("namesMidWear").innerHTML = midUsers;
}

function setTextsJob(competencesTopP, competencesBotP) {
    let competencesTop = "";
    let competencesBot = "";
    for (i = 0; i < competencesTopP.length; i++) {
        competencesTop = competencesTop + "<br><br>" + translateByID(competencesTopP[i], language);
        competencesBot = competencesBot + "<br><br>" + translateByID(competencesBotP[i], language);
    }
    document.getElementById("competencesTopJobFitness").innerHTML = competencesTop;
    document.getElementById("competencesBotJobFitness").innerHTML = competencesBot;
}

function setTextJobFit(top3, bot3, quickWins3) {
    for (i = 0; i < 3; i++) {
        let top = "top" + (i + 1) + "Job";
        let bot = "bot" + (i + 1) + "Job";
        let quick = "quickWins" + (i + 1);
        document.getElementById(top).innerHTML = translateByID(top3[i], language);
        document.getElementById(bot).innerHTML = translateByID(bot3[i], language);
        document.getElementById(quick).innerHTML = translateByID(quickWins3[i], language);
    }

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
    document.getElementById("wearbox").style.display = "none";
    document.getElementById("jobbox").style.display = "none";
    document.getElementById("initialbox").style.display = "block";

}

function showLeader() {
    document.getElementById("leaderbox").style.display = "block";
    document.getElementById("eqbox").style.display = "none";
    document.getElementById("jobbox").style.display = "none";
    document.getElementById("iqbox").style.display = "none";
    document.getElementById("resolvebox").style.display = "none";
    document.getElementById("wearbox").style.display = "none";
    document.getElementById("initialbox").style.display = "none";
    document.getElementById("main").style.height = "800px";

}

function showiq() {
    document.getElementById("leaderbox").style.display = "none";
    document.getElementById("eqbox").style.display = "none";
    document.getElementById("iqbox").style.display = "block";
    document.getElementById("jobbox").style.display = "none";
    document.getElementById("resolvebox").style.display = "none";
    document.getElementById("wearbox").style.display = "none";
    document.getElementById("initialbox").style.display = "none";
    document.getElementById("main").style.height = "800px";

}

function showeq() {
    document.getElementById("leaderbox").style.display = "none";
    document.getElementById("eqbox").style.display = "block";
    document.getElementById("iqbox").style.display = "none";
    document.getElementById("jobbox").style.display = "none";
    document.getElementById("resolvebox").style.display = "none";
    document.getElementById("wearbox").style.display = "none";
    document.getElementById("initialbox").style.display = "none";
    document.getElementById("main").style.height = "800px";

}

function showResolve() {
    document.getElementById("leaderbox").style.display = "none";
    document.getElementById("eqbox").style.display = "none";
    document.getElementById("iqbox").style.display = "none";
    document.getElementById("jobbox").style.display = "none";
    document.getElementById("resolvebox").style.display = "block";
    document.getElementById("wearbox").style.display = "none";
    document.getElementById("initialbox").style.display = "none";
    document.getElementById("main").style.height = "800px";


}

function showWear() {
    document.getElementById("leaderbox").style.display = "none";
    document.getElementById("eqbox").style.display = "none";
    document.getElementById("iqbox").style.display = "none";
    document.getElementById("jobbox").style.display = "none";
    document.getElementById("resolvebox").style.display = "none";
    document.getElementById("wearbox").style.display = "block";
    document.getElementById("initialbox").style.display = "none";
    document.getElementById("main").style.height = "800px";


}

function showJobFitness() {
    document.getElementById("leaderbox").style.display = "none";
    document.getElementById("eqbox").style.display = "none";
    document.getElementById("iqbox").style.display = "none";
    document.getElementById("jobbox").style.display = "block";
    document.getElementById("resolvebox").style.display = "none";
    document.getElementById("wearbox").style.display = "none";
    document.getElementById("initialbox").style.display = "none";
    document.getElementById("main").style.height = "800px";


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

function translateText(lang) {
    // Swap languages when menu changes
    set_lang(dictionary[lang]);
    localStorage.setItem("language", lang);
    language = lang;
    translator.lang(lang);
    document.getElementById("dropdownMenuLink").innerHTML = translateByID("Language", language);
    document.getElementById("logoutNav").innerHTML = translateByID("Logout", language);
    translateGraphs();

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
            }, ]
        }],

        arrows: [{}]
    });
    // set random value
    function randomValue() {
        var value = valuePie;
        chartPie.arrows[0].setValue(value);
        chartPie.axes[0].setBottomText(value + "%");
    }
    randomValue();
}


function createPieChartSampleWear(title, id, color, valuePie) {
    chartWearSample = AmCharts.makeChart(id, {
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
            }, ]
        }],

        arrows: [{}]
    });
    // set random value
    function randomValue() {
        var value = valuePie;
        chartWearSample.arrows[0].setValue(value);
        chartWearSample.axes[0].setBottomText(value + "%");
    }
    randomValue();
}

function createPieChartSampleGRIT(title, id, color, valuePie) {
    chartSample = AmCharts.makeChart(id, {
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
            }, ]
        }],

        arrows: [{}]
    });
    // set random value
    function randomValue() {
        var value = valuePie;
        chartSample.arrows[0].setValue(value);
        chartSample.axes[0].setBottomText(value + "%");
    }
    randomValue();
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
function userInformation(pAnswers, pAttrition, pName, pRole, pleadershipComunicationScore, pleadershipConfrontationsScore, pleadershipDesitionMakingScote, pleadershipProfile, pleadershipleadershipScore, pleadershipLeedrScore, pleadershipTeamScore, peqselfAwarnesscore, peqselfManagmentScore, peqSocialAwarnessScore, peqSocialManagmentScore, peqProfile, piqAnswersArray, pgritScore){
    this.answers = pAnswers;
    this.attrition = pAttrition;
    this.name = pName;
    this.role = pRole;
    this.rleadershipComunicationScore = pleadershipComunicationScore * 100;
    this.rleadershipConfrontationsScore = pleadershipConfrontationsScore * 100;
    this.rleadershipDesitionMakingScote = pleadershipDesitionMakingScote * 100;
    this.rleadershipProfile = pleadershipProfile;
    this.rleadershipleadershipScore = pleadershipleadershipScore * 100;
    this.rleadershipLeedrScore = pleadershipLeedrScore * 100;
    this.rleadershipTeamScore = pleadershipTeamScore * 100;
    this.reqselfAwarnesscore = peqselfAwarnesscore * 100;
    this.reqselfManagmentScore = peqselfManagmentScore * 100;
    this.reqSocialAwarnessScore = peqSocialAwarnessScore * 100;
    this.reqSocialManagmentScore = peqSocialManagmentScore*100;
    this.reqProfile = peqProfile;
    this.riqAnswers = piqAnswersArray
    this.rgritScore = pgritScore * 100;

}
function loadUserInfo(uid, fn) {
    var docRef = firebase.firestore().collection("users-b2b").doc(uid);
    //Primero obtenemos la empresa de la cual soy admin
    docRef.get().then(function (doc) {
        if (doc.exists) {
            var company = doc.data().company;
            var companyeRef = firebase.firestore().collection("users-b2c");
            var query = companyeRef.where("company", "==", company);
            query.get().then(function (querySnapshot) {
                var usersInformation = [];
                var companySize = querySnapshot.size;
                querySnapshot.forEach(function (doc) {
                    console.log(companySize);
                    var answers;
                    var attrition;
                    var name;
                    var role;
                    var aleadershipComunicationScore;
                    var aleadershipConfrontationsScore;
                    var aleadershipDesitionMakingScote;
                    var aleadershipProfile;
                    var aleadershipleadershipScore;
                    var aleadershipLeedrScore;
                    var aleadershipTeamScore;
                    var aeqselfAwarnesscore;
                    var aeqselfManagmentScore;
                    var aeqSocialAwarnessScore;
                    var aeqSocialManagmentScore;
                    var aeqProfile;
                    var aiqAnswers;
                    var agritScore;   
                    // doc.data() is never undefined for query doc snapshots
                    answers = doc.data().Answers;
                    attrition = doc.data().individual_attrition;
                    name = String(doc.data().name + " " + doc.data().last_name);
                    console.log(name);
                    role = doc.data().role;
                    var leadershipDocRed = firebase.firestore().collection("users-b2c").doc(doc.id).collection("Scores").doc("leadership_scores");
                    var gritDocRed = firebase.firestore().collection("users-b2c").doc(doc.id).collection("Scores").doc("grit_scores");
                    var eqDocRed = firebase.firestore().collection("users-b2c").doc(doc.id).collection("Scores").doc("eq_scores");
                    var iqDocRef = firebase.firestore().collection("users-b2c").doc(doc.id).collection("Scores").doc("iq_scores");

                    leadershipDocRed.get().then(function (doc) {
                        if (doc.exists) {
                            aleadershipComunicationScore = doc.data().communication_score;
                            aleadershipConfrontationsScore = doc.data().confrontation_score;
                            aleadershipDesitionMakingScote = doc.data().desition_making_score;
                            aleadershipProfile = doc.data().leadership_profile;
                            aleadershipleadershipScore = doc.data().leadership_score;
                            aleadershipLeedrScore = doc.data().leedr_score;
                            aleadershipTeamScore = doc.data().team_score;

                            gritDocRed.get().then(function (docg) {
                                if (docg.exists) {
                                    agritScore = docg.data().overall_grit;
                                    eqDocRed.get().then(function (doc) {
                                        if (doc.exists) {
                                            aeqselfAwarnesscore = doc.data().self_awarness;
                                            aeqselfManagmentScore = doc.data().self_managment;
                                            aeqSocialAwarnessScore = doc.data().social_awarness;
                                            aeqSocialManagmentScore = doc.data().social_managment;
                                            aeqProfile = doc.data().eq_profile;

                                            iqDocRef.get().then(function (doc) {
                                                if (doc.exists) {
                                                    aiqAnswers = [doc.data().being_strategic_correct, doc.data().business_instinct_correct, doc.data().buisness_inventivness_correct, doc.data().innovation_understanding_correct, doc.data().one_time_desition_making_correct, doc.data().problem_solving_correct, doc.data().understands_diversity_correct];
                                                    var tempUser = new userInformation(answers, attrition, name, role, aleadershipComunicationScore, aleadershipConfrontationsScore, aleadershipDesitionMakingScote, aleadershipProfile, aleadershipleadershipScore, aleadershipLeedrScore, aleadershipTeamScore, aeqselfAwarnesscore, aeqselfManagmentScore, aeqSocialAwarnessScore, aeqSocialManagmentScore, aeqProfile, aiqAnswers, agritScore);
                                                    usersInformation.push(tempUser);
                                                    companySize = companySize - 1;
                                                    console.log("hola answer " +  companySize);
                                                    if(companySize === 0){
                                                        fn(usersInformation);
                                                    }
                                                } else {

                                                }
                                            }).catch(function (error) {
                                                console.log("Error getting document:", error);
                                            });
                                        } else {

                                        }
                                    }).catch(function (error) {
                                        console.log("Error getting document:", error);
                                    });
                                } else {

                                }
                            }).catch(function (error) {
                                console.log("Error getting document:", error);
                            });
                        } else {
                            //No ha respondido las preguntas 
                            companySize = companySize - 1;
                            console.log("hola no answer" + companySize);
                            //TODO: PREGUNTARLE A ANDRES QUE HACER

                        }
                    }).catch(function (error) {
                        console.log("Error getting document:", error);
                    });

                });
            }
            );


        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function (error) {
        console.log("Error getting document:", error);
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
    //traer info de la emrpresa
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
    chartSpiderLeadership.dataProvider = setChartDataLeadershipSpider(
        [leadershipLeedrScore, leadershipCommunicationScore,
            leadershipLeadershipScore, leadershipDecitionScore,
            leadershipConfrontationScore, leadershipTeamsScore
        ],
        [58.83, 52, 70.51, 75.23,
            72.75, 72.95
        ], [38.83, 32, 40.51, 45.23,
            62.75, 52.95
        ]
    );
    chartSpiderLeadership.categoryField = "profile";
    chartSpiderLeadership.startDuration = 2;
    // VALUE AXIS
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisAlpha = 0.15;
    valueAxis.minimum = 0;
    valueAxis.fontSize = 16;
    valueAxis.dashLength = 3;
    valueAxis.axisTitleOffset = 20;
    valueAxis.gridCount = 5;
    chartSpiderLeadership.addValueAxis(valueAxis);


    // GRAPH
    graphSpider = new AmCharts.AmGraph();
    graphSpider.valueField = "Group";
    graphSpider.title = "Group";
    graphSpider.bullet = "round";
    graphSpider.balloonText = "[[value]]%";
    chartSpiderLeadership.addGraph(graphSpider);
    graphSpider2 = new AmCharts.AmGraph();
    graphSpider2.valueField = "Benchmark";
    graphSpider2.title = "Benchmark";
    graphSpider2.bullet = "round";
    graphSpider2.balloonText = "[[value]]%";
    chartSpiderLeadership.addGraph(graphSpider2);
    graphSpider3 = new AmCharts.AmGraph();
    graphSpider3.valueField = "Sample";
    graphSpider3.title = "Sample";
    graphSpider3.bullet = "round";
    graphSpider3.balloonText = "[[value]]%";
    chartSpiderLeadership.addGraph(graphSpider3);
    var legend = new AmCharts.AmLegend();
    legend.align = "center";
    legend.color = "#000000";
    chartSpiderLeadership.addLegend(legend);
    // WRITE
    chartSpiderLeadership.write("chartSpiderLeadership");


    ////////////////////////////
    // Chart Bar Leadership
    ///////////////////////////

    // SERIAL CHART
    chartBarLeadership = new AmCharts.AmSerialChart();
    chartBarLeadership.dataProvider = setChartBarLeadershipData([7, 2, 4, 7, 2, 12, 3, 9], [10, 20, 34, 19, 12, 32, 23, 9]);
    chartBarLeadership.categoryField = "profile";
    chartBarLeadership.startDuration = 1;

    // AXES
    // category
    var categoryAxis = chartBarLeadership.categoryAxis;
    categoryAxis.labelRotation = 0; // this line makes category values to be rotated
    categoryAxis.gridAlpha = 0;
    categoryAxis.fontSize = 13;
    categoryAxis.fillAlpha = 1;
    categoryAxis.fillColor = "#FAFAFA";
    categoryAxis.gridPosition = "start";

    // value
    valueAxisLeadership = new AmCharts.ValueAxis();
    valueAxisLeadership.dashLength = 13;
    valueAxisLeadership.title = "Number of people";
    valueAxisLeadership.axisAlpha = 0;
    valueAxisLeadership.titleFontSize = 13;
    chartBarLeadership.addValueAxis(valueAxisLeadership);

    // GRAPH
    var graph = new AmCharts.AmGraph();
    graph.valueField = "totalPeople";
    graph.colorField = "color";
    graph.balloonText = "<h4>Total: [[totalPeople]]<br> [[percentage]]% </h4>";

    graph.type = "column";
    graph.lineAlpha = 0;
    graph.fillAlphas = 1;
    chartBarLeadership.addGraph(graph);

    // CURSOR
    var chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorAlpha = 0;
    chartCursor.zoomable = false;
    chartCursor.categoryBalloonEnabled = false;
    chartBarLeadership.addChartCursor(chartCursor);

    chartBarLeadership.creditsPosition = "top-right";

    // WRITE
    chartBarLeadership.write("chartBarLeadership");

    ////////////////////
    // Chart Cluster EQ
    ////////////////////

    // SERIAL CHART
    chartClusterEQ = new AmCharts.AmSerialChart();
    ///////////////////////////////////////////////////////////////////////////////////
    /////ACA SE INGRESAN COMO PARÁMETRO LOS VALORES OBTENIDOS DEL CLUSTER EN EQ
    /////setChartClusterEQData(groups, benchmarks, samples)
    ///////////////////////////////////////////////////////////////////////////////////

    chartClusterEQ.dataProvider = setChartClusterEQData([eqSelfAwarness, eqSelfManagment, eqSocialAwarness, eqSocialManagment], [46.8, 58.72, 44.04, 56.36], [26.8, 48.72, 64.04, 26.36]);
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
    graphClusterEQ1 = new AmCharts.AmGraph();
    graphClusterEQ1.type = "column";
    graphClusterEQ1.title = "Group";
    graphClusterEQ1.legendValueText = "Group";
    graphClusterEQ1.valueField = "Group";
    graphClusterEQ1.balloonText = "[[value]]";
    graphClusterEQ1.lineAlpha = 0;
    graphClusterEQ1.fillColors = "#ADD981";
    graphClusterEQ1.fillAlphas = 1;
    chartClusterEQ.addGraph(graphClusterEQ1);

    // second graph
    graphClusterEQ2 = new AmCharts.AmGraph();
    graphClusterEQ2.type = "column";
    graphClusterEQ2.title = "Benchmark";
    graphClusterEQ2.legendValueText = "Benchmark";
    graphClusterEQ2.valueField = "Benchmark";
    graphClusterEQ2.balloonText = "[[value]]";
    graphClusterEQ2.lineAlpha = 0;
    graphClusterEQ2.fillColors = "#81acd9";
    graphClusterEQ2.fillAlphas = 1;
    chartClusterEQ.addGraph(graphClusterEQ2);

    // third graph
    graphClusterEQ3 = new AmCharts.AmGraph();
    graphClusterEQ3.type = "column";
    graphClusterEQ3.title = "Sample";
    graphClusterEQ3.legendValueText = "Sample";
    graphClusterEQ3.valueField = "Sample";
    graphClusterEQ3.balloonText = "[[value]]";
    graphClusterEQ3.lineAlpha = 0;
    graphClusterEQ3.fillColors = "#8fecd9";
    graphClusterEQ3.fillAlphas = 1;
    chartClusterEQ.addGraph(graphClusterEQ3);

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
    chartFinancial.titleField = "name";
    chartFinancial.valueField = "value";
    chartFinancial.outlineColor = "#FFFFFF";
    chartFinancial.outlineAlpha = 0.8;
    chartFinancial.outlineThickness = 2;

    // WRITE
    chartFinancial.write("chartFinancial");

    ////////////////////////////
    // Chart Bar EQ
    ///////////////////////////

    // SERIAL CHART
    chartBarEQ = new AmCharts.AmSerialChart();
    chartBarEQ.dataProvider = setChartBarEQData([7, 2, 4, 7, 2], [10, 20, 34, 19, 12]);
    chartBarEQ.categoryField = "profile";
    chartBarEQ.startDuration = 1;

    // AXES
    // category
    var categoryAxis = chartBarEQ.categoryAxis;
    categoryAxis.labelRotation = 0; // this line makes category values to be rotated
    categoryAxis.gridAlpha = 0;
    categoryAxis.fontSize = 16;
    categoryAxis.fillAlpha = 1;
    categoryAxis.fillColor = "#FAFAFA";
    categoryAxis.gridPosition = "start";

    // value
    valueAxisEQ = new AmCharts.ValueAxis();
    valueAxisEQ.dashLength = 15;
    valueAxisEQ.title = "Number of people";
    valueAxisEQ.axisAlpha = 0;
    valueAxisEQ.titleFontSize = 16;
    chartBarEQ.addValueAxis(valueAxisEQ);

    // GRAPH
    var graph = new AmCharts.AmGraph();
    graph.valueField = "totalPeople";
    graph.colorField = "color";
    graph.balloonText = "<h4>Total: [[totalPeople]]<br> Percentage: [[percentage]]% </h4>";

    graph.type = "column";
    graph.lineAlpha = 0;
    graph.fillAlphas = 1;
    chartBarEQ.addGraph(graph);

    // CURSOR
    var chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorAlpha = 0;
    chartCursor.zoomable = false;
    chartCursor.categoryBalloonEnabled = false;
    chartBarEQ.addChartCursor(chartCursor);

    chartBarEQ.creditsPosition = "top-right";

    // WRITE
    chartBarEQ.write("chartBarEQ");




    ////////////////////////////
    // Chart Bar GRIT
    ///////////////////////////

    // SERIAL CHART
    chartBarGRIT = new AmCharts.AmSerialChart();
    chartBarGRIT.dataProvider = setChartBarGRITData([7, 2, 4, 7, 2], [10, 20, 34, 19, 12]);
    chartBarGRIT.categoryField = "profile";
    chartBarGRIT.startDuration = 1;

    // AXES
    // category
    var categoryAxis = chartBarGRIT.categoryAxis;
    categoryAxis.labelRotation = 0; // this line makes category values to be rotated
    categoryAxis.gridAlpha = 0;
    categoryAxis.fontSize = 16;
    categoryAxis.fillAlpha = 1;
    categoryAxis.fillColor = "#FAFAFA";
    categoryAxis.gridPosition = "start";

    // value
    valueAxisGRIT = new AmCharts.ValueAxis();
    valueAxisGRIT.dashLength = 15;
    valueAxisGRIT.title = "Number of people";
    valueAxisGRIT.axisAlpha = 0;
    valueAxisGRIT.titleFontSize = 16;
    chartBarGRIT.addValueAxis(valueAxisGRIT);

    // GRAPH
    var graph = new AmCharts.AmGraph();
    graph.valueField = "totalPeople";
    graph.colorField = "color";
    graph.balloonText = "<h4>Total: [[totalPeople]]<br> Percentage: [[percentage]]% </h4>";

    graph.type = "column";
    graph.lineAlpha = 0;
    graph.fillAlphas = 1;
    chartBarGRIT.addGraph(graph);

    // CURSOR
    var chartCursor = new AmCharts.ChartCursor();
    chartCursor.cursorAlpha = 0;
    chartCursor.zoomable = false;
    chartCursor.categoryBalloonEnabled = false;
    chartBarGRIT.addChartCursor(chartCursor);

    chartBarGRIT.creditsPosition = "top-right";

    // WRITE
    chartBarGRIT.write("chartBarGRIT");





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
    chartProfileEQ.categoryField = "potential";
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

    // value
    var valueAxis = new AmCharts.ValueAxis();
    valueAxis.axisColor = "#DADADA";
    valueAxis.title = "Actual results vs Potential";
    valueAxis.gridAlpha = 0.1;
    chartProfileEQ.addValueAxis(valueAxis);

    // GRAPH
    var graph = new AmCharts.AmGraph();
    graph.title = "Value";
    graph.valueField = "Value";
    graph.type = "column";
    graph.balloonText = "Value:[[Value]]";
    graph.lineAlpha = 0;
    graph.fillColors = "#bf1c25";
    graph.fillAlphas = 1;
    chartProfileEQ.addGraph(graph);

    chartProfileEQ.creditsPosition = "top-right";

    // WRITE
    chartProfileEQ.write("chartProfileEQ");

    ///////////////////////////
    // Chart Pies GRIT
    //////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////
    /////ACA SE DEFINEN EN LAS VARIABLES LOS VALORES PARA CADA UNO DE LOS GRIT
    ///////////////////////////////////////////////////////////////////////////////////



    createPieChart("", "chartPieBenchmarkGRIT", "#00CC00", benchmarkGritValue,
        chartBenchmark);

    createPieChart("", "chartPieGroupGRIT", "#4fc3f7",
        groupGritValue, charGroup);
    createPieChartSampleGRIT("", "chartPieSampleGRIT", "#ea3838", sampleGritValue, chartSample);
    createPieChart("", "chartPieGeneralWear", "#00CC00", generalWear, chartWearGeneral);

    createPieChartSampleWear("", "chartPieSampleWear", "#4fc3f7", sampleWear);
    //createPieChart("Job Fitness Progress", "chartPieJobFit", "#00CC00", jobPercentage,
    //  chartJobFit);
    ///////////////////////////////////////////////////////////////////////////////////
    /////ACA SE DEFINEN LOS TEXTOS DE CADA UNO DE LOS VIEWS.
    ////setTextsLeadership(perfil, descripcion, rasgoPrincipal, rasgoSecundario)
    ////setTextsEQ(perfil, descripcion, analisisEmocional)
    ////setTextsIQ(descripcion, sugerencias, iqHass)
    ////setTextsGRIT(perfil, suggestions, descriptionPersonalGRIT, descriptionEntrepreneurialGRIT)
    ////setTextsFinancial(perfil, descripcion)
    ///////////////////////////////////////////////////////////////////////////////////
    // setTextsLeadership(leadershipProfile, leadershipDescription, leadershipPrincipal, leadershipSecondary);
    // setTextsEQ(eqProfile, eqDescription, eqAnalisis);

    // setTextsGRIT(gritProfile, gritSuggestions, gritDescriptionPer, gritDescrptionEntre);
    // setTextsFinancial("FinancialProfile_Promoter_Platinum", "FinancialProfile_Promoter_Platinum_description");
    setTextsIQ("loremIpsum", [true, false, true, true, true, false, true]);
    $('#people').addClass('active');
    $('#groupsTab').removeClass('active');
    $('#users').show();
    $('#groups').hide();
    $('#competenciesTopBot3').hide();
    $(".user").show();
    $(".group").hide();
    setTextsWear(["Andres Lopez", "David Sanchez", "Camilo Arevalo"], ["Juan Daniel Roa", "Daniel Camilo Bastidas", "Carlos Higuera", "Miguel Roa"]);
    setTextsJob([], []);
    translateGraphs();
    setPercentage(0);
    document.getElementById("progressUser").innerHTML = translateByID("selectUser", language);
    $("#competencies").hide();
    setInitialCompetencesValue();
}

var users = usersName;
var groups = groupsName;

// search box: seems logical to force 'all' when searching
// for a specific user. I'm not looking for the FreeCodeCamp
// that's online. I'm looking for FreeCodeCamp.
$('#search').keyup(function () {
    // Get the value of the search box
    searchVal = $(this).val().toLowerCase();
    // Check each user for a match
    $('#users > .user').each(function () {
        text = $('.name', this).text().toLowerCase();
        // If the search text is found show, otherwise hide.
        if (text.indexOf(searchVal) !== -1) {
            $(this).show()
        } else {
            $(this).hide();
        }
    });
    $('#groups > .group').each(function () {
        text = $('.name', this).text().toLowerCase();
        // If the search text is found show, otherwise hide.
        if (text.indexOf(searchVal) !== -1) {
            $(this).show()
        } else {
            $(this).hide();
        }
    });

    // change bgcolor on tabs accordingly
    $('#people').addClass('active');
    $('#groupsTab').removeClass('active');
    $(".user").show();
    $(".group").hide();
});


function loadUsersAndGroups()
{
    users.forEach(function (user) {
    name = user;
    name = name.replace(" ", "_");
    name = user.replace(" ", "_");
    name = user.replace(" ", "_");
    name = user.replace(" ", "_");
    $('#users').append('<div class="user" id="' + name + '">');
    $('#' + name).append('<a onclick="showDataUser(\'' + name + '\')">' +
        '<span class="name">' + name + '</span>' + '</a>' + '</div>');
});

groups.forEach(function (group) {
    name = group.replace(" ", "_");
    $('#groups').append('<div class="group" id="' + name + '">');
    $('#' + name).append('<a onclick="showDataUser(\'' + name + '\')">' +
        '<span class="name">' + group + '</span>' + '</a>' + '</div>');
});
}
function selectCompetence(result) {
        let previousValue = selectedCompetences[result - 1];
        let competence = "competence" + result;
        if (previousValue == 0) {
            if (checkNumberOfSelectedCompetences() >= 10) {
                window.alert("Error : " + translateByID("max10Competences", language));
            }
            else{
                document.getElementById(competence).classList.add('dotChecked');
                document.getElementById(competence).classList.remove('dotUnchecked');
                selectedCompetences[result - 1] = 1;
            }
            
        } else if (previousValue == 1) {
            if (checkNumberOfSelectedCompetences() <= 3) {
                window.alert("Error : " + translateByID("min3Competences", language));
            }
            else{
                document.getElementById(competence).classList.remove('dotChecked');
                document.getElementById(competence).classList.add('dotUnchecked');
                selectedCompetences[result - 1] = 0;
            }  
        }
        console.log(selectedCompetences);
    }

function showCompetencies(){
    if(competenciesShown){
        $("#competencies").hide();
        competenciesShown = false;
        document.getElementById("btnCompetencies").innerHTML = translateByID("setupCompetencies",language);
    }
    else{
        $("#competencies").show();
        competenciesShown = true;
        document.getElementById("btnCompetencies").innerHTML = translateByID("hideCompetencies",language);
    }
}

function setInitialCompetencesValue() {
    for (i = 0; i < selectedCompetences.length; i++) {
        let competence = "competence" + (i+1);
        if(selectedCompetences[i] == 1){
            document.getElementById(competence).classList.add('dotChecked');
            document.getElementById(competence).classList.remove('dotUnchecked');
        }
        else{
            document.getElementById(competence).classList.remove('dotChecked');
            document.getElementById(competence).classList.add('dotUnchecked');
        }
    }
}

function checkNumberOfSelectedCompetences() {
    let totalSelected = 0
    for (i = 0; i < selectedCompetences.length; i++) {
        if (selectedCompetences[i] == 1) {
            totalSelected++;
        }
    }
    return totalSelected;
}

function showDataUser(selectedItem) {
    if(groupsName.includes(selectedItem)){
        var roleSize = 0;
        var gLeadershipLeedrScore = 0;
        var gleadershipComunicationScore = 0;
        var gleadershipleadershipScore = 0;
        var gleadershipDesitionMakingScote = 0;
        var gleadershipConfrontationsScore = 0;
        var gleadershipTeamScore = 0;
        for(iworker in usersInfo){
            var tempUser = usersInfo[iworker];
            if((tempUser.role) == selectedItem){
                roleSize = roleSize +1;
                gLeadershipLeedrScore = gLeadershipLeedrScore + tempUser.rleadershipLeedrScore;
                gleadershipComunicationScore = gleadershipComunicationScore + tempUser.rleadershipComunicationScore;
                gleadershipleadershipScore = gleadershipleadershipScore +tempUser.rleadershipleadershipScore;
                gleadershipDesitionMakingScote = gleadershipDesitionMakingScote +tempUser.rleadershipDesitionMakingScote;
                gleadershipTeamScore = gleadershipTeamScore + tempUser.rleadershipTeamScore;
                gleadershipConfrontationsScore = gleadershipConfrontationsScore + tempUser.rleadershipConfrontationsScore;
            }
            }
        gLeadershipLeedrScore = gLeadershipLeedrScore / roleSize;
        gleadershipComunicationScore = gleadershipComunicationScore / roleSize;
        gleadershipleadershipScore = gleadershipleadershipScore / roleSize;
        gleadershipDesitionMakingScote = gleadershipDesitionMakingScote/roleSize;
        gleadershipTeamScore = gleadershipTeamScore/roleSize;
        gleadershipConfrontationsScore = gleadershipConfrontationsScore/roleSize;
        $('#competenciesTopBot3').show();
        chartSpiderLeadership.dataProvider = setChartDataSampleLeadershipSpider([gLeadershipLeedrScore, gleadershipComunicationScore, gleadershipleadershipScore, gleadershipDesitionMakingScote, gleadershipConfrontationsScore, gleadershipTeamScore]);
        chartSpiderLeadership.validateData();


    }
    else{
        var selectedUser = usersInfo[usersName.indexOf(selectedItem.replace("_", " "))];
        $('#competenciesTopBot3').show();
        chartSpiderLeadership.dataProvider = setChartDataSampleLeadershipSpider([selectedUser.rleadershipLeedrScore, selectedUser.rleadershipComunicationScore, selectedUser.rleadershipleadershipScore, selectedUser.rleadershipDesitionMakingScote, selectedUser.rleadershipConfrontationsScore, selectedUser.rleadershipTeamScore]);
        chartSpiderLeadership.validateData();
        chartClusterEQ.dataProvider = setChartSampleClusterEQData([selectedUser.reqselfAwarnesscore, selectedUser.reqselfManagmentScore, selectedUser.reqSocialAwarnessScore, selectedUser.reqSocialManagmentScore]);
        chartClusterEQ.validateData();
        //sampleGritValue = selectedUser.rgritScore;
        chartSample.arrows[0].setValue(selectedUser.rgritScore);
        chartSample.axes[0].setBottomText(selectedUser.rgritScore + "%");
        chartSample.validateData();
        chartSample.validateNow();
        //atrition
        chartWearSample.arrows[0].setValue(selectedUser.attrition * 100);
        chartWearSample.axes[0].setBottomText(selectedUser.attrition * 100 + "%");
        chartWearSample.validateData();
        chartWearSample.validateNow();
        //iq
        var iqHass = selectedUser.riqAnswers;
        for (i = 0; i < iqHass.length; i++) {
            if (iqHass[i]) {
                document.getElementById("Iq" + (i + 1) + "Has").classList.add('dotChecked');
                document.getElementById("Iq" + (i + 1) + "Hasnt").classList.add('dotUnchecked');
            } else {
                document.getElementById("Iq" + (i + 1) + "Hasnt").classList.add('dotChecked');
                document.getElementById("Iq" + (i + 1) + "Has").classList.add('dotUnchecked');
            }
        }
        //fitness
        setPercentage(100);
        document.getElementById("progressUser").innerHTML = selectedItem.replace("_", " ");
        document.getElementById("userSelectedIQ").innerHTML = selectedItem.replace("_", " ");
        setTextsJob(["loremIpsum", "loremIpsumShort", "loremIpsum"], ["loremIpsum", "loremIpsumShort", "loremIpsumShort"]);
    }
}
// what happens when tabs are clicked
$(function () {



    // 'all' tab
    $('#people').click(function () {
        $('#people').addClass('active');
        $('#groupsTab').removeClass('active');
        $('#users').show();
        $('#groups').hide();
        $(".user").show();
        $(".group").hide();
    });
    $('#groupsTab').click(function () {

        $('#groupsTab').addClass('active');
        $('#people').removeClass('active');
        $('#users').hide();
        $('#groups').show();
        $(".group").show();
        $(".user").hide();
    });
});

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