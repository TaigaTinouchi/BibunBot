let https = require('http');
let AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient({
    region: 'ap-northeast-1'
});

exports.handler = (event, context, callback) => {

  let msg = event.events[0];
  console.log("event:", JSON.stringify(event, null, 2));
  if(msg.message.type=="text"){
    var input = msg.message.text;
    input = input.split(' ')
    while (True){
      if(input.indexOf("+")==-1){
        input = input.join('%20');
        break;
      }else{
        input[input.indexOf("+")] = "plus"
        input = input.join('%20');
      }
    }

    console.log(input)
    let URL = 'http://api.wolframalpha.com/v2/query'+'?appid=UPYUJJ-TY5QTUPUUV'+'&input=derivative%20of%20'+input+'&output=json';
    console.log(URL)
    https.get(URL, function (res) {
      var body = '';
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
        body += chunk;
      });
      res.on('data', function (chunk) {
        console.log("form WolframAplpha",body);
        // body の値を json としてパースしている
        try {
          res = JSON.parse(body||"null");
          dynamo.put({
          "TableName": "BibunBot",
            "Item": {
              "id":msg.message.id,
              "input":msg.message.text,
              "output":res.queryresult.pods[0].subpods[0].img.src,
              "userId":msg.source.userId,
              "replyToken":msg.replyToken
            }
        }, function( err, data ) {
          console.log("dynamo_err:", err);
          context.done(null, data);
        });
          //DynamoDB呼び出し
        } catch (e) {
          var resBody = JSON.stringify({
            "replyToken":msg.replyToken,
            "messages":[
              {
                "type":"text",
                "text":"エラーが発生しました。もう一度送信お願いします"
              }
            ]
          });
          var url ='https://api.line.me/v2/bot/message/reply';
          var opts = {
            host: 'api.line.me',
            path: '/v2/bot/message/reply',
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              "Authorization":"Bearer {mcBUN4ZGeFZb6IRSznzv0FkoFZkUrOqlk89Gc/MvYKEb/Ufz5/KD5Su5/HQCc+tRdu1jNw9ThNUM78eQ4BGIuJrKLk/WyxKWRBRLs4V3IsrNw+MzYXPeHCZaMX4U7jEG1P45f/CICErnBneEUUDEHQdB04t89/1O/w1cDnyilFU=}"
            },
            method: 'POST'
          };
          var req = https.request(opts, function(res){
            res.on('data', function(chunk){
              console.log(chunk.toString());
            }).on('error', function(e){
              console.log('ERROR: '+ e.stack);
            });
          });
          req.write(resBody);
          req.end();
        }



      })
    }).on('error', function (e) {
      console.log('waError',e.message);
    });
  }
  else{
    var resBody = JSON.stringify({
      "replyToken":msg.replyToken,
      "messages":[
        {
          "type":"text",
          "text":"言葉で語ってください"
        }
      ]
    });
    var url ='https://api.line.me/v2/bot/message/reply';
    var opts = {
      host: 'api.line.me',
      path: '/v2/bot/message/reply',
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization":"Bearer {mcBUN4ZGeFZb6IRSznzv0FkoFZkUrOqlk89Gc/MvYKEb/Ufz5/KD5Su5/HQCc+tRdu1jNw9ThNUM78eQ4BGIuJrKLk/WyxKWRBRLs4V3IsrNw+MzYXPeHCZaMX4U7jEG1P45f/CICErnBneEUUDEHQdB04t89/1O/w1cDnyilFU=}"
      },
      method: 'POST'
    };
    var req = https.request(opts, function(res){
      res.on('data', function(chunk){
        console.log(chunk.toString());
      }).on('error', function(e){
        console.log('ERROR: '+ e.stack);
      });
    });
    req.write(resBody);
    req.end();
  }
}

  
