// This builds the Zendesk manifest and translation files
// https://developer.zendesk.com/apps/docs/developer-guide/manifest
// https://developer.zendesk.com/apps/docs/developer-guide/setup#file-requirements

const manifestSettings = {
  name: 'Status Tracker: A status app',
  author: {
    name: 'Cosmic Code Company',
    email: 'support@cosmiccode.co',
    url: 'https://cosmiccode.co',
  },
  defaultLocale: 'en',
  private: false,
  location: {
    support: {
      top_bar: {
        url: 'assets/app/index.html',
        size: {
          height: '500px',
          width: '725px',
        },
      },
    },
  },
  version: '1.0',
  frameworkVersion: '2.0',
  "parameters": [
    {
      "name": "statusList",
      "type": "text",
      "required": true,
      "secure": false,
      "default": "Chat, Email, Phone, Break, Lunch",
      "helpText": "Customize your status list"
    },
  ]
};

const requirements = {
  user_fields: {
    ccc_agent_status: {
      type: 'text',
      title: 'Agent Status',
      key: 'ccc_agent_status',
    },
  },
};

const enSettings = {
  app: {
    name: 'Status Tracker: A status app',
    short_description: '',
    long_description: '',
    installation_instructions: '',
    parameters: {},
  },
};

async function writeJSONFiles() {
  const fs = require('fs');

  // Write en.json file
  const enJSONPath = './dist/translations/en.json';
  const installMDSrc = './src/markdown/install.md';
  const longDescSrc = './src/markdown/desc.md';
  enSettings.app.installation_instructions = fs.readFileSync(installMDSrc).toString();
  enSettings.app.long_description = fs.readFileSync(longDescSrc).toString();
  fs.writeFileSync(enJSONPath, JSON.stringify(enSettings));

  // Write Requirements.json
  const requirementsPath = './dist/requirements.json';
  fs.writeFileSync(requirementsPath, JSON.stringify(requirements));

  // Write Manifest.json
  const manifestJSONPath = './dist/manifest.json';
  fs.writeFileSync(manifestJSONPath, JSON.stringify(manifestSettings));
}

writeJSONFiles()
  .then(() => {
    return 0;
  })
  .catch((e) => {
    console.error(`Error Building Manifest File`, e);
    return e;
  });
