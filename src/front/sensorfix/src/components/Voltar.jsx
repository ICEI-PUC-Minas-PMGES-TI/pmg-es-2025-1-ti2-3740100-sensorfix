import { useNavigate, useLocation } from "react-router-dom";
import { IoMdReturnLeft } from "react-icons/io";

const Voltar = ({ label = "Voltar" }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const parentPath = location.pathname
    .split("/")
    .slice(0, -1)
    .join("/") || "/";

  const handleBack = () => {
    navigate(parentPath);
  };

  return (
    <div className="my-1 d-flex  justify-content-start position-relative z-3 ms-auto">
      <button
        onClick={handleBack}
        className="btn btn-outline-dark mt-1 btn-sm d-flex align-items-center gap-2 shadow-sm rounded-pill px-3 py-2"
      >
        <IoMdReturnLeft size={18} />
        <span className="d-none d-sm-inline">{label}</span>
      </button>
    </div>
  );
};

export default Voltar;
