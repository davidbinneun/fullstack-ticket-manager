const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.static("client/build"));

const ticketSchema = new mongoose.Schema({
    title: String,
    content: String,
    userEmail: String,
    done: Boolean,
    creationTime: Number,
    labels: [String]
  });
  ticketSchema.index({title: 'text'});
  const Ticket = mongoose.model('Ticket', ticketSchema);

  app.get("/", (req, res) => {
    res.sendFile('index.html');
  });
  
  app.get("/api/tickets", async (req, res) => {
    let { searchText } = req.query;
  
    if (searchText){
      let tickets = await Ticket.find( { title: { $regex: searchText, $options: "i" } } );
      return res.json(tickets).status(200);
    }
  
    let tickets = await Ticket.find({});
    res.json(tickets).status(200);
  });
  
  app.patch("/api/tickets/:ticketId/done", async (req, res) => {
    await Ticket.findOneAndUpdate({_id: req.params.ticketId}, {done: true}, {
      returnOriginal: false
    }); 
    res.json({updated: true}).status(200);
  });
  
  app.patch("/api/tickets/:ticketId/undone", async (req, res) => {
    await Ticket.findOneAndUpdate({_id: req.params.ticketId}, {done: false}, {
      returnOriginal: false
    }); 
    res.json({updated: true}).status(200);
  });
  
module.exports = app;
