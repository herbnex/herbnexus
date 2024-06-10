import React, { useState } from "react";
import ChatUserFeed from "./ChatUserFeed";
import ChatMessageFeed from "./ChatMessageFeed";
import "./ChatPanel.css";

const dummyText = [
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
	{
		user1: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
		user2: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Provident, sequi.",
	},
];

const ChatPanel = () => {
	const [showChatConvo, setShowChatConvo] = useState(false);
	const [selectedSpecialist, setSelectedSpecialist] = useState("");

	return (
		<div className="d-flex chat-panel chat-regular-text border-top">
			<ChatUserFeed
				setShowChatConvo={setShowChatConvo}
				selectedSpecialist={selectedSpecialist}
				setSelectedSpecialist={setSelectedSpecialist}
			/>
			{showChatConvo ? (
				<ChatMessageFeed
					texts={dummyText}
					backBtnClick={() => setSelectedSpecialist("")}
					setShowChatConvo={setShowChatConvo}
				/>
			) : (
				<div className="chat-init-right flex-grow-1">
					<p className="text-center w-100 fs-5 pt-5">Click any specialist to start chat.</p>
				</div>
			)}
		</div>
	);
};

export default ChatPanel;