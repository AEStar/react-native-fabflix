import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  View,
  StatusBar,
  Button,
  Alert,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import Header from "../components/Header";
import Idm from "../apis/Idm";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Login({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = (e) => {
    Idm.login(email, password)
      .then((response) => {
        console.log(response?.data);
        if (response.data != null) {
          Alert.alert(response?.data?.message);
          console.log("session id is " + response.data.session_id);
          console.log(
            "transaction id is " + response.headers["transaction_id"]
          );
          AsyncStorage.setItem("email", email);
          AsyncStorage.setItem("session_id", response.data.session_id);
          AsyncStorage.setItem(
            "transaction_id",
            response.headers["transaction_id"]
          );
          navigation.navigate("Search");
        }
      })
      .catch((error) => Alert.alert(error));
  };

  return (
    <>
      <Header titleText="Fabflix" />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login: </Text>
        </View>
        <TextInput
          label="Email:"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          style={{ marginBottom: 20, marginTop: 20 }}
        />
        <TextInput
          label="Password:"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          style={{ marginBottom: 20 }}
        />
        <Button
          onPress={handleLogin}
          title="login"
          color="skyblue"
          accessibilityLabel="Login"
        />
        <View style={styles.switchButton}>
          <Button
            onPress={() => navigation.navigate("Register")}
            title="Go to Register"
            color="#841584"
            accessibilityLabel="Register by this button"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  titleContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    backgroundColor: "#61dafb",
    height: 50,
  },
  title: {
    fontSize: 30,
  },
  switchButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default Login;
