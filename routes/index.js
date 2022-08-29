var express = require('express');
var router = express.Router();
const usermodel=require('./users')
const productmodel=require('./product')
var passport = require('passport')
var passportLocal=require('passport-local');
passport.use(new passportLocal(usermodel.authenticate()))


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup',function(req, res, next) {
  res.render('signup')
})

router.post('/register', function(req, res){
  var newuser=new usermodel({
    name:req.body.name,
    username:req.body.username
  })
  usermodel.register(newuser,req.body.password)
  .then(function(u){
    passport.authenticate('local')(req, res,function(){
      res.redirect('/profile')
    })
    }).catch(function(err){
      res.send(err)
  })
});

router.get('/profile',isLoggedIn,function(req,res){
  usermodel.findOne({username:req.session.passport.user})
  .then(function(loggedinuser){
    productmodel.find()
    .then(function(allproducts){
      res.render('profile',{allproducts,loggedinuser})
    })
  })
})

router.get('/cart/:id',function(req,res){
  usermodel.findOne({username:req.session.passport.user})
  .populate('postid')
  .then(function(addeditem){
    res.render('cart',{addeditem})
  })
})

router.get('/addtocart/:id',function(req,res){
  usermodel.findOne({username:req.session.passport.user})
  .then(function(loggedinuser){
    loggedinuser.postid.push(req.params.id)
    loggedinuser.save()
    .then(function(added){
      res.redirect(req.headers.referer)
    })
  })
})

router.get('/bb/:id',function(req,res){
  usermodel.findOne({username:req.session.passport.user})
  .then(function(loggedinuser){
    var index = loggedinuser.postid.indexOf(req.params.id);
    if (index !== -1) {
      loggedinuser.postid.splice(index, 1);
    }
      // loggedinuser.postid.splice(req.params.id)
    loggedinuser.save()
    .then(function(added){
      res.redirect(req.headers.referer)
    })
  })
})

router.get('/aa/:id',function(req,res){
  usermodel.findOne({username:req.session.passport.user})
  .then(function(loggedinuser){
    loggedinuser.postid.push(req.params.id)
    loggedinuser.save()
    .then(function(added){
      res.redirect(req.headers.referer)
    })
  })
})


// router.get('/profile',isLoggedIn,function(req,res){
//   usermodel.findOne({username:req.session.passport.user})
//   .then(function(loggedinuser){
//     res.render('profile',{loggedinuser})
//   })
// })

function isLoggedIn(req,res,next)
{if(req.isAuthenticated()){
  return next();
}
else{
 res.redirect('/')
}}

router.get('/log',function(req,res){
  res.render('log')
})

router.post('/login',passport.authenticate('local',{
  successRedirect:'/profile',
  failureRedirect:'/'
}),function(req,res){})

router.get("/logout", (req, res) => {
  req.logout(function(err){
    if(err){return next(err);}
    res.redirect('/')
  });
});

router.get('/rp',function(req,res){
  res.render('rp')
})

router.post('/rpp',function(req,res){
  productmodel.create({
    name:req.body.name,
    description:req.body.description,
    price:req.body.price,
    photo:req.body.photo
  }).then(function(show){
    res.send(show)
  })
})

router.get('/AC',function(req,res){
  productmodel.findOne({name:'AC'})
  .then(function(adata){
    res.render('sidee',{adata})
  })
})
router.get('/refregerator',function(req,res){
  productmodel.find({name:'refregerator'})
  .then(function(adata){
    res.render('side',{adata})
  })
})
router.get('/microwave',function(req,res){
  productmodel.find({name:'Microwave'})
  .then(function(adata){
    res.render('side',{adata})
  })
})
router.get('/washingmachine',function(req,res){
  productmodel.find({name:'Washing machine'})
  .then(function(adata){
    res.render('side',{adata})
  })
})
router.get('/watch',function(req,res){
  productmodel.find({name:'Watch'})
  .then(function(adata){
    res.render('side',{adata})
  })
})
module.exports = router;
