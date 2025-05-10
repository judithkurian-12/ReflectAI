// Created by Judith Kurian (B00940475)

import React, { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { connect } from "react-redux";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Styles } from "./CalendarStyles";
import { getAllPosts } from "./action";

const Calendar = ({ navigation, allPosts, user, getAllPosts }) => {
   const today = new Date();
   const monthNames = [
     "January", "February", "March", "April", "May", "June",
     "July", "August", "September", "October", "November", "December"
   ];

   const [selectedMonth, setSelectedMonth] = useState(monthNames[today.getMonth()]);
   const [selectedYear, setSelectedYear] = useState(today.getFullYear().toString());


    useFocusEffect(
        useCallback(() => {
            getAllPosts({ userId: user?._id }); 
        }, [])
    );


    const daysInMonth = {
        January: 31, February: 28, March: 31, April: 30, May: 31, June: 30,
        July: 31, August: 31, September: 30, October: 31, November: 30, December: 31
    };

    const firstDayOfMonth = new Date(`${selectedYear}-${Object.keys(daysInMonth).indexOf(selectedMonth) + 1}-01`).getDay();
    
    const totalDays = daysInMonth[selectedMonth];
    
    // Create a full array for the month, including empty slots for alignment
    const calendarDays = Array(firstDayOfMonth).fill(null).concat(Array.from({ length: totalDays }, (_, i) => i + 1));

    // Adding empty slots at the end to ensure full weeks
    while (calendarDays.length % 7 !== 0) {
        calendarDays.push(null);
    }

    // Split into weeks (rows of 7 days)
    const weeks = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
        weeks.push(calendarDays.slice(i, i + 7));
    }

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 2024 }, (_, i) => 2025 + i);

    // Count posts per day
    const postCountPerDay = allPosts?.reduce((acc, post) => {
        const postDate = new Date(post.createdAt);
        const postMonthIndex = postDate.getMonth(); // 0-based (January = 0)
        const postYear = postDate.getFullYear(); 
        const postDay = postDate.getDate(); // Get day of the month
        const selectedMonthIndex = Object.keys(daysInMonth).indexOf(selectedMonth); // Convert selected month to index

        if (postMonthIndex === selectedMonthIndex && postYear.toString() === selectedYear) {
            acc[postDay] = (acc[postDay] || 0) + 1;
        }
        return acc;
    }, {});

    // Function to determine background color based on post count
    const getDayColor = (day) => {
        const count = postCountPerDay?.[day] || 0;
        if (count === 1) return "#eaeded";
        if (count === 2) return "#fcf3cf";
        if (count >= 3) return "#d5f5e3";
        return "white";
    };

    const handleDatePress = (day) => {
        navigation.navigate("Journal", { date: `${selectedMonth} ${day}, ${selectedYear}` });
    }

    const isFutureDateCheck = (year, monthName, day) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to avoid time-related issues
    
        const monthIndex = Object.keys(daysInMonth).indexOf(monthName); // Convert month name to zero-based index
        const selectedDate = new Date(year, monthIndex, day);
    
        return selectedDate > today;
    };
    
    

    return (
        <View style={Styles.calendarPage}>
            <Text style={Styles.title}>My Journal</Text>
           <View style={Styles.pickerContainer}>
             <View style={Styles.pickerWrapper}>
               <Picker
                 selectedValue={selectedMonth}
                 style={Styles.picker}
                 onValueChange={(itemValue) => setSelectedMonth(itemValue)}
               >
                 {Object.keys(daysInMonth).map((month) => (
                   <Picker.Item key={month} label={month} value={month} />
                 ))}
               </Picker>
             </View>

             <View style={Styles.pickerWrapper}>
               <Picker
                 selectedValue={selectedYear}
                 style={Styles.picker}
                 onValueChange={(itemValue) => setSelectedYear(itemValue)}
               >
                 {years.map((year) => (
                   <Picker.Item key={year} label={year.toString()} value={year.toString()} />
                 ))}
               </Picker>
             </View>
           </View>

            <ScrollView>
                <View style={Styles.calendarGrid}>
                    {/* Week Headers */}
                    <View style={Styles.weekDaysRow}>
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                            <Text key={day} style={Styles.dayHeader}>{day}</Text>
                        ))}
                    </View>

                    <View style={Styles.daysContainer}>
                        {/* Render Calendar Weeks */}
                        {weeks.map((week, index) => (
                            <View key={index} style={Styles.daysView}>
                                {week.map((day, i) => {
                                    if (!day) {
                                        return <View key={`empty-${i}`} style={Styles.emptyDay} />;
                                    }

                                    const isFutureDate = isFutureDateCheck(selectedYear, selectedMonth, day);

                                    return (
                                        <TouchableOpacity 
                                            key={day} 
                                            style={[
                                                Styles.day, 
                                                { backgroundColor: getDayColor(day) },
                                                isFutureDate && Styles.disabledDay // Apply different style for disabled days
                                            ]}
                                            onPress={() => handleDatePress(day)}
                                            disabled={isFutureDate} // Disable button for future dates
                                        >
                                            <Text style={Styles.dayText}>
                                                {day}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })}
                            </View>
                        ))}
                    </View>

                </View>
                <View style={Styles.legendContainer}>
                  <View style={Styles.legendItem}>
                    <View style={[Styles.legendDot, { backgroundColor: '#eaeded' }]} />
                    <Text style={Styles.legendLabel}>1 post</Text>
                  </View>
                  <View style={Styles.legendItem}>
                    <View style={[Styles.legendDot, { backgroundColor: '#fcf3cf' }]} />
                    <Text style={Styles.legendLabel}>2 posts</Text>
                  </View>
                  <View style={Styles.legendItem}>
                    <View style={[Styles.legendDot, { backgroundColor: '#d5f5e3' }]} />
                    <Text style={Styles.legendLabel}>3+ posts</Text>
                  </View>
                </View>

            </ScrollView>
        </View>
    );
};

const mapDispatchToProps = { getAllPosts }

const mapStateToProps = (state) => ({
    user: state.onboarding?.user, 
    allPosts: state.journaling?.allPosts,
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);