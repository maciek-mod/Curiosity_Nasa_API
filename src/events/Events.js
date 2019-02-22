import React from 'react';
import {
    connect
} from 'react-redux';
import * as actions from '../actions/events';
import EventFilter from './eventFilter';
import EventItem from './eventItem';
import Loading from "../common/loading";
import * as constants from '../constants';
import fetch from 'isomorphic-fetch';

var date = null,
    day = null;
    // day_back = 0;

class Events extends React.Component {

    componentDidMount() {

        day = this.getDate();
        this.checkDateApi(day);

        return day;
    }

    getDate(element){
        if (element === undefined) {
            let date = new Date(),
                year = date.getFullYear(),
                month = date.getMonth() + 1,
                dayNumber = date.getDate();
            return year + "-" + month + "-" + dayNumber;
        } else {
            let date = new Date(),
                year = date.getFullYear(),
                month = date.getMonth() + 1,
                dayNumber = date.getDate() - element;
            return year + "-" + month + "-" + dayNumber;
        }

    }
    componentDidUpdate() {
        if (date !== null && document.getElementById("date")) {
            document.getElementById("date").value = date;
        }
        if (day !== null && document.getElementById("date")) {
            document.getElementById("date").value = day;
        }
    }
    backDay(day){
        var date = new Date(day);
        var date_back = date.getFullYear()+"-"+ (date.getMonth() + 1) +"-" + (date.getDate() - 1);
        return date_back;
    }

    checkDateApi(day) {

        fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date='+ day +'&api_key=' + constants.API_KEY)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result.photos.length);
                    if (result.photos.length === 0) {
                        this.checkDateApi(this.backDay(day));

                    } else {
                        var date = new Date(day);
                        this.props.getEvents(date.getFullYear()+"-"+ (date.getMonth() + 1) +"-" + (date.getDate()));
                    }
                },
                (error) => {
                    console.log(error);
                }
            )
            .catch( error => {throw new Error(error)}
        );
    }
    goDate(event) {
        let error_paragraf = document.getElementById("error");
        event.preventDefault();
        date = document.getElementById("date").value;
        if (date !== "") {
            this.props.getEvents(date);
            error_paragraf.classList.remove("show");
            error_paragraf.innerHTML = "";
        } else {
            error_paragraf.classList.add("show");
            error_paragraf.innerHTML = "Choose the correct date";
        }
        return date;
    }

    checkDate() {
        let now = new Date().toISOString().slice(0, 10);
        if (date > now) {
            return "Choose another date.";
        } else {
            return "This day Curiosity doesn't send photos.";
        }
    }

    showFull(el) {
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

        close.addEventListener("click", function(event) {
            popup.classList.remove("show");
            element.src = "";
            if (popup.classList.contains("width")) {
                popup.classList.remove("width");
            }
        });
    }

    render() {

        return ( <
            Loading isLoading = {
                this.props.eventsStore.isLoading
            } > {
                this.props.eventsStore.isLoading === false && this.props.eventsStore.data.length > 0 ?
                <
                div className = "container" >
                <
                EventFilter goDate = {
                    this.goDate.bind(this)
                }
                /> <
                h2 className = "sol" > Sol : {
                    this.props.eventsStore.data[0].sol
                } < /h2> <
                h2 className = "day" > Earth day: {
                    this.props.eventsStore.data[0].earth_date
                } < /h2> <
                div className = "photo_flex" > {
                    this.props.eventsStore.data.map(item => {
                        return <EventItem cameraName = {
                            item.camera.full_name
                        }
                        key = {
                            item.id
                        }
                        srcImg = {
                            item.img_src
                        }
                        showFull = {
                            this.showFull.bind(this)
                        }
                        altImg = {
                            item.camera.name
                        }
                        />
                    })
                } <
                /div> <
                /div>:
                    <
                    div className = "container" >
                    <
                    EventFilter goDate = {
                        this.goDate.bind(this)
                    }
                /> <
                p className = "error" > {
                    this.checkDate()
                } < /p> <
                /div>
            } <
            /Loading>
        )
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
