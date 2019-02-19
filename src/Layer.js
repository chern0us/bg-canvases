// Useful functions from Lodash
import forEach from 'lodash/forEach';
import find from 'lodash/find';
import cloneDeep from 'lodash/cloneDeep';
// import omit from 'lodash/omit';

// Export class
export default class Layer {
  constructor(id, ctx, figures, animation, visible = true, active = true) {
    this.id = id; // Layer id
    this.ctx = ctx; // Layer context
    this.figures = figures; // Layer figures
    this.animation = animation; // Layer animation
    this.visible = visible; // Is layer visible
    this.active = active; // Is layer active
  }

  // Make layer visible
  show() {
    this.visible = true;
    return this;
  }

  // Make layer invisible
  hide() {
    this.visible = false;
    this.clear();
    return this;
  }

  // Make layer active
  start() {
    this.active = true;
  }

  // Make layer inactive
  stop() {
    this.active = false;
  }

  // Set animation function
  setAnimation(animation) {
    this.animation = animation;
  }

  // Sets context
  setContext(ctx) {
    this.ctx = ctx;
  }

  // Call animation finction
  animate() {
    const {
      ctx, figures, animation, id,
    } = this;
    forEach(figures, (f, i) => animation(f, i, figures, ctx, id));
    return this;
  }

  // Applying function to each figure in layer
  applyOnEach(func) {
    forEach(this.figures, func);
  }

  // Applying function to all figures
  apply(func) {
    const {
      ctx, figures, id,
    } = this;
    func(figures, ctx, id);
  }

  // Draw layer
  draw() {
    forEach(this.figures, (figure) => {
      // If figure is visible
      if (figure.visible) { figure.draw(this.ctx); }
    });
  }

  // Find figure by id
  getFigure(id) {
    return find(this.figures, figure => figure.id === id);
  }

  // Request frames for rendering
  requestFrames(frames, adder, cb, callbackEvery = frames, drawable = false) {
    const buffer = {};
    let i = 0;


    let timeout;

    // Clear timeout
    const stopProcessing = () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
    // Render next
    const doStep = () => {
      // Requesting next state for this layer
      const { figures, clear, draw } = cloneDeep(this.animate());
      buffer[i] = {
        ...this,
        figures,
        clear,
        draw,
      };

      i += 1; // Increment

      if (i <= frames) {
        // If this iteraton must call callback
        if (i % callbackEvery === 0) {
          if (cb) { // If callback provided call it
            cb(i);
          }
          // If layer must be drawn while callback
          if (drawable) {
            this.clear();
            this.draw();
          }
          // Timeout for callback to be completed and do next step
          timeout = setTimeout(doStep);
        } else {
          // If no callback function do next step
          doStep();
        }
      } else {
        // When ended clear timeout
        stopProcessing();
        // Add buffer to rendered
        adder(buffer);
      }
    };
    // Begin
    doStep();
  }

  // Clear canvas
  clear() {
    const { ctx } = this;
    const { width, height } = ctx.canvas;
    ctx.clearRect(0, 0, width, height);
  }
}
