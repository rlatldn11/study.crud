var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var conn = mysql.createConnection({
  host:"localhost",
  user:"ong",
  password:"package.json",
  database:'kim'
});

conn.connect(function(err){
  if(err){
    throw err;
  }
  console.log('DB Connection Success');
  
});

/* GET home page. */
router.get('/', function(req, res, next) {
  var sql = "SELECT * FROM books";
  conn.query(sql, function(err, row){
    if(err){
      throw err;
    }
    res.render('index',{page:'./sub/books.ejs',data: row});
  });
});

router.post('/addBook', function(req, res, next) {

  var sql = "SELECT * FROM books WHERE bookName = ?";
  conn.query(sql,[req.body.bookName] ,function(err, row){
    if(err){
      throw err;
    }
    // res.send(req.body);
    if(row.length === 0){
      var sql = "INSERT INTO books(bookName, booksQty, booksPrice, booksImg)VALUES (?,?,?,?)";
      conn.query(sql,[req.body.bookName,req.body.bookQty, req.body.bookPrice, req.body.bookImg],function(err,result){
        if(err){
          throw err;
        }
        if(result){
          res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
          res.write("<script>alert('도서 등록이 완료되었습니다!');location.href='/books'</script>")
        }
        else{
          res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.write("<script>alert('도서등록에 실패했습니다!');history.back();</script>")
        }
      });
    }else{
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.write("<script>alert('중복된 도서입니다!');history.back();</script>")
    }
  });

});
router.post('/modify',function(req,res){
  var sql = "UPDATE books SET ? WHERE booksNo = ?";
  conn.query(sql,[req.body, req.body.booksNo], function(err,result){
    if(err){
      throw err;
    }
    if(result){
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.write("<script>alert('도서 수정이 완료되었습니다!');location.href='/books'</script>")
    }
    else{
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write("<script>alert('도서수정에 실패했습니다!');history.back();</script>")
    }
  });
});

router.get('/siwoowifi/:id',function(req,res){
  var id = req.params.id;
  var sql = "DELETE FROM books WHERE booksNo = ?"
  conn.query(sql, [id], function(err, result){
    if(err){
      throw err;
    }
    if(result){
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.write("<script>alert('도서 삭제가 완료되었습니다!');location.href='/books'</script>")
    }
    else{
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.write("<script>alert('도서삭제에 실패했습니다!');history.back();</script>")
    }
  })
})
module.exports = router;
