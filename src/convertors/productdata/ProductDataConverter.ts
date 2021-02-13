import { existsSync, readFile, writeFile } from 'fs';
import { Converter } from '../../common/Converter';
import { ProductData } from './ProductData';

export class ProductDataConverter extends Converter
{
    private _products: ProductData[];

    constructor()
    {
        super();

        this._products = [];
    }

    public convert(): void
    {
        if(!existsSync('input/productdata.txt'))
        {
            this.logger.warn(`Skipping, input/productdata.txt doesn't exist!`);

            return;
        }

        super.convert();

        this.logger.log(`Running`);

        readFile('input/productdata.txt', 'utf8', (err, data) =>
        {
            if(err)
            {
                this.logger.error(err.message, err.stack);

                return;
            }

            this.parseProductData(data);
            
            this.generateJson();
        });
    }

    public parseProductData(data: string): void
    {
        if(!data) return;

        data = data.replace(/"{1,}/g, '');

        const parts = data.split(/\n\r{1,}|\n{1,}|\r{1,}/mg);

        for(const part of parts)
        {
            const set = part.match(/\[+?((.)*?)\]/g);

            for(const entry of set)
            {
                let value = entry.replace(/\[{1,}/mg, '');
                value = entry.replace(/\]{1,}/mg, '');

                value = value.replace('[[', '');
                value = value.replace('[', '');

                const pieces        = value.split(',');
                const productCode   = pieces.shift();
                const name          = pieces.shift();
                const description   = pieces.join(',');

                this._products.push(new ProductData(productCode, name, description));
            }
        }
    }

    public generateJson(): void
    {
        let output = {
            productdata: {
                product: this._products
            }
        };

        writeFile('output/ProductData.json', JSON.stringify(output), (err) =>
        {
            if(err)
            {
                this.logger.error(err.message, err.stack);

                return;
            }

            this.logger.log(`Finished with ${ this._products.length } items in ${ Date.now() - this.startTime }ms`);
        });
    }
}