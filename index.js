let locationButton = document.getElementById("get-location");
let locationDiv = document.getElementById("location-details");
let clearData = document.getElementById("clear-data");

locationButton.addEventListener("click", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showLocation, checkError)

    } else {
        locationDiv.innerText = "The browser does not support geo locaton"
    }
});

clearData.addEventListener("click", () =>{
    locationDiv.innerText = "Click on the 'Get Location' Button to view your location";
})

const checkError = (error) =>{
    switch(error.code){
        case error.PERMISSION_DENIED:
            locationDiv.innerText = "Please allow access to know your location";
        break;
        case error.POSITION_UNAVAILABLE:
            locationDiv.innerText = "Location info unavailable"
        break;
        case error.TIMEOUT:
            locationDiv.innerText = "Timed out";
        break;
        case error.UNKNOWN_ERROR:
            locationDiv.innerText = "Unkown error occured!";
        break;
    }

}

const showLocation = async (position) => {
    let response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
    );
    let data = await response.json();
    locationDiv.innerText = `${data.address.state_district}, ${data.address.state}, ${data.address.country}`;
};