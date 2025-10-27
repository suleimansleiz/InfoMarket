import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../App.css";
import SellerNavBar from "../components/SellerNavBar";
import { ArrowUpTrayIcon, Square3Stack3DIcon, UserIcon } from '@heroicons/react/24/solid'

const SellerDashboard: React.FC = () => {
    return (
        <>
            <SellerNavBar />
            <div className="flex top-10">
                <nav className="hidden lg:block min-w-60 h-screen p-3 bg-white">
                    <ul className="list-group mt-7">
                        <li className="list-group-item my-2">
                            <Link
                                to="/seller"
                                className="list-group-link text-decoration-none flex items-center gap-2"
                            >
                                <Square3Stack3DIcon className="size-6 text-blue-500" />
                                My Products
                            </Link>
                        </li>
                        <li className="list-group-item my-2">
                            <Link
                                to="/seller/upload-item"
                                className="list-group-link text-decoration-none flex items-center gap-2"
                            >
                                <ArrowUpTrayIcon className="size-6 text-blue-500" />
                                Upload Item
                            </Link>
                        </li>
                        <li className="list-group-item my-2">
                            <Link
                                to="/seller/seller-profile"
                                className="list-group-link text-decoration-none flex items-center gap-2"
                            >
                                <UserIcon className="size-6 text-blue-500"/>
                                My Profile
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex-grow-1">
                    <div className="">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SellerDashboard;

