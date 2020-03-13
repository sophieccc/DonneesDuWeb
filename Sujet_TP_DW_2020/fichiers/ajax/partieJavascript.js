var showCurrency = false;
var showCorona = false;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function recupererPremierEnfantDeTypeNode(n) {
    var x = n.firstChild;
    while (x.nodeType != 1) { // Test if x is an element node (and not a text node or other)
        x = x.nextSibling;
    }
    return x;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//change le contenu de l'�lement avec l'id "nom" avec la chaine de caract�res en param�tre	  
function setNom(nom) {
    var elementHtmlARemplir = window.document.getElementById("id_nom_a_remplacer");
    elementHtmlARemplir.innerHTML = nom;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//charge le fichier XML se trouvant � l'URL relative donn� dans le param�treet le retourne
function chargerHttpXML(xmlDoc) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    //chargement du fichier XML � l'aide de XMLHttpRequest synchrone (le 3� param�tre est d�fini � false)
    httpAjax.open('GET', xmlDoc, false);
    httpAjax.send();

    return httpAjax.responseXML;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
// Charge le fichier JSON se trouvant � l'URL donn�e en param�tre et le retourne
function chargerHttpJSON(jsonDocumentUrl) {

    var httpAjax;

    httpAjax = window.XMLHttpRequest ?
        new XMLHttpRequest() :
        new ActiveXObject('Microsoft.XMLHTTP');

    if (httpAjax.overrideMimeType) {
        httpAjax.overrideMimeType('text/xml');
    }

    // chargement du fichier JSON � l'aide de XMLHttpRequest synchrone (le 3� param�tre est d�fini � false)
    httpAjax.open('GET', jsonDocumentUrl, false);
    httpAjax.send();

    var responseData = eval("(" + httpAjax.responseText + ")");

    return responseData;
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton2_ajaxBibliographie(xmlDoc, xslDoc, newElement) {

    var xsltProcessor = new XSLTProcessor();

    // Chargement du fichier XSL � l'aide de XMLHttpRequest synchrone 
    var xslDocument = chargerHttpXML(xslDoc);

    // Importation du .xsl
    xsltProcessor.importStylesheet(xslDocument);

    // Chargement du fichier XML � l'aide de XMLHttpRequest synchrone 
    var xmlDocument = chargerHttpXML(xmlDoc);

    // Cr�ation du document XML transform� par le XSL
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    // Recherche du parent (dont l'id est "here") de l'�l�ment � remplacer dans le document HTML courant
    var elementHtmlParent = window.document.getElementById("id_element_a_remplacer");
    // Premier �l�ment fils du parent
    var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
    // Premier �l�ment "elementName" du nouveau document (par exemple, "ul", "table"...)
    var elementAInserer = newXmlDocument.getElementsByTagName(newElement)[0];

    // Remplacement de l'�l�ment
    elementHtmlParent.replaceChild(elementAInserer, elementHtmlARemplacer);

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton3_ajaxEmployees(xmlDoc) {


    var xmlDocument = chargerHttpXML(xmlDoc);

    //extraction des noms � partir du document XML (avec une feuille de style ou en javascript)
    var lesNoms = xmlDocument.getElementsByTagName("LastName");

    // Parcours de la liste des noms avec une boucle for et 
    // construction d'une chaine de charact�res contenant les noms s�par�s par des espaces 
    // Pour avoir la longueur d'une liste : attribut 'length'
    // Acc�s au texte d'un noeud "LastName" : NOM_NOEUD.firstChild.nodeValue
    var chaineDesNoms = "";
    for (i = 0; i < lesNoms.length; i++) {
        if (i > 0) {
            chaineDesNoms = chaineDesNoms + ", ";
        }
        chaineDesNoms = chaineDesNoms + lesNoms[i].firstChild.nodeValue + " ";
    }


    // Appel (ou recopie) de la fonction setNom(...) ou bien autre fa�on de modifier le texte de l'�l�ment "span"
    setNom(chaineDesNoms);



}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Bouton4_ajaxEmployeesTableau(xmlDoc, xslDoc) {
    //commenter la ligne suivante qui affiche la bo�te de dialogue!
    alert("Fonction � compl�ter...");
}
////////BOUTON 1///////////////////
function BlueBackgroundWhiteButton() {
    var arriereplan = window.document.getElementById("body");
    arriereplan.style = "background-color:blue";
    var bouton = window.document.getElementById("myButton1");
    bouton.style = "color:white";
}
////////BOUTON 2///////////////////
function WhiteBackground() {
    var arriereplan = window.document.getElementById("body");
    arriereplan.style = "background-color:white";
}


////////BOUTON 3///////////////////
function CountryInfo(xmlURL, xslURL, newElement) {
    var texteCode = window.document.getElementById("myText");

    //Loading files
    var xsltProcessor = new XSLTProcessor();
    var xslDocument = chargerHttpXML(xslURL);
    xsltProcessor.importStylesheet(xslDocument);
    xsltProcessor.setParameter("", "code", texteCode.value);

    var xmlDocument = chargerHttpXML(xmlURL);
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);

    //Edit HTML
    var elementHtmlParent = window.document.getElementById("Renseignements");
    var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
    var elementAInserer = newXmlDocument.getElementsByTagName(newElement)[0];
    elementHtmlParent.replaceChild(elementAInserer, elementHtmlARemplacer);

}
////////BOUTON 4///////////////////
function DisplaySVG(svgFile, name) {
    var svgDoc = chargerHttpXML(svgFile);
    var svgText = new XMLSerializer().serializeToString(svgDoc);
    var parentDiv = document.getElementById(name);
    parentDiv.innerHTML = svgText;
}

////////BOUTON 5///////////////////
function DisplayTitle() {
    var elementHtmlARemplir = window.document.getElementById("Form");
    elementHtmlARemplir.innerHTML = this.getAttribute("title");
}

function ClickableForm() {
    var formes = window.document.getElementById("lesFormes").children[0].children;
    for (var i = 0; i < formes.length; i++) {
        formes[i].addEventListener("click", DisplayTitle);
    }
}

////////BOUTON 7///////////////////
function DisplayCountryName() {
    var elementHtmlARemplir = window.document.getElementById("Countries");
    elementHtmlARemplir.innerHTML = this.getAttribute("countryname");
}

function ClickableCountry() {
    var pays = window.document.getElementsByTagName("path");
    for (var i = 0; i < pays.length; i++) {
        pays[i].addEventListener("click", DisplayCountryName);
    }
}

////////BOUTON 8///////////////////
function helper(xmlDocumentUrl, xslDocumentUrl, newElementName, pays) {
    pays.style = "fill:blue";
    var codePays = pays.id;
    var xsltProcessor = new XSLTProcessor();
    var xslDocument = chargerHttpXML(xslDocumentUrl);
    xsltProcessor.importStylesheet(xslDocument);
    xsltProcessor.setParameter("", "code", codePays);
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);
    var elementHtmlParent = window.document.getElementById("tableauCarte");
    var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
    var elementAInserer = newXmlDocument.getElementsByTagName(newElementName)[0];
    elementHtmlParent.replaceChild(elementAInserer, elementHtmlARemplacer);
    var data = chargerHttpJSON("https://restcountries.eu/rest/v2/alpha/" + codePays);
    if (showCurrency) {
        var name = data["name"];
        var currencyComponent = window.document.getElementById("curr");
        currencyComponent.innerHTML = data.currencies[0].name;
    }
    if (showCorona) {
        fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                    "x-rapidapi-key": "f53896cd01mshbe9fd33ef346edfp125fd3jsn57b068e63890"
                }
            })
            .then(response => {
                console.log(response.json().then(function(coronaData) {
                        var cases = -1;
                        for (var i = 0; i < coronaData.countries_stat.length; i++) {
                            if (coronaData.countries_stat[i].country_name == name) {
                                cases = coronaData.countries_stat[i].cases;
                            }
                        }
                        var coronaComponent = window.document.getElementById("corona");
                        if (cases >= 0) {
                            coronaComponent.innerHTML = "No. of COVID-19 cases: " + cases;
                        } else {
                            coronaComponent.innerHTML = "Could not retrieve no. of cases";
                        }
                    }))
                    .catch(err => {
                        console.log(err);
                    });
            })
    }
}

