import React from 'react';
import {Meteor} from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: '',
            isOpen: false,
            error: ''
        }

    }

    componentWillMount() {

        Modal.setAppElement('body');
        // Modal.setAppElement('#app');
    }

    onSubmit(event) {

        // const url = this.refs.url.value.trim();
        const url = this.state.url;
        event.preventDefault();

        // if(url) {
            Meteor.call('insertLinks', url, (err, res) => {
                if (!err) {
                    this.handleModalClose();
                }
                else {
                    this.setState({ error: err.reason });
                }
            });
            // Links.insert({ url: url, userId: Meteor.userId() });
            // this.refs.url.value = '';
        // }
    }

    onChange(event) {

        this.setState({ url: event.target.value});

    }

    handleModalClose() {

        this.setState({
            url:'',
            isOpen: false,
            error: ''
        });
    }

    render() {

        return (

            <div>
                <button className="button" onClick={() => this.setState({ isOpen: true})}>+ Add Link</button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="Add Link"
                    onAfterOpen={() => this.refs.url.focus()}
                    onRequestClose={this.handleModalClose.bind(this)}
                    overlayClassName="boxed-view boxed-view--modal"
                    className="boxed-view__box">
                    <h1>Add Link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : undefined }
                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
                        <input
                            type='text'
                            ref='url'
                            placeholder='URL'
                            value={this.state.url}
                            onChange={this.onChange.bind(this)}/>
                        <button className="button">Add Link</button>
                        <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
                    </form>
                </Modal>
            </div>
        );
    }


}

