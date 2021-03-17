# Team Status

This is a team status app for Zendesk. It shows the real-time status of everyone on the team, filtered by group.

# Build Instructions

There are three build commands that can be used:

## Basic browser testing

This builds for development environments outside of Zendesk. It's useful for basic UI work, but without the Zendesk data context, you really can't do anything useful with the application.

```
npm run build:dev
```

## Zendesk 'ZAT' testing

This builds for use in the Zendesk ZAT ruby environment. See [ZAT Tools](https://developer.zendesk.com/apps/docs/developer-guide/zat).

```
npm run build:zd
```

Once the application is built, you'll need to start (or restart) the zat server:

```
./dist zat server
```

Optionally, you can supply application settings with:

```
zat server -c "statusList": "Chat, Email, Phone, Break, Lunch"
```

or from a YAML file with:

```
zat server -c settings.yml
```

## Package for production

You can make a production build with:

```
npm run build:prod
```

Once that is done, you should run the ZAT validation with:

```
zat validate
```

Zendesk requires a zip file app submission. This can be done with

```
zat package
```

This will create a zip file in a temp working directory. This can be manually installed to a Zendesk instance or shipped to Zendesk for deployment on the App store.
