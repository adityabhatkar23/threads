// import React from 'react'

import Logo from "./Logo";
import { useAuth } from "../../context/AuthContext";
import { sidebarLinks } from "../../constants/constants.index";
import { Link, useLocation } from "react-router-dom";

const Leftsidebar = () => {
	const { user, logout } = useAuth();
	const location = useLocation();
	const pathname = location.pathname;
	const userId = user ? user.id : null;

	const handleLogout = () => {
		logout();
	};

	return (
		<div className="sticky top-0 h-screen flex flex-col max-md:hidden py-4 border-r">
			<div className="flex flex-col gap-6 w-full px-6">
				<div className="flex items-center pb-24">
					<Logo />
					<h1 className="text-2xl font-bold max-lg:hidden">Threads</h1>
				</div>

				{sidebarLinks.map((link) => {
					const isActive =
						(pathname.includes(link.route) && link.route.length > 1) ||
						pathname === link.route;

					const route = link.route === "/profile" ? `${link.route}/${userId}` : link.route;

					return (
						<Link
							to={route}
							key={link.label}
							className={`relative flex items-center gap-4 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5 ${isActive ? 'bg-zinc-950' : ''}`}
						>
							<img src={link.imgURL} alt={link.label} />
							<p className="text-light-1 max-lg:hidden">{link.label}</p>
						</Link>
					);
				})}
			</div>

			{user && (
				<div className="mt-auto px-6 mb-6">
					<button
						onClick={handleLogout}
						className="flex cursor-pointer gap-4 rounded-lg w-full"
					>
						<img src="/assets/logout.svg" alt="logout" />
						<p className="max-lg:hidden">Logout</p>
					</button>
				</div>
			)}
		</div>
	);
};

export default Leftsidebar;
