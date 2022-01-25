import './App.css';
import { useState } from 'react';
import initData from 'initData';

const initSortBy = [null, null];

function App() {
  const data = initData;
  return <div className='App'></div>;
}

function Table(props) {
  const { data } = props;
  const [sortBy, setSortBy] = useState(initSortBy);
  const defaultSortDirection = 'asc';

  const getSortedData = () => {
    if (sortBy === initSortBy) return data;

    const sortedData = [...data];
    const [key, direction] = sortBy;
    sortedData.sort((a, b) => {
      if (direction === 'desc') {
        if (a[key] < b[key]) return 1;
        return -1;
      } else {
        if (a[key] > b[key] || b[key] === undefined) return 1;
        return -1;
      }
    });
    return sortedData;
  };

  const clearSort = () => {
    setSortBy(initSortBy);
  };

  const handleHeaderClick = (header) => {
    setSortBy((prevState) => {
      if (prevState === initSortBy || sortBy[0] !== header) {
        return [header, defaultSortDirection];
      }

      if (sortBy[1] === 'asc') {
        return [header, 'desc'];
      }

      return [header, 'asc'];
    });
  };
}

export default App;
