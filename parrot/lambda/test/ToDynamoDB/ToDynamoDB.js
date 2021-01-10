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
