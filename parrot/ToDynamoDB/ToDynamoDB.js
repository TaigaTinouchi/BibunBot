let AWS = require('aws-sdk');
let dynamo = new AWS.DynamoDB.DocumentClient({
    region: 'ap-northeast-1'
});
var https = require('https');

exports.handler = (event, context, callback) => {

    var date = new Date();
    var time1 = date.getTime();
    var unixtime_sec = Math.floor(time1 / 1000);
    var msg = event.events[0];

    console.log("event:", JSON.stringify(event, null, 2));

    if(msg.message.type=="message"){
        dynamo.put({
          "TableName": "BibunBot",
            "Item": {
                "id":msg.message.id,
              "text":msg.message.text,
              "userId":msg.source.userId,
              "replyToken":msg.replyToken
            }
        }, function( err, data ) {
            console.log("dynamo_err:", err);
            context.done(null, data);
        });
    }else{
        var resBody = JSON.stringify({
            "replyToken":msg.replyToken,
            "messages":[
                {
            "type":"text",
            "text":"送信したメッセージは微分可能ではありません"
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
/*
// モジュールDynamoDBを用いたutItem
var aws = require('aws-sdk');
var dynamodb = new aws.DynamoDB({region: 'ap-northeast-1'});

exports.handler = function(event, context) {
    console.log('Received event:', JSON.stringify(event, null, 2));
    var msg = event.events[0];
    var params = {
      "TableName": "LineBot",
      "Item": {
          "id": {"S": msg.message.id},
          "text": {"S": msg.message.text},
          "userId": {"S": msg.source.userId}
     }
    };
    dynamodb.putItem(params,
        function (err, data) {
            if (err) {
                console.log(err, err.stack);
            } else {
                console.log(data);
            }
        }
    );
};

// DocumentClientを用いたput
var AWS = require('aws-sdk');
var dynamo = new AWS.DynamoDB.DocumentClient({
    region: 'ap-northeast-1'
});

exports.handler = (event, context, callback) => {

    var date = new Date();
    var time1 = date.getTime();
    var unixtime_sec = Math.floor(time1 / 1000);
    var msg = event.events[0];

    console.log("event:", JSON.stringify(event, null, 2));
    dynamo.put({
        "TableName": "BibunBot",
        "Item": {
            "id":msg.message.id,
          "text":msg.message.text,
          "userId":msg.source.userId
        }
    }, function( err, data ) {
        console.log("dynamo_err:", err);
        context.done(null, data);
    });
};
*/
