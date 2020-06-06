import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { addHafalan, editHafalan, removeHafalan } from '../store/actions/moduleAction'

const Hafalan = ({ data, hafalan, surah, addHafalan, editHafalan, removeHafalan, uid}) => {
	const dataHafalan = hafalan && hafalan.filter( item => data && data.includes(item.id))
	const [ modal, setModal ] = useState(false)
	const [ ayahname, setAyahname ] = useState('')
	const [ ayahto, setAyahto ] = useState('')
	const [ ayahfrom, setAyahfrom ] = useState('')
	const [ status, setStatus ] = useState('')
	const [ edit, setEdit ] = useState(false)
	const [ id, setId ] = useState('')

	const handleAdd = () => {
		setId('')
		setAyahname('')
		setAyahfrom('')
		setAyahto('')
		setStatus('')
		setEdit(false)
		setModal(true)
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const data = {
			surah: ayahname,
			from: ayahfrom,
			to: ayahto,
			status: status
		}

		if(edit){
			editHafalan(id, data, () => {
				setEdit(false)
				setModal(false)
			})
		} else {
			addHafalan(uid, data, () => {
				setEdit(false)
				setModal(false)
			})
		}
	}

	const handleEdit = (e, item) => {
		e.preventDefault()
		setId(item.id)
		setAyahname(item.surah)
		setAyahfrom(item.from)
		setAyahto(item.to)
		setStatus(item.status)
		setEdit(true)
		setModal(true)
		console.log(item)
	}

	const handleRemove = (e, id) => {
		e.preventDefault()
		removeHafalan(id, () => {})
	}

	return(
		<>
		<div className="au-card">
        	<h3>Hafalan</h3>
        	<button type="button" className="btn btn-outline-success" onClick={handleAdd}><i className="fa fa-plus"></i> add hafalan</button>
           	<div className="table-responsive m-b-40">
                <table className="table table-borderless table-data3">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Hafalan</th>
                            <th>Dari Ayat</th>
                            <th>Sampai Ayat</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        { dataHafalan && dataHafalan.map((item, index) => (
	                        	<tr key={index}>
	                                <td>{index+1}</td>
	                                <td>{item.surah.split('_')[1]}</td>
	                                <td>{item.from}</td>
	                                <td>{item.to}</td>
	                                <td>{item.status}</td>
	                                <td><a href="/#" onClick={(e) => handleEdit(e, item)}>Edit</a> / <a href="/#" onClick={(e) => handleRemove(e, item.id)}>Remove</a></td>
	                            </tr>
                        	))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        <Modal title={edit ? 'Edit Hafalan' : 'Add Hafalan'} isShow={modal} isHide={() => setModal(false)}>
         	<form onSubmit={handleSubmit} className="form-add-hafalan">
				<div className="form-group">
	               <select className="form-control" onChange={(e) => setAyahname(e.target.value)} value={ayahname}>
                    	<option value="">Pilih surah</option>
                    	{
                    		surah && surah.map((item) => (
                    			<option key={item.number} value={item.number+'_'+item.englishName}>{item.englishName}</option>
                    		))
                    	}
                    </select>
	            </div>
	            <div className="form-group">
	                <input onChange={(e) => setAyahfrom(e.target.value)} className="au-input au-input--full" type="text" id="fullname" placeholder="Dari ayat" value={ayahfrom}/>
	            </div>
	            <div className="form-group">
	                <input onChange={(e) => setAyahto(e.target.value)} className="au-input au-input--full" type="text" id="fullname" placeholder="Sampai ayat" value={ayahto}/>
	            </div>
	            <div className="form-group">
	               <select className="form-control" onChange={(e) => setStatus(e.target.value)} value={status}>
                    	<option value="">Pilih status</option>
                    	<option value="Belum selesai">Belum selesai</option>
                    	<option value="Selesai">Selesai</option>
                    	<option value="Review">Review</option>
                    </select>
	            </div>
	            <button className="au-btn au-btn--block au-btn--green m-b-20" type="submit">{ edit ? 'Save' : 'Add'}</button>
	        </form>
		</Modal>
		</>
	)
}

const mapStateToProps = (state) => ({
	hafalan : state.firestore.ordered.hafalan,
	surah: state.quran.surah,
})

const mapDispatchToProps = (dispatch) => ({
	addHafalan: (uid, data, callback) => dispatch(addHafalan(uid, data, callback)),
	editHafalan:(id, data, callback) => dispatch(editHafalan(id, data, callback)),
	removeHafalan: (id, callback) => dispatch(removeHafalan(id, callback))
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([
    { collection:'hafalan' }
  ])
)(Hafalan)