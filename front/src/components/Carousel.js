import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faStar, faMapMarkerAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons' 
import Description from './Description';
import ImageForm from './ImageForm';
import './css/SkyContainer.css';
import './css/Slides.css';
import './css/Thumbnails.css';



export default function Carousel(props) {


    const clickedEvent = img => evt => {
        props.handleClick(img)
    };
  
    const deleteEvent = img => evt => {
        fetch(`${process.env.REACT_APP_API_URL}/api/images/${img.id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
               
            }
            }).then( resp => props.deleteImage(img))
            .then(props.onMount)
            .catch( error => console.log(error)) };
    

    const updateEvent = img => evt => {
        props.updateImage(img)
    }

    const newImage = () => {
        props.newImage();
    };

    const rateClicked = stars => evt => {
        fetch(`${process.env.REACT_APP_API_URL}/api/images/${props.clickedImage.id}/rate_image/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${props.token}`
            },
            body: JSON.stringify({stars: stars + 1})
            }).then( resp => resp.json())
            .then(props.getImages())
            .then(props.settingStars())
            .catch( error => console.log(error))

    }

    return (
        <div className='container'>
            <div className='row'>
                <div className=' col-xl-7 col-lg-8 col-md-8 col-sm-10 col-xs-12 p-0' >
                    <div className='row m-0'  >
                        <div className='col-10 col-xl-8 col-lg-9 col-md-11 col-sm-10 order-xs-1 pad' >                              
                            {props.clickedImage == null?
                            <ul className='slides'>
                                {props.images.map(img => 
                                {return  <React.Fragment  key={img.id}>
                                    <li id={img.id}  > 
                                        <div className="card bg-dark dark">
                                            <img className='img-fluid' src={img.image} alt='landscape'  />
                                            <div className="card-body">
                                                <span className='d-flex justify-content-between align-items-center'>
                                                    <span className='d-flex align-items-center'>
                                                        <FontAwesomeIcon className='icon-map' icon={faMapMarkerAlt}/>
                                                        <p className='location'> {img.location.toLowerCase()} </p>
                                                    </span>                                                                                        
                                                </span>                                                                                                 
                                            </div>
                                        </div>
                                    </li>
                                </React.Fragment> })}
                            </ul> :
                            
                            <ul className='slides '>
                                {props.images.map(img => 
                                {return  <React.Fragment  key={img.id}>
                                    <li id={img.id}  > 
                                        <div className="card bg-dark dark">
                                            <img className='img-fluid' src={img.image} alt='landscape'/>
                                            <div className="card-body">
                                                <span className='d-flex justify-content-between 
                                                align-items-center'>
                                                    <span className='d-flex align-items-center'>
                                                        <FontAwesomeIcon className='icon-map' icon={faMapMarkerAlt}/>
                                                        <p className='location'> {img.location.toLowerCase()} </p>
                                                    </span>                                        
                                                    <div>
                                                        { [...Array(5)].map( (e, i) => {
                                                        return <FontAwesomeIcon key={i} icon={faStar} 
                                                        className= {props.highlighted > i -1 ? 'thistle icon-stars' : 'icon-stars' }
                                                            onMouseEnter={props.highlightRate(i)} 
                                                            onMouseLeave={props.highlightRate(-1)} 
                                                            onClick={rateClicked(i)}/>                                                                                    
                                                            })}
                                                     </div>  
                                                </span>  
                                                <span className='d-flex justify-content-end'>                               
                                                    <span className='d-flex align-items-end icons-span'>                                    
                                                        <i className="fa fa-edit icons" onClick={updateEvent(img)} ></i>
                                                        <i className="fa fa-trash icons trash" aria-hidden="true" onClick={deleteEvent(img)} ></i>
                                                    </span>
                                                 </span>                                                
                                            </div>
                                        </div>
                                    </li>
                                </React.Fragment> })}
                            </ul> }
                        </div>
                        
                            <div className='col-1 col-xs-2 thumbnails nopadding' >
                            <div id='content-1' className='content'>
                                    <ul>  
                                        {props.images.map(img => 
                                        {return <React.Fragment  key={img.id}> 
                                            <li onClick={clickedEvent(img)}>
                                                <a href={'#'+img.id} > 
                                                    <img className='img-fluid rounded' alt='landscape'  src={img.image}/>
                                                </a>
                                            </li>
                                        </React.Fragment>})}
                                    </ul>
                            </div>
                            <FontAwesomeIcon  onClick={newImage}  className='add-button' icon={faPlusCircle}/>                
                        </div>
                    </div>
                </div>
                        <div className='col-xs-12 col-sm-2 col-md-3 col-lg-3 col-xl-5  p-0'>
                    {!props.editedImage?             
                    < Description clickedImage = {props.clickedImage} token={props.token} mount={props.mount} /> :
                    < ImageForm cancelForm = {props.cancelForm} editedImage={props.editedImage}
                        getImages={props.getImages} token={props.token} />}                   
                </div>               
            </div>
        </div>
  
    )
}
