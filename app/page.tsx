"use client";

import React, { useState } from "react";

export default function Home() {
    const [counter, setCounter] = useState(0);

    return (
        <div className="flex items-center justify-center min-h-screen ">
            <div className="card rounded-xl w-80">
                <div className="card-body text-center p-6">
                    <h1 className="text-2xl font-semibold mb-4 ">Counter</h1>
                    <p className="text-5xl font-bold mb-6 ">{counter}</p>

                    {/* Baris tombol Increment & Decrement */}
                    <div className="flex gap-3 justify-center mb-4">
                        <button
                            className="btn btn-primary hover:scale-105 transition-transform"
                            onClick={() => setCounter(counter + 1)}
                        >
                            Increment
                        </button>
                        <button
                            className="btn btn-warning hover:scale-105 transition-transform"
                            onClick={() => setCounter(counter - 1)}
                        >
                            Decrement
                        </button>
                    </div>

                    {/* Tombol Reset di bawah */}
                    <button
                        className="btn btn-secondary hover:scale-105 transition-transform w-full"
                        onClick={() => setCounter(0)}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
}
