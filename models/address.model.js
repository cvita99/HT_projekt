const AddressClass =
    class Address {
        constructor(id, streetNr, streetName, streetSuffix, postcode, city, country) {
            this.id = id;
            this.streetNr = streetNr;
            this.streetName = streetName;
            this.streetSuffix = streetSuffix;
            this.postcode = postcode;
            this.city = city;
            this.country = country;
        }
        get formattedAddress() {
            return this.streetName + this.streetSuffix +  " " +this.streetNr
            + ", " + this.city;
        }
    };

AddressClass.prototype.toString = function() {
    return this.formattedAddress;
}

module.exports = AddressClass;

