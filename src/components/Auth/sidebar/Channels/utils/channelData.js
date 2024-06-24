// Initial channel data
let channelData = [
  {
    channelName: "general",
    description: "General discussion for everyone."
  },
  {
    channelName: "Mern-full-stack",
    description: "Tech talks and discussions."
  },
  {
    channelName: "Data Science",
    description: "Random thoughts and fun stuff."
  },
  {
    channelName: "Machine Learning",
    description: "Support and helpdesk."
  },
  {
    channelName: "Java-full-stack",
    description: "Important announcements and updates."
  },
  {
    channelName: "Game-Development",
    description: "Important announcements and updates."
  },
  {
    channelName: "Mobile-App-Development",
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

// Function to delete a channel by name and update localStorage
const deleteChannel = (channelName) => {
  let channels = getChannels();
  const updatedChannels = channels.filter(channel => channel.channelName !== channelName);
  localStorage.setItem('channels', JSON.stringify(updatedChannels));
};

export { getChannels, addChannel, deleteChannel };
