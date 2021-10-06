
import { BrowserRouter, Route, Switch } from "react-router-dom"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes