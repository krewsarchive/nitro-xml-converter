import { existsSync, readFile, writeFile } from 'fs';
import * as XML2JS from 'xml2js';
import { Converter } from '../../common/Converter';
import { Effect } from './Effect';

export class EffectMapConverter extends Converter
{
    private _effects: Effect[];

    constructor()
    {
        super();

        this._effects = [];
    }

    public convert(): void
    {
        if(!existsSync('input/effectmap.xml'))
        {
            this.logger.warn(`Skipping, input/effectmap.xml doesn't exist!`);

            return;
        }

        super.convert();

        const parser = new XML2JS.Parser();

        this.logger.log('Running');
        
        readFile('input/effectmap.xml', (err, data) =>
        {
            if(err)
            {
                this.logger.error(err.message, err.stack);

                return;
            }

            parser.parseString(data, (err: any, result: any) =>
            {
                if(err)
                {
                    this.logger.error(err.message, err.stack);

                    return;
                }

                const effectMap = result.map;

                if(!effectMap) return;

                for(let fx in effectMap.effect)
                {
                    const effect = effectMap.effect[fx];

                    if(!effect) continue;

                    this._effects.push(new Effect(effect));
                }

                this.generateJson();
            });
        });
    }

    private generateJson(): void
    {
        let output: any = {
            effects: this._effects,
        };
        
        writeFile('output/EffectMap.json', JSON.stringify(output), (err) =>
        {
            if(err)
            {
                this.logger.error(err.message, err.stack);

                return;
            }

            this.logger.log(`Finished with ${ this._effects.length } libraries in ${ Date.now() - this.startTime }ms`);
        });
    }
}