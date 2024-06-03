const OrderRefTypeClass = class OrderRefTpye {
    constructor(id, href, name, referredType) {
        this.id = id;
        this.href = href;
        this.name = name;
        this.referredType = referredType;
    }
    
    get formattedOrderRef() {
        return `${this.id},  ${this.name}`;
    }
};

OrderRefTypeClass.prototype.toString = function() {
    return this.formattedOrderRef;
}

module.exports = OrderRefTypeClass;
