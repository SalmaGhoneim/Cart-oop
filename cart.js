        /*
        * @author: Salma Ghoneim
        * counter static variable for product ids
        */

let counter = 0;
/*
* product class for handling items
*/
export class product {
    constructor({name, price, id}) {
        if (id == undefined) {
            // if id is not given assign the global variable to it
            this.id = counter;
            counter++;
        }
        else {
            this.id = id;
        }
        this.name = name;
        this.price = price;
    }
}
/*
* item class for handling carts
*/
class item {
    constructor(product) {
        var {price} = product;
        this.count = 1;
        this.price = price;
        this.product = product;
    }
}
/*
* cart class (Main class)
*/
export class cart {
    constructor() {
        // empty cart at the beginning
        this.items = [];
    }

    getIndex(item) {
        // gets the index of an ITEM
        return this.items.indexOf(item);
    }

    findIndexOfProduct(product) {
        // gets the index of a PRODUCT 
        var index = -1;
        this.items.forEach(item => {
            if (item.product.id === product.id) {
                index = this.getIndex(item);
            }
        });
        return index;
    }

    getItems() {
        // gets all items
        return this.items;
    }

    hasProduct(product) {
        // says whether a PRODUCT exist
        var found = false;
        this.items.forEach(function (item) {
            if (item.product.id === product.id) {
                found = true;
            }
        });
        return found;
    }

    addItem(newProduct) {
        // adds a PRODUCT
        if (this.hasProduct(newProduct)) {
            // if the cart contains the same product, increment the count & the price
            var index = this.findIndexOfProduct(newProduct);
            this.items[index].count++;
            this.items[index].price += newProduct.price;
        }
        else {
            // if it a brand new product, add a new ITEM
            let x = new item(newProduct);
            this.items.push(new item(newProduct));
        }
    }

    removeProduct(ProductToBeRemoved) {
        // removes a PRODUCT
        if (this.hasProduct(ProductToBeRemoved)) {
            var index = this.findIndexOfProduct(ProductToBeRemoved);
            if (this.items[index].count > 1) {
                // if count > 1 then decrement count & price
                this.items[index].count--;
                this.items[index].price -= ProductToBeRemoved.price;
            }
            else {
                // if count < 1 remove the entire ITEM
                this.items = this.items.splice(index-1, 1);
            }
        }
    }

    removeItem(product) {
        // removes the entire ITEM
        this.items = this.items.splice(pos, this.findIndexOfProduct(product));
    }

    getItem(product) {
        // gets the ITEM containing the PRODUCT
        var index = this.findIndexOfProduct(product);
        return this.items[index];
    }

    getTotal() {
        // gets the tootal price of all PRODUCTS
        var total = 0;
        this.items.forEach(item => total += item.price);
        return total;
    }
    clear() {
        // clears the cart of all PRODUCTS
        this.items = [];
    }
}


