// Created by Judith Kurian (B00940475)

import { View, Text, Image, ScrollView } from "react-native";
import { connect } from "react-redux";
import LinearGradient from 'react-native-linear-gradient';
import { BarChart } from 'react-native-chart-kit';
import moment from 'moment';
import { Styles } from "./HomeStyles";
import React, { useEffect, useState, useMemo } from "react";
import { getCurrentMonthPosts } from "../Journal/action";
import EmotionTrend from "./EmotionTrend";

const Home = (props) => {
    const [points, setPoints] = useState(0);
    const [emotionTrends, setEmotionTrends] = useState({
        day: {},
        week: {},
        month: {}
    });

    useEffect(()=>{
        if(props.user?._id) {
            props.getCurrentMonthPosts({
                userId: props.user?._id
            })
        }
    },[])

    useEffect(() => {
        if (props.monthPosts) {
            const dayWiseEntries = {};
            const emotionMap = {
                day: {},
                week: {},
                month: {}
            };

            const now = moment();
            const todayStr = now.format('YYYY-MM-DD');
            const weekStart = now.clone().startOf('isoWeek');
            const monthStart = now.clone().startOf('month');

            // Group entries by date
            props.monthPosts?.forEach(entry => {
                const date = moment(entry.createdAt).format('YYYY-MM-DD');
                if (!dayWiseEntries[date]) {
                    dayWiseEntries[date] = [];
                }
                dayWiseEntries[date].push(entry);

                // Day trend
                if (date === todayStr) {
                    entry.mood?.forEach(m => {
                        emotionMap.day[m] = (emotionMap.day[m] || 0) + 1;
                    });
                }

                 // Week trend
                 if (moment(entry.createdAt).isSameOrAfter(weekStart)) {
                    entry.mood?.forEach(m => {
                        emotionMap.week[m] = (emotionMap.week[m] || 0) + 1;
                    });
                }

                // Month trend
                if (moment(entry.createdAt).isSameOrAfter(monthStart)) {
                    entry.mood?.forEach(m => {
                        emotionMap.month[m] = (emotionMap.month[m] || 0) + 1;
                    });
                }
            });
            

            // Calculate total points
            let totalPoints = 0;
            const daysInMonth = moment().daysInMonth();

            for (let day = 1; day <= daysInMonth; day++) {
                const date = moment().date(day).format('YYYY-MM-DD');
                const entries = dayWiseEntries[date] || [];
                const count = entries.length;

                if (count >= 3) totalPoints += 1;
                else if (count === 2) totalPoints += 0.66;
                else if (count === 1) totalPoints += 0.33;
                // 0 entries = 0 points
            }

            setPoints(totalPoints.toFixed(2));
            setEmotionTrends(emotionMap);
        }
    }, [props.monthPosts]);

    const prepareWeekEmotionData = () => {
        const now = moment();
        const weekStart = now.clone().startOf('isoWeek');

        const emotionCounts = {};
      
        // Process all entries for the current week
        props.monthPosts?.forEach(entry => {
          if (moment(entry.createdAt).isSameOrAfter(weekStart)) {
            entry.mood?.forEach(m => {
              const emotion = m?.charAt(0).toUpperCase() + m?.slice(1).toLowerCase();
              emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
            });
          }
        });
      
        // Converting to chart data format
        const emotions = Object.keys(emotionCounts);
        const counts = emotions.map(emotion => emotionCounts[emotion]);
        
        return {
            emotions,
            counts,
            emotionCounts
        };
    };
      
    const emotionData = useMemo(() => prepareWeekEmotionData(), [props.monthPosts]);

    return (
        <ScrollView style={Styles.mainView}>
            {/* Salutation */}
            <View style={Styles.salutaionView}>
                <Text style={Styles.salutation}>Hi {props.user?.name} !</Text>
                <Image style={Styles.smiley} source={require('../images/Joy.png')}/>
            </View>
            {/* Current Emotions */}
            <View style={Styles.subheadingView}>
                <Text style={Styles.subheading}>Current Emotions</Text>
                <View style={Styles.emotionSpheresContainer}>
                    {props.user?.mood.map((emotion, index) => (
                        <LinearGradient
                        colors={['#04B2D9', '#0FA644']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        key={index}
                        style={[
                            Styles.emotionSphere
                        ]}
                        >
                            <Text style={Styles.emotionText}>{emotion}</Text>
                        </LinearGradient>
                    ))}
                </View>
            </View>
            {/* User Points */}
            <View style={Styles.subheadingView}>
                <Text style={Styles.subheading}>User Points for the Month</Text>
                <Text style={Styles.points}>{points}</Text>
            </View>
            {/* Emotion Trends */}
            <View style={Styles.subheadingView}>
                <Text style={Styles.subheading}>Emotion Trends</Text>
                <EmotionTrend trendHeading={"Today"} emotionTrends={emotionTrends.day}/>
                <Text style={Styles.trendHeading}>This week</Text>
                {emotionData.emotions.length > 0 ? (
                    <>
                        <ScrollView horizontal={true} style={Styles.chartContainer}>
                            <BarChart
                            data={{
                                labels: emotionData.emotions,
                                datasets: [{
                                    data: emotionData.counts
                                }]
                            }}
                            width={emotionData.emotions.length * 70}
                            height={300}
                            chartConfig={{
                                backgroundColor: '#FFF6E3',
                                backgroundGradientFrom: '#ffffff',
                                backgroundGradientTo: '#FFF6E3',
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(4, 178, 217, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(4, 178, 217, ${opacity})`,
                                propsForLabels: {
                                fontSize: 11,
                                fontFamily: 'Merriweather_24pt-Regular'
                                },
                                propsForBackgroundLines: {
                                    strokeWidth: 0 // Remove background lines if not needed
                                },
                                barPercentage: 0.8,
                            }}
                            style={{
                                marginVertical: 8,
                                borderRadius: 16,
                            }}
                            fromZero
                            withHorizontalLabels={true}
                            withVerticalLabels={true}
                            />
                        </ScrollView>
                    </>
                ) : (
                    <Text style={Styles.noData}>No emotional data recorded this week</Text>
                )}            
                <EmotionTrend trendHeading={"This month"} emotionTrends={emotionTrends.month}/>
            </View>

            {/* About Reflect AI */}
            <View style={[Styles.subheadingView, Styles.lastSubheading]}>
              <Text style={Styles.subheading}>About Reflect AI</Text>
              <View style={Styles.textView}>
                <Text style={Styles.aboutText}>
                  ReflectAI is your personal emotion journal powered by AI. It helps you understand your feelings through text, voice, and images.
                </Text>
                <Text style={Styles.aboutText}>
                  You can log daily entries, track your emotions on a color-coded calendar, and get tailored support like music, meditation, or motivation.
                </Text>
                <Text style={Styles.aboutText}>
                  The app gently adapts to your mood and gives you a safe space to reflect, reset, and grow — one check-in at a time.
                </Text>
              </View>
            </View>
        </ScrollView>
    )
}

const mapStateToProps = (state) => ({
    user: state.onboarding?.user,
    monthPosts: state.journaling?.monthPosts,
});

const mapDispatchToProps = { getCurrentMonthPosts }

export default connect(mapStateToProps, mapDispatchToProps)(Home);