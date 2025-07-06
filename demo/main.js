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
    velocityXSlider.value = velocityXInput.value;
});

const velocityYSlider = document.querySelector("#velocityY-slider");
const velocityYInput = document.querySelector("#velocityY-input");

velocityYSlider.addEventListener("change", (evt) => {
    background.setAttribute("velocity-y", velocityYSlider.value);
    velocityYInput.value = velocityYSlider.value;
});
velocityYInput.addEventListener("change", (evt) => {
    background.setAttribute("velocity-y", velocityYInput.value);
    velocityYSlider.value = velocityYInput.value;
});

const starShapeInput = document.querySelector("#starshape");
starShapeInput.addEventListener("change", (evt) => {
    background.setAttribute("star-shape", starShapeInput.value);
});

const starColorInput = document.querySelector("#starcolor");
starColorInput.addEventListener("change", (evt) => {
    background.setAttribute("star-color", starColorInput.value);
});

const bgColorInput = document.querySelector("#bgcolor");
bgColorInput.addEventListener("change", (evt) => {
    background.setAttribute("background-color", bgColorInput.checked ? "transparent" : "");
});

// Initial values
background.setAttribute("density", densityInput.value);
background.setAttribute("layers", layerInput.value);
background.setAttribute("velocity-x", velocityXSlider.value);
velocityXInput.value = velocityXSlider.value;
background.setAttribute("velocity-y", velocityYSlider.value);
velocityYInput.value = velocityYSlider.value;
background.setAttribute("star-shape", starShapeInput.value);
background.setAttribute("star-color", starColorInput.value);
background.setAttribute("background-color", bgColorInput.checked ? "transparent" : "");

