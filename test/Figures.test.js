import Background from '../src/Background';

const ctx = {
    clearRect: () => console.log(`Cleared canvas 1`),
    canvas: {
        width: 0,
        height: 0,
    }
}
class Figure {
    constructor(i, layerId, totalQuantity) {
        this.i = i;
        this.layerId = layerId;
        this.totalQuantity = totalQuantity;
    }
};
const creator = (i, layerId, quantity) => new Figure(i, layerId, quantity);

describe('Figures creation', () => {
    test("Empty layer", () => {
        const bg = new Background();
        const layerId = 'layer';
        const layer = bg.createLayer(layerId, ctx);
        const figures = layer.figures;
        expect(figures).toEqual([]);
    })
    test("1 figured layer", () => {
        const bg = new Background();
        const layerId = 'layer';
        const layer = bg.createLayer(layerId, ctx, creator);
        const figures = layer.figures;
        expect(figures).toBeInstanceOf(Array);
        expect(figures.length).toBe(1);
        const figure = figures[0];
        expect(figure).toBeInstanceOf(Figure);
        expect(figure.i).toBe(0);
        expect(figure.layerId).toBe('layer');
        expect(figure.totalQuantity).toBe(1);
    })
    test("3 figured layer", () => {
        const bg = new Background();
        const layerId = 'layer';
        const layer = bg.createLayer(layerId, ctx, creator, 3);
        const figures = layer.figures;
        expect(figures).toBeInstanceOf(Array);
        expect(figures.length).toBe(3);

        const figure1 = figures[0];
        const figure2 = figures[1];
        const figure3 = figures[2];

        expect(figure1).toBeInstanceOf(Figure);
        expect(figure2).toBeInstanceOf(Figure);
        expect(figure3).toBeInstanceOf(Figure);

        expect(figure1.i).toBe(0);
        expect(figure2.i).toBe(1);
        expect(figure3.i).toBe(2);

        expect(figure1.layerId).toBe('layer');
        expect(figure2.layerId).toBe('layer');
        expect(figure3.layerId).toBe('layer');

        expect(figure1.totalQuantity).toBe(3);
        expect(figure2.totalQuantity).toBe(3);
        expect(figure3.totalQuantity).toBe(3);
    })
})
