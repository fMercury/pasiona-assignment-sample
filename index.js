let express = require('express'),
    app = express(),
    hostname = '127.0.0.1',
    port = process.env.NODE_PORT || 5000;


//////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', "*");
    next();
});

app.use('/',
    (req, res) => res.json('version:' + '0001')
);

app.use((req, res) => res.status(404).send({ url: req.originalUrl + 'NOT FOUND' }));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error code: E01');
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`)
})

module.exports = app;