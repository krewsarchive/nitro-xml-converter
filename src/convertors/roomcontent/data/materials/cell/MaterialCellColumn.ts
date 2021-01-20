import { MaterialCell } from './MaterialCell';

export class MaterialCellColumn
{
    private _repeatMode: string;
    private _width: number;
    private _cells: MaterialCell[];

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._repeatMode    = (data['$'] && data['$'].repeatMode) || null;
        this._width         = (data['$'] && parseInt(data['$'].width)) || 0;
        this._cells         = null;

        if(data.materialCell) this.parseCells(data.materialCell);
    }

    private parseCells(data: any): void
    {
        this._cells = [];

        for(let cell in data)
        {
            this._cells.push(new MaterialCell(data[cell]));
        }

        if(!this._cells.length) this._cells = null;
    }

    public toJSON()
    {
        const data: any = {};

        if(this._repeatMode) data.repeatMode = this._repeatMode;

        data.width = this._width;

        if(this._cells) data.cells = this._cells;

        return {
            ...data
        };
    }
}