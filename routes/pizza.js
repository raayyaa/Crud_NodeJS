
var express = require('express');
var router = express.Router();
var formidable = require('formidable');
require('mv');
require('path');
require('fs');

router.get('/', function (req, res, next) {


    connection.query("SELECT * FROM pizza", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        result.forEach((row) => {
            console.log('${row.DesignPizz} is at ${row.TarifPizz} with the number ${row.NroPizz}');

        });
        res.render('pizzaboostrap', {title: "pizza", tablopizza: result});
    });
});

//get delete une pizza
router.get('/del/:id', function (req, res, next) {
    console.log("delete");
    connection.query("DELETE FROM pizza where NroPizz= " + req.params.id, function (err, result, fields) {
        res.redirect('/pizza');
    });//Fin connect
});//Fin function
//fin delete

//Afficher formualire add
router.get('/add', function (req, res, next) {
    console.log("add");
    res.render('add', {
        DesignPizz: '',
        TarifPizz: ''
    });
});
//fin affichage

router.post('/add1', function(req, res, next) {

    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields){
        var DesignPizz = req.body.DesignPizz ;
        var TarifPizz = req.body.TarifPizz ;

        connection.query("INSERT INTO pizza (DesignPizz, TarifPizz) VALUES ('"+DesignPizz+"','"+TarifPizz+"')", function (err,result){
            if(err) throw err;
            res.redirect('/pizza');

        });
    });

});


//Modifier Pizza
router.get('/update/:id', function(req, res, next) {

    connection.query("SELECT * FROM pizza WHERE NroPizz = "+req.params.id, function (err,result,fields){
        res.render('pizzaedit', {title:"pizza" , tablopizza: result });
    });

});

router.post('/update/:id', function(req, res, next){
    var NroPizz = req.params.id ;
    var DesignPizz = req.body.DesignPizz ;
    var TarifPizz = req.body.TarifPizz ;

    connection.query("update pizza set TarifPizz = "+TarifPizz+", DesignPizz = '"+DesignPizz+"' WHERE " +
        "NroPizz = "+req.params.id+"  ", function(err,result,fields){
        if(err) throw err;
        res.redirect('/pizza');
    });

});


/* info*/
router.get('/:id', function (req, res, next) {


    connection.query("SELECT * FROM pizza where NroPizz = " +req.params.id, function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        result.forEach((row) => {
            console.log('${row.DesignPizz} is at ${row.TarifPizz} with the number ${row.NroPizz}');

        });
        res.render('pizzaboostrap', {title: "pizza", tablopizza: result});
    });
});







module.exports = router;
