const express = require('express');
const bodyParser = require('body-parser');
const bfhlRoutes = require('./src/routes/bfhlRoutes');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use('/bfhl', bfhlRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
