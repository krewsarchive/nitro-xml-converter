export class LibraryPart
{
    public id: number;
    public type: string;

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this.id     = data['$'].id;
        this.type   = data['$'].type;
    }

    public toJSON()
    {
        const data: any = {};

        data.id     = this.id;
        data.type   = this.type;

        return data;
    }
}