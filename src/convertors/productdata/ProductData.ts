export class ProductData
{
    public code: string = '';
    public name: string = '';
    public description: string = '';

    constructor(code: string, name: string, description: string)
    {
        this.code           = code;
        this.name           = name;
        this.description    = description;
    }

    public toJSON()
    {
        const data: any = {};

        data.code           = this.code;
        data.name           = this.name;
        data.description    = this.description;

        return data;
    }
}