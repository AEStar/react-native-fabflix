import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  View,
  StatusBar,
  Button,
  Alert,
} from "react-native";
import { Text, TextInput, List } from "react-native-paper";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Movies from "../apis/Movies";
import { FlatList } from "react-native-gesture-handler";

function Search({ navigation }) {
  const email = AsyncStorage.getItem("email");
  const session_id = AsyncStorage.getItem("session_id");
  const transaction_id = AsyncStorage.getItem("transaction_id");
  const [title, setTitle] = useState(null);
  const [movieList, setMovieList] = useState(null);

  const handleSearch = (e) => {
    let queryMap = new Map();
    queryMap.set("title", title);

    Movies.search(email, session_id, transaction_id, queryMap)
      .then((response) => {
        console.log(response?.data);
        setMovieList(response?.data.movies);
      })
      .catch((error) => Alert.alert(error));
  };

  return (
    <>
      <Header titleText="Fabflix" />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Search Movies</Text>
        </View>
        <View style={{ marginBottom: 5 }}>
          <TextInput
            label="Title:"
            mode="outlined"
            value={title}
            onChangeText={setTitle}
            style={{ marginBottom: 10, marginTop: 20 }}
          />

          <Button
            onPress={handleSearch}
            title="search"
            color="skyblue"
            accessibilityLabel="Search"
          />
        </View>
        {movieList != null && (
          <FlatList
            data={movieList}
            renderItem={({ item }) => (
              <View style={styles.movieCard}>
                <Text
                  style={styles.movieInfo}
                  onPress={() => {
                    navigation.navigate("Detail", { movie_id: item.movie_id });
                    console.log("send parameters: " + item.movie_id);
                  }}
                >
                  Title: {item.title}
                </Text>
                <Text style={styles.movieInfo}>Year: {item.year}</Text>
                <Text style={styles.movieInfo}>Director: {item.director}</Text>
                <Text style={styles.movieInfo}>Rating: {item.rating}</Text>
              </View>
            )}
            keyExtractor={(item) => item.movie_id}
          />
        )}
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
  movieCard: {
    width: "100%",
    marginTop: 2,
    marginBottom: 2,
    borderWidth: 4,
    borderColor: "orange",
    borderRadius: 6,
  },
  movieInfo: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Roboto",
  },
});

export default Search;
