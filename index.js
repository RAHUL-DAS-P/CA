const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();



const app = express();
app.use(bodyParser.json());



app.get("/", async (req, res) => {
    try {
        const url1 = "https://dev.bharatversity.com/events/website/api/hosted-events-api/?limit=100&offset=00";
        const result1 = await axios.get(url1, {
            headers: {
                'Authorization': process.env.AUTH,
            }
        });
        event_ids = result1.data["results"];
        console.log(event_ids.length);
        for (let i = 0; i < event_ids.length; i++) {
            const url2 = `https://dev.bharatversity.com/events/website/api/registered-individuals-api/${event_ids[i].id}/?limit=&offset=&search=`;
            const result2 = await axios.get(url2, {
                headers: {
                    'Authorization': process.env.AUTH,
                }
            });
            if (result2.data["count"] > 0) {
                console.log(event_ids[i].id);
                console.log(result2.data.count);
                const participants = result2.data["results"];
                for (let j = 0; j < participants.length; j++) {
                    try {
                        if (participants[j]["extra_questions"] != []) {
                            console.log(participants[j]);
                            console.log(participants[j]["extra_questions"][0]["answer"]);
                        };
                    } catch {
                        console.log("error");
                    }
                }
            }

        };
    } catch (error) {
        res.send(error.response.data);
    }
    res.send("Hello World");
});

app.listen(process.env.PORT, () => {
    console.log('server started');
});