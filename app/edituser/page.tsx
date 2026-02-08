"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

// Form type
type FormData = {
    name: string;
    email: string;
    role: string;
    address: string;
};

// Status type
type Status = {
    type: "success" | "error" | null;
    msg: string;
};

// Initial form
const initialForm: FormData = {
    name: "",
    email: "",
    role: "",
    address: "",
};

export default function EditUser() {
    // Get the user ID from the query parameters
    const searchParams = useSearchParams();
    const id = searchParams.get("id");

    // state
    const [user, setUser] = useState<FormData>(initialForm);
    const [status, setStatus] = useState<Status>({ type: null, msg: "" });
    const [loading, setLoading] = useState(false);

    // Fetch user data 
    useEffect(() => {
        if (!id) return;

        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`/api/userdata?id=${id}`);
                setUser(data);
            } catch (err) {
                console.error(err);
                setStatus({ type: "error", msg: "Gagal mengambil data user" });
            }
        };

        fetchUser();
    }, [id]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    // Handle submit
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!id) return setStatus({ type: "error", msg: "ID user tidak ditemukan" });

        setLoading(true);
        setStatus({ type: null, msg: "" });

        try {
            await axios.put(`/api/userdata?id=${id}`, user);
            setStatus({ type: "success", msg: `User ${user.name} berhasil diperbarui` });
        } catch (error) {
            const message = axios.isAxiosError(error)
                ? error.response?.data?.error ?? error.message
                : "Terjadi kesalahan";

            setStatus({ type: "error", msg: message });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center text-base-content">
            <div className="w-full max-w-md transition-all duration-300">
                <div className="bg-[#fcfcfc] dark:bg-[#0f0f0f] border border-base-content/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-3xl overflow-hidden">
                    <div className="p-8 sm:p-12">
                        <header className="mb-10 text-center">
                            <h2 className="text-2xl font-semibold tracking-tight mb-2">Edit User</h2>
                            <p className="text-sm text-base-content/50 font-light">
                                Silahkan lengkapi data di bawah ini.
                            </p>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-4">
                                {/* Name */}
                                <div className="form-control w-full">
                                    <label className="label py-1">
                                        <span className="label-text text-xs font-medium uppercase tracking-wider opacity-60">Nama Lengkap</span>
                                    </label>
                                    <input
                                        name="name"
                                        type="text"
                                        placeholder="John Doe"
                                        value={user.name || ""}
                                        onChange={handleChange}
                                        className="input input-bordered bg-base-200/30 border-base-content/10 focus:border-primary focus:outline-none transition-all duration-200 w-full"
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="form-control w-full">
                                    <label className="label py-1">
                                        <span className="label-text text-xs font-medium uppercase tracking-wider opacity-60">Email</span>
                                    </label>
                                    <input
                                        name="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={user.email || ""}
                                        onChange={handleChange}
                                        className="input input-bordered bg-base-200/30 border-base-content/10 focus:border-primary focus:outline-none transition-all duration-200 w-full"
                                        required
                                    />
                                </div>

                                {/* Role & Address */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="form-control w-full">
                                        <label className="label py-1">
                                            <span className="label-text text-xs font-medium uppercase tracking-wider opacity-60">Role</span>
                                        </label>
                                        <select
                                            name="role"
                                            value={user.role || ""}
                                            onChange={handleChange}
                                            className="select select-bordered bg-base-200/30 border-base-content/10 focus:border-primary focus:outline-none w-full"
                                            required
                                        >
                                            <option value="" disabled>Pilih Role</option>
                                            <option value="admin">Admin</option>
                                            <option value="user">User</option>
                                            <option value="guest">Guest</option>
                                        </select>
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label py-1">
                                            <span className="label-text text-xs font-medium uppercase tracking-wider opacity-60">Alamat</span>
                                        </label>
                                        <input
                                            name="address"
                                            type="text"
                                            placeholder="Jakarta"
                                            value={user.address || ""}
                                            onChange={handleChange}
                                            className="input input-bordered bg-base-200/30 border-base-content/10 focus:border-primary focus:outline-none w-full"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`btn btn-neutral w-full rounded-xl normal-case font-medium shadow-sm transition-all active:scale-[0.98] ${loading ? "loading" : ""}`}
                                >
                                    {loading ? "" : "Simpan Data"}
                                </button>
                            </div>
                        </form>

                        {status.msg && (
                            <div className="mt-8 animate-in fade-in slide-in-from-top-2 duration-300">
                                <div
                                    className={`flex items-center justify-center gap-2 p-3 rounded-xl text-xs font-medium border ${status.type === "success"
                                        ? "bg-success/5 border-success/20 text-success"
                                        : "bg-error/5 border-error/20 text-error"
                                        }`}
                                >
                                    {status.type === "success" && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    )}
                                    {status.msg}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
