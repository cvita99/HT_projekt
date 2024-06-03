const ShipmentTrackingClass = class ShipmentTracking{
    constructor(
        id, carrier, trackingCode, carrierTrackingUrl, trackingDate, status, statusChangeDate,
        statusChangeReason, weight, estimatedDeliveryDate, addressFrom, addressTo, order, relatedCustomer, createDate
    ) {
        this.id = id;
        this.carrier = carrier;
        this.trackingCode = trackingCode;
        this.carrierTrackingUrl = carrierTrackingUrl;
        this.trackingDate = trackingDate;
        this.status = status; //pretraga po statusu, tip: string
        this.statusChangeDate = statusChangeDate;
        this.statusChangeReason = statusChangeReason;
        this.weight = weight;
        this.estimatedDeliveryDate = estimatedDeliveryDate;
        this.addressFrom = addressFrom;
        this.addressTo = addressTo;
        this.order = order; //pretraga po orderIdu, tip: OrderRefType
        this.relatedCustomer = relatedCustomer;  //pretraga po customerIdu, tip: CustomerRefType
        this.createDate = createDate;
    }
    
    get formattedTrackingInfo() {
        return `Shipment ID: ${this.id}\n
        Carrier: ${this.carrier}\nTracking Code: ${this.trackingCode}\nCarrier Tracking URL: ${this.carrierTrackingUrl}\nTracking Date: ${this.trackingDate}\nStatus: ${this.status}\nStatus Change Date: ${this.statusChangeDate}\nStatus Change Reason: ${this.statusChangeReason}\nWeight: ${this.weight}\nEstimated Delivery Date: ${this.estimatedDeliveryDate}\nAddress From:\n${this.addressFrom}\nAddress To:\n${this.addressTo}\nOrder: ${this.order}\nRelated Customer:\n${this.relatedCustomer}\nCreate Date: ${this.createDate}`;
    }
};

ShipmentTrackingClass.prototype.toString = function() {
    return this.formattedTrackingInfo;
};

module.exports = ShipmentTrackingClass;