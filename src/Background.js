// Useful functions from Lodash
import omit from 'lodash/omit';
import forEach from 'lodash/forEach';
import noop from 'lodash/noop';
import cloneDeep from 'lodash/cloneDeep';

// Import Layer
import Layer from './Layer';

// Clear and redraw layer
const reDraw = (cleared, layer) => {
  if (layer.visible) {
    const { ctx } = layer;

    const { canvas } = ctx;

    const { id } = canvas;
    if (!cleared.has(id)) {
      layer.clear();
      cleared.add(id);
    }
    layer.draw();
  }
};

// Export class
export default class Background {
  constructor() {
    this.layers = {}; // Layers
    this.rendered = {}; // Rendered frames
    this.createLayer = this.createLayer.bind(this);
  }

  createLayer(layerId, ctx, figureCreator = noop, quantity = 1, animation = noop) {
    let figures = {};
    for (let i = 0; i < quantity; i += 1) {
      figures = {
        ...figures, [i]: figureCreator(i, layerId, quantity),
      };
    }
    this.layers = {
      ...this.layers,
      [layerId]: new Layer(layerId, ctx, figures, animation),
    };
    return this.layers[layerId];
  }

  // Return layer by id
  getLayer(layerId) {
    return this.layers[layerId];
  }

  // Removes layer
  removeLayer(layerId) {
    this.layers = omit(this.layers, layerId);
    return this;
  }

  // Set animation for layer or all layers
  setAnimation(animation, layerId) {
    if (layerId) {
      this.layers[layerId].setAnimation(animation);
    } else {
      forEach(this.layers, layer => layer.setAnimation(animation));
    }
    return this;
  }

  // Set rendering context for layer or all layers
  setContext(ctx, layerId) {
    if (layerId) {
      this.layers[layerId].setContext(ctx);
    } else {
      forEach(this.layers, layer => layer.setContext(ctx));
    }
    return this;
  }

  // Calls animation function for every layer
  animate(layerId) {
    if (layerId) { this.layers[layerId].animate(); return this; }
    forEach(this.layers, (layer) => {
      if (layer.active) layer.animate();
    });
    return this;
  }

  // Pre render frames and stores in rendered
  preRender(frames, cb, cbEvery, draw = false, save = false) {
    const copy = cloneDeep(this.layers); // Copy initial state
    forEach(this.layers, (layer) => {
      // Add frames to rendered
      const adder = (renderedFrames) => {
        this.rendered = {
          ...this.rendered,
          [layer.id]: renderedFrames,
        };
      };
      // Make render request
      layer.requestFrames(frames, adder, cb, cbEvery, draw);
    });
    // If initial state saving is requared, restoring it
    if (save) { this.layers = copy; }
    return this;
  }

  // Draw frame from rendered
  drawFrame(frame) {
    const buffers = this.rendered;
    const cleared = new Set();
    forEach(buffers, stock => reDraw(cleared, stock[frame]));
    return this;
  }

  // Draw every layer
  draw(layerId) {
    const cleared = new Set();
    if (layerId) { reDraw(cleared, this.layers[layerId]); return this; }
    forEach(this.layers, layer => reDraw(cleared, layer));
    return this;
  }

  // Hide all or layer with id
  hide(layerId) {
    if (layerId) { this.layers[layerId].hide(); return this; }
    forEach(this.layers, l => l.hide());
    return this;
  }

  // Show all or layer with id
  show(layerId) {
    if (layerId) { this.layers[layerId].show(); return this; }
    forEach(this.layers, l => l.show());
    return this;
  }

  // Activate all or layer with id
  start(layerId) {
    if (layerId) { this.layers[layerId].start(); return this; }
    forEach(this.layers, l => l.start());
    return this;
  }

  // Deactivate all or layer with id
  stop(layerId) {
    if (layerId) { this.layers[layerId].stop(); return this; }
    forEach(this.layers, l => l.stop());
    return this;
  }

  // Apply function to all figures an all layers or layer with Id;
  apply(func, layerId) {
    if (layerId) { this.layers[layerId].apply(func); return this; }
    forEach(this.layers, l => l.apply(func));
    return this;
  }

  // Apply function to each figures an all layers or layer with Id;
  applyOnEach(func, layerId) {
    if (layerId) { this.layers[layerId].applyOnEach(func); return this; }
    forEach(this.layers, l => l.applyOnEach(func));
    return this;
  }

  get layers() {
    return this.layers;
  }
}
