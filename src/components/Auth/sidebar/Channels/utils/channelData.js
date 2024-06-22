// src/components/Auth/sidebar/Channels/utils/channelData.js

// Initial channel data
let channelData = [
  {
    channelName: "general",
    description: "General discussion for everyone."
  },
  {
    channelName: "tech",
    description: "Tech talks and discussions."
  },
  {
    channelName: "random",
    description: "Random thoughts and fun stuff."
  },
  {
    channelName: "support",
    description: "Support and helpdesk."
  },
  {
    channelName: "announcements",
    description: "Important announcements and updates."
  }
];

// Function to fetch channels from localStorage or return initial data
const getChannels = () => {
  const storedChannels = localStorage.getItem('channels');
  return storedChannels ? JSON.parse(storedChannels) : channelData;
};

// Function to add a new channel and update localStorage
const addChannel = (newChannel) => {
  let channels = getChannels();
  channels.push(newChannel);
  localStorage.setItem('channels', JSON.stringify(channels));
};

export { getChannels, addChannel };
