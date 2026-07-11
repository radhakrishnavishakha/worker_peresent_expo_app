import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { styles } from "./month_year_view_style";

export default function ViewPerson() {
 const { name, year, person_id } = useLocalSearchParams<{ name: string; year: string; person_id: string }>();

  const router = useRouter();

  // Hindi months
  const months = [
    "जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून",
    "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
  ];

  // Get current year
  const currentYear = new Date().getFullYear();

  return (
    <View style={styles.container}>
      {/* Logo Banner */}
      <Image
        source={require("../../../assets/images/surgyan.jpeg")}
        style={styles.logoBanner}
      />

      {/* Person Name */}
      <Text style={styles.title}>{name}</Text>

      {/* Display Year */}
      <Text style={styles.yearText}>{year}</Text>

      {/* Months List */}
      <FlatList
        data={months}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.monthRow}
            onPress={() =>
              router.push({
                pathname: "/(tabs)/person/monthdetails",
                params: { name, month: item, year, person_id }

              })
            }
          >
            <Text style={styles.monthText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
