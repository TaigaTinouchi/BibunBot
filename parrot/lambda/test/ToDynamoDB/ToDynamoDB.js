// モジュールDynamoDBを用いてputItemする
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
/*
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
