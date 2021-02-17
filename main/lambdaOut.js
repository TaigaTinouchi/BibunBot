var https = require('https');

exports.handler = function(event, context) {
    event.Records.forEach(function(record) {
        console.log(record.eventName);
        console.log("DynamoDB Record: %j", record.dynamodb);
        var resBody = JSON.stringify({
            replyToken:record.dynamodb.NewImage.replyToken.S,
            "messages":[
              {
                "type":"text",
                "input":record.dynamodb.NewImage.ipnut.S,
              }
              {
                "type":"text",
                "output":record.dynamodb.NewImage.output.S
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
    });
};
