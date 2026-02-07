"use client";

import { useState } from "react";

export default function Home() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "",
        address: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await fetch("/api/userdata", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) throw new Error(data.error);

            setMessage(`User ${data.name} berhasil ditambahkan!`);
            setForm({ name: "", email: "", role: "", address: "" });
        } catch (err: any) {
            setMessage(`Error: ${err.message}`);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="card w-full max-w-md shadow-xl bg-base-100">
                <div className="card-body">
                    <h2 className="card-title text-center">Tambah User</h2>

                    <form className="flex flex-col gap-3 mt-4" onSubmit={handleSubmit}>
                        <input
                            name="name"
                            placeholder="Name"
                            value={form.name}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                            required
                        />
                        <select
                            name="role"
                            value={form.role}
                            onChange={handleChange}
                            className="select select-bordered w-full"
                            required
                        >
                            <option value="">Select Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                            <option value="guest">Guest</option>
                        </select>
                        <input
                            name="address"
                            placeholder="Address"
                            value={form.address}
                            onChange={handleChange}
                            className="input input-bordered w-full"
                        />
                        <button type="submit" className="btn btn-primary mt-2">
                            Submit
                        </button>
                    </form>

                    {message && <p className="mt-3 text-center">{message}</p>}
                </div>
            </div>
        </div>
    );
}
