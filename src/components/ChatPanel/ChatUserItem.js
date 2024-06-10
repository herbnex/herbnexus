import React from "react";
import CustomAvatar from "../CustomAvatar/CustomAvatar";

const ChatUserItem = ({ name, imgUrl, field, lastSeen, isOnline, handleClick, selectedSpecialist }) => {
	return (
		<div
			className={`d-flex chat-user-item align-items-center gap-2 bg-white p-3 rounded-3 ${
				selectedSpecialist && selectedSpecialist === "eg" ? "border border-primary border-2 opacity-75" : ""
			}`}
			onClick={handleClick}>
			<CustomAvatar name={name} imgUrl={""} />
			<div className="d-flex flex-shrink-0 flex-column">
				<span className="chat-user-name">{name}</span>
				<span className="chat-small-text">{field}</span>
			</div>
			<span className="ms-auto chat-small-text">
				{isOnline ? (
					<>
						<span className="chat-online-indicator me-1"></span>
						online
					</>
				) : (
					lastSeen
				)}
			</span>
		</div>
	);
};

export default ChatUserItem;