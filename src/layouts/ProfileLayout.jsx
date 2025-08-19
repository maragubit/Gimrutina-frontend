import { Outlet } from "react-router-dom";
import NavegadorProfile from "../features/profiles/NavegadorProfile";

function ProfileLayout() {
  return (
    <>
      <NavegadorProfile />
      <div className="espaceProfile"></div>
      <Outlet /> {/* Aquí se insertan las subpáginas de Profile */}
    </>
  );
}

export default ProfileLayout;