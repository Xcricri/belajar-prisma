"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

// User type
type User = {
    id: number
    name: string;
    email: string;
    role: string;
    address: string;
    create_ad: string;
};

const Page = () => {
    const [user, setUser] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);

    const getUser = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/userdata");
            setUser(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (id: number) => {
        try {
            const res = await axios.delete(`/api/userdata?id=${id}`)
            console.log(res)
            getUser();
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getUser();
    }, []);

    return (
        <main className="p-6">
            <div className="mb-4 flex justify-between">
                <div>
                    <h1 className="text-2xl font-bold">User Data</h1>
                </div>
                <div className="flex gap-2 items-center">
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth="2.5"
                                fill="none"
                                stroke="currentColor"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input type="search" required placeholder="Search" />
                    </label>
                    <Link href="/adduser" className="btn btn-sm btn-success text-white">Add User</Link>
                    <button onClick={() => window.location.reload()} className="btn btn-sm btn-primary">Refresh</button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-center">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Address</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading && (
                            <tr>
                                <td colSpan={7} className="text-center">
                                    Loading...
                                </td>
                            </tr>
                        )}

                        {!loading && user.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>{user.address}</td>
                                <td>{new Intl.DateTimeFormat("id-ID").format(new Date(user.create_ad))}</td>
                                <td>
                                    <div className="flex gap-2 items-center justify-center">
                                        <Link href={`/edituser?id=${user.id}`} className="btn btn-sm btn-warning">Edit</Link>
                                        <button onClick={() => deleteUser(user.id)} className="btn btn-sm btn-error">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {!loading && !user.length && (
                            <tr>
                                <td colSpan={7} className="text-center text-gray-500">
                                    No user data
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </main>
    );
};

export default Page;
