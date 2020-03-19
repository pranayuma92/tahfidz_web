import React from 'react'

const Modal = (props) =>{
	
	return (
		<>
		<div className={`modal fade ${props.isShow ? 'show' : ''}`} id="exampleModalCenter" role="dialog" style={{display:  `${props.isShow ? 'block' : 'none'}` }}>
		  <div className="modal-dialog modal-dialog-centered" role="document">
		    <div className="modal-content">
		      <div className="modal-header">
		        <h5 className="modal-title" id="exampleModalCenterTitle">{props.title}</h5>
		        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={props.isHide}>
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div className="modal-body">
		       {props.children}
		      </div>
		    </div>
		  </div>
		</div>
		<div className={`${props.isShow ? 'modal-backdrop fade show' : ''}`}></div>
		</>
	)
}

export default Modal