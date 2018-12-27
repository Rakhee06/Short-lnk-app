import { Meteor } from 'meteor/meteor';
import React from 'react';
import {Tracker} from "meteor/tracker";
import { Session } from 'meteor/session';
import Flipmove from 'react-flip-move';

import { Links } from "../api/links";
import LinksListItems from './LinksListItems';

export default class LinksList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            links: []
        }
    }

    componentDidMount() {

        this.linksTracker = Tracker.autorun(() => {

            Meteor.subscribe('linksPublish');

            const links = Links.find({
                visible: Session.get('showVisible')
            }).fetch();
            this.setState({ links });

        });
    }

    //to stop the tracker otherwise it will run in background and will slow the application eventually
    componentWillUnmount() {

        this.linksTracker.stop();
    }

    renderLinksListItems() {

        if(this.state.links.length === 0) {

            return (

                <div className='item'>
                    <p className='item__status-message'>No Links Found</p>
                </div>
            );
        }

        return this.state.links.map((link) => {

            const shortUrl = Meteor.absoluteUrl(link._id);
            //Pass everything of link
            //two pays either this.props.link - equal to an object
            //{...link} - this is a spread operator. it takes all the key value pair and
            // add them on key{} is going to be the prop and the the value would from link

            return <LinksListItems key={link._id} shortUrl={shortUrl} {...link}/>
            // return <p key={link._id}>{link.url}</p>
        });

    }

    render() {
        return (
            <div>
                <Flipmove maintainContainerHeight={true}>
                    {this.renderLinksListItems()}
                </Flipmove>
            </div>

        );
    }

};