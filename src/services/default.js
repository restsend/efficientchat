
export function genid(size) {
    return Math.random().toString(16).substr(2, size);
}

const initClipValue = () => {
    return {
        "e/Welcome": true,
        "v/Welcome": "😃How can i help you?",
        "v/QuickReply": [
            "🥰 Hello! ",
            "❤️‍🔥You're welcome",
            "🤝Book a meeting",
            "🙏Thanks for the feedback",
            "✨Will get back to you asap "
        ],
        "t": [
            {
                "id": genid(),
                "name": "Value",
                "tags": [
                    {
                        "id": genid(),
                        "name": "Core",
                        "fontColor": "#FF8C00",
                        "bgColor": "#FF8C00"
                    },
                    {
                        "id": genid(),
                        "name": "Important",
                        "fontColor": "#FF8C00",
                        "bgColor": "#FF8C00"
                    },
                    {
                        "id": genid(),
                        "name": "Common",
                        "fontColor": "#FF8C00",
                        "bgColor": "#FF8C00"
                    }
                ]
            },
            {
                "id": genid(),
                "name": "Funnel",
                "tags": [
                    {
                        "id": genid(),
                        "name": "High-intent",
                        "fontColor": "#409eff",
                        "bgColor": "#409eff"
                    },
                    {
                        "id": genid(),
                        "name": "Low-intent",
                        "fontColor": "#409eff",
                        "bgColor": "#409eff"
                    },
                    {
                        "id": genid(),
                        "name": "New",
                        "fontColor": "#409eff",
                        "bgColor": "#409eff"
                    },
                    {
                        "id": genid(),
                        "name": "Lost",
                        "fontColor": "#409eff",
                        "bgColor": "#409eff"
                    },
                ]
            }
        ]
    }
}

export default initClipValue