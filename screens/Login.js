import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Button,
  StatusBar,
  FlatList,
  RefreshControl,
} from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useEffect } from "react";

export default function Login(params) {
  const [weatherData, setWeatherData] = useState();
  StatusBar.setBarStyle("light-content");

  async function getWeather(city = "Accra") {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6deb1458f7ffc3bf8a19e74b3abf89d4`
    )
      .then((response) => response.json())
      .then((response) => {
        setWeatherData(response);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const weatherImage = [
    { weather: "overcast clouds", img: require("../assets/cloudy.png") },
    { weather: "broken clouds", img: require("../assets/light-rain.png") },
    { weather: "few clouds", img: require("../assets/sun-cloud.png") },
    { weather: "clear sky", img: require("../assets/sun.png") },
    { weather: "light rain", img: require("../assets/rain.png") },
    { weather: "light rain", img: require("../assets/rain.png") },
    { weather: "scattered clouds", img: require("../assets/moon-cloud.png") },
    { weather: "haze", img: require("../assets/haze.png") },
    {
      weather: "light intensity drizzle",
      img: require("../assets/light-drizzle.png"),
    },
    {
      weather: "thunderstorm with rain",
      img: require("../assets/thunderstorm.png"),
    },
  ];

  const cities = [
    "Accra",
    "Toronto",
    "London",
    "Berlin",
    "Manila",
    "Helsinki",
    "Rio",
    "Jakarta",
    "Nairobi",
    "Berlin",
    "Mumbai",
    "Lagos",
    "Malé",
    "Kumasi",
    "Peru",
    "Beijing",
    "Casablanca",
    "Tokyo",
    "Florida",
    "Tunisia",
    "Miami",
    "Chicago",
    "California",
    "Ontario",
    "Cairo",
    "Dubai",
    "Paris",
    "Texas",
    "Manchester",
    "Birmingham",
    "Mexico City",
    "Moscow",
    "Barcelona",
    "Madrid",
    "Rome",
    "Osaka",
    "Johannesburg",
  ];

  function FTC(temp) {
    return temp - 273.15;
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#19172b",
        flex: 1,
        paddingTop: 55,
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          borderRadius: 25,
          backgroundColor: "#211f30",
          padding: 20,
          height: 200,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 30 }}>Today</Text>
          <View>
            <Text style={{ color: "white" }}>{new Date().toDateString()}</Text>
            <Text style={{ color: "grey", textTransform: "capitalize" }}>
              {weatherData?.weather[0].description}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 70 }}>
            {FTC(weatherData?.main.temp).toFixed(1)}
            <Text style={{ color: "orange", fontSize: 40 }}>C</Text>
          </Text>
          <Image
            style={{ width: 100, height: 100, marginRight: 20 }}
            source={
              weatherImage.find(
                (item) => weatherData?.weather[0].description === item?.weather
              )?.img
            }
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="location-outline" color="white" />
          <Text style={{ color: "white", paddingLeft: 10 }}>
            {weatherData?.name}
          </Text>
        </View>
      </View>
      <FlatList
        data={cities}
        ListEmptyComponent={
          <View>
            <Text style={{ color: "white" }}>Nothing here</Text>
          </View>
        }
        contentContainerStyle={{ paddingTop: 20 }}
        refreshControl={
          <RefreshControl
            tintColor="white"
            onRefresh={() => {}}
            refreshing={false}
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              getWeather(item);
            }}
            style={{
              padding: 20,
              borderRadius: 10,
              backgroundColor: "#211f30",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={{ color: "white" }}>{item}</Text>
            <Ionicons
              name={
                item === weatherData?.name
                  ? "radio-button-on"
                  : "radio-button-off"
              }
              size={18}
              color="white"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
