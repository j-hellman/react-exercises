
import { Switch } from 'react-router-dom'; //Um componente por pagina
import Route from './Route';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Customers from '../pages/Customers';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={SignIn} />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/dashboard" component={Dashboard} isPrivate />
      <Route exact path="/profile" component={Profile} isPrivate />
      <Route exact path='/customers' component={Customers} isPrivate />
    </Switch>
  )
}

//O Switch é um componente que recebe varios componentes Route e dado o caminho passado na URL um deles é renderizado
//O Route é uma rota do nosso sistema, e devemos passar para ele qual vai ser o cminho da url por meio do atributo PATH="" e um outro atibuto importado chamdo COMPONENT=""