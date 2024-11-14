import express from "express";
// import homePageController from "../controllers/homePageController";
import chatbotController from "../controllers/chatbotController";

let router = express.Router();

let initWebRoutes = (app) => {
  
  // router.get("/", homePageController.getHomePage)
  router.get("/", chatbotController.test)

  router.get("/webhook", chatbotController.getWebHook)
  router.post("/webhook", chatbotController.postWebHook)
  


  

  return app.use("/",router)
}

module.exports = initWebRoutes;

