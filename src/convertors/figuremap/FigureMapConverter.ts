import { existsSync, readFile, writeFile } from 'fs';
import * as XML2JS from 'xml2js';
import { Converter } from '../../common/Converter';
import { Library } from './library/Library';

export class FigureMapConverter extends Converter
{
    private _libraries: Library[];

    constructor()
    {
        super();

        this._libraries = [];
    }

    public convert(): void
    {
        if(!existsSync('input/figuremap.xml'))
        {
            this.logger.warn(`Skipping, input/figuremap.xml doesn't exist!`);

            return;
        }

        super.convert();

        this.logger.log(`Running`);

        const parser = new XML2JS.Parser();
        
        readFile('input/figuremap.xml', (err, data) =>
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

                const figureMap = result.map;

                if(!figureMap) return;

                for(let lib in figureMap.lib)
                {
                    const library = figureMap.lib[lib];

                    if(!library) continue;

                    this._libraries.push(new Library(library));
                }

                this.generateJson();
            });
        });
    }

    private generateJson(): void
    {
        let output: any = {
            libraries: this._libraries,
        };
        
        writeFile('output/FigureMap.json', JSON.stringify(output), (err) =>
        {
            if(err)
            {
                this.logger.error(err.message, err.stack);

                return;
            }

            this.logger.log(`Finished with ${ this._libraries.length } libraries in ${ Date.now() - this.startTime }ms`);
        });
    }
}