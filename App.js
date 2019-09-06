import React from 'react';
import './App.css';

class App extends React.Component {

  constructor() {
    super()
    this.state = {
      searchNum: 0,
      searchedFor: null,
      searchType: null,
      dataSet: [89, 30, 25, 32, 72, 70, 51, 42,
        25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2,
        14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62,
        93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91,
        9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26,
        38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22,
        87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5].sort((a, b) => a - b)
    }
  }

  
  indexOf(array, value) { //linear
    for (let i = 0; i < array.length; i++) {
      if (array[i] == value) {
        return i;
      }
    }
    return -1;
  }

  binarySearch = (array, value, start, end, numTimes = 0) => {
    numTimes++;
    start = start === undefined ? 0 : start;
    end = end === undefined ? array.length : end;

    if (start >= end) {
        return -1;
    }

    const index = Math.floor((start + end) / 2);
    const item = array[index];

    // console.log(start, end);
    if (item == value) {
        return numTimes;
    }
    else if (item < value) {
        return this.binarySearch(array, value, index + 1, end, numTimes);
    }
    else if (item > value) {
        return this.binarySearch(array, value, start, index - 1, numTimes);
    }
};




  onSubmitLinear = ev => {
    ev.preventDefault();
    
    const { lsearch } = ev.target;
    let value = parseInt(lsearch.value);
    this.setState({
      searchType: 'Linear',
      searchedFor: value,
    })
    let result = this.indexOf(this.state.dataSet, value);

    if(result === -1){
      result = 'Number not found in data set';
    } else {
      result = result + 1;
    }

    this.setState({
      searchNum: result,
    })

    lsearch.value = '';

  }

  onSubmitBinary = ev => {
    ev.preventDefault();
    
    const { bsearch } = ev.target;
    let value = parseInt(bsearch.value);
    this.setState({
      searchType: 'Binary',
      searchedFor: value,
    })

    let result = this.binarySearch(this.state.dataSet, value);

    console.log('result',result, typeof result)

    if(result === -1){
      result = 'Number not found in data set';
    } 

    this.setState({
      searchNum: result,
    })

    bsearch.value = '';

  }


  render() {

    return (
      <>
        <form className='linear' onSubmit={this.onSubmitLinear}>
          <label htmlFor='lsearch'>Enter Number: </label>
          <input type='text' id='lsearch'></input>
          <button type='submit'>Linear Search</button>
        </form>
        <br></br>
        <form className='binary' onSubmit={this.onSubmitBinary}>
          <label htmlFor='bsearch'>Enter Number: </label>
          <input type='text' id='bsearch'></input>
          <button type='submit'>Binary Search</button>
        </form>

        <p>Times Searched: {this.state.searchNum} </p>

        {this.state.searchType && <p>Search method: {this.state.searchType}</p>}
        {this.state.searchedFor && <p>Searched for: {this.state.searchedFor}</p>}


        <p style={{maxWidth: '30em'}}><strong>Data Set: </strong> {this.state.dataSet.join(' ')}</p>
      </>


    )
  }
}

export default App;
