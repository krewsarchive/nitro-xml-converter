import { AnimatedItemVisualization } from './visualization/AnimatedItemVisualization';
import { ItemVisualization } from './visualization/ItemVisualization';

export class Item
{
    private _id: string;
    private _visualizations: ItemVisualization[];
    private _animatedVisualizations: AnimatedItemVisualization[];

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._id                = data['$'].id;
        this._visualizations    = null;

        if(data.visualization) this.parseVisualization(data.visualization);

        if(data.animatedVisualization) this.parseAnimatedVisualization(data.animatedVisualization);
    }

    private parseVisualization(data: any): void
    {
        this._visualizations = [];

        for(let visualization in data)
        {
            const newVisualization = new ItemVisualization(data[visualization]);

            if(newVisualization.size === 32) continue;
            
            this._visualizations.push(newVisualization);
        }
    }

    private parseAnimatedVisualization(data: any): void
    {
        this._animatedVisualizations = [];

        for(let visualization in data)
        {
            const newVisualization = new AnimatedItemVisualization(data[visualization]);

            if(newVisualization.size === 32) continue;
            
            this._animatedVisualizations.push(newVisualization);
        }
    }

    public toJSON()
    {
        const data: any = {};

        if(this._visualizations && this._visualizations.length) data.visualizations = this._visualizations;

        if(this._animatedVisualizations && this._animatedVisualizations.length) data.animatedVisualizations = this._animatedVisualizations;

        return {
            id: this._id,
            ...data
        };
    }
}