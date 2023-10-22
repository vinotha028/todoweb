//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");


const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


mongoose.connect("mongodb+srv://Vinotha:asd123@cluster0.1cheaih.mongodb.net/todolistdb");

const itemSchema={
  name:{
    type:String,
  }
};
const  Item=mongoose.model(
  "Item",itemSchema
);
const item1=new Item({
  name:"buy food",
});
const item2=new Item({
  name:" food",
});
const item3=new Item({
  name:"buy ",
});


const defaultItem=[item1,item2,item3];

const listSchema={
  name:String,
  item:[itemSchema]
}
const  List=mongoose.model("List",listSchema);



app.get("/", function(req, res) {

Item.find().then(function(foundItem){

  if(foundItem.length===0){
    Item.insertMany(defaultItem);
  }

  res.render("list", {listTitle: "Today", newListItems: foundItem});
});

});
app.post("/", function(req, res){

  const itemName= req.body.newItem;
  
  const item4=new Item({
    name:itemName,
  });
  item4.save();
  res.redirect("/");
});
app.post("/delete",(req,res)=>{
  const checkedId=req.body.checkbox;

  Item.findByIdAndRemove(checkedId).then(console.log("deleted successfuly")).catch((err)=>{console.log(err)});
   res.redirect("/");
 
});


/*
app.get("/:customListname",function(req,res){
  const customListname=req.params.customListname;
  List.findOne({name:customListname}).then((foundList)=>
  {
   
      if(!foundList){
        const list=new List({
          name:customListname,
          items:defaultItem
        });

        List.insertMany(list);
        res.redirect("/"); 
      }
      else
      {
        res.render("list",{listTitle:foundList.name,newListItems:foundList.items});
      }
}).catch((err)=>console.log(err));
    
});*/

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
