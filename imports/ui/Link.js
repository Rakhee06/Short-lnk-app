import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';


export default () => {

    return (

        <div>
            <PrivateHeader title='Short Lnk'/>
            <div className="page-content">
                <LinksListFilters/>
                <AddLink/>
                <LinksList/>
            </div>
        </div>
    );
};






// export default class Link extends React.Component {
//
//     // onLogout() {
//     //
//     //    Accounts.logout();
//     // }
//
//     // onSubmit(event) {
//     //
//     //     const url = this.refs.url.value.trim();
//     //     event.preventDefault();
//     //
//     //     if(url) {
//     //         Meteor.call('insertLinks', url);
//     //         // Links.insert({ url: url, userId: Meteor.userId() });
//     //         this.refs.url.value = '';
//     //     }
//     // }
//
//     // componentWillMount() {
//     //     if(!Meteor.userId()){
//     //         this.props.history.replace('/');
//     //     }
//     // }
//
//     render() {
//         return (
//
//             <div>
//                 {/*<h1>Links</h1>*/}
//                 {/*<button onClick={this.onLogout.bind(this)}>Logout</button>*/}
//                 <PrivateHeader title='Your Links' />
//                 <LinksList/>
//                 <AddLink />
//                 {/*<p>Add Link</p>*/}
//                 {/*<form onSubmit={this.onSubmit.bind(this)}>*/}
//                     {/*<input type='text' ref='url' placeholder='URL'/>*/}
//                     {/*<button>Add Link</button>*/}
//                 {/*</form>*/}
//             </div>
//         );
//     }
// }