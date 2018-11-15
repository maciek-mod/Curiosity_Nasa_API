import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions/events';
import EventFilter from './eventFilter';



class Events extends React.Component {

    componentDidMount() {
        this.props.getEvents();
    }

    goDate(event) {
        let error_paragraf =  document.getElementById("error");
        event.preventDefault();
        let date = document.getElementById("date").value;
        if (date !== "") {
            this.props.getEvents(date);
            error_paragraf.classList.remove("show");
            error_paragraf.innerHTML = "";
        } else {
            console.log(error_paragraf);
            error_paragraf.classList.add("show");
            error_paragraf.innerHTML = "choose the correct date";
        }
    }

    render() {
        if (this.props.eventsStore.data !== null) {
            if (this.props.eventsStore.data.length > 0) {
                return (
                    <div className="photo">
                        <EventFilter goDate={this.goDate.bind(this)} />
                        <h2>Sol: {this.props.eventsStore.data[0].sol}</h2>
                        <h2>Earth day: {this.props.eventsStore.data[0].earth_date}</h2>
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
                    <div className="photo">
                        <EventFilter goDate={this.goDate.bind(this)} />
                        choose another day
                    </div>
                );
            }
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
