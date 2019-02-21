type animation = (f: object, i: number, figures: object, ctx: CanvasRenderingContext2D, id: any) => void;
type creator = (i: number, layerId: string, quantity: number) => any;
type simpleApply = (figures: object, ctx: CanvasRenderingContext2D, id: any) => void;
type each = (figure: object, i: number) => void;
type callback = (i: number) => void;
declare class Layer {
    constructor(id: string, ctx: CanvasRenderingContext2D,
        figures: object, animation: animation, visible?: boolean, active?: boolean);

    /**
     * Make layer visible.
     */
    show(): Layer;

    /**
     * Make layer invisible.
     */
    hide(): Layer;

    /**
     * Make layer active.
     */
    start(): Layer;

    /**
     * Make layer inactive.
     */
    stop(): Layer;

    /**
     * Set animation function to layer.
     * @param animation (f: object, i: number, figures: object, ctx: CanvasRenderingContext2D, id: any) => void;
     */
    setAnimation(animation: animation): Layer;

    /**
     * Set context to layer .
     * @param ctx CanvasRenderingContext2D
     */
    setContext(ctx: CanvasRenderingContext2D): Layer;

    /**
     * Animate layer.
     */
    animate(): Layer;

    /**
     * Returns figure with this id
     * @param id Figure's is;
     */
    getFigure(id: string): Object;
    /**
     * Applying function to each figure in layer
     * @param func (figure: object, i: number) => void;
     */
    applyOnEach(func: each): Layer;

    /**
     * Applying function to all figures
     * @param func (figures: object, ctx: CanvasRenderingContext2D, id: any) => void;
     */
    apply(func: simpleApply): Layer;

    /**
     * Draw layer.
     */
    draw(): Layer;

}


export = Layer;
