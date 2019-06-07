import React from 'react';
import picture from '../../../assets/images/car.png';
import _360 from '../../../assets/images/_360.png';
import './AddCar.css';
import { Pannellum, PannellumVideo } from "pannellum-react";

const INIT_STATE = {
	dragging: false,
	imagesReq: 12,
	images: ["","","","","","","","","","","",""],
	_360: ""
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


	handleDrag = (e) => {
		e.preventDefault()
  		e.stopPropagation()
  		
	}
	
	handleDragIn = (e) => {
		e.preventDefault()
  		e.stopPropagation()
  		this.dragCounter++ 
  		if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
		  this.setState({dragging: true})
		}
	}
	
	handleDragOut = (e) => {
		e.preventDefault()
  		e.stopPropagation()
  		this.dragCounter--
  		if (this.dragCounter > 0) return
  		this.setState({dragging: false})
	}
	
	handleDrop = (e) => {
		e.preventDefault()
  		e.stopPropagation()
  		this.setState({dragging: false})

	    let reader = new FileReader();
        let name = e.target.dataset.name;
        let file = e.dataTransfer.files[0];

        let temp = [...this.state.images];

        reader.onloadend = () => {
        	temp[parseInt(name.split("-")[1])] = reader.result;
            this.setState({
                images: temp
            });
        }

        reader.readAsDataURL(file);
	}


	componentDidMount() {
		this.dragCounter = 0
		for(var div of this.imageRefs) {
			div.current.addEventListener('dragenter', this.handleDragIn)
		    div.current.addEventListener('dragleave', this.handleDragOut)
		    div.current.addEventListener('dragover', this.handleDrag)
		    div.current.addEventListener('drop', this.handleDrop)
		}

		// let _div = this._360ref.current;
		// _div.current.addEventListener('dragenter', this.handleDragIn)
	 //    _div.current.addEventListener('dragleave', this.handleDragOut)
	 //    _div.current.addEventListener('dragover', this.handleDrag)
	 //    _div.current.addEventListener('drop', this.handle360Drop)

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

		// let _div = this._360ref.current;

		// if(_div !== null) {
		// 	_div.current.addEventListener('dragenter', this.handleDragIn)
		//     _div.current.addEventListener('dragleave', this.handleDragOut)
		//     _div.current.addEventListener('dragover', this.handleDrag)
		//     _div.current.addEventListener('drop', this.handle360Drop)
		// }
		

	}

	componentWillUnmount() {
		for(var div of this.imageRefs) {
			div.current.removeEventListener('dragenter', this.handleDragIn)
		    div.current.removeEventListener('dragleave', this.handleDragOut)
		    div.current.removeEventListener('dragover', this.handleDrag)
		    div.current.removeEventListener('drop', this.handleDrop)
		}

		// let _div = this._360ref.current;
		// _div.current.removeEventListener('dragenter', this.handleDragIn)
	 //    _div.current.removeEventListener('dragleave', this.handleDragOut)
	 //    _div.current.removeEventListener('dragover', this.handleDrag)
	 //    _div.current.removeEventListener('drop', this.handle360Drop)
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
	                images: temp
	            });
	        }

	        reader.readAsDataURL(file);
        }
    }

    handle360 = (e, remFlag=3) => {
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

	render() {

		const { imagesReq, images } = this.state;
		const imageTags = [];

		for (let img in images) {
			if(images[img] === "") {
				imageTags.push(
					<label data-name={"img-" + img} className="AddCar-image-upload" ref={this.imageRefs[img]}>
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
				<header></header>
				<section id="uploadImages">
					<div className="AddCar-upload-box AddCar-sides">
						{imageTags[0]}
						{imageTags[1]}
						{imageTags[2]}
						{imageTags[3]}
					</div>
					<div className="AddCar-upload-box AddCar-middle">
						<div className="AddCar-middle-side">
							{imageTags[4]}
							{imageTags[5]}
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
							{imageTags[6]}
							{imageTags[7]}
						</div>
					</div>
					<div className="AddCar-upload-box AddCar-sides">
						{imageTags[8]}
						{imageTags[9]}
						{imageTags[10]}
						{imageTags[11]}
					</div>
				</section>
			</div>
		)
	}
}