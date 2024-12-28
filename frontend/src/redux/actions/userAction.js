import axios from "axios";
import { USER_LOGOUT_FAIL, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_SIGNIN_FAIL, USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS } from "../constants/userConst"
import { toast } from "react-toastify";

export const userSignin = (user) => async(dispatch) =>{
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await axios.post("http://localhost:9001/signin", user);
  localStorage.setItem("userInfo", JSON.stringify(data));
      console.log("valid creds");
     dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload:data
     })
    console.log(data);
    toast.success("login successfully!")
  }
  catch (err) {
        const errorMessage = err?.response?.data?.error || "An error occurred";  // Default error message

    console.log(err.response.data.error);
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: errorMessage
    })
    console.log(err.response.data.error);
    toast.error(err.response.data.error);

  }
}
export const userLogoutAction = () => async (dispatch) => {
  console.log("logging out.....");
  dispatch({ type: USER_LOGOUT_REQUEST });
  try {
    const { data } = axios.get("http://localhost:9001/logout"); 
     dispatch({ type: USER_LOGOUT_SUCCESS ,payload:data});
      toast.success("logout successfull");
  }
  
  catch (err) {  
         dispatch({ type: USER_LOGOUT_FAIL ,payload:err.response.data.error});
      toast.error("logout failed")
  }
  
}

  


