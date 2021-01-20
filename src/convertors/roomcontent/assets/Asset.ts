export class Asset
{
    private _name: string;
    private _source: string;
    private _x: number;
    private _y: number;
    private _flipH: boolean;

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._name      = data['$'].name;
        this._source    = ((data['$'].source !== undefined) ? data['$'].source : null);
        this._x         = ((data['$'].x !== undefined) ? data['$'].x : 0);
        this._y         = ((data['$'].y !== undefined) ? data['$'].y : 0);
        this._flipH     = ((data['$'].flipH !== undefined && data['$'].flipH === '1') ? true : false);
    }

    public toJSON()
    {
        const data: any = {};

        if(this._source) data.source = this._source;

        data.x = this._x;
        data.y = this._y;

        if(this._flipH) data.flipH = true;

        return data;
    }

    public get name(): string
    {
        return this._name;
    }
}