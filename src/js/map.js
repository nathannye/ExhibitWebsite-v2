let container = document.getElementById("galleryMap");
// let markerAdd = document.getElementById("mapMarker");

mapboxgl.accessToken =
  "pk.eyJ1IjoibnllLTExIiwiYSI6ImNsMG9zeGRuOTE4MHMza3Rrcm5qcjVoZzgifQ.gB3lktc24CQYcAauqQ40Fw";
var map = new mapboxgl.Map({
  container: container,
  center: [-85.47859669797005, 43.68930899669416],
  pitch: 35,
  zoom: 16,
  style: "mapbox://styles/nye-11/cl0oszoxn000d14teqidfpqqn",
});

const attr = new mapboxgl.AttributionControl({
  customAttribution: "",
});

const nav = new mapboxgl.NavigationControl({
  anchor: "bottom-right",
  showCompass: false,
});

map.addControl(nav, "bottom-right");
map.setLngLat([-85.47859669797005, 43.68930899669416]);
map.addTo(map);

const marker = new mapboxgl.Marker({
  color: colors.ylw,
  anchor: "center",
});
