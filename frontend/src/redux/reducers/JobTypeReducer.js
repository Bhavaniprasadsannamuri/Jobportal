import { JOB_TYPE_LOAD_FAILURE } from "../constants/jobTypeConst"
import { JOB_TYPE_LOAD_REQUEST } from "../constants/jobTypeConst"
import { JOB_TYPE_LOAD_SUCCESS } from "../constants/jobTypeConst"
import { JOB_TYPE_LOAD_RESET } from "../constants/jobTypeConst"
export const loadJobTypeReducer = (state = { jobType: [] }, action) => {
  

  switch (action.type) {
    case JOB_TYPE_LOAD_REQUEST:
      return {

        loading: true
      }

    case JOB_TYPE_LOAD_SUCCESS:
      console.log( "inreducer",action.payload.jobT);
      return {
        loading: false,
        jobTypesAll: action.payload.JobT
      }  
    case JOB_TYPE_LOAD_FAILURE:
      return {loading:false} 
    case JOB_TYPE_LOAD_RESET:
      return {}
    default:
      return state;
  }
  
}