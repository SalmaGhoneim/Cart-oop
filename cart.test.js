/*
* Requirements & imports
* @author: Salma Ghoneim
*/

var assert = require('assert');
import { cart, product } from './cart';

/*
* initializeing needed variable for tests 
*/
var Cart = new cart();
// first product takes id 0
var prod1a = new product({ name: 'p1', price: 100 });
// this product is specified to have id 0
var prod1b = new product({ name: 'p1', price: 100, id: 0 });
// second product takes id 1
var prod2 = new product({ name: 'p2', price: 200 });

describe('Adding to a Cart', () => {
    /*
     * Tests for all cases on adding a product to a Cart
     *
     * @author: Salma Ghoneim
     */
    before('should create a new item if the same product hasn\'t been added before', (done) => {
        Cart.addItem(prod1a);
        assert.equal(Cart.hasProduct(prod1a), true);
        assert.equal(Cart.items.length, 1);
        assert.equal(Cart.findIndexOfProduct(prod1a), 0);
        assert.equal(Cart.items[0].product, prod1a);
        assert.equal(Cart.items[0].count, 1);
        assert.equal(Cart.items[0].price, prod1a.price);

        done();
    });
    it('should add to the count and to the price if the same product exists', (done) => {
        Cart.addItem(prod1b);
        assert.equal(Cart.hasProduct(prod1b), true);
        assert.equal(Cart.items.length, 1);
        assert.equal(Cart.findIndexOfProduct(prod1b), 0);
        assert.equal(Cart.items[0].product, prod1a);
        assert.equal(Cart.items[0].count, 2);
        assert.equal(Cart.items[0].price, 2 * prod1a.price);
        done();
    });
    it('should create a new item if the same product hasn\'t been added before', (done) => {
        Cart.addItem(prod2);
        assert.equal(Cart.hasProduct(prod2), true);
        assert.equal(Cart.items.length, 2);
        assert.equal(Cart.findIndexOfProduct(prod2), 1);
        assert.equal(Cart.items[1].product, prod2);
        assert.equal(Cart.items[1].count, 1);
        assert.equal(Cart.items[1].price, prod2.price);
        done();
    });

})
describe('Removing from the Cart', () => {
    /*
    * Tests for all cases on removing a product to a Cart
    *
    * @author: Salma Ghoneim
    */
    it('should decrement count and change price if we remove a product of an item of count > 0', (done) => {
        Cart.removeProduct(prod1b);
        assert.equal(Cart.hasProduct(prod1b), true);
        assert.equal(Cart.items.length, 2);
        assert.equal(Cart.items[0].product, prod1a);
        assert.equal(Cart.items[0].count, 1);
        assert.equal(Cart.items[0].price, prod1b.price);
        done();
    });
    it('should completly remove an item if it has only 1 count', (done) => {
        Cart.removeProduct(prod2);
        assert.equal(Cart.hasProduct(prod2), false);
        assert.equal(Cart.items.length, 1);
        done();
    })

});
describe('Getting the total of all items', () => {
    /*
    * Test for getting the total price of a Cart
    *
    * @author: Salma Ghoneim
    */
    it('should sum up all prices in all items', (done) => {
        Cart.addItem(prod2);
        Cart.addItem(prod1b);
        assert.equal(Cart.findIndexOfProduct(prod2), 1);
        assert.equal(Cart.items[1].count, 1);
        assert.equal(Cart.findIndexOfProduct(prod1a), 0);
        assert.equal(Cart.items[0].count, 2);
        let totalShouldBe = 1 * prod2.price + 2 * prod1a.price;
        assert.equal(Cart.getTotal(), totalShouldBe);
        done();
    })
})
describe('Clearing the Cart', () => {
        /*
        * Test for clearing a Cart
        *
        * @author: Salma Ghoneim
        */
    it('should erase all items', (done) => {
        Cart.clear();
        assert.equal(Cart.hasProduct(prod2), false);
        assert.equal(Cart.hasProduct(prod1a), false);
        assert.equal(Cart.getTotal(), 0);
        assert.equal(Cart.items.length, 0);
        done();
    })
});





