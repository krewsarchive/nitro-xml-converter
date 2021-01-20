export class TextureBitmap
{
    private _assetName: string;
    private _normalMinX: number;
    private _normalMaxX: number;
    private _normalMinY: number;
    private _normalMaxY: number;

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._assetName     = ((data['$'] && data['$'].assetName) || null);
        this._normalMinX    = ((data['$'] && data['$'].normalMinX && parseFloat(data['$'].normalMinX)));
        this._normalMaxX    = ((data['$'] && data['$'].normalMaxX && parseFloat(data['$'].normalMaxX)));
        this._normalMinY    = ((data['$'] && data['$'].normalMinY && parseFloat(data['$'].normalMinY)));
        this._normalMaxY    = ((data['$'] && data['$'].normalMaxY && parseFloat(data['$'].normalMaxY)));
    }

    public toJSON()
    {
        const data: any = {};

        if(this._normalMinX !== null) data.normalMinX = this._normalMinX;
        if(this._normalMaxX !== null) data.normalMaxX = this._normalMaxX;

        if(this._normalMinY !== null) data.normalMinY = this._normalMinY;
        if(this._normalMaxY !== null) data.normalMaxY = this._normalMaxY;

        return {
            assetName: this._assetName,
            ...data
        }
    }
}