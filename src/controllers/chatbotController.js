import express from 'express';
require("dotenv").config()

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;
let test = (req, res) => {
    return res.send("again test")
}

let getWebHook = (req, res) => {

    let VERIFY_TOKEN = MY_VERIFY_TOKEN;
    
    console.log("WEBHOOK_RECEIVED");
    console.log(VERIFY_TOKEN);
    //parse
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    
    //check if mode and token are correct

    console.log('mode:',mode);
    console.log('token:',token);
    if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
      } else {
        console.error("WEBHOOK_VERIFICATION_FAILED");
        res.sendStatus(403);
      }
    } else {
      console.error("WEBHOOK_VERIFICATION_FAILED");
      res.sendStatus(403);
    }
}

let postWebHook = (req, res) => {  

    // Parse the request body from the POST
    let body = req.body;
  
    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {
  
      // Iterate over each entry - there may be multiple if batched
      body.entry.forEach(function(entry) {
  
        // Get the webhook event. entry.messaging is an array, but 
        // will only ever contain one event, so we get index 0
        let webhook_event = entry.messaging[0];
        console.log(webhook_event);


        
      });
  
      // Return a '200 OK' response to all events
      res.status(200).send('EVENT_RECEIVED');
  
    } else {
      // Return a '404 Not Found' if event is not from a page subscription
      res.sendStatus(404);
    }
  
  }

let callSendApi = (sender_psid, response) => {
    // Construct the message body
    let request_body = {
      "recipient": {
        "id": sender_psid
      },
      "message": response
    }
  
    // Send the HTTP request to the Messenger Platform
    request({
      "uri": "https://graph.facebook.com/v2.6/me/messages",
      "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
        console.log('message sent!')
      } else {
        console.error("Unable to send message:" + err);
      }
    }); 
  }

module.exports = {
    test: test,
    getWebHook:getWebHook,
    postWebHook:postWebHook,
    callSendApi:callSendApi

};