import { JOB_LOAD_FAILURE, JOB_LOAD_REQUEST, JOB_LOAD_RESET, JOB_LOAD_SUCCESS } from "../constants/jobconstant";

export const loadjobreducer = (state = {
  job: [],
  locations : []
  
 }, action) => {
  switch (action.type) {
    case JOB_LOAD_REQUEST:
      return { loading: true };
      
      
    case JOB_LOAD_SUCCESS:
      console.log(  action.payload.modifiedJobs);
      return {
        loading: false,
        success: action.payload.success,
        pages: action.payload.pages,
        count: action.payload.count,
        SetUniueLocation: action.payload.SetUniueLocation,
        jobs: action.payload.modifiedJobs,
        locations: action.payload.setLocations ,
        // locations: Array.isArray(action.payload.locations) ? action.payload.locations : [],  // Ensure locations is an array

        jobType: action.payload.categoryType

        
      }
    case JOB_LOAD_FAILURE: 
      return {
        loading: false,
        error: action.payload
      }
    case JOB_LOAD_RESET: {
      return {}
    }
    default:
      return state;
      
      
  }
}
