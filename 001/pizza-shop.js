class PizzaShop  {
    constructor(){
        this.orderNumber = 0
    }

    order(){
        this.orderNumber++
    }

    displayOrderNumber(){
        console.log(`Current order number ${this.orderNumber}`);
    }
}

module.exports =PizzaShop