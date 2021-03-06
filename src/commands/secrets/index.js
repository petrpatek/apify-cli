const { Command } = require('@oclif/command');
const { showHelpForCommand } = require('../../lib/utils');

class SecretsIndexCommand extends Command {
    async run() {
        showHelpForCommand('secrets');
    }
}

SecretsIndexCommand.description = 'Manages secret values for actor environment variables.\n\n' +
    'Example:\n' +
    '$ apify secrets:add mySecret TopSecretValue123\n\n' +
    'Now the "mySecret" value can be used in an environment variable defined in "apify.json" file by adding the "@" prefix:\n\n' +
    '{\n' +
    '  "name": "my_actor",\n' +
    '  "env": { "SECRET_ENV_VAR": "@mySecret" },\n' +
    '  "version": "0.1\n' +
    '}\n\n' +
    'When the actor is pushed to Apify cloud, the "SECRET_ENV_VAR" and its value is stored as a secret environment variable of the actor.';

module.exports = SecretsIndexCommand;
