
import { Route, Redirect } from 'react-router-dom'; //Redirect serve para direcionar o usuario p pagina que queremos

export default function RouteWrapper({ 
  //Aqui descontroi ele
  component: Component,
  isPrivate, //Propriedade que nomeamos para dizer se a rota é privada ou nao
  ...rest //Spread operator para receber o restante das propriedades existentes no Route
}){

  const loading = false;
  const signed = false;

  if(loading){
    return(
      <div></div>
    )
  }

  if(!signed && isPrivate){
    //Se nao ta logado e a rota é privada, retorna o usuario para a pagina de login
    return <Redirect to="/" />
  }

  if(signed && !isPrivate){
    //Se ta logado e a rota nao é privada, retorna o usuario para a pagina dashboard
    return <Redirect to="/dashboard" />
  }

  return(
    <Route
      {...rest} //Retorna todas as propriedades que o Route tem
      render={ props => (
        <Component {...props} /> //Retorna apenas o Component com todas as propriedades dele
      )}
    />
  )
}