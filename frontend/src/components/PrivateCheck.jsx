import { Outlet } from "react-router-dom";

function PrivateCheck () {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <>You are not Authenticated!</>;
}


export default PrivateCheck;