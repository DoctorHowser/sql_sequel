/**
 * Created by danesmith on 11/16/15.
 */
var express = require('express');
var router = express.Router();

var path = require('path');
var bodyParser = require('body-parser');

var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/sql_sequel';

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({expanded: true}));

router.route('/users')
    .get(function(req, res){
        pg.connect(connectionString, function(err, client, done){
            var results = [];
            var query = client.query('SELECT * FROM users');

            query.on('row', function(row){
                results.push(row);
            });
            query.on('end', function(){
                client.end();
                return res.json(results);
            });
            if (err) {
                console.log(err);
            }
        })
    });

router.route('/dates')
    .get(function(req, res){
        var results =[];
        var user = req.query;
        console.log(user);

        pg.connect(connectionString, function(err, client, done){
            var query = client.query('SELECT users.name, addresses.*, orders.* FROM users ' +
                                    'JOIN orders ON orders.user_id = users.id ' +
                                        'JOIN addresses ON address_id = ship_address_id ' +
                                            'WHERE users.id = $1 AND orders.order_date > $2 AND orders.order_date < $3;',
                                                [user.id, user.dateStart, user.dateEnd]);
            query.on('row', function(row){
                results.push(row);
            });
            query.on('end', function(){
                client.end();
                return res.json(results);
            });
            if (err) {
                console.log(err);
            }
        })
    });

router.route('/addresses')
    .get(function(req, res){
        var user = req.query.user;
        var results =[];
        console.log(user);

        pg.connect(connectionString, function(err, client, done){
            var query = client.query('SELECT address_street, address_type, address_city, address_state, address_zip FROM addresses JOIN users ' +
                'ON addresses.user_id = users.id WHERE users.id = $1;', [user]);

            query.on('row', function(row){
                results.push(row);
            });
            query.on('end', function(){
                client.end();
                return res.json(results);
            });
            if (err) {
                console.log(err);
            }
        })
    });

router.get('/*', function (req, res){
    var file = req.params[0] || "assets/views/index.html";
    res.sendFile(path.join(__dirname, '../public' , file))
});

module.exports = router;