import React from 'react';
import picture from '../../../assets/images/car.png';
import _360 from '../../../assets/images/_360.png';
import './AddCar.css';
import { Pannellum } from "pannellum-react";
import Toast from '../../Toast/Toast';

const INIT_STATE = {
	dragging: false,
	imagesReq: 12,
	images: ["","","","","","","","","","","",""],
	_360: "",
	carDetails: {
		make: "",
		model: "",
		price: "",
		usedKms: "",
		firstReg: "",
		color: "",
		paint: "",
		doors: "",
		seats: "",
		gears: "",
		gearType: "",
		displacement: "",
		weight: "",
		fuel: "",
		type: "",
		equipments: []
	},
	submitReady: false,
	small: false,
	errors: {
		noImages: false
	},
	toast: ""
}

export default class AddCar extends React.Component {

	imageRefs = [
		React.createRef(),
		React.createRef(),
		React.createRef(),
		React.createRef(),
		React.createRef(),
		React.createRef(),
		React.createRef(),
		React.createRef(),
		React.createRef(),
		React.createRef(),
		React.createRef(),
		React.createRef()
	]

	
	constructor(props) {
		super(props);
		this.state = INIT_STATE;
	}

	toggleDrop = (e, img) => {
		if(this.state.dragging)
			this.setState({
				overMe: img
			})
	}

	handleDrag = (e) => {
		e.preventDefault()
		e.stopPropagation()
  		
	}
	
	handleDragIn = (e) => {
		e.preventDefault()
  		e.stopPropagation()
		this.dragCounter++ 
  		if (e.dataTransfer.files && e.dataTransfer.items.length > 0) {
		  this.setState({dragging: true})
		}
	}
	
	handleDragOut = (e) => {
		e.preventDefault()
		e.stopPropagation()
		  this.dragCounter--
  		this.setState({dragging: false})
	}
	
	handleDrop = (e) => {
		e.preventDefault()
  		e.stopPropagation()
  		this.setState({dragging: false})
		let files = e.dataTransfer.files;
		try {
			for(let file of files) {
				let reader = new FileReader();
				reader.onloadend = () => {
					let temp = [...this.state.images];
					console.log(parseInt(file.name.split(".")[0].substring(3)))
					if (isNaN(parseInt(file.name.split(".")[0].substring(3)))) {
						this.setState({
							toast: "Please follow proper naming with number such as cam01.png"
						})
						return;	
					} else {
						temp[parseInt(file.name.split(".")[0].substring(3)) - 1] = reader.result;
						this.setState({
							images: temp
						});
					}
				}
				reader.readAsDataURL(file);
			}
		} catch {
			this.setState({
				toast: "Please follow proper naming with number such as cam01.png"
			})
		}
	}


	componentDidMount() {
		if(window.outerWidth < 768 && window.outerHeight < 820) {
			this.setState({
				small: true
			})
		} else if(window.outerWidth < 820 && window.outerHeight < 768) {
			this.setState({
				small: true
			})
		}

		this.dragCounter = 0
		for(var div of this.imageRefs) {
			div.current.addEventListener('dragenter', this.handleDragIn)
		    div.current.addEventListener('dragleave', this.handleDragOut)
		    div.current.addEventListener('dragover', this.handleDrag)
		    div.current.addEventListener('drop', this.handleDrop)
		}

		document.body.addEventListener("drop", this.handleDrop);
		document.body.addEventListener("dragleave", this.handleDragOut);
		document.body.addEventListener("dragenter", this.handleDragIn);

	}

	componentDidUpdate() {
		this.dragCounter = 0
		for(var div of this.imageRefs) {
			if(div.current == null) continue;
			div.current.addEventListener('dragenter', this.handleDragIn)
		    div.current.addEventListener('dragleave', this.handleDragOut)
		    div.current.addEventListener('dragover', this.handleDrag)
		    div.current.addEventListener('drop', this.handleDrop)
		}

	}

	toggleToast = (msg) => {
		let toast = this.state.toast;
		if(toast === "") {
			this.setState({
				toast: msg
			})
		} else {
			this.setState({
				toast: ""
			})
		}
	}


	handleImage = (e, remFlag=false) => {
        if(remFlag) {
        	let name = e.target.dataset.name;
        	let temp = [...this.state.images];
        	temp[parseInt(name.split("-")[1])] = "";
            this.setState({
                images: temp
            });
        } else {
        	e.preventDefault();
	        let reader = new FileReader();
	        let name = e.target.name;
			let file = e.target.files[0];

	        let temp = [...this.state.images];

	        reader.onloadend = () => {
	        	temp[parseInt(name.split("-")[1])] = reader.result;
	            this.setState({
					images: temp,
					errors: {noImages: 0}
	            });
	        }

	        reader.readAsDataURL(file);
        }
    }

