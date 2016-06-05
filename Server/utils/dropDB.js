const mongoose = require('./mongoose');

mongoose.connection.on('open', () => {
   mongoose.connection.db.dropDatabase((err)=>{
       if (err) return console.log(err);
       console.log('dropDB successfully');
       mongoose.disconnect();
   }); 
});
