import { AnimatedItemVisualizationLayerItem } from './AnimatedItemVisualizationLayerItem';
import { ItemVisualizationLayer } from './ItemVisualizationLayer';

export class AnimatedItemVisualizationLayer extends ItemVisualizationLayer
{
    private _animationItems: AnimatedItemVisualizationLayerItem[];

    constructor(data: any)
    {
        super(data);

        this._animationItems = null;

        if(data.animationItem) this.parseAnimationItems(data.animationItem);
    }

    private parseAnimationItems(data: any): void
    {
        this._animationItems = [];

        for(let item in data)
        {
            this._animationItems.push(new AnimatedItemVisualizationLayerItem(data[item]));
        }

        if(!this._animationItems) this._animationItems = null;
    }

    public toJSON()
    {
        const data = super.toJSON();

        if(this._animationItems && this._animationItems.length) data.animationItems = this._animationItems;
        
        return data;
    }
}