// Type definitions for [bg-canvases] [v1.1.7]

export as namespace Background;

import Layer = require('./Layer');

export = Background;
type animation = (f: object, i: number, figures: object, ctx: CanvasRenderingContext2D, id: any) => void;
type creator = (i: number, layerId: string, quantity: number) => any;
type simpleApply = (figures: object, ctx: CanvasRenderingContext2D, id: any) => void;
type each = (figure: object, i: number) => void;
type callback = (i: number) => void;

declare class Background {
    constructor();

    /** 
     * Layers collection
     */
    layers: Object;
    /**
     * Creates figures layer. Returns Layer.
     * @param layerId Layer id. Layer with same id will be overwritten.
     * @param ctx CanvasRenderingContext2D
     * @param figureCreator Function (i: number, layerId: string, quantity: number) => Figure
     * @param quantity Figures quantity: Optional (Default 1)
     * @param animation Animation Function (f: object, i: number, figures: object, ctx: CanvasRenderingContext2D, id: any) => void;
     * ctx: CanvasRenderingContext2D, id: any);
     */
    createLayer(layerId: string, ctx: CanvasRenderingContext2D, figureCreator?: creator, quantity?: number, animation?: animation): Layer;

    /**
     * Returns Layer.
     * @param layerId Layer id
     */
    getLayer(layerId: string): Layer;

    /**
     * Sets animation function to specific layer or to all layers. Returns itself.
     * @param animation Animation Function (f: object, figures: object,
     * ctx: CanvasRenderingContext2D, id: any);
     * @param layerId Layer id. Optional
     */
    setAnimation(animation: animation, layerId?: string): Background;

    /**
     * Sets rendering context to specific layer or to all layers. Returns itself.
     * @param ctx CanvasRenderingContext2D 
     * @param layerId Layer id. Optional
     */
    setContext(ctx: CanvasRenderingContext2D, layerId: string): Background;
    /**
    * Removes layer. Returns itself.
    * @param layerId Layer id
    */
    removeLayer(layerId: string): Background;

    /**
    * Make layer active. Returns itself.
    * @param layerId Layer id
    */
    start(layerId?: string): Background;

    /**
    * Make layer inactive. Returns itself.
    * @param layerId Layer id
    */
    stop(layerId?: string): Background;

    /**
    * Applyies function to specific layer or to all layers. Returns itself.
    * @param func Function (figures: object, ctx: CanvasRenderingContext2D, id: any) => void;
    * @param layerId Layer id. Optional.
    */
    apply(func: simpleApply, layerId?: string): Background;

    /**
    * Applyies function to all figures on specific layer or on all layers. Returns itself.
    * @param func Function (f: object, i: number) => void;
    * @param layerId Layer id. Optional.
    */
    applyOnEach(func: each, layerId?: string): Background;

    /**
    * Animates all layers or specific layer Returns itself.
    * @param layerId Layer id. Optional.
    */
    animate(layerId?: string): Background;

    /**
    * Renders all layers or specific layer Returns itself.
    * @param layerId Layer id. Optional.
    */
    draw(layerId?: string): Background;

    /**
    * Draws frame from pre-rendered stack. Returns itself.
    * @param fame Frame number
    */
    drawFrame(frame: number): Background;

    /**
    * Pre-renders number of frames. Returns itself.
    * @param fame Number of frames.
    * @param cb Callback.
    * @param cbEvery Callback will be called every _ frame.
    * @param draw Will be frame renders while pre-rendering
    * @param save Will be initial state of layers saved
    */
    preRender(frames: number, cb?: callback, cbEvery?: number, draw?: boolean, save?: boolean): Background;

    /**
    * Hides all layers or layer with specific id.
    * @param layerId Layer id. Optional.
    */
    hide(layerId?: string): Background;

    /**
    * Shows all layers or layer with specific id.
    * @param layerId Layer id. Optional.
    */
    show(layerId?: string): Background;

}
