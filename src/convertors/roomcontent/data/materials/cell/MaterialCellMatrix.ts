import { MaterialCellColumn } from './MaterialCellColumn';

export class MaterialCellMatrix
{
    private _repeatMode: string;
    private _align: string;
    private _normalMinX: number;
    private _normalMaxX: number;
    private _normalMinY: number;
    private _normalMaxY: number;
    private _columns: MaterialCellColumn[];

    constructor(data: any)
    {
        if(!data) throw new Error('invalid_data');

        this._repeatMode    = (data['$'] && data['$'].repeatMode) || null;
        this._align         = (data['$'] && data['$'].align) || null;
        this._normalMinX    = (data['$'] && parseFloat(data['$'].normalMinX)) || 0;
        this._normalMaxX    = (data['$'] && parseFloat(data['$'].normalMaxX)) || 0;
        this._normalMinY    = (data['$'] && parseFloat(data['$'].normalMinY)) || 0;
        this._normalMaxY    = (data['$'] && parseFloat(data['$'].normalMaxY)) || 0;
        this._columns       = null;

        if(data.materialCellColumn) this.parseColumns(data.materialCellColumn);
    }

    private parseColumns(data: any): void
    {
        this._columns = [];

        for(let column in data)
        {
            this._columns.push(new MaterialCellColumn(data[column]));
        }

        if(!this._columns.length) this._columns = null;
    }

    public toJSON()
    {
        const data: any = {};

        if(this._repeatMode) data.repeatMode = this._repeatMode;

        if(this._align) data.align = this._align;

        if(this._normalMinX) data.normalMinX = this._normalMinX;
        if(this._normalMaxX) data.normalMaxX = this._normalMaxX;

        if(this._normalMinY) data.normalMinY = this._normalMinY;
        if(this._normalMaxY) data.normalMaxY = this._normalMaxY;

        if(this._columns) data.columns = this._columns;

        return {
            ...data
        }
    }
}