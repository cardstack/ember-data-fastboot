# Ember-data-fastboot

This addon serializes the contents of your [ember-data](https://github.com/emberjs/data) `Store` within the [Fastboot  shoebox](https://github.com/ember-fastboot/ember-cli-fastboot#the-shoebox). It happens like this:

 1. Your application renders in the fastboot server.
 2. At the end of fastboot rendering, all your Ember Data Models get serialized into the fastboot shoebox (which uses tags like `<script type="fastboot/shoebox">`).
 3. Your application boots up in the browser. This addon's instance-initializer notices the serialized models and uses `pushPayload` to load them into the `Store`.
 4. As your app renders in the browser, any `store.findRecord`, etc will locate the already cached models.

## JSON-API Required

Right now, this addon assumes that your application is using [DS.JSONAPISerializer](http://emberjs.com/api/data/classes/DS.JSONAPISerializer.html) as your application's default serialization method. See https://github.com/cardstack/ember-data-fastboot/issues/3 if you're interested in making it work for any format.

## Installation

`ember install ember-data-fastboot`

Starting with version 0.1.0 this addon requires at least ember-cli-fastboot 1.0.0-rc.1.
