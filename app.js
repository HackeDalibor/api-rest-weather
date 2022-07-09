//! INSTANCIATION DES VARIABLES :
let searchBtn = document.getElementById('search');
//? Ceci sera notre barre de recherche.
//? On la sélectionne grâce à getElementById qui nous permet de sélectionner l'id qui se trouve dans notre document index.html.
let clickBtn  = document.getElementById('click-btn');
//? Ici c'est la variable qui sélectionne notre bouton.

const url = "https://www.prevision-meteo.ch/services/json/";
//? La méthode fetch() du mixin WindowOrWorkerGlobalScope démarre le chargement d'une ressource sur le réseau et retourne une promesse qui est résolue dès que la réponse est disponible. La promesse résoud l'objet Response représentant la réponse de votre requête. Cette promesse n'échoue pas en cas d'erreur HTTP, elle n'échoue que sur les problèmes de réseau. Vous devez utiliser un gestionnaire then pour identifier les erreurs HTTP.

//! NOTRE FONCTION api() :
function api(city) {
  //? Ce sera une fonction qui nous envoie des infos depuis notre api du lien url.
  
  fetch(url + city)
  //? On ajoute à l'url la ville recherchée.
    .then(function(result) {
      if (result.ok) {
        return result.json();
        //? Cette partie c'est pour lire le fichier json.
      }
    })
    .then(function(value) {
      //? Ceci nous trouvera toutes les valeurs recherchées dans l'api par rapport à la ville que l'utilisateur a ecrit dans la barre de recherche et affichera dans notre navigateur. 
      //? Donc la page affichera :

      //! div primaire
      document.getElementById('city-name').innerHTML           = value.city_info.name
      //? Le nom de la ville recherchée.
      document.getElementById('sunrise').innerHTML             = "Lever: "+ value.city_info.sunrise
      //? L'heure du lever du soleil.
      document.getElementById('sunset').innerHTML              = "Coucher: " + value.city_info.sunset
      //? L'heure du coucher du soleil.
      document.getElementById('desc-weather').innerHTML        = value.current_condition.condition
      //? La déscription de la météo.
      document.getElementById('img-weather').src               = value.current_condition.icon
      //? L'image de la météo.
      document.getElementById('temperature-weather').innerHTML = value.current_condition.tmp + "°C"
      //? La température, mais aussi :

      //! div secondaire
      //? Les infos des autres jours :
      document.getElementById('second-day').innerHTML          = value.fcst_day_0.day_short
      //? Le jour du lendemain.
      document.getElementById('second-desc-weather').innerHTML = value.fcst_day_0.condition
      //? La déscription de la météo de ce jour.
      document.getElementById('second-img').src                = value.fcst_day_0.icon
      //? L'image
      document.getElementById('second-temperature').innerHTML  = value.fcst_day_0.tmin+"/"+value.fcst_day_0.tmax+"°C"
      //? La température minimale et maximale.

      //! troisième div
      document.getElementById('third-day').innerHTML          = value.fcst_day_1.day_short
      document.getElementById('third-desc-weather').innerHTML = value.fcst_day_1.condition
      document.getElementById('third-img').src                = value.fcst_day_1.icon
      document.getElementById('third-temperature').innerHTML  = value.fcst_day_1.tmin+"/"+value.fcst_day_1.tmax+"°C"

      //! quatrième div
      document.getElementById('fourth-day').innerHTML          = value.fcst_day_2.day_short
      document.getElementById('fourth-desc-weather').innerHTML = value.fcst_day_2.condition
      document.getElementById('fourth-img').src                = value.fcst_day_2.icon
      document.getElementById('fourth-temperature').innerHTML  = value.fcst_day_2.tmin+"/"+value.fcst_day_1.tmax+"°C"
      //? La troisième et la quatrième div afficheront les mêmes infos que la deuxième, mais du troisième et quatrième jour.

      //! STYLE DES DIVS :
      //? Ces quatres éléments donneront la bordure à nos divs en afficheant une ville.
      document.getElementById('card').style.display        = "block"
      document.getElementById('card-second').style.display = "block"
      document.getElementById('card-third').style.display  = "block"
      document.getElementById('card-fourth').style.display = "block"

      console.log(value);
    })
    .catch(function(error) {
      alert("error 404... Il y a un problème !");
      //? Pour voir que l'erreur existe on est obligé de faire un catch error parce que sinon notre code ne marchera pas mais on n'aura pas le message d'erreur.
    })
}

//? Pour activer notre fonction il faudra l'appeler, donc on fera :

api("paris");

clickBtn.addEventListener("click", () => {
  console.log(searchBtn.value);
  api(searchBtn.value);
});
//? Ici on a rendu notre bouton clickable en lui donnant un addEventListener.
//? Pour que ce soit possible, addEventListener a besoin d'une façon dont elle s'activera("click") et d'une fonction dont elle exécutera.
