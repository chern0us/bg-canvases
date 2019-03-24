import Background from '../src/Background';
import Layer from '../src/Layer'

const ctx = {
    clearRect: () => { },
    canvas: {
        width: 0,
        height: 0,
    }
}
describe('Empty layer creation', () => {
    const bg = new Background();
    const layerId = 'layer';
    test('Should create instance', () => {
        expect(bg).toBeInstanceOf(Background);
    });
    test('Should create and return instance of Layer', () => {
        const layer = bg.createLayer(layerId, ctx);
        expect(layer).toBeInstanceOf(Layer);
    });
    test('Should return layer on getLayer', () => {
        const bg = new Background();
        bg.createLayer(layerId, ctx);
        const layer = bg.getLayer(layerId);
        expect(layer).toBeInstanceOf(Layer);
    });
    test('Should remove layer', () => {
        bg.createLayer('layer1', ctx);
        bg.createLayer('layer2', ctx);
        bg.removeLayer('layer1');
        const layer1 = bg.getLayer('layer1');
        const layer2 = bg.getLayer('layer2');
        expect(layer1).toBeUndefined();
        expect(layer2).toBeInstanceOf(Layer);
    });
})

describe('Layer activity and visibility', () => {
    const bg = new Background();
    const layer = bg.createLayer('layer', ctx);
    test('Created layer is active', () => {
        expect(layer.visible).toBe(true);
    });
    test('Created layer is visible', () => {
        expect(layer.visible).toBe(true);
    });
    test('Should stop and start layer by id', () => {
        bg.stop('layer');
        expect(layer.active).toBe(false);
        bg.start('layer');
        expect(layer.active).toBe(true);
    });
    test('Should hide and show layer by id', () => {
        bg.hide('layer');
        expect(layer.visible).toBe(false);
        bg.show('layer');
        expect(layer.visible).toBe(true);
    });
})

describe('Multiple layers activity and visibility', () => {
    const bg = new Background();
    const layer1 = bg.createLayer('layer1', ctx);
    const layer2 = bg.createLayer('layer2', ctx);
    test('Should stop and start all layers', () => {
        bg.stop();
        expect(layer1.active).toBe(false);
        expect(layer2.active).toBe(false);
        bg.start();
        expect(layer1.active).toBe(true);
        expect(layer2.active).toBe(true);
    });
    test('Should hide and show all layers', () => {
        bg.hide();
        expect(layer1.visible).toBe(false);
        expect(layer2.visible).toBe(false);
        bg.show();
        expect(layer1.visible).toBe(true);
        expect(layer2.visible).toBe(true);
    });
})