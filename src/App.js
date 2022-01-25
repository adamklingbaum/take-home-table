import './App.css';
import { useState } from 'react';
import initData from './initData';

const initSortBy = [null, null];

function App() {
  const data = initData;
  return (
    <div className='App'>
      <h1>Sorted Data Table</h1>
      <p>
        Click on a column header to sort by that column in{' '}
        <span className='header-selected bold'>ascending (↑)</span> order.
        <br />
        Click again to sort by the same column in{' '}
        <span className='header-selected bold'>descending (↓)</span> order.
      </p>
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

  // Derived state based on sortBy
  const sortedData = getSortedData();

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
          <Head
            headers={headers}
            handleHeaderClick={handleHeaderClick}
            sortBy={sortBy}
          />
          <Body headers={headers} data={sortedData} />
        </table>
      </div>
    </>
  );
}

function Head(props) {
  const { headers, handleHeaderClick, sortBy } = props;
  const [key, direction] = sortBy;
  const arrows = {
    asc: '↑',
    desc: '↓',
  };
  return (
    <thead>
      <tr>
        {headers.map((header) => (
          <th
            key={header}
            onClick={() => handleHeaderClick(header)}
            className={key === header ? 'header-selected' : ''}
          >
            {header}
            {key === header && <span>{arrows[direction]}</span>}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function Body(props) {
  const { headers, data } = props;
  return (
    <tbody>
      {data.map((row, idx) => (
        <BodyRow row={row} headers={headers} key={idx} />
      ))}
    </tbody>
  );
}

function BodyRow(props) {
  const { row, headers } = props;

  return (
    <tr>
      {headers.map((header) => (
        <td key={header}>{row[header] ?? '-'}</td>
      ))}
    </tr>
  );
}

export default App;
