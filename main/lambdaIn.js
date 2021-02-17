let https = require('https');
let AWS = require('aws-sdk');
let lambda = AWS.lambda({apiVersion:'2020-5-31'})

class LINE{
  function lineSender(Message,ReplyToken){
    let resBody = JSON.stringify({
      "replyToken":ReplyToken,
      "messages":Message
    });
    let url = 'https://api.line.me/v2/bot/message/reply';
    let opts = {
      host: 'api.line.me',
      path: '/v2/bot/message/reply',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization":"Bearer {mcBUN4ZGeFZb6IRSznzv0FkoFZkUrOqlk89Gc/MvYKEb/Ufz5/KD5Su5/HQCc+tRdu1jNw9ThNUM78eQ4BGIuJrKLk/WyxKWRBRLs4V3IsrNw+MzYXPeHCZaMX4U7jEG1P45f/CICErnBneEUUDEHQdB04t89/1O/w1cDnyilFU=}"
      },
      method: 'POST'
    };
    let req = https.request(opts, function(res){
      res.on('data', function(chunk){
        console.log(chunk.toString());
      }).on('error', function(e){
        console.log('ERROR: '+ e.stack);
      });
    });
    if(msg.mode=="active"){
      req.write(resBody);
      req.end();
    }
  }


  function TexSep(){
    //TEX
    //送信内容
    let sendMes = JSON.stringify(msg.message.text,null, 2)
    //lambda呼び出し用params


  }
}


exports.handler = (event, context, callback) => {

    let date = new Date();
    let time1 = date.getTime();
    let unixtime_sec = Math.floor(time1 / 1000);
    let msg = event.events[0];

    console.log("event:", JSON.stringify(event, null, 2));

    if(msg.message.type=="text"){
      let input = msg.message.text;
      let URL = 'http://api.wolframalpha.com/v2/query'+'?input='+input+'&appid=UPYUJJ-TY5QTUPUUV';
      https.get(URL, function (res) {
        var body = '';
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
          body += chunk;
        });
        res.on('data', function (chunk) {
          // body の値を json としてパースしている
          res = JSON.parse(body);
          dynamo.put({
            "TableName": "BibunBot",
              "Item": {
                  "id":msg.message.id,
                "input":msg.message.text,
                "output":res,
                "userId":msg.source.userId,
                "replyToken":msg.replyToken
              }
          }, function( err, data ) {
              console.log("dynamo_err:", err);
              context.done(null, data);
          });
          //DynamoDB呼び出し
        })
      }).on('error', function (e) {
        console.log(e.message);
      });
    }
    else{
      sendingMsg = [
        {
          "type":"text",
          "text":"言葉で語ってください"
        }
      ]
      LINE.lineSender(sendingMsg,msg.replyToken);
    }
  }

  /*event内容
  {
    "destination": "xxxxxxxxxx",
    "events": [
      {
        "replyToken": "0f3779fba3b349968c5d07db31eab56f",
        "type": "message",
        "mode": "active",
        "timestamp": 1462629479859,
        "source": {
          "type": "user",
          "userId": "U4af4980629..."
        },
        "message": {
          "id": "325708",
          "type": "text",
          "text": "Hello, world"
        }
      },
      {
        "replyToken": "8cf9239d56244f4197887e939187e19e",
        "type": "follow",
        "mode": "active",
        "timestamp": 1462629479859,
        "source": {
          "type": "user",
          "userId": "U4af4980629..."
        }
      }
    ]
  }
  */
  https.get(URL, function (res) {
      var body = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          body += chunk;
      });
      res.on('data', function (chunk) {
          // body の値を json としてパースしている
          res = JSON.parse(body);
          console.log(`現在のレートは${res.rate}円/Bitcoinだよ！！`);
      })
    }).on('error', function (e) {
      console.log(e.message);
  });
