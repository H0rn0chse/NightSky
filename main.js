const background = document.querySelector("#nightSky");

const densityInput = document.querySelector("#density");
densityInput.addEventListener("change", (evt) => {
    background.setAttribute("density", densityInput.value);
});

const layerInput = document.querySelector("#layer");
layerInput.addEventListener("change", (evt) => {
    background.setAttribute("layers", layerInput.value);
});

const velocityInput = document.querySelector("#velocity");
velocityInput.addEventListener("change", (evt) => {
    background.setAttribute("velocity", velocityInput.value);
});

const starcolorInput = document.querySelector("#starcolor");
starcolorInput.addEventListener("change", (evt) => {
    background.setAttribute("starcolor", starcolorInput.value);
});