    handle360 = (e, remFlag=false) => {
    	if(remFlag) {
    		this.setState({
    			_360: ""
    		})
    	} else {
    		e.preventDefault();
	        let reader = new FileReader();
	        let file = e.target.files[0];


	        reader.onloadend = () => {
	            this.setState({
	                _360: reader.result
	            });
	        }

	        reader.readAsDataURL(file);
    	}
    }

    handle360Drop = (e) => {
    	e.preventDefault()
  		e.stopPropagation()
    	this.setState({dragging: false})

	    let reader = new FileReader();
        let file = e.dataTransfer.files[0];

        reader.onloadend = () => { 
            this.setState({
                _360: reader.result
            });
        }

        reader.readAsDataURL(file);
	}

	isCompleted = () => {
		let {carDetails} = this.state;
		if(carDetails["type"] === "used") {
			if(carDetails["make"] !== "" &&
			carDetails["model"] !== "" &&
			carDetails["price"] !== "" &&
			carDetails["usedKms"] !== "" &&
			carDetails["firstReg"] !== "" &&
			carDetails["color"] !== "" &&
			carDetails["paint"] !== "" &&
			carDetails["seats"] !== "" &&
			carDetails["doors"] !== "" &&
			carDetails["gears"] !== "" &&
			carDetails["gearType"] !== "" &&
			carDetails["displacement"] !== "" &&
			carDetails["weight"] !== "" &&
			carDetails["fuel"] !== "") {
				this.setState({
					submitReady: true
				})
				return;
			}
		} else if(carDetails["type"] === "new") {
			if(carDetails["make"] !== "" &&
			carDetails["model"] !== "" &&
			carDetails["price"] !== "" &&
			carDetails["color"] !== "" &&
			carDetails["paint"] !== "" &&
			carDetails["seats"] !== "" &&
			carDetails["doors"] !== "" &&
			carDetails["gears"] !== "" &&
			carDetails["gearType"] !== "" &&
			carDetails["displacement"] !== "" &&
			carDetails["weight"] !== "" &&
			carDetails["fuel"] !== "") {
				this.setState({
					submitReady: true
				})
				return;
			}
		}
		this.setState({
			submitReady: false
		})
	}
	
	handleInput = (e) => {
		let name = e.target.name;
		let value = e.target.value;
		let temp = {...this.state.carDetails};
		temp[name] = value;
		this.setState({
			carDetails: temp
		}, () => this.isCompleted())
	}

	handlePrice = (e) => {
		let price = e.target.value;
		price = price.split(",").join("")
		if(isNaN(price) || price.length > 6 || price.includes("."))
			return;
		if(price.length > 3) {
			price = price.split("").reverse().join("").substring(0,3) + "," + price.split("").reverse().join("").substring(3)
			price = price.split("").reverse().join("")
		}
		let temp = {...this.state.carDetails};
		temp["price"] = price;
		this.setState({
			carDetails: temp
		}, () => this.isCompleted())
	}

	handleCommed = (e) => {
		let name = e.target.name;
		let usedKms = e.target.value;
		usedKms = usedKms.split(",").join("")
		if(isNaN(usedKms) || usedKms.length > 6 || usedKms.includes("."))
			return;
		if(usedKms.length > 3) {
			usedKms = usedKms.split("").reverse().join("").substring(0,3) + "," + usedKms.split("").reverse().join("").substring(3)
			usedKms = usedKms.split("").reverse().join("")
		}
		let temp = {...this.state.carDetails};
		temp[name] = usedKms;
		this.setState({
			carDetails: temp
		}, () => this.isCompleted())
	}

	handleYear = (e) => {
		let year = e.target.value;
		if(isNaN(year) || year.length > 4)
			return;
		let temp = {...this.state.carDetails};
		temp["firstReg"] = year;
		this.setState({
			carDetails: temp
		}, () => this.isCompleted())
	}

	handleSingle = (e) => {
		let name = e.target.name;
		let val = e.target.value;
		if(isNaN(val) || val.length > 1)
			return;
		let temp = {...this.state.carDetails};
		temp[name] = val;
		this.setState({
			carDetails: temp
		}, () => this.isCompleted())
	}

	handleSubmit = (e) => {
		let flag = false;
		for(var img of this.state.images) {
			if(img !== ""){
				flag = true;
				break;
			}
		}
		if(flag === false) {
			this.setState({
				errors: {noImages: 1}
			})
			return;
		}
		let toSend = {};
		toSend["images"] = this.state.images;
		toSend["_360"] = this.state._360;
		toSend["carDetails"] = this.state.carDetails;
		this.props.submit(toSend);
	}

