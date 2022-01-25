import './App.css';
import { useState } from 'react';
import initData from './initData';

const initSortBy = [null, null];

function App() {
  const data = initData;
  return (
    <div className='App'>
      <Table data={data} />
    </div>
  );
}

const getHeadersFromData = (data) => {
  const headers = new Set();
  data.forEach((obj) => {
    Object.keys(obj).forEach((key) => {
      headers.add(key);
    });
  });
  return [...headers];
};

function Table(props) {
  const { data } = props;
  const [sortBy, setSortBy] = useState(initSortBy);
  const defaultSortDirection = 'asc';
  const headers = getHeadersFromData(data);

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

  const sortedData = getSortedData(); // derived state based on sortBy

  const clearSort = () => {
    setSortBy(initSortBy);
  };

  const handleHeaderClick = (header) => {
    setSortBy((prevState) => {
      if (prevState === initSortBy || sortBy[0] !== header) {
        return [header, defaultSortDirection];
      }

      // Sorting by existing sortBy key, so just need to change direction
      if (sortBy[1] === 'asc') {
        return [header, 'desc'];
      }

      return [header, 'asc'];
    });
  };

  return (
    <>
      <button className='btn-clear' onClick={clearSort}>
        Clear Sorting
      </button>
      <div className='Table'>
        <table>
          <Head headers={headers} handleHeaderClick={handleHeaderClick} />
          <Body headers={headers} data={sortedData} />
        </table>
      </div>
    </>
  );
}

function Head(props) {
  const { headers, handleHeaderClick } = props;
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th onClick={() => handleHeaderClick(header)}>{header}</th>
        ))}
      </tr>
    </thead>
  );
}

function Body(props) {
  const { headers, data } = props;

  return (
    <tbody>
      {data.map((row) => {
        return (
          <tr>
            {headers.map((header) => (
              <td>{row[header] ?? '-'}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
}

export default App;
