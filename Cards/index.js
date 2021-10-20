module.exports = {
    sendWeatherCard : (weather) =>{
        return {
            "type": "AdaptiveCard",
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.3",
            "body": [
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${weather.city}`,
                                    "wrap": true,
                                    "size": "ExtraLarge",
                                    "weight": "Bolder",
                                    "color": "Dark"
                                }
                            ]
                        }
                    ]
                },
                {
                    "type": "TextBlock",
                    "text": `Latitude : ${weather.lat} Longitude : ${weather.lon}`,
                    "wrap": true,
                    "spacing": "Small",
                    "size": "Medium",
                    "weight": "Bolder",
                    "color": "Light"
                },
                {
                    "type": "ColumnSet",
                    "columns": [
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "Image",
                                    "url": "https://thumbs.dreamstime.com/b/haze-vector-icon-white-background-flat-symbol-sign-modern-weather-collection-mobile-concept-web-apps-design-161788663.jpg",
                                    "width": "136px",
                                    "height": "109px",
                                    "horizontalAlignment": "Center"
                                }
                            ]
                        },
                        {
                            "type": "Column",
                            "width": "stretch",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "text": `${weather.temp}`,
                                    "wrap": true,
                                    "size": "Medium",
                                    "weight": "Bolder",
                                    "color": "Good"
                                },
                                {
                                    "type": "ColumnSet",
                                    "columns": [
                                        {
                                            "type": "Column",
                                            "width": "stretch",
                                            "items": [
                                                {
                                                    "type": "TextBlock",
                                                    "text": `Max Temp : ${weather.max_temp}`,
                                                    "wrap": true,
                                                    "weight": "Lighter",
                                                    "color": "Attention"
                                                }
                                            ]
                                        },
                                        {
                                            "type": "Column",
                                            "width": "stretch",
                                            "items": [
                                                {
                                                    "type": "TextBlock",
                                                    "text": `Min Temp : ${weather.min_temp}`,
                                                    "wrap": true,
                                                    "weight": "Lighter",
                                                    "color": "Accent"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "type": "TextBlock",
                                    "text": `Description : ${weather.description}`,
                                    "wrap": true,
                                    "weight": "Lighter",
                                    "color": "Dark"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}