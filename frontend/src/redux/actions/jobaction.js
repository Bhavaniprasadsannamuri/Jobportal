
import { JOB_LOAD_REQUEST, JOB_LOAD_SUCCESS, JOB_LOAD_FAILURE } from "../constants/jobconstant"
import axios from "axios";
export const jobLoad = (pageNumber, keyword = '', cat = '', location = '') => async (dispatch) => {
  console.log("CAT in jobload",cat);
  dispatch({ type: JOB_LOAD_REQUEST });
  try {
    const  response  = await axios.get(`http://localhost:9001/jobs/alljobs?pageNumber=${pageNumber}&keyword=${keyword}&cat=${cat}&location=${location}`);
    console.log("in action crwator");
    console.log( "jobload",response.data);
        // const locations = Array.isArray(response.data.setUniqueLocation) ? response.data.setUniqueLocation : []; // Ensure it's an array

    dispatch({
      type: JOB_LOAD_SUCCESS,
        payload:response.data
      })

  }
  catch (err) {
        const errorMessage = err.response ? err.response.data.error : err.message;

    dispatch({
      type: JOB_LOAD_FAILURE,
      payload: errorMessage,
    });
    
  }

  
}