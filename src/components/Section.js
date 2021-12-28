export default class Section {
    constructor({renderer}, parentContainer) {
        this._renderer = renderer;
        this._parentContainer = parentContainer;
    }

    renderContainer(items) {
        items.forEach((item) => this._renderer(item));
    }

    addItemPrepend(element) {
        this._parentContainer.prepend(element);
    }

    addItemAppend (element) {
        this._parentContainer.append(element);
    }
}
