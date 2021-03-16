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

function Register({ navigation }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleRegister = (e) => {
    Idm.register(email, password)
      .then((response) => {
        console.log(response?.data);
        Alert.alert(response?.data?.message);
        navigation.navigate("Login");
      })
      .catch((error) => Alert.alert(error));
  };

  return (
    <>
      <Header titleText="Fabflix" />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Register:</Text>
        </View>
        <TextInput
          label="Email:"
          mode="outlined"
          value={email}
          onChangeText={setEmail}
          style={{ marginBottom: 20 }}
        />
        <TextInput
          label="Password:"
          mode="outlined"
          value={password}
          onChangeText={setPassword}
          style={{ marginBottom: 20 }}
        />
        <Button
          onPress={handleRegister}
          title="register"
          color="skyblue"
          accessibilityLabel="Register"
        />
        <View style={styles.switchButton}>
          <Button
            onPress={() => navigation.navigate("Login")}
            title="Go to login"
            color="#841584"
            accessibilityLabel="Login using this button"
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
    // justifyContent: "center",
    height: 40,
  },
  title: {
    fontSize: 20,
  },
  switchButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default Register;
