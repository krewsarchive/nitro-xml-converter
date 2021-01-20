import { IConverter } from './IConvertor';
import { INitroLogger } from './logger/INitroLogger';
import { NitroLogger } from './logger/NitroLogger';

export class Converter implements IConverter
{
    private _logger: INitroLogger;
    private _startTime: number;

    constructor()
    {
        this._logger    = new NitroLogger(this.constructor.name);
        this._startTime = 0;
    }

    public convert(): void
    {
        this._startTime = Date.now();
    }

    public get logger(): INitroLogger
    {
        return this._logger;
    }

    public get startTime(): number
    {
        return this._startTime;
    }
}