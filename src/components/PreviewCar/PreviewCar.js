import React from 'react';
import './PreviewCar.css';
// import img1 from "../../assets/carousel/images/1-removebg.png"
// import img2 from "../../assets/carousel/images/3-removebg.png"
// import img3 from "../../assets/carousel/images/5-removebg.png"
// import img4 from "../../assets/carousel/images/7-removebg.png"
// import img5 from "../../assets/carousel/images/9-removebg.png"
// import img6 from "../../assets/carousel/images/11-removebg.png"
// import img7 from "../../assets/carousel/images/13-removebg.png"
// import img8 from "../../assets/carousel/images/15-removebg.png"
// import img9 from "../../assets/carousel/images/17-removebg.png"
// import img10 from "../../assets/carousel/images/19-removebg.png"
// import img11 from "../../assets/carousel/images/21-removebg.png"
// import img12 from "../../assets/carousel/images/23-removebg.png"
// import test from '../../assets/images/cartest-removebg.png';
// import test360 from '../../assets/images/test.jpg';
import eye from '../../assets/images/eye.png';
import { Pannellum } from "pannellum-react";

export default class PreviewCar extends React.Component {
    
    constructor(props) {
        super(props);

        let data = {...this.props.data.carDetails};
        let general = {};
        let technical = {};


        if(Object.keys(data).length !== 0) {
            general = {
                "Make": data.make,
                "Model": data.model,
                "Status": data.type[0].toUpperCase() + data.type.substring(1),
                "Seats": data.seats,
                "Doors": data.doors,
                "Gears": data.gears,
            }

            technical = {
                "Displacement": data.displacement + " cc",
                "Weight": data.weight + " kg",
                "Fuel": data.fuel,
                "Paint": data.paint,
                "Color": data.color,
            }

            if(data.gearType === "man") {
                technical["Transmission"] = "Manual";
            } else {
                technical["Transmission"] = "Auto";
            }

            if(data.type === "used") {
                technical["First Registration"] = data.firstReg;
                technical["Used Kms"] = data.usedKms + " kms";
            }
        }

        let images = this.props.data.images;
        let rotation = true;
        
        for(var img of images) {
            if(img === "") {
                rotation = false;
                break;
            }
        }

        let replacement = "";
        if(!rotation) {
            for(var img of images) {
                if(img !== "") {
                    replacement = img;
                    break;
                }
            }
        }

        this.state = {
            images: this.props.data.images,
            _360: this.props.data._360,
            rotation: rotation,
            replacement: replacement,
            carData: this.props.data.carDetails,
            generalDetails: general,
            technicalDetails: technical,
            curr_cycle: 1,
            curr_x: -1,
            pannellum: false
        }
    }


    dragStart = (e) => {
        e.preventDefault();
        let {curr_x, curr_cycle} = this.state;
        if(curr_x == -1) {
          curr_x = e.clientX;
        }
        if(e.type !== 'touchstart') {
          document.onmousemove = this.dragAction;
          document.onmouseup = this.dragEnd;
        }
        this.setState({
            curr_x: curr_x,
            curr_cycle: curr_cycle
        })
      }
    
    dragAction = (e) => {
        e.preventDefault();
        let {curr_x, curr_cycle} = this.state;
        if(e.clientX - curr_x <= -10) {
          curr_x = e.clientX;
          if(curr_cycle === 23) {
            curr_cycle = 1
          } else {
            curr_cycle += 2
          }
        } else if(e.clientX - curr_x >= 10) {
          curr_x = e.clientX;
          if(curr_cycle === 1) {
            curr_cycle = 23
          } else {
            curr_cycle -= 2
          }
        }
        this.setState({
            curr_x: curr_x,
            curr_cycle: curr_cycle
        })
      }
    
    dragEnd(e) {
        e.preventDefault();
        document.onmousemove = null;
        document.onmouseup = null;
      }

