import './App.css';
import { useState, useEffect, useReducer } from "react"
import { initialState, reducer } from './redux/redux';
import axios from "axios"

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch({
      type: "LOADING"
    })
    axios.get(`https://give-me-users-forever.vercel.app/api/users/${1}/next`).then((res) => {
      if(res.status === 200){
        dispatch({
          type: "SUCCESS",
          payload: res.data
        });
      } else{
        dispatch({
          type: "FAILURE",
          payload: res.message
        });
      }
    })
  },[])

  const { 
    loading,
    data,
    error
  } = state

  const handlePrevClick = () => {
    if(currentPage > 1){
      setCurrentPage(p => p-1)
    }
  };

  const lastPage = Math.ceil(data?.users?.length / 10);
  const handleNextClick = () => {
    if (currentPage < lastPage) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const indexOfLastUser = currentPage * 10;
  const indexOfFirstUser = indexOfLastUser - 10;
  const currentUsers = data?.users?.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
  
    <h2>All Users</h2>
      <div className='wrapper'>
        <div className="App">
          {loading ? <div style={{ display: 'flex', justifyContent: "center", margin: "auto"}}>loading...</div> :
            <>
              <table>
                <thead>  
                  <tr>
                    <th>S.no</th>
                    <th>Username</th>
                    <th>Company</th>
                    <th>Job Title</th>
                  </tr>
                </thead>
                <tbody>
                  {currentUsers?.map((data, idx) => {
                    return <tr key={idx} style={{ textAlign: "center"}}>
                      <td>{data.ID-1}</td>
                      <td>{data.FirstNameLastName}</td>
                      <td>{data.Company}</td>
                      <td>{data.JobTitle}</td>
                    </tr>
                  })}
                </tbody>
              </table>
              
              <div className='button-container'>
                {<button disabled={currentPage<=1} onClick={handlePrevClick}>Prev</button>}
                {<button disabled={currentPage>=lastPage} onClick={handleNextClick}>Next</button>}
              </div>
            </>
          }
        </div>
      </div>
      </>
  );
}

export default App;
