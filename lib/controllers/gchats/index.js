const BotkitEngineBot = require(__dirname + '/botkit');
const BaseController = require('../base-controler');

module.exports = class extends BaseController {
  get botkitType() {
    return 'gchats';
  }

  get hearsMentionEvents() {
    return [];
  }

  get hearsMessageEvents() {
    return ['message'];
  }

  constructor(abbottCore) {
    super('gchats', abbottCore, {
      __dirname: __dirname
    });

    if (this.abbottCore.options.storage) {
      this.config.storage = this.abbottCore.options.storage;
    }

    this.initializeBot();
  }

  getBotkitOptions() {
    let botOpt = super.getBotkitOptions();

    botOpt.response_url = this.config.response_url;
    botOpt.verify_token = this.config.verify_token;
    botOpt.chats_regex = this.config.chats_regex;
    botOpt.botFirendlyName = this.abbottCore.options.botFirendlyName;

    return botOpt;
  }

  initializeBot() {
    this.controller = BotkitEngineBot(this.getBotkitOptions());
    this.controller.webserver = this.webserver;

    this.controller.startTicking();

    this.controller.createWebhookEndpoints(this.webserver);
  }

  process(req, res) {
    this.controller.handleWebhookPayload(req, res);
  }
};
