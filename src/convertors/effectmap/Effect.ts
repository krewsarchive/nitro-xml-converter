
export class Effect
{
    public id: string;
    public lib: string;
    public type: string;
    public revision: number;

    constructor(data: any)
    {
        if(!data) return;

        this.id         = data['$'].id;
        this.lib        = data['$'].lib;
        this.type       = data['$'].type;
        this.revision   = parseInt(data['$'].revision);
    }

    public toJSON()
    {
        const data: any = {};

        data.id         = this.id;
        data.lib        = this.lib;
        data.type       = this.type;
        data.revision   = this.revision;

        return data;
    }
}