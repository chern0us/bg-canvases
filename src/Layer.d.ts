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
    show(): void;

    /**
     * Make layer invisible.
     */
    hide(): void;

    /**
     * Make layer active.
     */
    start(): void;

    /**
     * Make layer inactive.
     */
    stop(): void;

    /**
     * Set animation function to layer.
     * @param animation (f: object, i: number, figures: object, ctx: CanvasRenderingContext2D, id: any) => void;
     */
    setAnimation(animation: animation): void;

    /**
     * Set context to layer .
     * @param ctx CanvasRenderingContext2D
     */
    setContext(ctx: CanvasRenderingContext2D): void;

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
    applyOnEach(func: each): void;

    /**
     * Applying function to all figures
     * @param func (figures: object, ctx: CanvasRenderingContext2D, id: any) => void;
     */
    apply(func: simpleApply): void;

    /**
     * Draw layer.
     */
    draw(): void;

}


export = Layer;
