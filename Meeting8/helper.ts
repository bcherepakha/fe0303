import { createElement } from '../lib/module';
import cn from 'classnames';

interface IHelperProps {
    value: boolean[];
    hidden: boolean;
}

export default class Helper {
    _props: IHelperProps;
    _el: HTMLElement;
    _items: HTMLElement[];

    constructor(props: IHelperProps) {
        this._props = props;
        this._items = this.createItems();
        this._el = this.createElement();
    }

    createElement(): HTMLElement {
        const {hidden} = this._props;

        return createElement('div', {
            children: this._items
        });
    }

    changeProps(newProps: IHelperProps): void {
        this._props = newProps;

        this.render();
    }

    createItems(): HTMLElement[] {
        return this._props.value.map((visible, i) => createElement('div', {}, i+1));
    }

    render(): HTMLElement {
        this._items.forEach((item: HTMLDivElement, itemNumber: number) => {
            const visible = this._props.value[itemNumber];

            item.className = cn({
                'board__cell-helper-item': true,
                'board__cell-helper-item--disabled': !visible
            });
        });

        this._el.className = cn({
            'board__cell-helper': true,
            'board__cell-helper--hidden': this._props.hidden
        });

        return this._el;
    }
}
