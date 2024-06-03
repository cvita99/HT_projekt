var express = require('express');
var router = express.Router();
const repo = require('../repository/shipments.repo');
const Error = require('../models/error.model');

router.get('/', function(req, res, next) {
    res.render('shipments', {
        title: 'Shipment Tracking',
        shipments: repo.shipments,
        sort: 'shipmentId',
        orderId_search: undefined,
        status_search: undefined,
        customerId_search: undefined
    });
});

router.post('/', function(req, res, next) {
    res.render('shipments', {
        title: 'Shipment Tracking',
        shipments: repo.getShipmentsSearch(req.body.sort, req.body.status, req.body.orderId, req.body.customerId),
        sort: req.body.sort,
        status_search: req.body.status,
        orderId_search: req.body.orderId,
        customerId_search: req.body.customerId
    });
    res.status(200);
});

// S ([0-9]{1,10}) ćemo se dodatno osigurati da je id 1-10 znamenkasti broj.
router.get('/:id([0-9]{1,10})', function(req, res, next) {
    let id = parseInt(req.params.id);
    let shipmentWithId = repo.getShipment(id);
    if (shipmentWithId) {
        res.render('shipment', {
            title: 'Info for ' + shipmentWithId,
            shipment: shipmentWithId
        });
    } else {
        res.status(404)
            .send("Are you guessing?");
    }
});

router.post('/:id([0-9]{1,10})', function(req, res, next) {
    try {
        repo.resultOfForm(req.body, true);
        res.status(200).redirect('/shipments');
    } catch (err) {
        res.render('addShipment', {
            title: "Add Shipment",
            error: JSON.stringify(err)
        });
    }
});

router.get('/add', function(req, res, next) {
    res.render('addShipment', { title: "Add shipment", error: undefined });
});

router.post('/add', function(req, res, next) {
    try{
        repo.resultOfForm(req.body);
        res.status(201).redirect('/shipments');
    }catch (err) {
        res.render('addShipment', {
            title: "Add Shipment",
            error: JSON.stringify(err)
        });
    }
});
module.exports = router;


