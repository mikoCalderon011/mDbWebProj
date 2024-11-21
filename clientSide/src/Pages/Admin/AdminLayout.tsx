import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Admin/Header";

const AdminLayout = () => {
  console.log("AdminLayout rendered");
  return (
    <>
      <Header />
        <Outlet />
    </>
  );
};

export default AdminLayout
