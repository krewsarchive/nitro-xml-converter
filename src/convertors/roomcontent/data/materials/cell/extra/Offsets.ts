import { Offset } from './Offset';

export class Offsets
{
    private _offsets: Offset[];

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._offsets = null;

        if(data.offset) this.parseOffsets(data.offset);
    }

    private parseOffsets(data: any): void
    {
        this._offsets = [];

        for(let offset in data)
        {
            this._offsets.push(new Offset(data[offset]));
        }

        if(!this._offsets.length) this._offsets = null;
    }

    public toJSON()
    {
        const data: any = {};

        if(this._offsets) data.offsets = this._offsets;

        return {
            ...data
        };
    }
}