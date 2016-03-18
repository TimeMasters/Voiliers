window.onload = initPage;
     
function initPage() 
{
   document.getElementById("choix").onchange = afficheSelection;
   xhr = createRequest(); //creation de la requête
   if (xhr == null) //si echec creation
   {
       alert("Echec de la creation de la requête"); //affiche dialogue echec
       return;
   }
   xhr.onreadystatechange = callback_peupleChoix; // au changement d'etat de la
   //// requete,on appelle la fonction callback_peupleChoix
   xhr.open('GET',"Voiliers.xml",true); 
   //la requete demande au serveur le doc xml
   xhr.send(null);
}

function callback_peupleChoix()
{
    if (xhr.readyState==4 && xhr.status==200) //test des champs de valeur de la requete
    //code 200 -> requete successfull
    {
        valeur = xhr.responseXML.getElementsByTagName("nom");   //récupération de tout les éléments "nom" du fichierXML dans le tableau "valeur"
        div = document.getElementById("choix"); //Récupération dans div des éléments du document père (le fichier HTML) ayant l'id 'choix'
        for (i=0;i<valeur.length;i++) //Parcours du tableau valeur
        {
            elt = document.createElement("option"); //Création d'un elément de type <option>
            noeudTexte = document.createTextNode(valeur[i].textContent); //Création d'un élément de type texte, égal a un nom stocké dans le tableau valeur
            elt.appendChild(noeudTexte); //Ajout de l'élément noeudText à element
            div.appendChild(elt);//Ajout de l'élement elt à div(soit l'élément avec l'id "choix")
        }
    }
}

function afficheSelection ()	
{
    alert(document.form.select.value);
    document.getElementById("selection").innerHTML = document.form.select.value ;
} //afficheSelection ()
     
    

        