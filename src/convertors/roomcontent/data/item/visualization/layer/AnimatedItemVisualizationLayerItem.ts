
export class AnimatedItemVisualizationLayerItem
{
    private _id: number;
    private _assetId: string;
    private _speedX: number;
    private _randomX: string;
    private _randomY: string;

    constructor(data: any)
    {
        if(!data) return;

        this._id        = (data['$'] && data['$'].id) ? parseInt(data['$'].id) : null;
        this._assetId   = (data['$'] && data['$'].assetId) ? data['$'].assetId : null;
        this._speedX    = (data['$'] && data['$'].speedX) ? parseFloat(data['$'].id) : null;
        this._randomX   = (data['$'] && data['$'].randomX) ? data['$'].randomX : null;
        this._randomY   = (data['$'] && data['$'].randomY) ? data['$'].randomY : null;
    }

    public toJSON()
    {
        const data: any = {};

        if(this._id) data.id = this._id;
        if(this._assetId) data.assetId = this._assetId;
        if(this._speedX) data.speedX = this._speedX;
        if(this._randomX) data.randomX = this._randomX;
        if(this._randomY) data.randomY = this._randomY;
        
        return data;
    }
}