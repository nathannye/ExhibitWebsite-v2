import mapboxgl from "mapbox-gl";

let container = document.getElementById("galleryMap");

window.onload = () => {
  mapboxgl.accessToken =
    "pk.eyJ1IjoibnllLTExIiwiYSI6ImNsMG9zeGRuOTE4MHMza3Rrcm5qcjVoZzgifQ.gB3lktc24CQYcAauqQ40Fw";
  const map = new mapboxgl.Map({
    container: container,
    center: [-85.47859669797005, 43.68930899669416],
    pitch: 35,
    zoom: 16,
    style: "mapbox://styles/nye-11/cl0oszoxn000d14teqidfpqqn",
  });

  const marker = new mapboxgl.Marker();
  marker.setLngLat([-85.47859669797005, 43.68930899669416]);
  marker.addTo(map);
  // marker.color("#FABC13");

  map.scrollZoom.disable();
};
