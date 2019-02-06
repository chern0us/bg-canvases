# bg-canvases
Tool for creating animated backgrounds on HTML 5 canvases.
<<<<<<< HEAD
# Contents
1. [**Preparing**](#Preparing)
1.1 [Installation](#Installation)
1.2 [Basic HTML with HTML5 Canvases](#Basic_HTML_with_HTML5_Canvases)
1.3 [Figures](#Figures)
2. [**Example**](#Example)
2.1 [CSS](#CSS)
2.2 [JS](#JS)
2.3 [Result](#Result)
3. [**API**](#API)
3.1. [**Setting and creating layers**](#Setting_and_creating_layers)
-- [Background](#new_Background())
-- [createLayer](#createLayer(ctx,_layerId,_figureCreator,_quantity,_animation))
-- [getLayer](#getLayer(layerId))
-- [removeLayer](#removeLayer(layerId))
3.2 [**Animation and drawing**](#Animation_and_draing)
-- [setAnimation](#setAnimation(layerId,_animation))
-- [draw](#draw(layerId))
-- [animate](#animate(layerId))
-- [hide](#hide(layerId))
-- [show](#show(layerId))
-- [stop](#stop(layerId))
-- [start](#start(layerId))
3.3 [**Functions**](#Functions)
-- [apply](#apply(func,_layerId))
-- [applyOnEach](#applyOnEach(func,_layerId))
3.4 [**Pre-rendering frames**](#Pre-rendering_frames)
-- [preRender](#preRender(framesQuantity,_cb,_cbEvery,_draw,_save))
-- [drawFrame](#drawFrame(frame))
3.5 [**Demo**](#Demo)
## Demo
[![Focus](https://media.giphy.com/media/ftdko2SkF087TJc0eD/200w_d.gif)](https://nk8kr6lo1j.codesandbox.io/) 
[![Edit Focus](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/nk8kr6lo1j)
[![Torch](https://media.giphy.com/media/PhGuxEczcA9bTQkbm4/200w_d.gif)](https://6zkxmq16qz.codesandbox.io/)
[![Edit Torch ](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/6zkxmq16qz)
[![Rewind](https://media.giphy.com/media/2kTJcpU8a3tYYRd2CW/200w_d.gif)](https://2x9k4zqn3r.codesandbox.io/)
[![Edit  Rewind](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/2x9k4zqn3r)
=======
>>>>>>> 5619e72f43050b55353bbe302fe81308f9cd22f1
## Preparing
#### Installation
```sh
$ npm install bg-canvases
<<<<<<< HEAD
```
or
```sh
$ yarn add bg-canvases
```

#### Basic HTML with HTML5 Canvases
You need `HTML5 Canvas`. In this example we have 2 canvases:
```html
=======

or

$ yarn add bg-canvases
```
#### Basic HTML 
>>>>>>> 5619e72f43050b55353bbe302fe81308f9cd22f1
<!doctype html>
<html lang="en">
   <head>
      <meta charset="utf-8">
<<<<<<< HEAD
      <title>Demo</title>
=======
      <title>The HTML5 Herald</title>
>>>>>>> 5619e72f43050b55353bbe302fe81308f9cd22f1
      <meta name="description" content="The HTML5 Herald">
      <meta name="author" content="SitePoint">
      <link rel="stylesheet" href="css/styles.css?v=1.0">
   </head>
   <body>
      <canvas id="layer1" class="canvas"></canvas>
      <canvas id="layer2" class="canvas"></canvas>
      <script src="js/scripts.js"></script>
   </body>
</html>
<<<<<<< HEAD
```
#### Figures
You want to draw figures on the canvas, so you must have classes for these figures. There are certain requirements for classes:
- An instance of a class must have a `visibility` parameter:
    ```javascript
    visible; // Draw method will be called if visible === true;
    ```
- It must have draw method with canvas context parameter:
    ```js
    draw(ctx) {
        // Something drawing on ctx
        return this;
    }
    ```
    
Proper prototype example:
```js
class Circle {
    constructor(x, y, radius) {
        this.x = x;
        this.y = y;
        this.r = radius;
        this.visible = true; // Visibility parameter
        // Anything else
    }
    // A red circle with radius r will be drawn in point [x, y]
    draw(ctx) {
        ctx.save();
        const { x, y, r } = this;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2, false);
        ctx.strokeStyle = 'red';
        ctx.fillStyle = 'red';
        ctx.stroke();
        ctx.fill();
        ctx.restore();
        return this;
    }
    // Anything else
```
## Exapmle
Example of usage.
#### CSS
Some basic style for canvas:
```css
canvas {
	overflow: hidden; 
	top: 1;
	left: 1;
	width: 500px;
	height: 250px;
    outline: cadetblue 2px solid;
}
```
#### JS
```js
import Circle from './Circle';          // Importing figure class
import Background from 'bg-canvases';   // Importing this

// Get canvases from dom
const purple = document.getElementById('layer1'),
    red = document.getElementById('layer2');

// Get contexts
const ctxPurple = purple.getContext('2d'),
    ctxRed = red.getContext('2d');
    
// Setting width and height of canvases
// Don't forget to scale your canvases for screen pixel density

const width = 500,
    height = 250;

// Creating Background
const bg = new Background();

// Figure creator function 
const creator = (blueLvl) => (i) => {
    const radius = 25,
        x = width / 2,
        y = height / 2,
        speed = i + 1 / 2,
        color = `rgb(${255 - ((i + 1) * 30)}, 50, ${blueLvl})`;
    //* Creator function has parameter i (iteration), and must return new instance of Figure *//
    return new Circle(x, y, radius, speed, speed, color);
}
// Animation function
const animation = (param, options) => (f) => {
    if (f[options.axis] + f.radius >= param
        || f[options.axis] - f.radius <= 0) {
        // Change direction if circle touches border
        f[options.setDirect](-f[options.direct]);
    } f[options.setter](f[options.axis] + f[options.direct]);
}
// Creating animation functions for x axis and y axis
const xAnimation = animation(width, {
    axis: 'x',
    setter: 'setX',
    direct: 'dx',
    setDirect: 'setDx',
});
const yAnimation = animation(height, {
    axis: 'y',
    setter: 'setY',
    direct: 'dy',
    setDirect: 'setDy',
});

// Creating layers
bg.createLayer(ctxPurple, 'purple', creator(255), 5, xAnimation);
bg.createLayer(ctxRed, 'red', creator(0), 3, yAnimation);

// Animating
const animate = () => {
    bg.animate().draw();
    window.requestAnimationFrame(animate);
};
window.requestAnimationFrame(animate);
```
#### Result
![Demo1](https://media.giphy.com/media/9xv3xSOsxJKJ576JwA/giphy.gif)
```js
purple.style.position = 'absolute'; // Makes canvases lay one above other 
red.style.position = 'absolute'; 
```

![Demo2](https://media.giphy.com/media/88j2PtryNwZPfZPfFT/giphy.gif)

```js
bg.stop('purple'); // Stop purple layer
```
![Demo3](https://media.giphy.com/media/u46yLYWRADgeTl9jsQ/giphy.gif)

```js
bg.start(); // Start all animations
bg.hide('red'); // Hiding red layer
```
![Demo4](https://media.giphy.com/media/mupaXcvFtLDn5mnqf9/giphy.gif)
```js
bg.show('red'); // Make red visible again
bg.setAnimation('purple', yAnimation); // Changing purple animation t yAnimation 
```
![Demo5](https://media.giphy.com/media/fMzwhY3qghw4u6u5O7/giphy.gif)

## API
### Setting and creating layers
##### new Background()
Creates new bg-canvases object.

```js
const bg = new Background();
```
##### createLayer(ctx, layerId, figureCreator, quantity, animation)
Creates instance of Layer inside Background.
Parameters:
* `ctx` -- Canvas drawing context
* `layerId` -- Layer ID
* `figureCreator(i)` -- Function that creates figure [`i` - iteratee]
* `quantity` -- A number of figures that will be created
* `animation(f, figures, ctx, layerId)` -- Animation function that will be called with every figures in layer [`f` - figure, `figures` - figures on layer, `ctx` - context, `layerId` -layer id]

```js
bg.createLayer(ctx, 'myLayer', (i) => new Figure(i)); 
/* Creates layer 'myLayer' with 1 figure Figure and without animation' */

bg.createLayer(ctx, 'anotherLayer', (i) => new AnotherFigure(i), 20);
/* Creates layer 'anotherLayer' with 20 AnotherFigure's and without animation */

const myAnimation = (f, figures, ctx, id) => {
    // Do something with figure f 
};
bg.createLayer(ctx, 'animatedLayer', (i) => new Figure(i), 20, myAnimation);
/* Creates layer 'animatedLayer' with 20 Figure's and animation */
```
##### getLayer(layerId)
Returns layer.

```js
bg.getLayer('animatedLayer'); // => Returns instance of Layer with id 'animatedLayer'
```
##### removeLayer(layerId)
Removes layer.
```javascript
bg.getLayer('animatedLayer'); // => {...}
bg.removeLayer('animatedLayer');
bg.getLayer('animatedLayer'); // => undefined
```
### Animation and drawing
##### setAnimation(layerId, animation)
Sets animation function.
```javascript
bg.setAnimation('myLayer', myAnimation);
// or 
// bg.getLayer('myLayer').setAnimation(myAnimation);
```
##### draw(layerId)
Draws all visible figures, an all visible layers, on their contexts, or layer with selected id;
```javascript
bg.draw(); // All visible layers have been rendered
bg.draw('myLayer'); // 'myLayer' has been rendered
// or
// bg.getLayer('myLayer').draw();
```

##### animate(layerId)
Animates all active layers, by applying layer's animation function to all figures on layer, or animates layer with selecter id.
```javascript
bg.animate(); // All active layers have been animated
bg.animate('myLayer'); // 'myLayer' has been animated
// or
// bg.getLayer('myLayer').animate(); 
bg.animate().draw(); // All active layers have been animated and all visible are rendered
```
##### hide(layerId)
Makes layer with selected id invisible.
```js
bg.hide('myLayer'); // 'myLayer' is now invisible and won't be rendered;
bg.hide(); // All layers is now invisible
```
##### show(layerId)
Makes layer with selected id visible.
```js
bg.show('myLayer'); // 'myLayer' is now visible and will be rendered;
bg.show(); // All layers is now visible
```
##### stop(layerId)
Make layer with selected id inactive.
```js
bg.stop('myLayer'); // 'myLayer' is now inactive and won't be animated
bg.stop(); // All layers is now inactive
```
##### start(layerId)
Make layer with selected id active.
```js
bg.start('myLayer'); // 'myLayer' is now inactive and will be animated
bg.start(); // All layers is now active
```
### Functions
##### apply(func, layerId)
Applies a function to the selected layer's figures object or to all layers' figures object.
* `func(figures, ctx, layerId)` -- Function with parametres [`figures` - figures on layer, `ctx` - layer context, `layerId` - layer id]
* `layerId` -- layer id
```js
const someFunction = (figures, ctx, layerId) => {
    // Do something with figures, context, layerId
}
bg.apply(someFunction, 'myLayer'); // someFunction will be applied to figures on 'myLayer'
bg.apply(someFunction); //  someFunction will be applied to figures on all layers
```
##### applyOnEach(func, layerId)
Applies a function to each figure on selected layer or to each figure on all layers.
* `func(f, i)` -- Function with parametres [`f` - figure on layer, `i` - iteratee]
* `layerId `-- layer id
```js
const someFunction = (figure, i) => {
    // Do something with figure
}
bg.applyOnEach(someFunction, 'myLayer'); // someFunction will be applied to each figure on 'myLayer'
bg.applyOnEach(someFunction); //  someFunction will be applied to each figure on all layers
```
### Pre-rendering frames
##### preRender(framesQuantity, cb, cbEvery, draw, save)
Prepare frames to render. That pre-renders selected quantity of frames, by animating itself. 
* `framesQuantity` -- quantity of frames that will be prepared
* `cb(i)` -- callback function [`i` -- iteratee]
* `cbEvery` -- That process takes time and CPU resources so you have to select how often you want to pause it and do callback, like `cbEvery = 100`
* `draw` -- will be Background render while preRendering [`true`/`false`] 
* `save` -- will be initial state of Background saved [`true`/`false`]
```js
bg.preRender(1000, (i) => { /* do something */ }, 100, true);
// That will pre-render 1000 frames with callback and drawing it every 100 frame

bg.preRender(1000, (i) => { /* do something */ }, 100, false, true);
// That will pre-render 1000 frames with callback every 100 frame, without drawing, the initian state will be saved, like there's wasn't any animation function calls on layers 

bg.preRender(1000, (i) => { /* do something */ });
// That will pre-render 1000 frames without any pausing for callback, so callback will be called only at the end
// same as
// bg.preRender(1000);
// (999) => { /* do something */ }();

```
##### drawFrame(frame)
Renders selected frame.
```js
bg.preRender(1000);

bg.drawFrame(0); // => First frame renders
bg.drawFrame(999); // => Last frame renders
```

=======
>>>>>>> 5619e72f43050b55353bbe302fe81308f9cd22f1
