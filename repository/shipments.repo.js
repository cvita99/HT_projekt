const Address = require('../models/address.model');
const CustomerRefType = require('../models/customerRefType.model');
const OrderRefType = require('../models/orderRefType.model');
const ShipmentTracking = require('../models/shipmentTracking.model');

const ShipmentStatus = {
    initialized: "initialized",
    inProcess: "inProcess",
    processed: "processed",
    shipped: "shipped",
    inCustoms: "inCustoms",
    delivered: "delivered",
    returned: "returned",
    error: "error"
};

class ShipmentRepository {
    constructor() {
        this.seedRepo();
    }
    getRandomShipmentStatus() {
        const statusValues = Object.values(ShipmentStatus);
        const randomIndex = Math.floor(Math.random() * statusValues.length);
        return statusValues[randomIndex];
    }
    addCustomer(customer) {
        for(let i=0; i < this.customers.length; i++){
            if(this.customers[i].id == customer.id){
                this.customers[i] = customer;
                return customer;
            }    
        }
        //let newCustomer = new CustomerRefType(customer.id, customer.href, customer.name, customer.description);
        this.customers.push(customer);
        return customer;
    }
    addAddress(address) {
        for(let i=0; i < this.addresses.length; i++){
            if(this.addresses[i].id == address.id){
                this.addresses[i] = address;
                return address;
            }    
        }
        //let newAddress = new Address(address.id, address.streetNr, address.streetName, address.streetSuffix, address.postcode, address.city, address.country);
        this.addresses.push(address);
        return address;
    }
    addOrder(order){
        for(let i=0; i < this.orders.length; i++){
            if(this.orders[i].id == this.orders.id){
                this.orders[i] = order;
                return order;
            }    
        }
        //let newOrder =  new OrderRefType(order.id, order.href, order.name, order.referredType);
        this.orders.push(order);
        return order;
    }
    addShipment(id, carrier, trackingCode, carrierTrackingUrl, trackingDate, status, statusChangeDate,
        statusChangeReason, weight, estimatedDeliveryDate, addressFrom, addressTo, order, relatedCustomer, createDate) {
            for(let i=0; i < this.shipments.length; i++){
                if(this.shipments[i].id == id){
                    console.log("greska");
                    throw new Error(err);
                }    
            }
            const newShipment = new ShipmentTracking(
                id, carrier, trackingCode, carrierTrackingUrl, trackingDate, status, statusChangeDate,
                statusChangeReason, weight, estimatedDeliveryDate, this.addAddress(addressFrom), this.addAddress(addressTo), this.addOrder(order), this.addCustomer(relatedCustomer), createDate
            );
            this.shipments.push(newShipment);
    }
    updateShipment(id, carrier, trackingCode, carrierTrackingUrl, trackingDate, status, statusChangeDate,
        statusChangeReason, weight, estimatedDeliveryDate, addressFrom, addressTo, order, relatedCustomer, createDate){
            for(let i=0; i < this.shipments.length; i++){
                if(this.shipments[i].id == id){
                    const newShipment = new ShipmentTracking(
                        id, carrier, trackingCode, carrierTrackingUrl, trackingDate, status, statusChangeDate,
                        statusChangeReason, weight, estimatedDeliveryDate, this.addAddress(addressFrom), this.addAddress(addressTo), this.addOrder(order), this.addCustomer(relatedCustomer), createDate
                    );
                    this.shipments[i] = newShipment;
                    return;
                }    
            }
    }
    sortby(elem, lista){
        for(let i=0; i < lista.length; i++){
            for(let j=i+1; j < lista.length; j++){
                if(elem == "status"){
                    if(lista[i].status > lista[j].status){
                        let pom = lista[i];
                        lista[i] = lista[j];
                        lista[j] = pom;
                        
                    }    
                }
                if(elem == "orderId"){
                    if(parseInt(lista[i].order.id) > parseInt(lista[j].order.id)){
                        let pom = lista[i];
                        lista[i] = lista[j];
                        lista[j] = pom;
                        
                    }    
                }
                if(elem == "customerId"){
                    if(parseInt(lista[i].relatedCustomer.id) > parseInt(lista[j].relatedCustomer.id)){
                        let pom = lista[i];
                        lista[i] = lista[j];
                        lista[j] = pom;
                        
                    }    
                }
            }
        }
        return lista;
    }
    getShipmentsSearch(sortbyelem, status, orderId, customerId){
        var resultOfSearch = [];
        for(let i=0; i < this.shipments.length; i++){
            resultOfSearch.push(this.shipments[i]);
            if(customerId && this.shipments[i].relatedCustomer.id !=  customerId){
                resultOfSearch.pop();
                continue;
            }
            if(status && this.shipments[i].status !=  status){
                resultOfSearch.pop();
                continue;
            }
            if(orderId && this.shipments[i].order.id !=  orderId){
                resultOfSearch.pop();
                continue;
            }
        }
        return this.sortby(sortbyelem, resultOfSearch);
    }
    getShipment(id){
        let result;
        for(let i=0; i < this.shipments.length; i++){
            if(this.shipments[i].id == id){
                result = this.shipments[i];
                break;
            }    
        }
        return result;
    }
    resultOfForm(podaci, update){
        var addressFrom = new Address(
            podaci.addressFromId,
            podaci.streetNrFrom,
            podaci.streetNameFrom,
            podaci.streetSuffixFrom,
            podaci.postcodeFrom,
            podaci.cityFrom,
            podaci.countryFrom
        );
        
        var addressTo = new Address(
            podaci.addressToId,
            podaci.streetNrTo,
            podaci.streetNameTo,
            podaci.streetSuffixTo,
            podaci.postcodeTo,
            podaci.cityTo,
            podaci.countryTo
        );
        
        var order = new OrderRefType(
            podaci.orderId,
            podaci.orderHref,
            podaci.orderName,
            podaci.orderReferredType
        );
        
        var customer = new CustomerRefType(
            podaci.customerId,
            podaci.customerHref,
            podaci.customerName,
            podaci.customerDescription
        );
        if(update){
            this.updateShipment(
                podaci.id,
                podaci.carrier,
                podaci.trackingCode,
                podaci.carrierTrackingUrl,
                podaci.trackingDate,
                podaci.status,
                podaci.statusChangeDate,
                podaci.statusChangeReason,
                podaci.weight,
                podaci.estimatedDeliveryDate,
                addressFrom,
                addressTo,
                order,
                customer,
                new Date()
            ); 
            return;
        }
        this.addShipment(
            podaci.id,
            podaci.carrier,
            podaci.trackingCode,
            podaci.carrierTrackingUrl,
            podaci.trackingDate,
            podaci.status,
            podaci.statusChangeDate,
            podaci.statusChangeReason,
            podaci.weight,
            podaci.estimatedDeliveryDate,
            addressFrom,
            addressTo,
            order,
            customer,
            new Date()
        );        
    }
  
  
    /************ Seeding repo below: ****************/
    seedRepo() {
        this.seedAddress();
        this.seedCustomer();
        this.seedOrders();
        this.seedShipment();
    }
    seedAddress() {
        this.addresses = [
            new Address("1", "1", "Ilica", "ulica", "10000", "Zagreb", "Hrvatska"),
            new Address("2", "23", "Radnička", " cesta", "10000", "Zagreb", "Hrvatska"),
            new Address("3", "55", "Vukovarska", " ulica", "21000", "Split", "Hrvatska"),
            new Address("4", "78", "Zagrebačka", " avenija", "31000", "Osijek", "Hrvatska"),
            new Address("5", "12", "Obala kneza Branimira", "obala", "23000", "Zadar", "Hrvatska"),
            new Address("6", "34", "Strossmayerova", " ulica", "51000", "Rijeka", "Hrvatska"),
            new Address("7", "5", "Trg bana Jelačića", "trg", "42000", "Varaždin", "Hrvatska"),
            new Address("8", "7", "Frankopanska", " ulica", "35000", "Slavonski Brod", "Hrvatska"),
            new Address("9", "19", "Petra Krešimira IV", " ulica", "47000", "Karlovac", "Hrvatska"),
            new Address("10", "41", "Rudolfa Kolaka", " ulica", "49000", "Koprivnica", "Hrvatska")
        ];
    }
    seedCustomer() {
        this.customers = [
            new CustomerRefType("1", "http://example.com/customer/1", "Ivan Horvat", "Redoviti kupac"),
            new CustomerRefType ("2", "http://example.com/customer/2", "Ana Kovač", "Premium član"),
            new CustomerRefType ("3", "http://example.com/customer/3", "Marko Babić", "Novi kupac"),
            new CustomerRefType ("4", "http://example.com/customer/4", "Luka Marić", "Čest kupac"),
            new CustomerRefType("5", "http://example.com/customer/5", "Petra Novak", "Povremeni kupac"),
            new CustomerRefType("6", "http://example.com/customer/6", "Iva Jurić", "VIP kupac"),
            new CustomerRefType("7", "http://example.com/customer/7", "Karlo Pavlić", "Vjerni kupac"),
            new CustomerRefType("8", "http://example.com/customer/8", "Maja Tomić", "Kupac prvi put"),
            new CustomerRefType("9", "http://example.com/customer/9", "Nikola Knežević", "Čest povratnik"),
            new CustomerRefType("10", "http://example.com/customer/10", "Sara Petrović", "Povremeni posjetitelj"),
            new CustomerRefType("11", "http://example.com/customer/11", "Viktorina Vuković", "Redoviti sudionik"),
            new CustomerRefType("12", "http://example.com/customer/12", "Zvonimir Šimić", "Dugogodišnji kupac"),
            new CustomerRefType("13", "http://example.com/customer/13", "Ema Grgić", "Sezonski kupac"),
            new CustomerRefType("14", "http://example.com/customer/14", "Davor Krnić", "Čest kupac"),
            new CustomerRefType("15", "http://example.com/customer/15", "Ivana Brkić", "Novi član"),
            new CustomerRefType("16", "http://example.com/customer/16", "Nina Stojanović", "VIP član"),
            new CustomerRefType("17", "http://example.com/customer/17", "Toni Radić", "Povremeni kupac"),
            new CustomerRefType("18", "http://example.com/customer/18", "Katarina Blažević", "Dugogodišnji član"),
            new CustomerRefType("19", "http://example.com/customer/19", "Matej Anić", "Čest posjetitelj"),
            new CustomerRefType("20", "http://example.com/customer/20", "Lara Čović", "Novi posjetitelj")
        ];
    }
    seedOrders(){
        this.orders = [
            new OrderRefType("1", "http://example.com/order/1", "Narudžba 1", "Online"),
            new OrderRefType("2", "http://example.com/order/2", "Narudžba 2", "In-store"),
            new OrderRefType("3", "http://example.com/order/3", "Narudžba 3", "Online"),
            new OrderRefType("4", "http://example.com/order/4", "Narudžba 4", "In-store"),
            new OrderRefType("5", "http://example.com/order/5", "Narudžba 5", "Online"),
            new OrderRefType("6", "http://example.com/order/6", "Narudžba 6", "In-store"),
            new OrderRefType("7", "http://example.com/order/7", "Narudžba 7", "Online"),
            new OrderRefType("8", "http://example.com/order/8", "Narudžba 8", "In-store"),
            new OrderRefType("9", "http://example.com/order/9", "Narudžba 9", "Online"),
            new OrderRefType("10", "http://example.com/order/10", "Narudžba 10", "In-store")
        ];
    }
    seedShipment() {
        this.shipments = [];
        for (let i = 1; i <= 30; i++) {
            const addressFrom = this.addresses[Math.floor(Math.random() * this.addresses.length)];
            const addressTo = this.addresses[Math.floor(Math.random() * this.addresses.length)];
            const relatedCustomer = this.customers[Math.floor(Math.random() * this.customers.length)];
            const order = this.orders[Math.floor(Math.random() * this.orders.length)];
            const status = this.getRandomShipmentStatus();
            const datum = 10 + Math.floor((Math.random() * 20));
            this.shipments.push(new ShipmentTracking(
                `${i}`, `Carrier${i}`, `TrackingCode${i}`, `http://carrier.com/track/${i}`, `2024-05-${datum}`, status, `2024-05-${datum}`,
                `StatusChangeReason${i}`, `${i}kg`, `2024-06-${datum}`, addressFrom, addressTo, order, relatedCustomer, `2024-04-${i}`
            ));
        }
    }
}

const repoInstance = new ShipmentRepository();

module.exports = repoInstance;