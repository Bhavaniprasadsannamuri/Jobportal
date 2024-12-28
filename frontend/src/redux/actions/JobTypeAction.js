import axios from "axios"
import { JOB_TYPE_LOAD_FAILURE, JOB_TYPE_LOAD_REQUEST, JOB_TYPE_LOAD_SUCCESS } from "../constants/jobTypeConst";

export const jobTypeAction = () => async (dispatch) => {
  dispatch({ type: JOB_TYPE_LOAD_REQUEST, });


  try {
    const response = await axios.get(`http://localhost:9001/alljobtype`);
   
    dispatch({ type: JOB_TYPE_LOAD_SUCCESS, payload: response.data });
    
  }
  
  catch (error) {
        const errorMessage = error.response ? error.response.data.error : error.message;

        dispatch({ type: JOB_TYPE_LOAD_FAILURE, payload: errorMessage });

  }
  
}