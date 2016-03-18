<?php
session_start();

    $erreurs = array();

    while (list ($id,$value)= each ($_POST))
    {
        if (empty($value)){
            $erreurs[]="Le champs .$id est vide ";
        }
    }
    extract($_POST);

    $exprRegAnneeConstr='~^[0-9]{1,4}$~';
    if(!preg_match($exprRegAnneeConstr,$anneeConstr))
    {
        $erreurs[]="Seulement des chiffres pour l'année";
    }
    
    
    if(count($erreurs)!=0)
    {
        echo "<p class='erreur'>";
        for($i = 0; $i<count($erreurs);$i++)
        {
            echo($i+1)." - ".$erreurs[$i]."<br/>";
        }
        echo "</p>";
    }
    else
    {
        //creation du fichier xml si il n'existe pas 
        if (!file_exists("nouveau.xml"))
        {        
        // construction de la racine quand le fichier n’existe pas
            $racine = new SimpleXMLElement ("<voiliers></voiliers>");
        }
        else
        {
            // lecture de la racine comme un element xml
            $racine = simplexml_load_file ("nouveau.xml");
        }   
        
         
        $voilier = $racine->addChild ("voilier");
        $voilier->addAttribute("numeroDeVoile", $numVoile);
        $voilier->addChild ("nom", $nomVoilier);
        $voilier->addAttribute("classe", $classe);
        $voilier->addChild("architecte",$architecte);
        $voilier->addAttribute("anneeFabrication",$anneeConstr);
        $photo = $voilier->addChild("photo");
        $photo->addAttribute("adresse", $adresse);
        $voilier->addChild("chantier",$chantier);
        $skippers = $voilier->addChild("skippers");
        $skippers->addChild("skipper",$skipper1);
        $skippers->addChild("skipper",$skipper2);
        $skippers->addChild("texteskippers",$skippersDescr);
        $nfile = fopen("nouveau.xml", "w");
        fwrite ($nfile , $racine->asXML());
        fclose ($nfile);
       
    }
?>