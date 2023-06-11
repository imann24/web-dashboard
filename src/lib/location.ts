export const requestLocation = (successCallback: PositionCallback) => {
    const errorCallback = (error: GeolocationPositionError) => console.log(error)
      
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback); 
}
