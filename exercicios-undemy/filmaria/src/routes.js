
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Filme from './pages/Filme';
import Favoritos from './pages/Favoritos';
import Erro from './pages/Erro';

const Routes = () => {
  return(
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/filmes/:id" component={Filme} />
        <Route exact path="/favoritos" component={Favoritos} />
        <Route path="*" component={Erro} /> {/* Rota para a página de Erro */}
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;

//O BrowserRouter informa para a aplicacao que a partir de onde ele é chamado teremos um roteamento de componentes
//O Switch é um componente que recebe varios componentes Route e dado o caminho passado na URL um deles é renderizado
//O Route é uma rota do nosso sistema, e devemos passar para ele qual vai ser o cminho da url por meio do atributo PATH="" e um outro atibuto importado chamdo COMPONENT=""