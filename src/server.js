require("dotenv").config()
import express from 'express'
import configViewEngine from './config/viewEngine'
import initWebRoutes from './routes/web'
import bodyParser from 'body-parser'

let app = express();

configViewEngine(app);

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

initWebRoutes(app);

let port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);

    app._router.stack.forEach(function(r){
        if (r.route && r.route.path){
          console.log(r.route.path)
        }
      })
    });