function out() {
    this.style = "fill:#CCCCCC";
}

function mouseHover(xmlDocumentUrl, xslDocumentUrl, newElementName) {
    var lesPays = window.document.getElementsByTagName("path");
    for (i = 0; i < lesPays.length; i++) {
        lesPays[i].addEventListener("mouseover", function() { helper(xmlDocumentUrl, xslDocumentUrl, newElementName, this); });
        lesPays[i].addEventListener("mouseout", out);
    }
}

////////BOUTON 9///////////////////
/*function autoCompletion(xmlDocumentUrl)
{	
	var texteCode = window.document.getElementById("myText");
    texteCode.setAttribute("list","codeList");
    texteCode.setAttribute('autocomplete','on');
	texteCode.innerHTML = "<datalist id = 'codeList'></datalist>" ;
	
	var xmlDocument = chargerHttpXML(xmlDocumentUrl);
	var codes = xmlDocument.getElementsByTagName("cca2");
	var liste = "<option value='Code pays'/>" ;
	for(var i = 0 ; i < codes.length ; i++)
	{
        //if(codes[i].firstChild.nodeValue.textContent().startsWith(texteCode.textContent()))
        {
            liste = liste + "<option value ='" + codes[i].firstChild.nodeValue + "'/>" ;
        }
	}
	var component = window.document.getElementById("codeList");
	component.innerHTML = liste ;
}*/

function autoCompletion(xmlDocumentUrl, datalistId) {
    var xsltProcessor = new XSLTProcessor();
    var xslDocument = chargerHttpXML('codeList.xsl');
    xsltProcessor.importStylesheet(xslDocument);
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);
    var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);
    var dlist = document.getElementById(datalistId);
    var children = newXmlDocument.getElementsByTagName('option');
    for (child of children) {
        dlist.appendChild(child);
    }
    var texteCode = window.document.getElementById("myText");
    texteCode.setAttribute('list', datalistId);
    //texteCode.setAttribute('autocomplete','on');
}

function autocomplete(inp, xmlDocumentUrl) {
    var xmlDocument = chargerHttpXML(xmlDocumentUrl);
    var arr = xmlDocument.getElementsByTagName("cca2");
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function(e) {
        closeAllLists(e.target);
    });
}


function autoCompletion(xmlDocumentUrl) {
    var texteCode = window.document.getElementById("myText");
    texteCode.setAttribute("list", "codeList");
    texteCode.innerHTML = "<datalist id = 'codeList'></datalist>";

    var xmlDocument = chargerHttpXML(xmlDocumentUrl);
    var codes = xmlDocument.getElementsByTagName("cca2");
    var liste = "<option value='Code pays'/>";
    for (i = 0; i < codes.length; i++) {
        liste = liste + "<option value ='" + codes[i].firstChild.nodeValue + "'/>";
    }
    var component = window.document.getElementById("codeList");
    component.innerHTML = liste;
}

function retrieveCurrencies() {
    showCurrency = true;
}

function getCases() {
    showCorona = true;
}