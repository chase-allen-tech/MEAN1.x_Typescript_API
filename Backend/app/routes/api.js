const axios = require('axios');

module.exports = function(router) {

    router.get("/photo", async function(req, res) {
        const response = await axios.get('https://showcasetalk.com/api/photographer_time/245');        
        res.json({data: response.data.photographerProductTime});
    });

    router.post('/photo', async function(req, res) {
        const payload = req.body;

        payload.forEach(async element => {
            let d = JSON.stringify(element);
            let data = d.replace(/\"/g, "\\\"");
            let send_data = {"photographerProductTime": data};
            const response = await axios.post('https://showcasetalk.com/api/photographer_time/245', send_data);
            console.log("Sent POST ", send_data);
        });
    });

    return router;
}