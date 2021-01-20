export class Offset
{
    private _id: number;
    private _x: number;
    private _y: number;

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._id    = (data['$'] && parseInt(data['$'].id)) || 0;
        this._x     = (data['$'] && parseInt(data['$'].x)) || 0;
        this._y     = (data['$'] && parseInt(data['$'].y)) || 0;
    }

    public toJSON()
    {
        const data: any = {};

        if(this._x) data.x = this._x;

        if(this._y) data.y = this._y;

        return {
            id: this._id,
            ...data
        };
    }
}