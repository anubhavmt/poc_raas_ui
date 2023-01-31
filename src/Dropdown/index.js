// Reusable Dropdown
import React from 'react'
import './style'

class Dropdown extends React.Component {


    // selectValue => current selected value
    // filterData => choices in the dropdown
    // setFilteredData => function to change the selectValue

    handleChange = e => {
        this.props.setFilteredData(e.target.value);
    };

    render() {
        const {selectValue, filterData} = this.props;

        return (
            <div className='ddown'>
                <select value={selectValue} onChange={this.handleChange}>
                    <option hidden>Select your option</option>
                    {filterData.map(data => {
                        return (
                            <option key={data} value={data}>
                                {data}
                            </option>
                        );
                    })}
                </select>
            </div>
        );
    }

};

export default Dropdown;


// class Parent extends React.Component {
//     constructor() {
//         super();
//         this.state = {
//             selectValue: null,
//             filterData: ['India', 'Canada', 'Srilanka', 'Afghanisthan']
//         };
//     }
//
//     onChangeHandle = (name) => {
//         this.setState({ selectValue: name });
//     };
//
//     render() {
//         return (
//             <div className='parent'>
//                 Please select your country:
//                 <Dropdown selectValue={this.state.selectValue} filterData={this.state.filterData} setFilteredData={this.onChangeHandle} />
//                 <div>{this.state.selectValue ? `The selected country is ${this.state.selectValue}`: 'You have not selected a country'}</div>
//             </div>
//         );
//     }
// }
//
// React.render(<Parent />, document.getElementById('app'));
