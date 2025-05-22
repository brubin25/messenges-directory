export interface Directory {
    id: string;
    name: string;
    image: any;
    unread: number;
    messages: string[];
}

export const directories: Directory[] = [
    {
        id: '1',
        name: 'Family',
        image: require('../assets/images/family.png'),
        messages: [
            'Movie night this Saturday?',
            'Join the Zoom call at 10 AM.',
            'Please review the latest design.',
            "Here's the link you asked for.",
            'Lunch at 1pm?',
            'Thanks for the help earlier!',
            'Happy Birthday! 🎉',
            'Remember to submit the report by Friday.',
            'Final reminder for the event.',
            "Let's catch up later this week."
        ],
        unread: 10,
    },
    {
        id: '2',
        name: 'Friends',
        image: require('../assets/images/friends.png'),
        messages: [
            'Final reminder for the event.',
            'Remember to submit the report by Friday.',
            'Movie night this Saturday?',
            'Urgent: Check your email!',
            "Here's the link you asked for.",
            "Let's catch up later this week.",
            "Let me know once you're free.",
            'Happy Birthday! 🎉',
            'Lunch at 1pm?'
        ],
        unread: 9,
    },
    {
        id: '3',
        name: 'Home',
        image: require('../assets/images/home.png'),
        messages: [
            'Lunch at 1pm?',
            'Urgent: Check your email!',
            "Let's catch up later this week.",
            'Movie night this Saturday?',
            'Can you help me with this task?',
            'Join the Zoom call at 10 AM.',
            "Don't forget the team meeting tomorrow.",
            'See you at the gym later?',
            'Remember to submit the report by Friday.',
            'Happy Birthday! 🎉'
        ],
        unread: 10,
    },
    {
        id: '4',
        name: 'Love Directory',
        image: require('../assets/images/love.png'),
        messages: [
            'Join the Zoom call at 10 AM.',
            "Let's catch up later this week.",
            "Here's the link you asked for.",
            'See you at the gym later?',
            'Movie night this Saturday?',
            'Final reminder for the event.',
            "Let me know once you're free.",
            'Lunch at 1pm?',
            "Don't forget the team meeting tomorrow.",
            'Remember to submit the report by Friday.'
        ],
        unread: 10,
    },
    {
        id: '5',
        name: 'School',
        image: require('../assets/images/school.png'),
        messages: [
            'Movie night this Saturday?',
            'Join the Zoom call at 10 AM.',
            'Urgent: Check your email!',
            'Please review the latest design.',
            'Final reminder for the event.'
        ],
        unread: 5,
    },
    {
        id: '6',
        name: 'You',
        image: require('../assets/images/you.png'),
        messages: [
            'Final reminder for the event.',
            "Don't forget the team meeting tomorrow.",
            'Thanks for the help earlier!',
            'See you at the gym later?',
            'Please review the latest design.',
            "Here's the link you asked for.",
            'Lunch at 1pm?',
            'Can you help me with this task?',
            "Let me know once you're free."
        ],
        unread: 9,
    }
];
