
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faStar } from '@fortawesome/free-solid-svg-icons' 


export default class Description extends Component {

    
    render() {
        const img = this.props.clickedImage;
        return (
            <div>
                {img ? <div>
                    <h3 className='description'> {img.description} </h3>
                    <span className='d-flex justify-content-start'>
                        <span className='d-flex align-items-center description-stars'>
                            {[...Array(5)].map((e,i) => {
                            return <FontAwesomeIcon key={i} icon={faStar}
                            className={img.avg_ratings > i ? 'orange': ''} />
                            }
                                )}    
                            <p style={{marginLeft:12, marginTop:16}}> ({img.total_ratings})</p>
                        </span> 
                    </span>
                </div>  
                : !this.props.mount ? null 
                :
                <div className="sky-container">
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>
                    <div className="star"></div>  
                </div>
                }
                    
            </div>
            
        )
    }
}
