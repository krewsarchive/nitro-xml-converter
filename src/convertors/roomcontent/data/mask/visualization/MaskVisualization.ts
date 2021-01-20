import { TextureBitmap } from '../../textures/TextureBitmap';

export class MaskVisualization
{
    private _size: number;
    private _bitmaps: TextureBitmap[];

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._size      = parseInt(data['$'].size);
        this._bitmaps   = null;

        if(data.bitmap) this.parseBitmaps(data.bitmap);
    }

    private parseBitmaps(data: any): void
    {
        this._bitmaps = [];

        for(let bitmap in data)
        {
            this._bitmaps.push(new TextureBitmap(data[bitmap]));
        }

        if(!this._bitmaps) this._bitmaps = null;
    }

    public toJSON()
    {
        const data: any = {};

        if(this._bitmaps) data.bitmaps = this._bitmaps;

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