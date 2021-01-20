import { existsSync, readFile, writeFile } from 'fs';
import * as XML2JS from 'xml2js';
import { Converter } from '../../common/Converter';
import { AssetsData } from './assets/AssetsData';
import { Data } from './data/Data';

export class RoomContentConverter extends Converter
{
    private _assets: AssetsData;
    private _wallData: Data;
    private _floorData: Data;
    private _landscapeData: Data;
    private _maskData: Data;

    private _roomContentFinished: boolean;
    private _roomAssetsFinished: boolean;

    constructor()
    {
        super();

        this._assets                = null;
        this._wallData              = null;
        this._floorData             = null;
        this._landscapeData         = null;
        this._maskData              = null;

        this._roomContentFinished   = false;
        this._roomAssetsFinished    = false;
    }

    public convert(): void
    {
        if(!existsSync('input/HabboRoomContent.xml') || !existsSync('input/HabboRoomAssets.xml'))
        {
            this.logger.warn(`Skipping, input/HabboRoomContent.xml or input/HabboRoomAssets.xml doesn't exist!`);

            return;
        }

        super.convert();

        this.logger.log(`Running`);

        const parser = new XML2JS.Parser();
        
        readFile('input/HabboRoomContent.xml', (err, data) =>
        {
            if(err)
            {
                this.logger.error(err.message, err.stack);

                return;
            }

            parser.parseString(data, (err: any, result: { visualizationData: any; }) =>
            {
                if(err)
                {
                    this.logger.error(err.message, err.stack);

                    return;
                }

                const visualizationData = result.visualizationData;

                if(!visualizationData) return;

                if(visualizationData.wallData) this.parseWallData(visualizationData.wallData[0]);

                if(visualizationData.floorData) this.parseFloorData(visualizationData.floorData[0]);

                if(visualizationData.landscapeData) this.parseLandscapeData(visualizationData.landscapeData[0]);

                if(visualizationData.maskData) this.parseMaskData(visualizationData.maskData[0]);

                this._roomContentFinished = true;

                this.finish();
            });
        });

        readFile('input/HabboRoomAssets.xml', (err, data) =>
        {
            if(err)
            {
                this.logger.error(err.message, err.stack);

                return;
            }

            parser.parseString(data, (err: any, result: { assets: any; }) =>
            {
                if(err)
                {
                    this.logger.error(err.message, err.stack);

                    return;
                }

                const assets = result.assets;

                if(!assets) return;

                this.parseAssets(assets.asset);

                this._roomAssetsFinished = true;

                this.finish();
            });
        });
    }

    private parseWallData(data: any): void
    {
        if(!data) return;

        this._wallData = new Data('wall', data);
    }

    private parseFloorData(data: any): void
    {
        if(!data) return;

        this._floorData = new Data('floor', data);
    }

    private parseLandscapeData(data: any): void
    {
        if(!data) return;

        this._landscapeData = new Data('landscape', data);
    }

    private parseMaskData(data: any): void
    {
        if(!data) return;

        this._maskData = new Data('mask', data);
    }

    private parseAssets(data: any): void
    {
        if(!data) return;

        this._assets = new AssetsData(data);
    }

    public toJSON()
    {
        return {
            assets: this._assets,
            wallData: this._wallData,
            floorData: this._floorData,
            landscapeData: this._landscapeData,
            maskData: this._maskData
        };
    }

    private finish(): void
    {
        if(!this._roomContentFinished || !this._roomAssetsFinished) return;
        
        writeFile('output/HabboRoomContent.json', JSON.stringify(this.toJSON()), (err) =>
        {
            if(err)
            {
                this.logger.error(err.message, err.stack);

                return;
            }

            console.log(`Finished in ${ Date.now() - this.startTime }ms`);
        });
    }
}