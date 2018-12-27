import { Meteor } from 'meteor/meteor';
import React from 'react';
import ReactDOM from 'react-dom';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import { routes, onAuthChange } from "../imports/routes/routes";
import '../imports/startup/simple-schema-config';

Tracker.autorun(() => {

    const isAuthenticated = !!Meteor.userId();
    onAuthChange(isAuthenticated);

});

//Stateless Functional Components

Meteor.startup(() => {

    Session.set('showVisible', true);

    ReactDOM.render(routes, document.getElementById('app'));

});