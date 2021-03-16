import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import Search from "../screens/Search";
import Detail from "../screens/Detail";

const StackNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Register: {
      screen: Register,
    },
    Search: {
      screen: Search,
    },
    Detail: {
      screen: Detail,
    },
  },
  {
    initialRouteName: "Login",
    headerMode: "none",
    mode: "modal",
  }
);

export default createAppContainer(StackNavigator);
