import { useEffect, useState } from "react";
import "./table.css";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  return list ? JSON.parse(list) : [];
};

const Table = () => {
  const [allReviews, setAllReviews] = useState(getLocalStorage());
  const [reviews, setReviews] = useState(getLocalStorage());
  const [searchFilter, setSearchFilter] = useState({
    query: "",
    filterName: "name",
  });
  const [allNames, setAllNames] = useState([]);
  const [allEmails, setAllEmails] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (eve) => {
    const { name, value } = eve.target;
    if (searchFilter.filterName === "name") setSuggestions(allNames);
    if (searchFilter.filterName === "email") setSuggestions(allEmails);
    setSearchFilter({ ...searchFilter, [name]: value });
  };

  const handleSearch = () => {
    const key = searchFilter.filterName === "name" ? "name" : "email";
    const tmp = allReviews.find((item) => item[key].toLowerCase() === searchFilter.query.toLowerCase());
    if(tmp !== undefined) setReviews([tmp]);
    else setReviews([]);
  };
  const handleClear = () => {
    setReviews(getLocalStorage());
    setSearchFilter({
      query: "",
      filterName: "name",
    });
  };

  useEffect(() => {
    reviews.map((item) => {
      setAllNames((prev) => [...prev, item.name]);
      setAllEmails((prev) => [...prev, item.email]);
    });
  }, []);

  return (
    <>
      <section className="table-sec">
        <div className="table-heading">
          <h1>All Feedback</h1>
          <div className="filter">
            <input
              type="text"
              placeholder="write"
              name="query"
              value={searchFilter.query}
              onChange={handleChange}
              list="data-lst"
            />
            <datalist id="data-lst" className="d-lst">
              {suggestions.map((item, index) => {
                return (
                  <option value={item} key={index}>
                    {item}
                  </option>
                );
              })}
            </datalist>
            <select
              name="filterName"
              value={searchFilter.filterName}
              onChange={handleChange}
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
            </select>
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
            <button
              className="search-btn"
              onClick={handleClear}
              style={{ background: "crimson" }}
            >
              Clear Filter
            </button>
          </div>
        </div>
        {
            reviews.length > 0
            ?
            <table className="table">
          <thead className="table-head">
            <tr className="head-row">
              <th>Form Name</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Customer Phone</th>
              <th>Service</th>
              <th>Beverage Quality</th>
              <th>Cleanliness</th>
              <th>Overall Experience</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {reviews.map((item) => {
              const {
                id,
                name,
                email,
                phone,
                question1,
                question2,
                question3,
                question4,
              } = item;
              return (
                <tr className="body-row" key={id}>
                  <td>Aromatic Bar</td>
                  <td className="cap">{name}</td>
                  <td>{email}</td>
                  <td>+91 {phone}</td>
                  <td className="cap">{question1}</td>
                  <td className="cap">{question2}</td>
                  <td className="cap">{question3}</td>
                  <td className="cap">{question4}</td>
                </tr>
              );
            })}
            {/* <tr className="body-row">
              <td>Aromatic Bar</td>
              <td className="cap">Every Long long long long name</td>
              <td>mominmusabmonminmusab123123123@gmail.com</td>
              <td>+91 7787647654</td>
              <td className="cap">GOOD</td>
              <td className="cap">GOOD</td>
              <td className="cap">GOOD</td>
              <td className="cap">GOOD</td>
            </tr> */}
          </tbody>
            </table>
            :
            <h3 className="not-found">Records Not Found</h3>
        }
      </section>
    </>
  );
};

export default Table;
