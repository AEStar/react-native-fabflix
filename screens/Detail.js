import React, { useState, useEffect } from "react";
import {
  Platform,
  StyleSheet,
  View,
  StatusBar,
  Image,
  Alert,
  Button,
} from "react-native";
import { Text } from "react-native-paper";
import Header from "../components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Movies from "../apis/Movies";

function Detail({ navigation }) {
  const email = AsyncStorage.getItem("email");
  const session_id = AsyncStorage.getItem("session_id");
  const transaction_id = AsyncStorage.getItem("transaction_id");
  const [info, setInfo] = useState(null);
  const movie_id = navigation.getParam("movie_id");

  useEffect(() => {
    if (movie_id) {
      console.log(movie_id);
      if (movie_id) {
        Movies.getDetail(email, session_id, transaction_id, movie_id)
          .then((response) => {
            console.log(response?.data);
            setInfo(response?.data?.movie);
          })
          .catch((error) => Alert.alert(error));
      }
    }
  }, [movie_id]);

  return (
    <>
      <Header titleText="Fabflix" />
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Detail of movie {movie_id}</Text>
        </View>
        {info != null && (
          <>
            <View style={styles.image}>
              <Image
                source={{
                  uri:
                    "https://themoviedb.org/t/p/original" + info?.poster_path,
                }}
              />
              <Image
                source={{
                  uri:
                    "https://themoviedb.org/t/p/original" + info?.backdrop_path,
                }}
              />
            </View>
            <View style={styles.basic_info}>
              <Text>Director: {info?.director}</Text>
              <Text>Rating: {info?.rating}</Text>
              <Text>Num of votes: {info?.num_votes}</Text>
              <Text>Budget: {info?.budget}</Text>
              <Text>Revenue: {info?.revenue}</Text>
            </View>
            <View style={styles.overview}>
              <Text>Overview: {info?.overview}</Text>
            </View>
            <View style={styles.genres}>
              <Text>Genres: </Text>
              <Text>
                {info?.genres?.map((genre) => {
                  return genre.name + " . ";
                })}
              </Text>
            </View>
            <View style={styles.genres}>
              <Text>Actors: </Text>
              <Text>
                {info?.people?.map((person) => {
                  return person.name + " . ";
                })}
              </Text>
            </View>
          </>
        )}
      </View>
      <View style={styles.switchButton}>
        <Button
          onPress={() => navigation.navigate("Search")}
          title="Back to search"
          color="#841584"
          accessibilityLabel="Back to search by this button"
        />
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
  image: {
    flex: 1,
    justifyContent: "space-evenly",
    height: "50%",
  },
  basic_info: {
    width: "100%",
    marginTop: 2,
    marginBottom: 2,
    borderWidth: 4,
    borderColor: "purple",
    borderRadius: 6,
  },
  overview: {
    margin: 1,
    marginTop: 2,
    marginBottom: 2,
    borderWidth: 4,
    borderColor: "orange",
    borderRadius: 10,
  },
  genres: {
    fontSize: 12,
  },
  switchButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export default Detail;
