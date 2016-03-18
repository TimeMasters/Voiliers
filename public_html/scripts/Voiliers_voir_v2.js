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
   xhr.open('GET',"nouveau.xml",true); 
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
        afficheSelection(); 
        //appel de la fonction afficheSelection pour avoir directement quelque chose sur la page au lieu du choix selection par defaut 
    }
}

function afficheSelection ()	
{
    xhr2 = createRequest();
    if (xhr2 == null) //si echec creation
    {
       alert("Echec de la creation de la requête"); //affiche dialogue echec
       return;
    }
    xhr2.onreadystatechange = callback_getVoiliers; // au changement d'etat de la
    //// requete,on appelle la fonction callback_peupleChoix
    xhr2.open('GET',"nouveau.xml",true); 
    //la requete demande au serveur le doc xml
    xhr2.send(null);
} //afficheSelection ()

function callback_getVoiliers()
{
    
    if (xhr2.readyState==4 && xhr2.status==200)
    {
        voilier = xhr2.responseXML.getElementsByTagName("voilier")[document.getElementById("choix").selectedIndex];
        
        //Creation des elements du tableau
        div = document.getElementById("selection");
        table = document.createElement("table");
        ligne1tab = document.createElement("tr");
        celluleImg = document.createElement("td");
        celluleImpData = document.createElement("td");
        ligneDescr = document.createElement("tr");
        celluleDescr = document.createElement("td");
        
        //Permet de rafraichir a chaque selection
        while(div.childNodes.length != 0){
            div.removeChild(div.childNodes[0]);
        }        
        
        //Ajout données importantes dans la cellule des données importantes
        celluleImpData.appendChild(document.createTextNode("Nom :" + voilier.getElementsByTagName("nom")[0].textContent));
        celluleImpData.appendChild(document.createElement("br"));
        celluleImpData.appendChild(document.createTextNode("Classe : "+voilier.getAttribute("classe")));
        celluleImpData.appendChild(document.createElement("br"));
        celluleImpData.appendChild(document.createTextNode("Architecte : "+voilier.getElementsByTagName("architecte")[0].textContent));
        celluleImpData.appendChild(document.createElement("br"));
        celluleImpData.appendChild(document.createTextNode("Chantier : "+voilier.getElementsByTagName("chantier")[0].textContent));
        celluleImpData.appendChild(document.createElement("br"));
        celluleImpData.appendChild(document.createTextNode(voilier.getAttribute("anneeFabrication")+", voile numero : "+voilier.getAttribute("numeroDeVoile")));
        
        //Resumé : nom et prenoms de skippers seulement
        celluleDescr.appendChild(document.createTextNode("Skippers :"+voilier.getElementsByTagName("skipper")[0].textContent //premier skipper
                +" et "+voilier.getElementsByTagName("skipper")[1].textContent)); //deuxieme skipper
        celluleDescr.appendChild(document.createElement("br"));
       
        //Resumé : partie texte mixte : il  n'y  a pas besoin d'utiliser siblings sa marche quand meme pour les elements mixtes sans cette technique
        celluleDescr.appendChild(document.createTextNode(voilier.getElementsByTagName("texteskippers")[0].textContent));
        resume = new String();
        
        
        
        //Ajout image
        img = document.createElement("img");
        img.src = voilier.getElementsByTagName("photo")[0].getAttribute("adresse");
        celluleImg.appendChild(img);
        
        //Mise en forme du tableau
        celluleDescr.colSpan =2 ;
        table.border=1;
    
        //Assemblage du tableau
        div.appendChild(table);
        table.appendChild(ligne1tab);
        table.appendChild(ligneDescr);
        ligne1tab.appendChild(celluleImg);
        ligne1tab.appendChild(celluleImpData);
        ligneDescr.appendChild(celluleDescr);
    }
 
}
     
    

        