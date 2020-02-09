import React, {Component} from "react";
import AlertNotificationList from "./components/AlertNotificationList"
import OverlayIncident from "./components/OverlayIncident"
import './App.css'
import ResolvedList from "./components/ResolvedList";
import ResolvedNoncrimeList from "./components/ResolvedNoncrimeList";

const axios = require('axios');

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            unresolved: [],
            showOverlay: false
        };

        this.fetchAllAlerts();
    }

    fetchAllAlerts = () => {
        axios.get('/api/alerts').then(response => this.setState({
            unresolved: response.data.alerts
        })).catch((error) => console.log(error));
    };

    showImage = (image) => {
        this.setState({
            showOverlay: true,
            overlayImage: image
        });
    };

    onClose = () => {
        this.setState({
                showOverlay: false
            }
        );
    };

    render() {
        return (
            <div className="todoListMain">
                <div className="map">

                    <div style={{width: "600px", height: "300px"}}/>
                </div>
                <h3 className="whiteText">Unresolved</h3>
                <AlertNotificationList entries={this.state.unresolved} showImage={this.showImage}/>
                {
                    this.state.showOverlay ?
                        <OverlayIncident image={this.state.overlayImage} onClose={this.onClose}/> : null
                }

                <div className="resolved">
                    <h3 className="whiteText">Crime</h3>
                    <ResolvedList showImage={this.showImage}/>
                    {
                        this.state.showOverlay ?
                            <OverlayIncident image={this.state.overlayImage} onClose={this.onClose}/> : null
                    }
                </div>
                <div className="resolved">
                    <h3 className="whiteText">Non-crime</h3>
                    <ResolvedNoncrimeList showImage={this.showImage}/>
                    {
                        this.state.showOverlay ?
                            <OverlayIncident image={this.state.overlayImage} onClose={this.onClose}/> : null
                    }

                </div>


            </div>

        );
    }
}

export default App;