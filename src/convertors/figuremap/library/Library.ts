import { LibraryPart } from './LibraryPart';

export class Library
{
    public id: string;
    public revision: number;
    public parts: LibraryPart[];

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this.id         = data['$'].id;
        this.revision   = parseInt(data['$'].revision);
        this.parts      = [];

        for(let partId in data.part)
        {
            const part = data.part[partId];

            if(!part) continue;

            this.parts.push(new LibraryPart(part));
        }
    }

    public toJSON()
    {
        const data: any = {};

        data.id         = this.id;
        data.revision   = this.revision;
        data.parts      = this.parts;

        return data;
    }
}