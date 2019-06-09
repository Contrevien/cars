import React from 'react';
import './PreviewCar.css';
import img1 from "../../assets/carousel/images/1-removebg.png"
import img2 from "../../assets/carousel/images/3-removebg.png"
import img3 from "../../assets/carousel/images/5-removebg.png"
import img4 from "../../assets/carousel/images/7-removebg.png"
import img5 from "../../assets/carousel/images/9-removebg.png"
import img6 from "../../assets/carousel/images/11-removebg.png"
import img7 from "../../assets/carousel/images/13-removebg.png"
import img8 from "../../assets/carousel/images/15-removebg.png"
import img9 from "../../assets/carousel/images/17-removebg.png"
import img10 from "../../assets/carousel/images/19-removebg.png"
import img11 from "../../assets/carousel/images/21-removebg.png"
import img12 from "../../assets/carousel/images/23-removebg.png"

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
                "Price": "€ " + data.price,
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

        this.state = {
            images: [
                img1,
                img2,
                img3,
                img4,
                img5,
                img6,
                img7,
                img8,
                img9,
                img10,
                img11,
                img12,
            ],
            generalDetails: general,
            technicalDetails: technical,
            curr_cycle: 1,
            curr_x: -1
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

        slider.addEventListener('mousedown', this.dragStart);
        slider.addEventListener('touchstart', this.dragStart);
        slider.addEventListener('touchmove', this.dragAction);

        this.rotate = setInterval(this.autoRotate, 200)

        this.setState({
            curr_cycle: 1,
            curr_x: -1
        })
    }

    render() {
        const {images} = this.state;
        return(
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
                    <img src={images[((this.state.curr_cycle + 1) / 2) - 1]} onMouseDown={() => clearInterval(this.rotate)} />
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
                </div>
            </div>
        )
    }
}