import { MaterialCellMatrix } from './cell/MaterialCellMatrix';

export class Material
{
    private _id: string;
    private _matrices: MaterialCellMatrix[];

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._id        = (data['$'] && data['$'].id) || null;
        this._matrices  = null;

        if(data.materialCellMatrix) this.parseMatrices(data.materialCellMatrix);
    }

    private parseMatrices(data: any): void
    {
        this._matrices = [];

        for(let matrix in data)
        { 
            this._matrices.push(new MaterialCellMatrix(data[matrix]));
        }

        if(!this._matrices.length) this._matrices = null;
    }

    public toJSON()
    {
        const data: any = {};

        if(this._matrices) data.matrices = this._matrices;

        return {
            id: this._id,
            ...data
        };
    }

    public get id(): string
    {
        return this._id;
    }
}