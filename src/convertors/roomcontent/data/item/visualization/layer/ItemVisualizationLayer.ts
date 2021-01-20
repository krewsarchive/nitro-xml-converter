export class ItemVisualizationLayer
{
    private _color: number;
    private _materialId: string;

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._color         = (data['$'] && data['$'].color) ? parseInt(data['$'].color, 16) : null;
        this._materialId    = (data['$'] && data['$'].materialId) ? data['$'].materialId : null;
    }

    public toJSON()
    {
        const data: any = {};

        if(this._color) data.color = this._color;

        if(this._materialId) data.materialId = this._materialId;
        
        return data;
    }
}