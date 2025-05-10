// Created by Judith Kurian (B00940475)

import { View, Text, ScrollView } from "react-native";
import { Styles } from "./HomeStyles";

const EmotionTrend = ({trendHeading, emotionTrends}) => {

    return ( 
        <View>
            <Text style={Styles.trendHeading}>{trendHeading}</Text>
            <ScrollView horizontal style={Styles.trendScroll}>
                {Object.keys(emotionTrends).length === 0 ? (
                    <Text style={Styles.noData}>No data</Text>
                ) : (
                    Object.entries(emotionTrends).map(([emotion, count], idx) => (
                        <View key={idx} style={Styles.trendBox}>
                            <Text style={Styles.trendEmotion}>{emotion}</Text>
                            <Text style={Styles.trendCount}>{count}</Text>
                        </View>
                    ))
                )}
            </ScrollView>
        </View>
    )  
}

export default EmotionTrend;