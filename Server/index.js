const app = require('./src/app');

require('dotenv').config();

const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});
