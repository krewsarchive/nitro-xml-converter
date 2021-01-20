import { ItemVisualization } from './ItemVisualization';
import { AnimatedItemVisualizationLayer } from './layer/AnimatedItemVisualizationLayer';

export class AnimatedItemVisualization extends ItemVisualization
{
    private _animatedLayers: AnimatedItemVisualizationLayer[];

    constructor(data: any)
    {
        super(data);

        if(data.animationLayer) this.parseAnimationLayers(data.animationLayer);
    }

    private parseAnimationLayers(data: any): void
    {
        this._animatedLayers = [];

        for(let layer in data)
        {
            this._animatedLayers.push(new AnimatedItemVisualizationLayer(data[layer]));
        }
    }

    public toJSON()
    {
        const data = super.toJSON();

        if(this._animatedLayers && this._animatedLayers.length) data.animationLayers = this._animatedLayers;

        return data;
    }
}