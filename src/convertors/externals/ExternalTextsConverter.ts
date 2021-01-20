import { existsSync, readFile, writeFile } from 'fs';
import { Converter } from '../../common/Converter';

export class ExternalTextsConverter extends Converter
{
    private _textsCount: number;
    private _texts: { [index: string]: string };

    constructor()
    {
        super();

        this._textsCount    = 0;
        this._texts         = {};
    }

    public convert(): void
    {
        if(!existsSync('input/external_texts.txt'))
        {
            this.logger.warn(`Skipping, input/external_texts.txt doesn't exist!`);

            return;
        }

        super.convert();

        this.logger.log(`Running`);

        readFile('input/external_texts.txt', 'utf8', (err, data) =>
        {
            if(err)
            {
                this.logger.error(err.message, err.stack);

                return;
            }

            this.parseExternalTexts(data);
            
            this.generateJson();
        });
    }

    public parseExternalTexts(data: string): void
    {
        if(!data) return;

        this._textsCount = 0;

        const parts = data.split('\n');

        if(!parts) return;

        const totalParts = parts.length;

        if(!totalParts) return;

        for(let i = 0; i < totalParts; i++)
        {
            const part = parts[i];

            if(!part) continue;

            const [ key, value ] = part.split('=');

            this._texts[key] = value;

            this._textsCount++;
        }
    }

    public generateJson(): void
    {
        writeFile('output/ExternalTexts.json', JSON.stringify(this._texts), (err) =>
        {
            if(err)
            {
                this.logger.error(err.message, err.stack);

                return;
            }

            this.logger.log(`Finished with ${ this._textsCount } items in ${ Date.now() - this.startTime }ms`);
        });
    }
}