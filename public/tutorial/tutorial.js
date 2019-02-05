function translateByID(index, lang) {
    return dict[index][lang];
  }
                    let languageIndex = localStorage.getItem("language");
      if (languageIndex === null)
      {
        languageIndex = "es";
        localStorage.setItem("language", languageIndex);
      }
                let i = 1;
      while (i < 7) {
        let tt = "tt" + i;
        let td = "td" + i;
        let imgt = "imgt"+i;
        let tutorialTitulo = "tutorialTitulo" + i;
        let tutorialDesc = "tutorialDesc" + i;
        
        if (i<6)
        {

          let srci = dict[imgt][languageIndex];
          console.log(document.getElementById(imgt));
        }
        document.getElementById(tt).innerHTML = translateByID(tutorialTitulo, languageIndex);
        document.getElementById(td).innerHTML = translateByID(tutorialDesc, languageIndex);
        i++;
      }
      
      jQuery(document).ready(function () {
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
  set_lang(dictionary.en);
  
  });