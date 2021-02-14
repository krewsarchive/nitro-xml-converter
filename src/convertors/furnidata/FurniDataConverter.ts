import { existsSync, readFile, writeFile } from 'fs';
import * as XML2JS from 'xml2js';
import { Converter } from '../../common/Converter';
import { FurnitureData } from './FurnitureData';

export class FurniDataConverter extends Converter
{
    private _floorItems: FurnitureData[];
    private _wallItems: FurnitureData[];

    constructor()
    {
        super();

        this._floorItems    = [];
        this._wallItems     = [];
    }

    public convert(): void
    {
        if(!existsSync('input/furnidata.xml'))
        {
            this.logger.warn(`Skipping, input/furnidata.xml doesn't exist!`);

            return;
        }

        super.convert();

        this.logger.log(`Running`);

        const parser = new XML2JS.Parser();
        
        readFile('input/furnidata.xml', (err, data) =>
        {
            if(err)
            {
                this.logger.error(err.message, err.stack);

                return;
            }

            parser.parseString(data, (err, result) =>
            {
                if(err)
                {
                    this.logger.error(err.message, err.stack);

                    return;
                }

                const furniData = result.furnidata;

                if(!furniData) return;

                this.parseFloorItems(furniData.roomitemtypes[0].furnitype);

                this.parseWallItems(furniData.wallitemtypes[0].furnitype);

                this.generateJson();
            });
        });
    }

    private parseFloorItems(data: any): void
    {
        if(!data) return;

        for(let entry in data) this._floorItems.push(new FurnitureData('floor', data[entry]));
    }

    private parseWallItems(data: any): void
    {
        if(!data) return;

        for(let entry in data) this._wallItems.push(new FurnitureData('wall', data[entry]));
    }

    private generateJson(): void
    {
        let output = {
            roomitemtypes: {
                furnitype: this._floorItems
            },
            wallitemtypes: {
                furnitype: this._wallItems
            }
        };
        
        writeFile('output/FurnitureData.json', JSON.stringify(output), (err) =>
        {
            if(err)
            {
                this.logger.error(err.message, err.stack);

                return;
            }

            this.logger.log(`Finished with ${ this._floorItems.length + this._wallItems.length } items in ${ Date.now() - this.startTime }ms`);
        });
    }
}