import { existsSync, mkdirSync } from 'fs';
import { EffectMapConverter } from './convertors/effectmap/EffectMapConverter';
import { ExternalTextsConverter } from './convertors/externals/ExternalTextsConverter';
import { FigureMapConverter } from './convertors/figuremap/FigureMapConverter';
import { FurniDataConverter } from './convertors/furnidata/FurniDataConverter';
import { ProductDataConverter } from './convertors/productdata/ProductDataConverter';

if(!existsSync('output')) mkdirSync('output');

new FigureMapConverter().convert();
new EffectMapConverter().convert();
new FurniDataConverter().convert();
new ExternalTextsConverter().convert();
new ProductDataConverter().convert();
//new RoomContentConverter().convert();