window.onload = initPage;
     
function initPage() 
{
   document.getElementById("enregistrer").onclick = envoieDonnees;
}

function envoieDonnees()
{
    xhr = createRequest(); //creation de la requête
    if (xhr == null) //si echec creation
    {
       alert("Echec de la creation de la requête"); //affiche dialogue echec
       return;
    }
    xhr.open('POST',"Voiliers_enregistrer.php",true);
    xhr.onreadystatechange = callback_envoieDonnees;
    var cookie = escape(document.cookie);
    xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    //saisie est le nom du formulaire
    xhr.send('nomVoilier='+document.saisie.nomVoilier.value
            + '&numVoile=' +document.saisie.numVoile.value
            + '&classe=' +document.saisie.classe.value
            + '&anneeConstr=' + document.saisie.anneeConstr.value
            + '&adresse=' + document.saisie.adresse.value
            + '&chantier=' + document.saisie.chantier.value
            + '&architecte=' + document.saisie.architecte.value
            + '&skipper1=' + document.saisie.skipper1.value
            + '&skipper2=' + document.saisie.skipper2.value
            + '&skippersDescr=' + document.saisie.skippersDescr.value
            );
}

function callback_envoieDonnees()
{
    
    if (xhr.readyState==4 && xhr.status==200) //test des champs de valeur de la requete
    //code 200 -> requete successfull
    {
        if (xhr.responseText =="")
        {
            document.getElementById('msg').innerHTML ="Enregistrement effectué";
        }
        else
        {
            alert("ok");
            document.getElementById('msg').innerHTML = xhr.responseText;
        }
    }
}
 
    

        