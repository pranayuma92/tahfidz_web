import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Header from '../components/Header'
import { addNewCatModule, editCatModule } from '../store/actions/moduleAction' 

const AddModule = ({ history, addNewCatModule, editCatModule, location, module }) => {
	const { id, edit } = location.state

	const [ title, setTitle ] = useState(module ? module.title : '')
	const [ content, setContent ] = useState(module ? module.content : '')
	const [ cat, setCat ] = useState(module ? module.cat : '')
	const [ img, setImg ] = useState(module ? module.img : '')
	const [ sound, setSound ] = useState(module ? module.sound : '')
	const [ message, setMessage ] = useState('')

	const handleMessage = (msg) => {
		setMessage(msg)
		setTimeout(() => {
			setMessage('')
		}, 2000)
	}

	console.log(module)

	const handleSave = () => {
		if(title === '' || content === '' || cat === '' || sound === '') {
			handleMessage('Kolom tidak boleh kosong') 
			return 
		}

		console.log(title,content,cat,img,sound)
		const modules = { title,content,cat,img,sound }

		if(edit){
			editCatModule(modules, id, () => {
				setTitle('')
				setContent('')
				setSound('')
				setCat('')
				setSound('')
				setImg('')
				handleMessage('Berhasil mengedit')
			})
		} else {
			addNewCatModule(modules, () => {
				setTitle('')
				setContent('')
				setSound('')
				setCat('')
				setSound('')
				setImg('')
				handleMessage('Berhasil menambahkan')
			}, () => {
				console.log('error')
				handleMessage('Terjadi error')
			})
		}

	}

	const handleImageChange = (e) => {
	    const self = this
	    e.preventDefault();
	    let file = e.target.files[0];
	    let reader = new FileReader();
	    reader.readAsDataURL(file);
	    reader.onload = () => {
	        setImg(reader.result)
	    };
	}

	const handleBtn = () => {
		document.getElementById('choose').click();
	}

	return (
		<React.Fragment>
			<Header title={ edit ? `Edit Materi` : `Tambah Materi`} history={history} enableBack/>
			<div className="main-content">
				<div className="section__content section__content--p30">
	                <div className="container-fluid">
	                 	<div className="au-card">
	                    	<h3 style={{marginBottom: '20px'}}>{ edit ? `Edit Materi` : `Tambah Materi Baru`}</h3>
	                    	<div className="edituser-form-wrapper">
	                    		<div className="row">
		                    		<div className="col-md-12">
		                    			<div className="form-group">
					                        <label>Judul</label>
					                        <input className="form-control au-input au-input--full" type="text" id="id" onChange={(e) => setTitle(e.target.value)} value={title}/>
					                    </div>
					                    <div className="form-group">
					                        <label>Konten</label>
					                        <textarea rows="6" className="form-control au-input au-input--full" id="content" onChange={(e) => setContent(e.target.value)} value={content}></textarea>
					                    </div>
					                    <div className="form-group">
					                        <label>Kategori</label>
					                        <select className="form-control" id="cat" onChange={(e) => setCat(e.target.value) } value={cat}>
					                        	<option value="">Pilih Kategori</option>
					                        	<option value="makharijul">Makharijul Huruf</option>
					                        	<option value="mad">Mad</option>
					                        	<option value="dengung">Dengung</option>
					                        	<option value="sifat-huruf">Sifat Huruf</option>
					                        </select>
					                    </div>
					                    <div className="form-group">
					                        <div onClick={handleBtn} className="img-placeholder">
												{ img ? <img style={{width: '300px'}} src={img} /> : <button type="button" className="btn btn-outline-primary">Tambah gambar</button> }
											</div>
					                    </div>
					                    <input type="file" id="choose" style={{display: 'none'}} onChange={handleImageChange} />
					                    <div className="form-group">
					                        <label>Suara (url)</label>
					                        <input className="form-control au-input au-input--full" type="text" id="sound" onChange={(e) => setSound(e.target.value)} value={sound}/>
					                    </div>
					                    <button type="button" className="btn btn-outline-primary" onClick={handleSave} ><i className="fa fa-check"></i> Save</button>
					                    { message && 
					                    	<span style={{paddingLeft : '20px'}}>{ message }</span>
					                    }
		                    		</div>
		                    	</div>
		                    </div>
	                    </div>
	                </div>
	            </div>
			</div>
		</React.Fragment>
	)
}

const mapStateToProps = (state, props) => {
	console.log(props.location.state.id)
	const id = props.location.state.id
	const modules = state.firestore.data.cat_module
	const module = modules ? modules[id] : null
	return {
		module: module
	}
}

const mapDispatchToProps = (dispatch) => ({
	addNewCatModule: (modules, callback, fallback) => dispatch(addNewCatModule(modules, callback, fallback)),
	editCatModule: (modules, id, callback, fallback) => dispatch(editCatModule(modules, id, callback,fallback))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddModule)

