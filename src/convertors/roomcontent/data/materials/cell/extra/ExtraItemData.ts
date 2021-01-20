import { ExtraItemTypes } from './ExtraItemTypes';
import { Offsets } from './Offsets';

export class ExtraItemData
{
    private _limitMax: number;
    private _types: ExtraItemTypes[];
    private _offsets: Offsets[];

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._limitMax  = (data['$'] && parseInt(data['$'].limitMax)) || 0;
        this._types     = null;

        if(data.extraItemTypes) this.parseTypes(data.extraItemTypes);

        if(data.offsets) this.parseOffsets(data.offsets);
    }

    private parseTypes(data: any): void
    {
        this._types = [];

        for(let type in data)
        {
            this._types.push(new ExtraItemTypes(data[type]));
        }

        if(!this._types.length) this._types = null;
    }

    private parseOffsets(data: any): void
    {
        this._offsets = [];

        for(let offset in data)
        {
            const offsetData = data[offset];

            if(!offsetData) continue;

            this._offsets.push(new Offsets(offsetData));
        }

        if(!this._offsets.length) this._offsets = null;
    }

    public toJSON()
    {
        const data: any = {};

        if(this._types) data.types = this._types;

        if(this._offsets) data.offsets = this._offsets;

        return {
            limitMax: this._limitMax,
            ...data
        };
    }
}