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
            // error_paragraf.innerHTML = "";
        } else {
            error_paragraf.classList.add("show");
            error_paragraf.innerHTML = "choose the correct date";
        }
    }

    showFull(el){
        let img_src = el.target.src,
            popup = document.getElementsByClassName("popup")[0],
            img_container = document.getElementsByClassName("img_container")[0],
            element = img_container.getElementsByTagName("IMG")[0],
            img_width = el.target.clientWidth,
            img_height = el.target.clientHeight,
            close = document.getElementsByClassName("close")[0];

        if (img_height < img_width) {
            popup.classList.add("width");
        }

        element.src = img_src;
        popup.classList.add("show");

        close.addEventListener("click", function(event){
            popup.classList.remove("show");
            element.src = "";
            if (popup.classList.contains("width")) {
                popup.classList.remove("width");
            }
        });
    }

    render() {
        if (this.props.eventsStore.data !== null) {
            if (this.props.eventsStore.data.length > 0) {
                return (
                    <div className="container">
                        <EventFilter goDate={this.goDate.bind(this)} anotherDay={false} />
                        <h2 className="sol">Sol: {this.props.eventsStore.data[0].sol}</h2>
                        <h2 className="day">Earth day: {this.props.eventsStore.data[0].earth_date}</h2>
                        <div className="photo_flex">
                        {
                            this.props.eventsStore.data.map(item => {
                                return (
                                    <div key={item.id} className="photo_box">
                                        <p>Camera: {item.camera.full_name}</p>
                                        <img onClick={this.showFull.bind(this)} src={item.img_src}/>
                                    </div>
                                )
                            })
                        }
                        </div>
                    </div>
                );
            } else {
                return (
                    <div className="container">
                        <EventFilter goDate={this.goDate.bind(this)} anotherDay={true} />
                        {document.getElementById("error").classList.add("show")}
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
