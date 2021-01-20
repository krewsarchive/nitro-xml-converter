import { ItemVisualizationLayer } from './layer/ItemVisualizationLayer';

export class ItemVisualization
{
    private _size: number;
    private _layers: ItemVisualizationLayer[];

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._size      = parseInt(data['$'].size);
        this._layers    = null;

        if(data.visualizationLayer) this.parseLayers(data.visualizationLayer);
    }

    private parseLayers(data: any): void
    {
        this._layers = [];

        for(let layer in data)
        {
            this._layers.push(new ItemVisualizationLayer(data[layer]));
        }

        if(!this._layers) this._layers = null;
    }

    public toJSON()
    {
        const data: any = {};

        if(this._layers) data.layers = this._layers;

        return {
            size: this._size,
            ...data
        };
    }

    public get size(): number
    {
        return this._size;
    }
}