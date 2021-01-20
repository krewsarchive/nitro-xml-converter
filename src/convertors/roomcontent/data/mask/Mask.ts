import { MaskVisualization } from './visualization/MaskVisualization';

export class Mask
{
    private _id: string;
    private _visualizations: MaskVisualization[];

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._id                = data['$'].id;
        this._visualizations    = null;

        if(data.maskVisualization) this.parseVisualization(data.maskVisualization);
    }

    private parseVisualization(data: any): void
    {
        this._visualizations = [];

        for(let visualization in data)
        {
            const newVisualization = new MaskVisualization(data[visualization]);

            if(newVisualization.size === 32) continue;
            
            this._visualizations.push(newVisualization);
        }

        if(!this._visualizations.length) this._visualizations = null;
    }

    public toJSON()
    {
        const data: any = {};

        if(this._visualizations) data.visualizations = this._visualizations;

        return {
            id: this._id,
            ...data
        };
    }
}