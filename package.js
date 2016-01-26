Package.describe({
  name: 'davidyaha:persistent-model',
  version: '0.0.1',
  summary: 'Persistent base class for Meteor apps',
  git: 'https://github.com/davidyaha/meteor-persistent-model.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use(['ecmascript', 'underscore']);

  api.export('PersistentModel');

  api.addFiles('persistent-model.js');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('davidyaha:persistent-model');
  api.addFiles('persistent-model-tests.js');
});
