const mapcenter = document.querySelector('#map')

var map = L.map('map').fitWorld()

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap',
}).addTo(map)

map.locate({ setView: true, maxZoom: 16 })

var marker = L.marker([51.5, -0.09]).addTo(map)

var popup = L.popup()
  .setLatLng([51.513, -0.09])
  .setContent('I am a standalone popup.')
  .openOn(map)

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent('You clicked the map at ' + e.latlng.toString())
    .openOn(map)
}

map.on('click', onMapClick)

function onLocationFound(e) {
  var radius = e.accuracy

  L.marker(e.latlng)
    .addTo(map)
    .bindPopup('You are within ' + radius + ' meters from this point')
    .openPopup()

  L.circle(e.latlng, radius).addTo(map)
}

map.on('locationfound', onLocationFound)

function onLocationError(e) {
  alert(e.message)
}

map.on('locationerror', onLocationError)

const input = document.querySelector('#input')
const Locate = document.querySelector('#location')
const ipAddress = document.querySelector('#ip-address')
const Isp = document.querySelector('#isp')
const Timezone = document.querySelector('#timezone')
const ipForm = document.querySelector('#ip-form')
window.addEventListener('DOMContentLoaded', getLocation)
ipForm.addEventListener('submit', getIP)
function getLocation() {
  fetch('https://ipinfo.io/json?token=46112bde19c58c')
    .then((response) => response.json())
    .then((data) => {
      input.value = data.ip
      ipAddress.textContent = data.ip
      Locate.textContent = `${data.city},  ${data.country}`
      Timezone.textContent = data.timezone
      Isp.textContent = data.org
    })
    .catch((Error) => console.log(Error))
}

function getIP(e) {
  e.preventDefault()
  let ip = input.value.trim()
  if (!ip) {
    return
  }
  fetch(`https://ipinfo.io/${ip}/json?token=46112bde19c58c`)
    .then((response) => response.json())
    .then((data) => {
      ipAddress.textContent = data.ip
      Locate.textContent = `${data.city},  ${data.country}`
      Timezone.textContent = data.timezone
      Isp.textContent = data.org
    })
    .catch((Error) => console.log(Error))
}
