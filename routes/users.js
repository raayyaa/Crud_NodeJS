var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {


  connection.query("SELECT * FROM pizza", function(err, result, fields){
    if (err) throw err;
    console.log(result);
    result.forEach((row) =>{
      console.log('${row.DesignPizz} is at ${row.TarifPizz} with the number ${row.NroPizz}');

    });
    res.render('pizza', {title: "pizza", tablopizza: result});
  });
});

module.exports = router;
