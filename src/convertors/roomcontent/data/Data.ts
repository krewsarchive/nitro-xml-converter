import { Item } from './item/Item';
import { Mask } from './mask/Mask';
import { Material } from './materials/Material';
import { Texture } from './textures/Texture';

export class Data
{
    private _type: string;
    private _items: Item[];
    private _masks: Mask[];
    private _materials: Material[];
    private _textures: Texture[];

    constructor(type: string, data: any)
    {
        if(!type || !data) throw new Error('invalid_data');

        this._type = type;

        if(data[this._type + 's'] && data[this._type + 's'][0] && data[this._type + 's'][0][this._type]) this.parseType(data[this._type + 's'][0][this._type]);

        if(data.mask) this.parseMasks(data.mask);

        if(data.materials && data.materials[0]) this.parseMaterials(data.materials[0]);

        if(data.textures && data.textures[0]) this.parseTextures(data.textures[0]);
    }

    private parseType(data: any): void
    {
        this._items = [];

        for(let item in data)
        {
            this._items.push(new Item(data[item]));
        }

        if(!this._items.length) this._items = null;
    }

    private parseMasks(data: any): void
    {
        this._masks = [];

        for(let mask in data)
        {
            const newMask = new Mask(data[mask]);

            this._masks.push(newMask);
        }

        if(!this._masks.length) this._masks = null;
    }

    private parseMaterials(data: any): void
    {
        this._materials = [];

        for(let material in data.material)
        {
            const newMaterial = new Material(data.material[material]);

            if(newMaterial.id.indexOf('_32') >= 0) continue;

            this._materials.push(newMaterial);
        }

        if(!this._materials.length) this._materials = null;
    }

    private parseTextures(data: any): void
    {
        this._textures = [];

        for(let texture in data.texture)
        {
            const newTexture = new Texture(data.texture[texture]);

            if(newTexture.id.indexOf('_32') >= 0) continue;

            this._textures.push(newTexture);
        }

        if(!this._textures.length) this._textures = null;
    }

    public toJSON()
    {
        const data: any = {};

        if(this._items) data[this._type + 's'] = this._items;

        if(this._masks) data.masks = this._masks;

        if(this._materials) data.materials = this._materials;

        if(this._textures) data.textures = this._textures;

        return {
            ...data
        };
    }
}