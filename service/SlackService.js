/**
 * Created by curloid on 11/24/15.
 */
var request = Promise.promisifyAll(require('superagent'));

var slackWebHook = "https://hooks.slack.com/services/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";

var SlackService = {
	sendServiceOnlineNotification: function (address, port) {
		var message = " is online.\n";
		return this._sendSystemMessage(message);
	},

	_sendSystemMessage: function (message) {
		if (slackWebHook) {
			return request.postAsync(slackWebHook, {
				text: process.env.name ? process.env : "TEST" +  (": " + message),
				username: "curloid-bot"
			}).then(function() {
				return Promise.resolve(true);
			})
					.catch(function(error){
						console.error('Could not send error info to Slack due to %j', error);
					})
		}
	}
};

module.exports = SlackService;


