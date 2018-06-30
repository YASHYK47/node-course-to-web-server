const express=require('express');
const hbs=require('hbs');
const fs=require('fs');

var app=express();
const port=process.env.PORT||3000;

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
  var date=new Date().toString();
  var log=`${date}:${req.method}${req.url}`;
  console.log(log);
  fs.appendFile('server.log',log+'\n',(err)=>{
    if(err){console.log('Unable to append');}
  });
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintain.hbs');
// });

hbs.registerHelper('currentYear',()=>{
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
res.render('home.hbs',{
  msg:'Welcome,Lets Have Some Fun ',
  name:'yash-yk47',
  pgtitle:'New Page'
});
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle:'About Page Title'
  });
});
app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'unable to handle request'
  });
});
app.listen(port,()=>{
  console.log(`Server is up on localhost port ${port}`);
});
