import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { styles } from "./month_year_view_style";

export default function MonthDetails() {
  const { name, month, year, person_id } = useLocalSearchParams<{
    name: string;
    month: string;
    year: string;
    person_id: string;
  }>();

  const [attendance, setAttendance] = useState<
    { day: number; status: string; salary: string }[]
  >([]);

  const getDaysInMonth = (monthName: string, yearNum: number) => {
    const monthIndex = [
      "जनवरी", "फ़रवरी", "मार्च", "अप्रैल", "मई", "जून",
      "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"
    ].indexOf(monthName);

    if (monthIndex === -1) return 30;
    return new Date(yearNum, monthIndex + 1, 0).getDate();
  };

  useEffect(() => {
  const yearNum = Number(year) || new Date().getFullYear();
  const days = getDaysInMonth(month, yearNum);

  const tempAttendance = [];
  for (let i = 1; i <= days; i++) {
    tempAttendance.push({
      day: i,
      status: "",
      salary: "",
    });
  }
  setAttendance(tempAttendance);

  // Directly pass tempAttendance instead of relying on state
  fetchAttendance(tempAttendance);
}, [month, year]);


  const fetchAttendance = async (attendanceList: { day: number; status: string; salary: string }[]) => {
  try {
    const res = await axios.get(
      `http://192.168.1.7:5000/api/attendance/${person_id}/${year}/${month}`
    );

    if (res.data && res.data.data) {
      const storedData = res.data.data;
      const updatedAttendance = attendanceList.map((att) => {
        if (storedData[att.day]) {
          return {
            ...att,
            status: storedData[att.day].status,
            salary: storedData[att.day].salary.toString(),
          };
        }
        return att;
      });
      setAttendance(updatedAttendance);
    }
  } catch (err) {
    console.error("Error fetching attendance:", err);
  }
};


  const handleStatusChange = (index: number, value: string) => {
    const newAttendance = [...attendance];
    value = value.toUpperCase();

    if (value === "P") {
      newAttendance[index].status = "हाज़िरी";
    } else if (value === "A") {
      newAttendance[index].status = "गैर-हाज़िरी";
    } else if (value === "H") {
      newAttendance[index].status = "आधा हाज़िरी";
    } else {
      newAttendance[index].status = value;
    }

    setAttendance(newAttendance);
  };

  const handleSalaryChange = (index: number, value: string) => {
    const newAttendance = [...attendance];
    newAttendance[index].salary = value;
    setAttendance(newAttendance);
  };

  const totalSalary = attendance.reduce(
    (sum, item) => sum + (Number(item.salary) || 0),
    0
  );

  const totalPresent = attendance.filter(item => item.status === "हाज़िरी").length;
  const totalAbsent = attendance.filter(item => item.status === "गैर-हाज़िरी").length;
  const totalHalf = attendance.filter(item => item.status === "आधा हाज़िरी").length;

  const saveData = async () => {
    const dataToSave: { [key: number]: { status: string; salary: string } } = {};
    attendance.forEach(att => {
      dataToSave[att.day] = { status: att.status, salary: att.salary };
    });

    try {
      await axios.post("http://192.168.1.7:5000/api/attendance/save", {
        person_id,
        year,
        month,
        data: dataToSave
      });

      Alert.alert("सफलता", "डेटा सुरक्षित हो गया है।");
    } catch (err) {
      console.error("Error saving attendance:", err);
      Alert.alert("त्रुटि", "डेटा सुरक्षित करने में समस्या हुई।");
    }
  };

  return (
    <FlatList
      style={styles.container}
      data={attendance}
      keyExtractor={(item) => item.day.toString()}
      ListHeaderComponent={
        <>
          <Image
            source={require("../../../assets/images/surgyan.jpeg")}
            style={styles.logoBanner}
          />

          <Text style={styles.title}>
            {name} - {month} {year}
          </Text>

          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.cellHeader}>दिनांक</Text>
            <Text style={styles.cellHeader}>हाजिरी/गैर-हाजिरी</Text>
            <Text style={styles.cellHeader}>राशि (₹)</Text>
          </View>
        </>
      }
      renderItem={({ item, index }) => (
        <View style={styles.tableRow}>
          <Text style={styles.cell}>{item.day} {month}</Text>

          <TextInput
            style={[styles.cell, styles.input]}
            value={item.status}
            placeholder="P=A=H"
            onChangeText={(value) => handleStatusChange(index, value)}
          />

          <TextInput
            style={[styles.cell, styles.input]}
            value={item.salary}
            placeholder="राशि"
            keyboardType="numeric"
            onChangeText={(value) => handleSalaryChange(index, value)}
          />
        </View>
      )}
      ListFooterComponent={
        <>
          <View style={styles.totalsContainer}>
            <Text style={styles.totalText}>कुल हाज़िरी: {totalPresent}</Text>
            <Text style={styles.totalText}>कुल गैर-हाज़िरी: {totalAbsent}</Text>
            <Text style={styles.totalText}>कुल आधा हाज़िरी: {totalHalf}</Text>
            <Text style={styles.totalMoney}>कुल राशि: ₹ {totalSalary}</Text>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={saveData}>
            <Text style={styles.saveButtonText}>सहेजें</Text>
          </TouchableOpacity>
        </>
      }
    />
  );
}