      autoRotate = () => {
          let curr_cycle = this.state.curr_cycle;
          if(curr_cycle === 23) {
              curr_cycle = 1;
          } else {
              curr_cycle += 2
          }
          this.setState({
              curr_cycle: curr_cycle
          })
      }

    componentDidMount() {
        var slider = document.getElementById('slider');

        window.onkeydown = (e) => {
            if(e.key === "Escape" && this.state.pannellum) {
                this.setState({
                    pannellum: false
                })
            }
        }

        slider.addEventListener('mousedown', this.dragStart);
        slider.addEventListener('touchstart', this.dragStart);
        slider.addEventListener('touchmove', this.dragAction);

        this.rotate = setInterval(this.autoRotate, 200)

        this.setState({
            curr_cycle: 1,
            curr_x: -1
        })
    }

    togglePannellum = (e) => {
        let curr = !this.state.pannellum;
        this.setState({
            pannellum: curr
        })
    }

    render() {
        const {images} = this.state;
        return(
            <>
                <header>
                    <h2>cars<span>360</span></h2>
                    <nav>
                        <ul>
                            <li>Home</li>
                            <li>Cars</li>
                            <li>Contact</li>
                            <li>About</li>
                        </ul>
                    </nav>
                </header>
                <div className="PreviewCar">
                    <div id="slider" className="slider">
                        <div className="PreviewCar-details">
                            <h2>General Details</h2>
                            <table>
                                <tbody>
                                {Object.keys(this.state.generalDetails).map((key, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="PreviewCar-details-name-left">
                                                {key}
                                            </td>
                                            <td className="PreviewCar-details-name-right">
                                                {this.state.generalDetails[key]}
                                            </td>
                                        </tr>    
                                    )
                                })}

                                </tbody>
                            </table>
                        </div>
                        <div className="PreviewCar-main">
                            {
                                this.state._360 !== "" && <span className="PreviewCar-eye"> 
                                    <img src={eye} alt="View" className="PreviewCar-eye-img"
                                        onClick={this.togglePannellum} />
                                    <div className="PreviewCar-eye-div">Inside</div>
                                </span>  
                            }
                            {
                                this.state.rotation ? <img className="PreviewCar-car" 
                                src={images[((this.state.curr_cycle + 1) / 2) - 1]}
                                onMouseDown={() => clearInterval(this.rotate)} /> : 
                                <img className="PreviewCar-car" src={this.state.replacement} alt="" />
                            } 
                        </div>
                        <div className="PreviewCar-details">
                            <h2>Technical Details</h2>
                            <table>
                                <tbody>

                                {Object.keys(this.state.technicalDetails).map((key, i) => {
                                    return (
                                        <tr key={i}>
                                            <td className="PreviewCar-details-name-left">
                                                {key}
                                            </td>
                                            <td className="PreviewCar-details-name-right">
                                                {this.state.technicalDetails[key]}
                                            </td>
                                        </tr>    
                                    )
                                })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    
                    <div className="PreviewCar-name">
                        <h2>{this.state.generalDetails["Make"] + " " + this.state.generalDetails["Model"]}</h2>
                        <div>
                            <p>{"€ " + this.state.carData["price"]}</p>
                        </div>
                    </div>
                </div>
                {this.state.pannellum && <>
                    <div className="Backdrop" onClick={this.togglePannellum}></div>
                    <div className="PreviewCar-pannellum-container">
                        <Pannellum
                            id="PreviewCar-pannellum"
                            height="90vh"
                            image={this.state._360}
                            pitch={10}
                            yaw={180}
                            hfov={110}
                            autoLoad
                            onLoad={() => {
                                console.log("panorama loaded");
                            }}
                        ></Pannellum>
                        <span 
                            className="AddCar-close" 
                            title="Remove" 
                            onClick={this.togglePannellum}>
                                &#10006;
                        </span>
                    </div>
                </>}
            </>
        )
    }
}