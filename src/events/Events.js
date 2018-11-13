import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/events';

class Events extends React.Component {

    componentDidMount() {
        this.props.getEvents();
    }

    render() {
        if (this.props.eventsStore.data !== null) {
            console.log(this.props.eventsStore.data);
            return (
                <div className="photo">
                    {
                        this.props.eventsStore.data.map(item => {
                            return (
                                <div key={item.id} >
                                    <p>Camera: {item.camera.full_name}</p>
                                    <img src={item.img_src}/>
                                </div>
                            )
                        })
                    }

                </div>
            );
        } else {
            return (
                <p>Loading</p>
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
