import { INitroLogger } from './logger/INitroLogger';

export interface IConverter
{
    convert(): void;
    logger: INitroLogger;
    startTime: number;
}