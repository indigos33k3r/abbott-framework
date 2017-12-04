const env = require('node-env-file');
env(__dirname + '/.env');

const AbbottFramework = require('../').AbbottFramework;
const IntentFlowHandler = require('../').IntentFlowHandler;
const logger = require('../').logging();

var abbottConfig = {
  botName: 'abbott-slack-sample',
  botFirendlyName: 'Abbott Slack Sample',
  port: process.env.PORT || 3000,
  platforms: {
    slack: {
      clientId: '[YOUR_SLACK_CLIENT_ID]',
      clientSecret: '[YOUR_SLACK_CLIENT_SECRET]'
    }
  },
  nlp: {
    apiai: {
      token: '[YOUR_API.AI_DEVELOPER_TOKEN]'
    }
  }
};

const abbottFramework = new AbbottFramework(abbottConfig);
  const abbottFramework = new AbbottFramework(abbottConfig);

  abbottFramework.start()
    .then(() => {
      logger.info('BOT Initialized!');
    })
    .catch((err) => logger.error(err));
}
catch (err) {
  logger.error(err);
  process.exit(1);
}
