import React from 'react'
import { Link } from 'react-router-dom'

const SurahLists = ({surah}) => {
	return (
		<div className="surah-wrapper">
			{
				surah && surah.map((item, index) => (
					<div key={item.number}>
						<Link to={`/surah/${item.number}`}>
							{index+1}. {item.englishName} <span className="quran-font">{item.name}</span> 
						</Link>
					</div>
				))
			}
		</div>
	)
}

export default SurahLists