	render() {

		const { imagesReq, images, carDetails } = this.state;
		const imageTags = [];
		let message = "";

		if(this.state.errors.noImages === 1) message = "Please upload atleast one image";

		for (let img in images) {
			if(images[img] === "") {
				imageTags.push(
					<label data-name={"img-" + img} className={this.state.dragging ? "AddCar-image-upload AddCar-over"
						: "AddCar-image-upload"} 
						ref={this.imageRefs[img]}
						onMouseEnter={(e) => this.toggleDrop(e, img)}
						onMouseLeave={(e) => this.toggleDrop(e, "")}>
						<input type="file" name={"img-" + img} onChange={this.handleImage} />
						<img src={picture} alt="Upload Image" className="AddCar-add-image" />
					</label>
				)
			} else {
				imageTags.push(
					<div className="AddCar-image-uploaded">
						<img src={images[img]} alt="" className="AddCar-view-image" />
						<span 
							className="AddCar-close" 
							title="Remove" 
							data-name={"img-" + img} 
							onClick={(e) => this.handleImage(e, true)}>
							&#10006;
						</span>
					</div>
				)
			}
			
		}

		return(
			<div className="AddCar">
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
				{!this.state.small && <><section id="uploadImages">
					<div>
						<h1>Upload Images</h1>
						<p className="AddCar-upload-images-message">
							* Kindly upload atleast one image of the car
							<br />
							** 360 version is not mandatory
						</p>
					</div>
					<div className="AddCar-upload-box AddCar-sides">
						{imageTags[0]}
						{imageTags[1]}
						{imageTags[2]}
						{imageTags[3]}
					</div>
					<div className="AddCar-upload-box AddCar-middle">
						<div className="AddCar-middle-side">
							{imageTags[11]}
							{imageTags[10]}
						</div>
						<div className="AddCar-middle-center">
							{
								this.state._360 === "" ? <label className="AddCar-image-upload _360">
									<input type="file" name="_360" onChange={this.handle360} />
									<img src={_360} alt="Upload Image" className="AddCar-add-image" />
								</label> :
								<div style={{ position: 'relative' }}>
									<Pannellum
								        id="AddCar-pannellum"
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
										onClick={(e) => this.handle360(e, true)}>
											&#10006;
										</span>
							    </div>
							}
						</div>
						<div className="AddCar-middle-side">
							{imageTags[4]}
							{imageTags[5]}
						</div>
					</div>
					<div className="AddCar-upload-box AddCar-sides">
						{imageTags[9]}
						{imageTags[8]}
						{imageTags[7]}
						{imageTags[6]}
					</div>
				</section>
				<section id="uploadCarDetails">
					<div className="AddCar-details-left">
						<h1>Add Details</h1>
						<div className="AddCar-details">
							<div>
								<input type="text" name="make" spellCheck={false} autoComplete="off"
									placeholder="Make" 
									className={carDetails["make"] === "" ? "AddCar-details-input AddCar-left AddCar-make" :
									"AddCar-details-input AddCar-left AddCar-make AddCar-done" }
									onChange={this.handleInput} value={this.state.carDetails["make"]} />
								<input type="text" name="model" spellCheck={false} autoComplete="off"
									placeholder="Model" 
									className={carDetails["model"] === "" ? "AddCar-details-input AddCar-left AddCar-model" :
									"AddCar-details-input AddCar-left AddCar-model AddCar-done"}
									onChange={this.handleInput} value={this.state.carDetails["model"]} />
							</div>
							<div>
								<input type="text" name="price" spellCheck={false} autoComplete="off"
									placeholder="Price"
									className={carDetails["price"] === "" ? "AddCar-details-input AddCar-price" : 
									"AddCar-details-input AddCar-price AddCar-done"}
									onChange={this.handlePrice} value={carDetails["price"]} /> 
								<span className="AddCar-extra">&euro;</span>
							</div>
							<div className="AddCar-type-check-container">
								<span className="AddCar-type-details">Status:</span>
								<button name="type" value="used" 
									className={carDetails["type"] === "used" ? "AddCar-type-check AddCar-selected" : 
									"AddCar-type-check"} onClick={this.handleInput}>
										Used
									</button>
								<button name="type" value="new" 
									className={carDetails["type"] === "new" ? "AddCar-type-check AddCar-selected" : 
									"AddCar-type-check"} onClick={this.handleInput}>
									New
								</button>
							</div>
							{carDetails["type"] === "used" && <div>
								<input type="text" name="usedKms" spellCheck={false} autoComplete="off"
									placeholder="Used Kms" onChange={this.handleCommed} value={carDetails["usedKms"]}
									className={carDetails["usedKms"] === "" ? "AddCar-details-input AddCar-left AddCar-make" :
									"AddCar-details-input AddCar-left AddCar-make AddCar-done"} />
								<input type="text" name="firstReg" spellCheck={false} autoComplete="off"
									placeholder="First Registration Year" value={carDetails["firstReg"]} onChange={this.handleYear}
									className={carDetails["firstReg"] === "" ? "AddCar-details-input AddCar-left AddCar-model" :
									"AddCar-details-input AddCar-left AddCar-model AddCar-done"} />
							</div>}
							<div>
								<input type="text" name="paint" spellCheck={false} autoComplete="off"
									placeholder="Paint Type" value={carDetails["paint"]} onChange={this.handleInput}
									className={carDetails["paint"] === "" ? "AddCar-details-input AddCar-left AddCar-model" :
									"AddCar-details-input AddCar-left AddCar-model AddCar-done"} />
								<input type="text" name="color" spellCheck={false} autoComplete="off"
									placeholder="Color" value={carDetails["color"]} onChange={this.handleInput}
									className={carDetails["color"] === "" ? "AddCar-details-input AddCar-left AddCar-make" :
									"AddCar-details-input AddCar-left AddCar-make AddCar-done"} />
							</div>
							<div>
								<input type="text" name="doors" spellCheck={false} autoComplete="off"
									placeholder="No. of Doors" value={carDetails["doors"]} onChange={this.handleSingle}
									className={carDetails["doors"] === "" ? "AddCar-details-input AddCar-left AddCar-make" :
									"AddCar-details-input AddCar-left AddCar-make AddCar-done"} />
								<input type="text" name="seats" spellCheck={false} autoComplete="off"
									placeholder="No. of Seats" value={carDetails["seats"]} onChange={this.handleSingle}
									className={carDetails["seats"] === "" ? "AddCar-details-input AddCar-left AddCar-make" :
									"AddCar-details-input AddCar-left AddCar-make AddCar-done"} />
								<input type="text" name="gears" spellCheck={false} autoComplete="off"
									placeholder="No. of Gears" value={carDetails["gears"]} onChange={this.handleSingle}
									className={carDetails["gears"] === "" ? "AddCar-details-input AddCar-left AddCar-make" :
									"AddCar-details-input AddCar-left AddCar-make AddCar-done"} />
							</div>
							<div className="AddCar-type-check-container">
								<span className="AddCar-type-details">Gear Type:</span>
								<button name="gearType" value="auto" 
									className={carDetails["gearType"] === "auto" ? "AddCar-type-check AddCar-selected" : 
									"AddCar-type-check"} onClick={this.handleInput}>
									Automatic
								</button>
								<button name="gearType" value="man" 
									className={carDetails["gearType"] === "man" ? "AddCar-type-check AddCar-selected" : 
									"AddCar-type-check"} onClick={this.handleInput}>
									Manual
								</button>
							</div>
							<div>
								<input type="text" name="displacement" spellCheck={false} autoComplete="off"
									placeholder="Displacement" value={carDetails["displacement"]} onChange={this.handleCommed}
									className={carDetails["displacement"] === "" ? "AddCar-details-input AddCar-left AddCar-last" :
									"AddCar-details-input AddCar-left AddCar-last AddCar-done"} />
								<span className="AddCar-last-extra">cc</span>
								<input type="text" name="weight" spellCheck={false} autoComplete="off"
									placeholder="Weight" value={carDetails["weight"]} onChange={this.handleCommed}
									className={carDetails["weight"] === "" ? "AddCar-details-input AddCar-left AddCar-last" :
									"AddCar-details-input AddCar-left AddCar-last AddCar-done"} />
								<span className="AddCar-last-extra">kgs</span>
								<input type="text" name="fuel" spellCheck={false} autoComplete="off"
									value={carDetails["fuel"]} onChange={this.handleInput}
									placeholder="Fuel Type" className={carDetails["fuel"] === "" ? 
									"AddCar-details-input AddCar-left AddCar-make" : 
									"AddCar-details-input AddCar-left AddCar-make AddCar-done"} />						
							</div>
							<button
								onClick={this.handleSubmit}
								disabled={!this.state.submitReady}
								className={this.state.submitReady ? "AddCar-details-submit-button" : "AddCar-details-preview-button"}>
									Submit
							</button>
						</div>
					</div>
					<div className="AddCar-details-right">
						{this.state.errors.noImages === 1 ? 						
						<p className="AddCar-upload-images-message">{message}</p>
						: 
						<div className="AddCar-preview">
							
						</div>}
					</div>
				</section></>}
				{this.state.small &&
				<div className="msg"><p>The website is not yet supported on smaller devices</p></div>}
				{this.state.toast !== "" ? <Toast close={this.toggleToast} message={this.state.toast} /> : null}
			</div>
		)
	}
}