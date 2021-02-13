export class FurnitureData
{
    public furniType: string;

    public id: number;
    public classname: string;
    public revision: number;
    public category: string;
    public defaultdir: number;
    public xdim: number;
    public ydim: number;
    public partcolors: { color: string[] };
    public name: string;
    public description: string;
    public adurl: string;
    public offerid: number;
    public buyout: boolean;
    public rentofferid: number;
    public rentbuyout: boolean;
    public bc: boolean;
    public excludeddynamic: boolean;
    public customparams: string;
    public specialtype: number;
    public canstandon: boolean;
    public cansiton: boolean;
    public canlayon: boolean;
    public furniline: string;
    public environment: string;
    public rare: boolean;

    constructor(furniType: string, data: any)
    {
        if(!data || !data['$']) throw new Error('invalid_data');

        this.furniType = furniType;

        this.id         = ((data['$'] && parseInt(data['$'].id)) || 0);
        this.classname  = ((data['$'] && data['$'].classname) || '');
        this.revision   = ((data.revision && parseInt(data.revision[0])) || 0);
        this.category   = ((data.category && data.category[0]) || 'unknown');

        if(this.furniType === 'floor')
        {
            this.defaultdir = ((data.defaultdir && parseInt(data.defaultdir[0])) || 0);
            this.xdim       = ((data.xdim && parseInt(data.xdim[0])) || 0);
            this.ydim       = ((data.ydim && parseInt(data.ydim[0])) || 0);

            const colors: string[] = [];

            if(data.partcolors)
            {
                for(let key in data.partcolors)
                {
                    const colorData = data.partcolors[key].color;
                    
                    if(colorData)
                    {
                        for(let color of colorData)
                        {
                            let code = color;

                            if(code.charAt(0) !== '#') code = ('#' + code);

                            colors.push(code);
                        }
                    }
                }
            }

            this.partcolors = { color: [ ...colors ] };
        }

        this.name               = ((data.name && data.name[0]) || '');
        this.description        = ((data.description && data.description[0]) || '');
        this.adurl              = (data.adurl && data.adurl[0] || '');
        this.offerid            = ((data.offerid && parseInt(data.offerid[0])) || 0);
        this.buyout             = ((data.buyout && parseInt(data.buyout[0]) === 1) || false);
        this.rentofferid        = ((data.rentofferid && parseInt(data.rentofferid[0])) || 0);
        this.rentbuyout         = ((data.rentbuyout && parseInt(data.rentbuyout[0]) === 1) || false);
        this.bc                 = ((data.bc && parseInt(data.bc[0]) === 1) || false);
        this.excludeddynamic    = ((data.excludeddynamic && parseInt(data.excludeddynamic[0]) === 1) || false);
        this.customparams       = ((data.customparams && data.customparams[0]) || '');
        this.specialtype        = ((data.specialtype && parseInt(data.specialtype[0])) || 0);

        if(this.furniType === 'floor')
        {
            this.canstandon = ((data.canstandon && parseInt(data.canstandon[0]) === 1) || false);
            this.cansiton   = ((data.cansiton && parseInt(data.cansiton[0]) === 1) || false);
            this.canlayon   = ((data.canlayon && parseInt(data.canlayon[0]) === 1) || false);
        }

        this.furniline      = ((data.furniline && data.furniline[0]) || '');
        this.environment    = ((data.environment && data.environment[0]) || '');
        this.rare           = ((data.rare && parseInt(data.rare[0]) === 1) || false);
    }

    public toJSON()
    {
        const data: any = {};

        data.id         = this.id;
        data.classname  = this.classname;
        data.revision   = this.revision;
        data.category   = this.category;

        if(this.furniType === 'floor')
        {
            data.defaultdir = this.defaultdir;
            data.xdim       = this.xdim;
            data.ydim       = this.ydim;
            data.partcolors = this.partcolors;
        }

        data.name               = this.name;
        data.description        = this.description;
        data.adUrl              = this.adurl;
        data.offerId            = this.offerid;
        data.buyout             = this.buyout;
        data.rentofferid        = this.rentofferid;
        data.rentbuyout         = this.rentbuyout;
        data.bc                 = this.bc;
        data.excludeddynamic    = this.excludeddynamic;
        data.customparams       = this.customparams;
        data.specialtype        = this.specialtype;

        if(this.furniType === 'floor')
        {
            data.canstandon = this.canstandon;
            data.cansiton   = this.cansiton;
            data.canlayon   = this.canlayon;
        }

        data.furniline      = this.furniline;
        data.environment    = this.environment;
        data.rare           = this.rare;

        return data;
    }
}