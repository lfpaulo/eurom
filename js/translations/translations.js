define([''], function () {
    'use strict';

    // pt-PT Portugal
    // fr-FR' France
    // de-DE Germany
    // en-GB United Kingdom
    // es-ES Spain
    var translations = [
        {
            "id": "title",
            "pt-PT": "EuroM",
            "fr-FR": "EuroM",
            "de-DE": "EuroM",
            "en-GB": "EuroM",
            "es-ES": "EuroM"
        },
        {
            "id": "titleDesc",
            "pt-PT": "Geração de chaves aleatórias para o Euromilhões",
            "fr-FR": "Génération de clés aléatoires pour Euromillions",
            "de-DE": "Erzeugung zufälliger schlüssel für Euromillionen",
            "en-GB": "Generation of random keys for Euromillions",
            "es-ES": "Generación de claves aleatorias para el Euromillones"
        },
        {
            "id": "euromillions",
            "pt-PT": "Euromilhões",
            "fr-FR": "Euromillions",
            "de-DE": "Euromillionen",
            "en-GB": "Euromillions",
            "es-ES": "Euromillones"
        },
        {
            "id": "randomKey",
            "pt-PT": "Chave aleatória",
            "fr-FR": "Clé aléatoire",
            "de-DE": "Zufälliger schlüssel",
            "en-GB": "Random key",
            "es-ES": "Llave al azar"
        },
        {
            "id": "help",
            "pt-PT": "Ajuda",
            "fr-FR": "Aide",
            "de-DE": "Hilfe",
            "en-GB": "Help",
            "es-ES": "Ayuda"
        },
        {
            "id": "clean",
            "pt-PT": "Limpar",
            "fr-FR": "Nettoyer",
            "de-DE": "Reinigen",
            "en-GB": "Clean",
            "es-ES": "Limpiar"
        },
        {
            "id": "statistics",
            "pt-PT": "Estatísticas",
            "fr-FR": "Statistiques",
            "de-DE": "Statistiken",
            "en-GB": "Statistics",
            "es-ES": "Estadísticas"
        },
        {
            "id": "numbers",
            "pt-PT": "Números",
            "fr-FR": "Nombres",
            "de-DE": "Nummern",
            "en-GB": "Numbers",
            "es-ES": "Números"
        },
        {
            "id": "number",
            "pt-PT": "Numero",
            "fr-FR": "Numéro",
            "de-DE": "Anzahl",
            "en-GB": "Number",
            "es-ES": "Número"
        },
        {
            "id": "stars",
            "pt-PT": "Estrelas",
            "fr-FR": "Étoiles",
            "de-DE": "Sterne",
            "en-GB": "Stars",
            "es-ES": "Estrellas"
        },
        {
            "id": "star",
            "pt-PT": "Estrela",
            "fr-FR": "Étoile",
            "de-DE": "Stern",
            "en-GB": "Star",
            "es-ES": "Estrella"
        },
        {
            "id": "premiumKey",
            "pt-PT": "Chave Premium",
            "fr-FR": "Clé Premium",
            "de-DE": "Premiumschlüssel",
            "en-GB": "Premium key",
            "es-ES": "Clave Premium"
        },
        {
            "id": "repetitions",
            "pt-PT": "Repetições",
            "fr-FR": "Répétitions",
            "de-DE": "Wiederholungen",
            "en-GB": "Repetitions",
            "es-ES": "Repeticiones"
        },
        {
            "id": "close",
            "pt-PT": "Fechar",
            "fr-FR": "Proche",
            "de-DE": "Schließen",
            "en-GB": "Close",
            "es-ES": "Cerrar"
        },
        {
            "id": "press",
            "pt-PT": "Pressione",
            "fr-FR": "Presse",
            "de-DE": "Presse",
            "en-GB": "Press",
            "es-ES": "Presione"
        },
        {
            "id": "toGenerateRandomKey",
            "pt-PT": "para gerar uma chave aleatória",
            "fr-FR": "pour générer une clé aléatoire",
            "de-DE": "um einen zufälligen schlüssel zu generieren",
            "en-GB": "to generate a random key",
            "es-ES": "para generar una clave aleatoria"
        },
        {
            "id": "toUnselectRandomlyGeneratedKey",
            "pt-PT": "para desselecionar a chave gerada aleatóriamente (os números ou estrelas seleccionados pelo utilizador não são alterados)",
            "fr-FR": "désélectionner la clé générée aléatoirement (les numéros ou étoiles sélectionnés par l'utilisateur ne sont pas modifiés)",
            "de-DE": "um den zufällig generierten schlüssel abzuwählen (vom benutzer gewählte zahlen oder sterne werden nicht geändert)",
            "en-GB": "to deselect the randomly generated key (user-selected numbers or stars are not changed)",
            "es-ES": "para deshacer la clave generada aleatoriamente (los números o estrellas seleccionados por el usuario no se cambian)"
        },
        {
            "id": "toAccessInformationHowToUse",
            "pt-PT": "para aceder á informação relativa ao modo de utilização desta aplicação",
            "fr-FR": "pour accéder aux informations sur l'utilisation de cette application",
            "de-DE": "zugriff auf informationen zur verwendung dieser anwendung",
            "en-GB": "to access information on how to use this application",
            "es-ES": "para acceder a la información relativa al modo de utilización de esta aplicación"
        },
        {
            "id": "toChangeLanguage",
            "pt-PT": "Para alterar o idioma pressione a respectiva bandeira.",
            "fr-FR": "Pour changer la langue, appuyez sur le drapeau correspondant.",
            "de-DE": "Um die sprache zu ändern, drücken sie die entsprechende flagge.",
            "en-GB": "To change the language press the respective flag.",
            "es-ES": "Para cambiar el idioma, pulse su bandera."
        },
        {
            "id": "theUserCanSelect",
            "pt-PT": "O utilizador pode selecionar números ou estrelas (num máximo de 5 números e 2 estrelas) pressionando o respectivo número ou estrela caso este não esteja seleccionado.",
            "fr-FR": "L'utilisateur peut sélectionner des chiffres ou des étoiles (jusqu'à 5 chiffres et 2 étoiles) en appuyant sur leur numéro ou leur étoile s'ils ne sont pas sélectionnés.",
            "de-DE": "Der benutzer kann zahlen oder sterne (bis zu 5 Ziffern und 2 Sterne) auswählen, indem er seine nummer oder seinen stern drückt, wenn er nicht ausgewählt ist.",
            "en-GB": "The user can select numbers or stars (up to 5 numbers and 2 stars) by pressing their number or star if it is not selected.",
            "es-ES": "El usuario puede seleccionar números o estrellas (en un máximo de 5 números y 2 estrellas) presionando su número o estrella si no está seleccionado."
        },
        {
            "id": "whenNumberIsSelected",
            "pt-PT": "Quando um número ou uma estrela estiverem selecionados, pressione para desseleccionar.",
            "fr-FR": "Lorsqu'un numéro ou une étoile est sélectionné, appuyez sur pour le désélectionner.",
            "de-DE": "Wenn eine nummer oder ein stern ausgewählt ist, drücken sie, um die auswahl aufzuheben.",
            "en-GB": "When a number or a star is selected, press to deselect.",
            "es-ES": "Cuando un número o una estrella estén seleccionados, pulse para desprender."
        },
        {
            "id": "numbersSelectedByUserCanOnlyBeDeselected",
            "pt-PT": "Números ou estrelas selecionados pelo utilizador apenas podem ser desselecionados primindo o número ou a estrela.",
            "fr-FR": "Les nombres ou étoiles sélectionnés par l'utilisateur ne peuvent être désélectionnés qu'en appuyant sur le chiffre ou l'étoile.",
            "de-DE": "Vom benutzer ausgewählte zahlen oder sterne können nur durch drücken der zahl oder des sterns abgewählt werden.",
            "en-GB": "Numbers or stars selected by the user can only be deselected by pressing the number or star.",
            "es-ES": "Los números o estrellas seleccionados por el usuario sólo se pueden deshacer pulsando el número o la estrella."
        },
        {
            "id": "userSelectedNumbersAreNotChangedByRandomKeyGeneration",
            "pt-PT": "Números ou estrelas selecionados pelo utilizador não são alterados pela geração de chave aleatória.",
            "fr-FR": "Les nombres ou étoiles sélectionnés par l'utilisateur ne sont pas modifiés par la génération de clé aléatoire.",
            "de-DE": "Vom benutzer gewählte zahlen oder sterne werden nicht durch zufällige schlüsselgenerierung geändert.",
            "en-GB": "User-selected numbers or stars are not changed by random key generation.",
            "es-ES": "Los números o estrellas seleccionados por el usuario no se cambian por la generación de clave aleatoria."
        },
        {
            "id": "unselectedNumbersStars",
            "pt-PT": "Números ou estrelas não selecionados.",
            "fr-FR": "Les nombres ou les étoiles ne sont pas sélectionnés.",
            "de-DE": "Zahlen oder sterne nicht ausgewählt.",
            "en-GB": "Numbers or stars not selected.",
            "es-ES": "Números o estrellas no seleccionados."
        },
        {
            "id": "numbersSelectedByRandomKey",
            "pt-PT": "Números ou estrelas selecionados pela chave aleatória.",
            "fr-FR": "Numéros ou étoiles sélectionnés par clé aléatoire.",
            "de-DE": "Zahlen oder sterne durch zufälligen schlüssel ausgewählt.",
            "en-GB": "Numbers or stars selected by random key.",
            "es-ES": "Números o estrellas seleccionados por la clave aleatoria."
        },
        {
            "id": "numbersSelectedByTheUser",
            "pt-PT": "Números ou estrelas selecionados pelo utilizador.",
            "fr-FR": "Numéros ou étoiles sélectionnés par l'utilisateur.",
            "de-DE": "Vom benutzer ausgewählte zahlen oder sterne.",
            "en-GB": "Numbers or stars selected by the user.",
            "es-ES": "Números o estrellas seleccionados por el usuario."
        },
        {
            "id": "goodLuck",
            "pt-PT": "Boa sorte ...",
            "fr-FR": "Bonne chance ...",
            "de-DE": "Viel glück ...",
            "en-GB": "Good luck ...",
            "es-ES": "Buena suerte ..."
        },
        {
            "id": "statisticsAreBasedOn",
            "pt-PT": "A chave Premium mostra os numeros ou as estrelas que mais sairam (são baseadas nos numeros ou estrelas que a aplicação gera aleatóriamente).",
            "fr-FR": "La touche Premium affiche les nombres ou les étoiles les plus importants (ils sont basés sur les nombres ou les étoiles que l'application génère de manière aléatoire).",
            "de-DE": "Die Premium-Taste zeigt die zahlen oder sterne an, die am meisten verließen (sie basieren auf den zahlen oder sternen, die die anwendung zufällig generiert).",
            "en-GB": "The Premium key shows the numbers or stars that left most (they are based on the numbers or stars that the application generates randomly).",
            "es-ES": "La clave Premium muestra los números o las estrellas que más salieron (se basan en los números o estrellas que la aplicación genera aleatoriamente)."
        },
        {
            "id": "repetitionsShowNumberOfTimes",
            "pt-PT": "As repetições mostram o numero de vezes que um numero ou uma estrela foi seleccionado pela geração aleatória.",
            "fr-FR": "Les répétitions montrent le nombre de fois qu'un nombre ou une étoile a été sélectionné par génération aléatoire.",
            "de-DE": "Die Wiederholungen zeigen an, wie oft eine Zahl oder ein Stern durch Zufallsgenerierung ausgewählt wurde.",
            "en-GB": "The repetitions show the number of times a number or a star has been selected by random generation.",
            "es-ES": "Las repeticiones muestran el número de veces que un número o una estrella fue seleccionado por la generación aleatoria."
        },
        {
            "id": "numbersOrStarsSelectedByUserAreNotCounted",
            "pt-PT": "Numeros ou estrelas selecionados pelo utilizador não são contabilizados para as estatísticas.",
            "fr-FR": "Les nombres ou étoiles sélectionnés par l'utilisateur ne sont pas pris en compte pour les statistiques.",
            "de-DE": "Vom benutzer ausgewählte zahlen oder sterne werden für die statistik nicht gezählt.",
            "en-GB": "Numbers or stars selected by the user are not counted for the statistics.",
            "es-ES": "Numeros o estrellas seleccionadas por el usuario no se contabilizan para las estadísticas."
        },
        {
            "id": "ifYouClearTheMemory",
            "pt-PT": "Se limpar a memoria do browser as estatisticas serão reiniciadas.",
            "fr-FR": "Si vous effacez la mémoire du navigateur, les statistiques seront redémarrées.",
            "de-DE": "Wenn sie den speicher des browsers löschen, wird die statistik neu gestartet.",
            "en-GB": "If you clear the memory of the browser the statistics will be restarted.",
            "es-ES": "Si se borra la memoria del explorador las estadísticas se reiniciarán."
        },
        {
            "id": "completeKey",
            "pt-PT": "Chave completa",
            "fr-FR": "Clé complète",
            "de-DE": "Vollständiger schlüssel",
            "en-GB": "Complete key",
            "es-ES": "Clave completa"
        },
        {
            "id": "moreThen5Numbers",
            "pt-PT": "Não pode selecionar mais que 5 numeros.",
            "fr-FR": "Vous ne pouvez pas sélectionner plus de 5 nombres.",
            "de-DE": "Sie können nicht mehr als 5 zahlen auswählen.",
            "en-GB": "You can not select more than 5 numbers.",
            "es-ES": "No puedes seleccionar más de 5 números."
        },
        {
            "id": "moreThen2Stars",
            "pt-PT": "Não pode selecionar mais que 2 estrelas.",
            "fr-FR": "Vous ne pouvez pas sélectionner plus de 2 étoiles.",
            "de-DE": "Sie können nicht mehr als 2 sterne auswählen.",
            "en-GB": "You can not select more than 2 stars.",
            "es-ES": "No puedes seleccionar más de 2 estrellas."
        },
        {
            "id": "toCalculatePremiumKeyThereMustOneRandom",
            "pt-PT": "Para calcular a chave Premium tem que existir pelo menos uma geração aleatória.",
            "fr-FR": "Pour calculer la clé Premium, il doit y avoir au moins une génération aléatoire.",
            "de-DE": "Um den Premium-Schlüssel zu berechnen, muss mindestens eine zufällige generation vorhanden sein.",
            "en-GB": "To calculate the Premium key there must be at least one random generation.",
            "es-ES": "Para calcular la clave Premium debe existir al menos una generación aleatoria."
        },
        {
            "id": "randomKeysGenerated",
            "pt-PT": "chaves aleatórias geradas",
            "fr-FR": "clés aléatoires générées",
            "de-DE": "zufallsschlüssel generiert",
            "en-GB": "random keys generated",
            "es-ES": "claves aleatorias generadas"
        },
        {
            "id": "columnsRepetitions",
            "pt-PT": "Colunas das repetições:",
            "fr-FR": "Colonnes de répétitions:",
            "de-DE": "Spalten von Wiederholungen:",
            "en-GB": "Columns of repetitions:",
            "es-ES": "Columnas de las repeticiones:"
        },
        {
            "id": "percentageTimesGenerated",
            "pt-PT": "Percentagem de vezes gerado",
            "fr-FR": "Pourcentage de fois généré",
            "de-DE": "Prozentsatz der generierten zeiten",
            "en-GB": "Percentage of times generated",
            "es-ES": "Porcentaje de veces generado"
        },
        {
            "id": "numberTimesGenerated",
            "pt-PT": "Número de vezes gerado",
            "fr-FR": "Nombre de fois généré",
            "de-DE": "Anzahl der generierten male",
            "en-GB": "Number of times generated",
            "es-ES": "Número de veces generado"
        },
        {
            "id": "toSortColumnPressColumnHeader",
            "pt-PT": "Para ordenar uma coluna pressione o cabeçalho da coluna, se esta já estiver ordenada o sentido da ordenação é invertido.",
            "fr-FR": "Pour trier une colonne, appuyez sur l'en-tête de la colonne, si elle est déjà triée, la direction de la commande est inversée.",
            "de-DE": "Um eine spalte zu sortieren, drücken sie die spaltenüberschrift. wenn sie bereits sortiert ist, wird die reihenfolge der reihenfolge umgekehrt.",
            "en-GB": "To sort a column press the column header, if it is already sorted the direction of the ordering is reversed.",
            "es-ES": "Para ordenar una columna presione el encabezado de la columna, si ya está ordenada el sentido de la ordenación se invierte."
        },
        {
            "id": "unsortedColumn",
            "pt-PT": "Coluna não ordenada",
            "fr-FR": "Colonne non triée",
            "de-DE": "Unsortierte Spalte",
            "en-GB": "Unsorted column",
            "es-ES": "Columna no ordenada"
        },
        {
            "id": "columnSortedAscending",
            "pt-PT": "Coluna ordenada ascendentemente",
            "fr-FR": "Colonne triée par ordre croissant",
            "de-DE": "Spalte sortiert aufsteigend",
            "en-GB": "Column sorted ascending",
            "es-ES": "Columna ordenada ascendentemente"
        },
        {
            "id": "columnSortedDescending",
            "pt-PT": "Coluna ordenada descendentemente",
            "fr-FR": "Colonne triée par ordre décroissant",
            "de-DE": "Spalte sortiert absteigend",
            "en-GB": "Column sorted descending",
            "es-ES": "Columna ordenada descendiente"
        },
        {
            "id": "clearStatistics",
            "pt-PT": "Limpar estatísticas",
            "fr-FR": "Effacer les statistiques",
            "de-DE": "Statistiken löschen",
            "en-GB": "Clear statistics",
            "es-ES": "Borrar estadísticas"
        },
        {
            "id": "attentionAllStatsWillBeRestarted",
            "pt-PT": "Atenção todas as estatísticas serão reiniciadas",
            "fr-FR": "Attention, toutes les statistiques seront redémarrées",
            "de-DE": "Achtung alle statistiken werden neu gestartet",
            "en-GB": "Attention all stats will be restarted",
            "es-ES": "Atención todas las estadísticas se reiniciarán"
        },
        {
            "id": "restartsAllStatistics",
            "pt-PT": "reinicia todas as estatísticas.",
            "fr-FR": "redémarre toutes les statistiques.",
            "de-DE": "startet alle Statistiken neu.",
            "en-GB": "restarts all statistics.",
            "es-ES": "reinicia todas las estadísticas."
        },
        {
            "id": "success",
            "pt-PT": "Sucesso",
            "fr-FR": "Réussi",
            "de-DE": "Erfolgreich",
            "en-GB": "Success",
            "es-ES": "Éxito"
        },
        {
            "id": "statisticsHaveBeenRestarted",
            "pt-PT": "As estatísticas foram reiniciadas.",
            "fr-FR": "Les statistiques ont été redémarrées.",
            "de-DE": "Die statistik wurde neu gestartet.",
            "en-GB": "Statistics have been restarted.",
            "es-ES": "Las estadísticas se reiniciaron."
        }
    ];

    // return array with translations
    function getTranslations() {
        return translations;
    }

    return {
        getTranslations: getTranslations 
    };
})