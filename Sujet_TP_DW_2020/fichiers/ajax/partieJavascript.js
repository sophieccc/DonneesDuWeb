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
	arriereplan.style = "background-color:blue" ;
	var bouton= window.document.getElementById("myButton1");
	bouton.style = "color:white" ;
}
////////BOUTON 2///////////////////
function WhiteBackground() {
	var arriereplan = window.document.getElementById("body");
	arriereplan.style = "background-color:white" ;
}
////////BOUTON 3///////////////////
function CountryInfo(xmlURL, xslURL, newElement) {
	var texteCode = window.document.getElementById("myText");
	
	//Loading files
	var xsltProcessor=new XSLTProcessor();
	var xslDocument = chargerHttpXML(xslURL);
	xsltProcessor.importStylesheet(xslDocument);
	xsltProcessor.setParameter("","code",texteCode.value) ;
		
	var xmlDocument = chargerHttpXML(xmlURL);
	var newXmlDocument = xsltProcessor.transformToDocument(xmlDocument);
	
	//Edit HTML
	var elementHtmlParent = window.document.getElementById("Renseignements");
	var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
	var elementAInserer = newXmlDocument.getElementsByTagName(newElement)[0];
	elementHtmlParent.replaceChild(elementAInserer, elementHtmlARemplacer);
	
}
////////BOUTON 4///////////////////
function DisplayDrawing(xmlDocumentUrl,newElement) {
	var xmlDocument = chargerHttpXML(xmlDocumentUrl);	
	var elementHtmlParent = window.document.getElementById("image");
	var elementAInserer = xmlDocument.getElementsByTagName(newElement)[0];
	var elementHtmlARemplacer = recupererPremierEnfantDeTypeNode(elementHtmlParent);
    elementHtmlParent.replaceChild(elementAInserer, elementHtmlARemplacer);
}

////////BOUTON 5///////////////////
function DisplayTitle()
{
	var elementHtmlARemplir = window.document.getElementById("Form");
	elementHtmlARemplir.innerHTML = this.getAttribute("title") ; 
}

function Clickable() {
	var cercle = window.document.getElementById("leCercle");
	var rect = window.document.getElementById("leRect");
	var courbe = window.document.getElementById("laCourbe");
	
	cercle.addEventListener("click", DisplayTitle);
	rect.addEventListener("click", DisplayTitle);
	courbe.addEventListener("click", DisplayTitle);
}
