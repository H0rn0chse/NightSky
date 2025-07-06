# NightSky

This WebComponent is inspired by the CodePen [Parallax Star background in CSS](https://codepen.io/saransh/pen/BKJun) from [Saransh Sinha](https://codepen.io/saransh). Since this is a WebComponent it can be easily integrated in any React or Vue app. Check out the [live demo](https://h0rn0chse.github.io/NightSky).

- [Libraries](#libraries)
- [Usage](#usage)
- [Documentation](#documentation)

<p align="center">
    <img src="./assets/animation.gif" />
</p>

## Libraries

- Approach [Parallax Star background in CSS](https://codepen.io/saransh/pen/BKJun)
- Font [Google Font Poppins](https://fonts.google.com/specimen/Poppins)
  - Fetched via [github.com/majodev/google-webfonts-helper](https://github.com/majodev/google-webfonts-helper)
- Feather Icons [github.com/feathericons/feather](https://github.com/feathericons/feather)
- Github Corners [github.com/YuskaWu/github-corner-element](https://github.com/YuskaWu/github-corner-element)

## Usage

Please checkout the [demo](https://h0rn0chse.github.io/NightSky). You can add the resources either locally or via a CDN (or as [npm package](https://www.npmjs.com/package/@h0rn0chse/night-sky)):

```html
<script src="https://unpkg.com/@h0rn0chse/night-sky/dist/bundle.min.js"></script>
```

You can add the background as WebComponent.

```html
<night-sky
  id="nightSky"
  layers="4"
  density="30"
  velocity-x="60"
  velocity-y="60"
  star-shape="circle"
  star-color="#FFF"
  background-color="transparent"
>
</night-sky>
```

You have to set a size on the background.

```css
#nightSky {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
```

## Documentation

The WebComponent allows for some customizations via its attributes:

### layers

The amount of `layers` provided as positive integer.

### density

`density` describes the amount of stars in the first layer in screen with 192x1080px. Each additional layer doubles the amount of stars. It should be provided as positive integer.

### velocity-x

`velocity-x` describes the speed of the last layer. Each layer above moves with nth time of this speed. It should be
provided as positive or negative integer.

### velocity-y

`velocity-y` describes the speed of the last layer. Each layer above moves with nth time of this speed. It should be
provided as positive or negative integer.

### star-shape

`star-shape` defines the shape of the individual shapes. Available shapes;

- `square` (default)
- `circle`

### star-color

`star-color` is the color of the star. It should be provided as valid css color.

### background-color

`background-color` currently only supports the value `transparent` to disable the predefined background.
