import { Asset } from './Asset';

export class AssetsData
{
    private _assets: { [index: string]: Asset };

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._assets = {};

        if(data.length)
        {
            for(let key in data)
            {
                const asset = new Asset(data[key]);

                if(asset.name.indexOf('_32') >= 0) continue;

                this._assets[asset.name] = asset;
            }
        }
    }

    public toJSON()
    {
        return this._assets;
    }
}