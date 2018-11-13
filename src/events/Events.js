import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/events';

class Events extends React.Component {

    componentDidMount() {
        this.props.getEvents();
    }

    render() {
        if (this.props.eventsStore.data !== null) {

            return (
                <div className="photo">
                    {
                        this.props.eventsStore.data.map(item => {
                            return <img src={item.img_src}/>
                        })
                    }

                </div>
            );
        } else {
            return (
                <p>ładuje</p>
            );
        }
    }
};

const mapStateToProps = (state) => {
    return {
        ...state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEvents: (day) => dispatch(actions.getEvents(day))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Events);
