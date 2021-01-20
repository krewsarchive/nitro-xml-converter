export class ExtraItemType
{
    private _assetName: string;

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._assetName = (data['$'] && data['$'].assetName) || null;
    }

    public toJSON()
    {
        return {
            assetName: this._assetName
        };
    }
}