import React from 'react'

function Chat() {
    const handleLogout = () => {
		localStorage.removeItem("userInfo");
		window.location.reload();
		const user = localStorage.getItem("userInfo");
		
	};

	return (
		<div >
			<nav >
				<h1>welcome </h1>
				<button  onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
 
}

export default Chat