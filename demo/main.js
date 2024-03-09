const background = document.querySelector("#nightSky");

const densityInput = document.querySelector("#density");
densityInput.addEventListener("change", (evt) => {
    background.setAttribute("density", densityInput.value);
});

const layerInput = document.querySelector("#layer");
layerInput.addEventListener("change", (evt) => {
    background.setAttribute("layers", layerInput.value);
});

const velocityXSlider = document.querySelector("#velocityX-slider");
const velocityXInput = document.querySelector("#velocityX-input");

velocityXSlider.addEventListener("change", (evt) => {
    background.setAttribute("velocity-x", velocityXSlider.value);
    velocityXInput.value = velocityXSlider.value;
});
velocityXInput.addEventListener("change", (evt) => {
    background.setAttribute("velocity-x", velocityXInput.value);
});

const velocityYSlider = document.querySelector("#velocityY-slider");
const velocityYInput = document.querySelector("#velocityY-input");

velocityYSlider.addEventListener("change", (evt) => {
    background.setAttribute("velocity-y", velocityYSlider.value);
    velocityYInput.value = velocityYSlider.value;
});
velocityYInput.addEventListener("change", (evt) => {
    background.setAttribute("velocity-y", velocityYInput.value);
});

const starcolorInput = document.querySelector("#starcolor");
starcolorInput.addEventListener("change", (evt) => {
    background.setAttribute("starcolor", starcolorInput.value);
});

// Initial values
background.setAttribute("density", densityInput.value);
background.setAttribute("layers", layerInput.value);
background.setAttribute("velocity-x", velocityXSlider.value);
velocityXInput.value = velocityXSlider.value;
background.setAttribute("velocity-y", velocityYSlider.value);
velocityYInput.value = velocityYSlider.value;
background.setAttribute("starcolor", starcolorInput.value);
