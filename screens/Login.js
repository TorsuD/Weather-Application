import { useEffect, useState } from "react";
import React from "react";
import { Image, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Login(params) {
  const [weatherData, setWeatherData] = useState();

  async function getWeather() {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=Ghana&appid=6deb1458f7ffc3bf8a19e74b3abf89d4"
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

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View
      style={{
        paddingTop: 55,
        paddingHorizontal: 20,
        backgroundColor: "#19172b",
        flex: 1,
      }}
    >
      <View
        style={{
          borderRadius: 25,
          backgroundColor: "#211f30",
          padding: 10,
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
          <Text style={{ color: "white" }}>{new Date().toDateString()}</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 70 }}>
            30<Text style={{ color: "orange", fontSize: 40 }}>C</Text>
          </Text>
          <Image
            style={{ width: 100, height: 100, marginRight: 20 }}
            source={require("../assets/cloudy.png")}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons name="location-outline" color="white" />
          <Text style={{ color: "white", paddingLeft: 5 }}>Accra</Text>
        </View>
      </View>
    </View>
  );
}
