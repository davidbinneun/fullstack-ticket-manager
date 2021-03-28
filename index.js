require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");
const env = process.env.NODE_ENV || "production";
const MONGO_URI =
  env === "test" ? process.env.TEST_MONGO_URI : process.env.MONGO_URI;
const PORT = process.env.PORT || 8080;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`connected to MongoDB - ${env}`);
    app.listen(PORT, () =>
      console.log(`app listening at http://localhost:${PORT}`)
    );
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

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

app.get("/api/tickets", async (req, res) => {
  let { searchText } = req.query;
  if (searchText){
    let tickets = await Ticket.find( { $text: { $search: searchText } } );
    return res.send(tickets).status(200);
  }

  let tickets = await Ticket.find({});
  res.send(tickets).status(200);
});

app.patch("/api/tickets/:ticketId/done", async (req, res) => {
  await Ticket.findOneAndUpdate({_id: req.params.ticketId}, {done: true}, {
    returnOriginal: false
  }); 
  res.send({updated: true}).status(200);
});

app.patch("/api/tickets/:ticketId/undone", async (req, res) => {
  await Ticket.findOneAndUpdate({_id: req.params.ticketId}, {done: false}, {
    returnOriginal: false
  }); 
  res.send({updated: true}).status(200);
});
