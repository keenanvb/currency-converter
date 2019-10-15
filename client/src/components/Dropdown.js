import React, { useState } from 'react'

const Dropdown = ({ status, dropDownTitle, dropdownData, selectedItem }) => {

    const [displayList, toggleDisplayList] = useState(false)

    const [data, getFilteredData] = useState(dropdownData)

    let displayFirstLetter = (list, item, index) => {
        let titles = list.map((item) => {
            return item.title[0]
        })

        let prevTitle = titles[index - 1];
        if (titles[index] == item.title[0]) {
            if (prevTitle != item.title[0]) {
                return (
                    <div className="dropdown-displayFirst">
                        {item.title[0]}
                    </div>
                )
            }
        } else {
            return (
                null
            )
        }
    }

    // const getSearchText = _.debounce(() => {

    // }, 1000);

    const onChange = (e) => {
        let filterSearch = dropdownData.filter((val) => {
            let title = val.title
            if (title.toLowerCase().indexOf(e.target.value) > -1) {
                return val
            }
        })


        getFilteredData(filterSearch)
        // console.log('filterSearch', filterSearch)
    }

    return (
        <div className='dropdown-container'>
            <div className="dropdown-title">{dropDownTitle}</div>
            <div onClick={() => {
                toggleDisplayList(!displayList)
            }}>
                toggle list
            </div>
            {displayList ? <input
                placeholder='Search'
                autoComplete="off"
                type="text"
                // value={search}
                name="search"
                onChange={(e) => { onChange(e) }}
                maxLength="20"
            /> : null}
            <div style={{ overflowY: "scroll", height: "150px", width: '400px' }}>
                {displayList && <ul className="dropdown-list" onClick={() => {
                    toggleDisplayList(!displayList)
                }}>
                    {data.map((item, index) => (
                        <div>
                            <div key={`${item.id}`}>
                                {displayFirstLetter(data, item, index)}
                            </div>
                            <li key={`${item.id}${item.title}`} onClick={() =>
                                selectedItem(item.id, item.title, item.code, status)}>{item.title} - {item.code} {item.selected}
                            </li>
                        </div>
                    ))}
                </ul>}
            </div>
        </div>
    )
}

export default Dropdown
