async function initMap() {
    event.preventDefault();
    const pyrmont = await geocodeAddress();
    const map = new google.maps.Map(document.getElementById("map"), {
        center: pyrmont,
        zoom: 10,
    });

    // Create the places service.
    const service = new google.maps.places.PlacesService(map);
    var request = {
        location: pyrmont,
        type: ['medical'],
        radius: 500
    }

    service.nearbySearch(
        request,
        (results, status) => {
            if (status !== "OK") { console.log(status); return };
            console.log(results);
            createMarkers(results, map);
        }
    );

}
function geocodeAddress() {
    return new Promise(function (resolve) {

        const geocoder = new google.maps.Geocoder();

        const address = document.getElementById("address").value;
        geocoder.geocode({ address: address }, (results, status) => {
            if (status === "OK") {
                resolve(results[0].geometry.location)
            } else {
                alert(
                    "Geocode was not successful for the following reason: " + status
                );
            }
        });
    })
}



function createMarkers(places, map) {
    console.log(places)
    const bounds = new google.maps.LatLngBounds();
    const placesList = document.getElementById("places");

    var dialog = document.querySelector('dialog');
    if (!dialog.showModal) {
        dialogPolyfill.registerDialog(dialog);
    }


    for (let i = 0, place; (place = places[i]); i++) {
        let address = `https://www.google.com/maps/search/?api=1&query=${place.vicinity}&query_place_id=${place.place_id}`
        let close = `<button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
        id="close">
        Close
    </button>`;
        let text = `<div style="text-align: center;"><h3>${place.name}</h3><h4>${place.vicinity}</h4><a href="${address}"><h5>View on Google Maps<h5/></a>${close}</div>`
        const image = {
            url: '/img/Marker.jpg',
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25),
        };
        new google.maps.Marker({
            map,
            icon: image,
            title: place.name,
            position: place.geometry.location,
        }).addListener("click", () => {
            dialog.innerHTML = "";
            dialog.innerHTML = text;
            dialog.showModal();

            const closeButton = document.getElementById("close");
            closeButton.addEventListener("click",()=>{dialog.close()})
        });
        const li = document.createElement("li");
        li.textContent = place.name;
        li.addEventListener("click", () => {
            dialog.innerHTML = "";
            dialog.innerHTML = text;
            dialog.showModal();

            const closeButton = document.getElementById("close");
            closeButton.addEventListener("click",()=>{dialog.close()})
        })
      
        placesList.appendChild(li);
        bounds.extend(place.geometry.location);

    }
    map.fitBounds(bounds);
}