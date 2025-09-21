// AIzaSyCMDnHPRYyxKhIeG_MRvaaAIvJye95l_AQ


function ChatBot() {
  return (
    <div className="fixed bottom-5 right-5 bg-white shadow-lg rounded-lg w-80 h-[500px] flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center p-4 bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div className="ml-3">
            <h4 className="text-sm font-medium">ChatBot</h4>
            <p className="text-xs">Online</p>
          </div>
        </div>
        <button className="text-white text-lg">&times;</button>
      </div>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {/* User Message */}
        <div className="flex items-start mb-4">
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className="w-8 h-8 rounded-full mr-3"
          />
          <div className="bg-gray-200 text-sm p-3 rounded-lg">
            Hello, ChatBot!
          </div>
        </div>

        {/* ChatBot Message */}
        <div className="flex items-start mb-4">
          <img
            src="https://via.placeholder.com/40"
            alt="ChatBot"
            className="w-8 h-8 rounded-full mr-3"
          />
          <div className="bg-blue-500 text-white text-sm p-3 rounded-lg">
            Hi! How can I assist you today?
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white rounded-b-lg flex items-center border-t">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="ml-3 bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
