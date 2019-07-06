const weatherUrl = 'http://localhost:3000/weather?'
const searchForm = document.getElementById('searchForm')
const country = document.getElementById('ctry')
const city = document.getElementById('city')
const lat = document.getElementById('lat')
const lon = document.getElementById('lon')
const frc = document.getElementById('frc')
const rain = document.getElementById('rain')
const err = document.getElementById('err')

searchForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const fullUrl = weatherUrl + 'country=' + country.value + '&city=' + city.value
    fetch(fullUrl).then((response) => {
        response.json().then((data) => {
            if (data.Error) {
                err.textContent = data.Error
                lat.textContent = null
                lon.textContent = null
                frc.textContent = null
                rain.textContent = null
            } else {
                err.textContent = null
                lat.textContent = `The Latitude is ${data.latitude}.`
                lon.textContent = `The Longitude is ${data.longitude}`
                frc.textContent = `The forecast is ${data.conditon}`
                rain.textContent = `The Chances of rain ${data.rainchances}`
            }

        })
    })
})