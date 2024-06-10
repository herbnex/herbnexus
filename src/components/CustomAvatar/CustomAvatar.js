import React from "react";
import "./CustomAvatar.css";

const CustomAvatar = ({ name, imgUrl }) => {
	const nameParts = name?.split(" ");
	const initials = nameParts?.map((part) => part?.charAt(0).toUpperCase())?.join("");

	return (
		<div className="custom-avatar-profile rounded-pill fs-6 bg-primary overflow-hidden text-white">
			{imgUrl ? <img src={imgUrl} alt={"user profile"} className="object-fit-cover w-100 h-100" /> : initials}
		</div>
	);
};

export default CustomAvatar;