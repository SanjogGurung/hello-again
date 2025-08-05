export default class Item {
    constructor(itemName, description, quantity, price, photo = null, id = null) {
        this.id = id;
        this.itemName = itemName;
        this.description = description;
        this.quantity = parseInt(quantity, 10);
        this.price = parseFloat(price);
        this.photo = photo; // Store the filename of the uploaded photo
    }

    validate() {
        if (!this.itemName || typeof this.itemName !== 'string') {
            throw new Error('Item name must be a non-empty string');
        }
        if (!this.description || typeof this.description !== 'string') {
            throw new Error('Description must be a non-empty string');
        }
        if (isNaN(this.quantity) || this.quantity < 1) {
            throw new Error('Quantity must be a positive integer');
        }
        if (isNaN(this.price) || this.price < 0) {
            throw new Error('Price must be a non-negative number');
        }
        // Photo is optional, but if provided, it must be a non-empty string
        if (this.photo && (typeof this.photo !== 'string' || this.photo.trim() === '')) {
            throw new Error('Photo filename must be a non-empty string');
        }
        return true;
    }

    toJSON() {
        return {
            id: this.id,
            itemName: this.itemName,
            description: this.description,
            quantity: this.quantity,
            price: this.price,
            photo: this.photo
        };
    }
}