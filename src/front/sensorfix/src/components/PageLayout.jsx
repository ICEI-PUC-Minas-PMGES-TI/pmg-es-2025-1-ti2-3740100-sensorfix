import Voltar from './Voltar';
import { useLocation } from 'react-router-dom';

const PageLayout = ({ children }) => {
  const location = useLocation();

  // inserir aqui as rotas onde NÃO vai mostrar o botão
  const showBackButton = !['/'].includes(location.pathname);

  return (
    <div className="container-fluid" >
      {showBackButton && <Voltar />}
      {children}
    </div>
  );
};

export default PageLayout;
