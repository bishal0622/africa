module.exports = function(from, amount, username) {
    var fs = require('fs');
    var sendSms = require('./send-sms');
    var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InVtdmEi.6FKdx5OPZ8knwOeMUTjT-M2j-zG0OD8ntRnpvXXr0VA";
    var Client = require('node-rest-client').Client;

    var client = new Client();

    //split
    var s = from.substring(1);

    client.get("http://business.capaz.org/sms_balanceTransfer?mobile=%2B" + s +"&amount=" + amount +"&receiver=" + username + "&token=" + token, function(data, response) {
        console.log(JSON.parse(data));
        data = JSON.parse(data);

        if (data.error == 404) {
            console.log("error message");
            sendSms("The username is not registered. Please contact your Bank.", from);
            fs.appendFile('errorlog.txt', JSON.stringify(data) + " Date-->" + Date() + "from" + from + " \r\n", function(err) {
                if (err) throw error;
            });
        } else if (data.success) {
            console.log("success");
            sendSms(data.success.senderMessage , from);
            if(data.success.receiverMobile != null){
                sendSms(data.success.receiverMessage,data.success.receiverMobile)
            }
            fs.appendFile('successlog.txt', JSON.stringify(data) + " -->" + Date() + " \r\n", function(err) {
                if (err) throw error;
            });
        }
    });
}