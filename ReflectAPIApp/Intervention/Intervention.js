// Created by Judith Kurian (B00940475)

import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator, Linking } from "react-native";
import { connect } from "react-redux";
import { getQuotes } from "./action";
import { Styles } from "./InterventionStyles";
import { ScrollView } from "react-native-gesture-handler";

const Intervention = (props) => {
    const mood = props.user?.mood;
    const apiKey = 'AIzaSyC77EcELX_Xnjk_IP-CyG28X8Q5_SiUuP4';

    const [loading, setLoading] = useState(true);
    const [recommendations, setRecommendations] = useState({
        quote: '',
        music: [],
        meditationVideos: [],
        breathingVideos: []
    });

    // Add another useEffect to fetch when authCode changes
    useEffect(() => {
        fetchRecommendations();
    },[mood]);

    useEffect(() => {
        if (props.quote) {
            setRecommendations(prev => ({
                ...prev,
                quote: props.quote
            }));
        }
    }, [props.quote]);

    const openInBrowser = (url) => {
        Linking.openURL(url).catch(err => console.error('Error opening URL:', err));
    };

    function getRandomPreferences(preferences) {
        const shuffled = [...preferences].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 3);
    }

    // Function to fetch breathing exercise recommendations
    const fetchBreathingVideos = async (mood) => {
        const searchQuery = `breathing exercises`;
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&type=video&key=${apiKey}&maxResults=5`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
            const videos = data?.items?.map(item => ({
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.medium.url,
                url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                source: item?.snippet?.channelTitle
            }));
            return videos;
        } catch (error) {
            console.error("Error fetching breathing exercise videos:", error);
            return [];
        }
    };

    // Function to fetch YouTube music recommendations
    const fetchMusicRecommendations = async (mood) => {
        const userPreferences = props.user?.music;  
        const genre = getRandomPreferences(userPreferences);
        const searchQuery = `music with genres ${genre}`; // Using the mood and genre to filter the search query
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&topicId=/m/04rlf&key=${apiKey}&maxResults=5`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const musicVideos = data?.items?.map(item => ({
                title: item?.snippet?.title,
                description: item?.snippet?.description,
                thumbnail: item?.snippet?.thumbnails?.medium.url,
                url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                source: item?.snippet?.channelTitle
            }));
            return musicVideos;
        } catch (error) {
            console.error("Error fetching music from YouTube:", error);
            return [];
        }
    };

    // Function to fetch meditation video recommendations
    const fetchMeditationVideos = async (mood) => {
        const searchQuery = `${mood} meditation`; // Use the mood to filter the search query
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}+meditation&type=video&key=${apiKey}&maxResults=5`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
            const videos = data?.items?.map(item => ({
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.medium.url,
                url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
                source: item?.snippet?.channelTitle
            }));
            return videos;
        } catch (error) {
            console.error("Error fetching meditation videos:", error);
            return [];
        }
    };

    const fetchRecommendations = async () => {
        try {
            setLoading(true);

            props.getQuotes({
                contents: [{
                  parts: [{
                    text: `Give me a motivational quote with the author's name for someone feeling ${mood}. The author's name should be in the next line with intendation.`
                  }]
                }]
            }) 
            
            // Fetch music recommendations based on mood and genre
            const musicRecommendations = await fetchMusicRecommendations(mood);

           // Fetch meditation videos based on mood
            const meditationVideos = await fetchMeditationVideos(mood);

            // Fetch meditation videos based on mood
            const breathingVideos = await fetchBreathingVideos(mood); // 🆕

            
            setRecommendations({
                // quote: props.quote,
                music: musicRecommendations,                
                meditationVideos: meditationVideos,
                breathingVideos: breathingVideos
            });
        } catch (error) {
            console.error("Error fetching recommendations:", error);
        } finally {
            setLoading(false);
        }
    };    

    return (
        <ScrollView style={Styles.container}>
            <Text style={Styles.heading}>Pause. Feel. Heal.</Text>
    
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <View style={Styles.contentView}>
                    {/* Motivational Quotes */}
                    <Text style={Styles.quote}>{props.quote}</Text>

                    {/* Music Recommendations */}
                    <Text style={Styles.subHeading}>Music</Text>
                    <View style={Styles.itemsView}> 
                        {recommendations?.music?.map((video, index) => (
                            <TouchableOpacity style={Styles.meditationItem} key={index} onPress={() => openInBrowser(video.url)}>
                                <View style={Styles.videoHeadingView}>
                                    <Image style={Styles.meditationImage} source={{ uri: video.thumbnail }} />
                                    <Text style={Styles.meditationTitle}>{video.title}</Text>
                                </View>
                                <Text style={Styles.meditationDescription}>{video.description}</Text>
                                <Text style={Styles.source}>Source: {video.source}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Motivational Recommendations */}
                    <Text style={Styles.subHeading}>Meditational Videos</Text>
                    <View style={Styles.itemsView}> 
                        {recommendations?.meditationVideos?.map((video, index) => (
                            <TouchableOpacity style={Styles.meditationItem} key={index} onPress={() => openInBrowser(video.url)}>
                                <View style={Styles.videoHeadingView}>
                                    <Image style={Styles.meditationImage} source={{ uri: video.thumbnail }} />
                                    <Text style={Styles.meditationTitle}>{video.title}</Text>
                                </View>
                                <Text style={Styles.meditationDescription}>{video.description}</Text>
                                <Text style={Styles.source}>Source: {video.source}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Breathing Exercises */}
                    <Text style={Styles.subHeading}>Breathing Exercises</Text>
                    <View style={Styles.itemsView}> 
                        {recommendations?.breathingVideos?.map((video, index) => (
                            <TouchableOpacity style={Styles.meditationItem} key={index} onPress={() => openInBrowser(video.url)}>
                                <View style={Styles.videoHeadingView}>
                                    <Image style={Styles.meditationImage} source={{ uri: video.thumbnail }} />
                                    <Text style={Styles.meditationTitle}>{video.title}</Text>
                                </View>
                                <Text style={Styles.meditationDescription}>{video.description}</Text>
                                <Text style={Styles.source}>Source: {video.source}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
        </ScrollView>
    );    
};

const mapStateToProps = (state) => ({
    quote: state.intervention?.quote,
    user: state.onboarding?.user
});

const mapDispatchToProps = {getQuotes}

export default connect(mapStateToProps, mapDispatchToProps)(Intervention);
