import React from "react";
import CustomAvatar from "../CustomAvatar/CustomAvatar";
import { Button, Form } from "react-bootstrap";

const ChatMessageFeed = ({ texts, setShowChatConvo, backBtnClick }) => {
	return (
		<div className="flex-grow-1 chat-message-feed">
			<div className="chat-title-box px-4 border-bottom">
				<div className="d-flex align-items-center h-100 gap-3 ">
					<div
						className="fs-2 text-secondary chat-user-item chat-convo-back"
						onClick={() => {
							backBtnClick();
							setShowChatConvo(false);
						}}>
						<i class="bi bi-arrow-left-circle"></i>
					</div>
					<div className="d-flex h-100 gap-2 align-items-center">
						<CustomAvatar name={"john doe"} />
						<div className="d-flex flex-column">
							<span className="chat-regular-text chat-user-name">John Doe</span>
							<span className="chat-small-text">Online</span>
						</div>
					</div>
				</div>
			</div>

			<div className="px-3 pb-5 h-auto">
				<div className="chat-convo-section">
					{texts?.map((text) => (
						<>
							<p className="chat-message-text chat-regular-text bg-light p-2 rounded-3 my-3">{text.user1}</p>
							<p className="ms-auto chat-message-text chat-regular-text bg-dark text-white p-2 rounded-3 my-3">
								{text.user2}
							</p>
						</>
					))}
				</div>

				<div className="mt-auto pt-4">
					<div className="d-flex gap-2 chat-text-field-box">
						<Form.Group className="flex-grow-1">
							<Form.Control className="h-100 rounded-pill" placeholder="Type your message..." />
						</Form.Group>
						<Button variant="info" className="text-white rounded-circle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								class="bi bi-send-fill"
								viewBox="0 0 16 16">
								<path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
							</svg>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatMessageFeed;