import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from "simpl-schema";
import shortid from 'shortid';

export const Links = new Mongo.Collection('links');

//this runs only on server side
if (Meteor.isServer) {
    //cannot use arrow function coz we cannot use Meteor.userId directly due to design limitation.
    // Hence we use the normal call back function so that we can use this.userId to retrieve the value.
    Meteor.publish('linksPublish', function () {

        return Links.find({ userId: this.userId });
    });
}

Meteor.methods({

    'insertLinks'(url) {

        if(!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            url: {
                type: String,
                label: 'Your link',
                regEx: SimpleSchema.RegEx.Url
            }
        }).validate({ url});


        Links.insert({
            _id: shortid.generate(),
            url: url,
            userId: this.userId,
            visible: true,
            visitedCount: 0,
            lastVisitedAt: null
        });
    },


    'links.setVisibility' (_id, visible) {

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            },
            visible: {
                type: Boolean,
            }
        }).validate({_id, visible});

        Links.update({

            _id,
            userId: this.userId
        }, {

            $set: { visible: visible }
        });
    },


    'links.trackVisit' (_id) {

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({ _id });

        Links.update({ _id }, {
            $inc: { visitedCount: 1 },
            $set: { lastVisitedAt: new Date().getTime() }
        });

    }
});