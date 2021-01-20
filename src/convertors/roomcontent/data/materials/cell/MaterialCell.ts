import { ExtraItemData } from './extra/ExtraItemData';

export class MaterialCell
{
    private _textureId: string;
    private _extras: ExtraItemData[];

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._textureId = (data['$'] && data['$'].textureId) || null;
        this._extras    = null;

        if(data.extraItemData) this.parseExtra(data.extraItemData);
    }

    private parseExtra(data: any): void
    {
        this._extras = [];

        for(let extra in data)
        {
            this._extras.push(new ExtraItemData(data[extra]));
        }

        if(!this._extras.length) this._extras = null;
    }

    public toJSON()
    {
        const data: any = {};

        if(this._extras) data.extras = this._extras;

        return {
            textureId: this._textureId,
            ...data
        };
    }
}