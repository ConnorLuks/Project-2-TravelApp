let autocomplete;
function initAutocomplete() {
    autocomplete = new google.maps.places.Autocomplete(
    document.getElementById('autocomplete'),
    {
        types: [],
        componentRestrictions: {'country': ['US']},
        fields: ['place_id', 'geometry', 'name', 'address_components', 'photos']
        });
        autocomplete.addListener('place_changed',onPlaceChanged);
    }
    function onPlaceChanged() {
        var place = autocomplete.getPlace();
        const imagesElem = document.getElementById('images');  
        if (!place.geometry) {
            document.getElementById('autocomplete').placeholder =
            "Enter a Place";
        } else {
          imagesElem.innerHTML = '';
            document.getElementById('details').innerHTML = place.name;
            const randomPhoto = place.photos[Math.floor(Math.random() * place.photos.length)];
            const img = document.createElement('img');
            img.src = randomPhoto.getUrl({ maxWidth: 300, maxHeight: 100 });
            imagesElem.appendChild(img);
        }
    };
function storeInput() {
    var geocoder = new google.maps.Geocoder();
    var address= document.getElementById('autocomplete').value;
    const Cities = [];
    let currentCities = JSON.parse(localStorage.getItem('city'));  
    if (currentCities == null) {
         currentCities = [];
    };
    const newCity= document.getElementById('autocomplete').value;
    if (newCity == "") {
      alert("Please enter a valid location");}
      else {
    if (currentCities === null) {
      Cities.push(newCity);
      localStorage.setItem('City', JSON.stringify(Cities));
    } else {
    currentCities.push(newCity);
    localStorage.setItem('City', JSON.stringify(currentCities));
    }
}
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var latitude = results[0].geometry.location.lat();
        var longitude = results[0].geometry.location.lng();
        console.log(latitude);
        console.log(longitude);
            const lat = [];
            let lats = JSON.parse(localStorage.getItem('lats'));
            if (lats === null) {
                 lats = [];
            };
            if (lats.length > 0) {
                 lats.length = 0;
            }
            const newLat = latitude.toString();
            if (lats === null) {
                 lat.push(newLat);
                 localStorage.setItem('lats',JSON.stringify(lat));
            }
            else {
                 lats.push(newLat);
                 localStorage.setItem("lats", JSON.stringify(lats));  
            }
            const long = [];
            let longs = JSON.parse(localStorage.getItem('longs'));
            if (longs === null) {
                 longs = [];
            };
            if (longs.length > 0) {
                 longs.length = 0;
            }
            const newLong = longitude.toString();
            if (longs === null) {
                 long.push(newLong);
                 localStorage.setItem('longs',JSON.stringify(long));
            }
            else {
                 longs.push(newLong);
                 localStorage.setItem("longs", JSON.stringify(longs));  
            }
             if (newLat !== '' && newLong !=='') {
                 console.log("Cooridinates are stored")
                 document.getElementById("selection").innerHTML = "Please select a page to view hotel and food options in ";
            }
       }
    }
)};
function goToFoodPage() {
     window.location.assign('index2.html')      
}
function goToHotelsPage() {
     window.location.assign('index3.html')
}