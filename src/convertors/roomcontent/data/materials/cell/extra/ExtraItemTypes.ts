import { ExtraItemType } from './ExtraItemType';

export class ExtraItemTypes
{
    private _types: ExtraItemType[];

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._types = null;

        if(data.extraItemType) this.parseTypes(data.extraItemType);
    }

    private parseTypes(data: any): void
    {
        this._types = [];

        for(let type in data)
        {
            this._types.push(new ExtraItemType(data[type]));
        }

        if(!this._types.length) this._types = null;
    }

    public toJSON()
    {
        const data: any = {};

        if(this._types) data.types = this._types;

        return {
            ...data
        };
    }
}