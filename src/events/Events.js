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

class Events extends React.Component {

    componentDidMount() {
        day = this.getDateStart();
        this.checkDateApi(day);
    }

    getDateStart(element){
        let date = new Date(),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            dayNumber = date.getDate();
        if (month < 10) {
            month = '0' + month;
        }
        if (dayNumber < 10) {
            dayNumber = '0' + dayNumber;
        }
        return year + "-" + month + "-" + dayNumber;

    }
    componentDidUpdate() {
        let choose_day = document.querySelector(".day span");
        if (choose_day) {
            this.setDate(choose_day.textContent);
            // console.log(this.isValidDate(choose_day.textContent.replace(/\s/g, "")));
        }
    }

    isValidDate(date){
        let backDate = this.backDay(date);
        let matches = /^(\d{4})[-\/](\d{1,2})[-\/](\d{1,2})$/.exec(backDate);

        if (matches === null) return false;
        let d = matches[3];
        let m = matches[2];
        let y = matches[1];
        let composedDate = new Date(y, m, d);
        return composedDate.getDate() == d &&
                composedDate.getMonth() == m &&
                composedDate.getFullYear() == y;
    }

    setDate(day) {
        if (document.getElementById("date")) {
            day = day.replace(/\s/g, "");
            document.getElementById("date").value = day;
        }
    }

    daysInMonth (month, year) {
        return new Date(year, month, 0).getDate();
    }

    backDay(day, backMonth){


        if (backMonth === true) {

            let date = new Date(day);
            let year = date.getFullYear();
            let month = date.getMonth();
            let dayNumber = this.daysInMonth(month, year);

            if (month < 10) {
                month = '0' + month;
            }
            if (dayNumber < 10) {
                dayNumber = '0' + dayNumber;
            }
            return year + "-" + month + "-" + dayNumber;

        } else {

            let date = new Date(day);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let dayNumber = date.getDate() - 1;
            if (month < 10) {
                month = '0' + month;
            }
            if (dayNumber < 10) {
                dayNumber = '0' + dayNumber;
            }
            return year + "-" + month + "-" + dayNumber;

        }

    }

    checkDateApi(day) {
        console.log(day);
        fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date='+ day +'&api_key=' + constants.API_KEY)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.photos.length === 0) {
                        if (this.isValidDate(day)) {
                            this.checkDateApi(this.backDay(day));
                        } else{
                            this.checkDateApi(this.backDay(day, true));
                        }

                    } else {
                        this.props.getEvents(day);
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
                h2 className = "day" > Earth day: <span>{
                    this.props.eventsStore.data[0].earth_date
                }  </span>< /h2> <
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
