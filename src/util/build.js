// This builds the Zendesk manifest and translation files
// https://developer.zendesk.com/apps/docs/developer-guide/manifest
// https://developer.zendesk.com/apps/docs/developer-guide/setup#file-requirements

const manifestSettings = {
  name: 'Team Status',
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
      "name": "Status_List",
      "type": "text",
      "required": true,
      "secure": false,
      "default": "Chat, Email, Phone, Break, Lunch, Offline",
      "helpText": "Customize your status list"
    },
    {
      "name": "Active_Color",
      "type": "text",
      "required": false,
      "secure": false,
      "default": "blue",
      "helpText": "Choose a supported Zendesk Garden color"
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
    name: 'Team Status',
    short_description: 'Quickly see the status of everyone on your team',
    long_description: 'Team Status allows Zendesk agents to set their current status right inside of Zendesk. Everyone can view the status of the entire team with one click.',
    installation_instructions: '',
    "parameters": {
      "Status_List": {
        "label": "Status List",
        "helpText": "Customize your status list. Separate options with a comma."
      },
      "Active_Color": {
        "label": "Active Color",
        "helpText": "Choose a custom color the status that have 1 or more agents are active. \n\n Available options are: grey, blue, kale, red, green, yellow, fuschia, pink, crimson, orange, lemon, lime, mint, teal, azure, royal, purple."
      }
    }
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
