import { TextureBitmap } from './TextureBitmap';

export class Texture
{
    private _id: string;
    private _bitmaps: TextureBitmap[];

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._id        = (data['$'] && data['$'].id) || null;
        this._bitmaps   = null;

        if(data.bitmap) this.parseBitmap(data.bitmap);
    }

    private parseBitmap(data: any): void
    {
        this._bitmaps = [];

        for(let bitmap in data)
        {
            this._bitmaps.push(new TextureBitmap(data[bitmap]));
        }

        if(!this._bitmaps.length) this._bitmaps = null;
    }

    public toJSON()
    {
        const data: any = {};

        if(this._bitmaps) data.bitmaps = this._bitmaps;

        return {
            id: this._id,
            ...data
        };
    }

    public get id(): string
    {
        return this._id;
    }
}