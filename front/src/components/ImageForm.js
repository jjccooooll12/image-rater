import React, { Component } from 'react'
import axios from 'axios';

export default class ImageForm extends Component {

    state = {
        editedImage: this.props.editedImage,
        selectedFile:this.props.editedImage.image,
        loading:null
    }

    cancelForm = () => {
        this.props.cancelForm()
    }

    updateView = () => {
        this.props.getImages()
    }

    inputChanged = event => {
        let image = this.state.editedImage;
        image[event.target.name] = event.target.value;
        this.setState({editedImage: image});
    }

    fileChanged = event => {
        this.setState({selectedFile:event.target.files[0]});
    }


    spinnerClick = () => {
        this.setState({loading:true});
    }


   saveClicked = () => {

        this.spinnerClick();

        const headers= {
            'Content-Type': 'application/json',
            'Authorization': `Token ${this.props.token}`
        }

        const formData = new FormData();
        formData.append(
          'image',
          this.state.selectedFile,
        ) 
        formData.append(
            'location', 
            this.props.editedImage.location
        )
        formData.append(
            'description', 
            this.props.editedImage.description
        )
        
        axios.post(`${process.env.REACT_APP_API_URL}/api/images/`, formData, {
            headers: headers
          } )
        .then(this.cancelForm)
        .then(this.updateView)
        .catch(error => error? window.alert("Pls upload only .jpg or .png files"):null)
      }


      updateClicked = () => {

        const headers= {
            'Content-Type': 'application/json',
            'Authorization': `Token ${this.props.token}`
        }

        const formData = new FormData()
        if (typeof this.state.selectedFile == 'object') 
        {formData.append(
          'image',
          this.state.selectedFile,
        )}
        formData.append(
            'location', 
            this.props.editedImage.location,
        )
        formData.append(
            'description', 
            this.props.editedImage.description,
        )
        axios.put(`${process.env.REACT_APP_API_URL}/api/images/${this.props.editedImage.id}/`, formData, {
            headers: headers
          } )
        .then(this.spinnerClick)
        .then(this.cancelForm)
        .then(this.updateView)
        .catch(error => error? window.alert("Please upload only .jpg or .png files"):null)
      }


    render() {

        const loading = this.state.loading
        const isDisabled = this.props.editedImage.description.length === 0 || 
        this.props.editedImage.location.length === 0 

        return (            
            <React.Fragment>                     
                <div className='container imageform'>
                    <div className='row'>
                        <div className='col'>
                            <p className='image-to-upload'> <input type="file" name='image'
                            onChange= {this.fileChanged}  /> </p>  
                           <span>Location</span>
                            <p>  <input type="text" name="location" value={this.props.editedImage.location}
                            onChange={this.inputChanged}/> </p>                            
                            <span>Description</span>
                            <p><textarea name="description" value={this.props.editedImage.description}
                                onChange={this.inputChanged}/> </p> 
                            <button onClick={this.cancelForm}>Cancel</button>   
                            &nbsp;                                     
                            { this.props.editedImage.id ?                        
                                <button disabled={loading? true: isDisabled} onClick={this.updateClicked}>
                                   {loading && <i className='fa fa-refresh fa-spin'></i> } Update</button> :
                                <button disabled={loading? true :isDisabled} onClick={this.saveClicked}>
                                    {loading && <i className='fa fa-refresh fa-spin'></i> } Save</button> }                               
                        </div>
                    </div>
                </div>                
        </React.Fragment>
        )
    }
}
