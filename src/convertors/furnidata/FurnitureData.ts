export class FurnitureData
{
    public furniType: string;

    public id: number;
    public className: string;
    public name: string;
    public description: string;
    public furniLine: string;
    public colors: number[];
    public dimensions: { x: number, y: number, defaultDirection: number };
    public canStandOn: boolean;
    public canSitOn: boolean;
    public canLayOn: boolean;
    public offerId: number;
    public adUrl: string;
    public excludeDynamic: boolean;
    public specialType: number;
    public customParams: string;

    constructor(furniType: string, data: any)
    {
        if(!data) throw new Error('invalid_data');

        this.furniType = furniType;

        const colors: number[] = [];

        if(data.partcolors)
        {
            for(let key in data.partcolors)
            {
                const colorData = data.partcolors[key].color;
                
                if(colorData)
                {
                    for(let color of colorData)
                    {
                        if(color.charAt(0) === '#')
                        {
                            const code = color.replace('#', '');
                            
                            colors.push(parseInt(code, 16));
                        }
                        else colors.push(-(parseInt(color)));
                    }
                }
            }
        }

        this.id                = parseInt(data['$'].id);
        this.className         = data['$'].classname;

        this.dimensions = {
            x: data.xdim ? parseInt(data.xdim[0]) : 0,
            y: data.ydim ? parseInt(data.ydim[0]) : 0,
            defaultDirection: data.defaultdirection ? parseInt(data.defaultdirection[0]) : 0
        };

        this.canStandOn         = data.canstandon ? data.canstandon[0] === '1' : false;
        this.canSitOn           = data.cansiton ? data.cansiton[0] === '1' : false;
        this.canLayOn           = data.canlayon ? data.canlayon[0] === '1' : false;
        this.colors             = colors;
        this.name               = (data.name && data.name[0] || '');
        this.description        = (data.description && data.description[0] || '');
        this.adUrl              = (data.adurl && data.adurl[0] || '');
        this.offerId            = ((data.offerid && parseInt(data.offerid[0])) || 0);
        this.furniLine          = (data.furniline && data.furniline[0] || '');
        this.excludeDynamic     = data.excludeddynamic ? data.excludeddynamic[0] === '1' : false;
        this.specialType        = ((data.specialtype && parseInt(data.specialtype[0])) || 0);
        this.customParams       = (data.customparams && data.customparams[0] || '');
    }

    public toJSON()
    {
        const data: any = {};

        data.id             = this.id;
        data.className      = this.className;
        data.name           = this.name;
        data.description    = this.description;
        data.colors         = this.colors;
        data.furniLine      = this.furniLine;
        data.offerId        = this.offerId;
        data.adUrl          = this.adUrl;
        data.excludeDynamic = this.excludeDynamic;
        data.specialType    = this.specialType;
        data.customParams   = this.customParams;

        if(this.furniType == 'floor')
        {
            data.dimensions = this.dimensions;
            data.canStandOn = this.canStandOn;
            data.canSitOn   = this.canSitOn;
            data.canLayOn   = this.canLayOn;
        }

        return data;
    }
}