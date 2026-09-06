const { defineCliConfig } = require('sanity/cli');

module.exports = defineCliConfig({
  api: {
    projectId: 'm8sr7eub',
    dataset: 'production',
  },
  studioHost: 'tapaikobazar',
  deployment: {
    appId: 'fa8uvzwehpwcq86tg0uca9ba',
    autoUpdates: true,
  },
});
