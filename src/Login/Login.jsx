import React, { useState } from "react";
import { useNavigate } from "react-router";
import googleLogo from "../assets/icons8-logo-di-google.svg";
import appleLogo from "../assets/icons8-mac-os.svg";
import microsoftLogo from "../assets/icons8-microsoft.svg";
import supabase from "../library/supabaseclient.js";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const [isSignUp, setIsSignUp] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const navigate = useNavigate();

    const showToast = (msg) => {
        setPopupMessage(msg);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!emailRegex.test(email) || !passwordRegex.test(password)) {
            return showToast("Invalid email or password");
        }

        if (isSignUp) {
            // Sign Up Mode
            if (password !== confirmPassword) {
                return showToast("Passwords do not match");
            }

            try {
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                });

                if (error) return showToast(error.message);

                showToast("Signup successful! Check your email to confirm your account.");
                // Optionally switch back to sign in mode
                setIsSignUp(false);
                setEmail("");
                setPassword("");
                setConfirmPassword("");
            } catch (err) {
                showToast("Unexpected error: " + err.message);
            }
        } else {
            // Sign In Mode
            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });

                if (error) return showToast(error.message);

                showToast("Login successful");
                navigate("/chat");
            } catch (err) {
                showToast("Unexpected error: " + err.message);
            }
        }
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        setEmail("");
        setPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="flex flex-col h-screen bg-[var(--background-Primary)]">
            {/* HEADER */}
            <header className="p-4 text-2xl text-[var(--color-primary)] font-bold">
                Chat AI
            </header>

            {/* MAIN / FORM */}
            <main className="flex-1 flex justify-center items-center">
                <form
                    className="flex flex-col gap-4 justify-center items-center"
                    onSubmit={handleSubmit}
                >
                    <h3 className="text-2xl text-[var(--color-primary)] font-bold">
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </h3>

                    <input
                        type="text"
                        className="btnLogin"
                        placeholder="Email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="btnLogin"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {isSignUp && (
                        <input
                            type="password"
                            className="btnLogin"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    )}

                    <button
                        className="bg-[#006239] cursor-pointer border border-[#138253] w-[300px] h-[50px] text-white p-2 rounded-full"
                        type="submit"
                    >
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </button>

                    <a
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            toggleMode();
                        }}
                        className="text-[#006239] hover:underline cursor-pointer"
                    >
                        {isSignUp
                            ? "Already have an account? Sign In"
                            : "Don't have an account? Sign Up"
                        }
                    </a>

                    <div className="flex items-center gap-2 w-[300px]">
                        <div className="flex-1 h-[1px] bg-gray-300"></div>
                        <p className="text-[#4a4a4a]">Or</p>
                        <div className="flex-1 h-[1px] bg-gray-300"></div>
                    </div>

                    <button className="btnLogin cursor-pointer" type="button">
                        <img src={googleLogo} alt="Google" className="w-6 h-6" />
                        <span>Continue with Google</span>
                    </button>

                    <button className="btnLogin cursor-pointer" type="button">
                        <img src={appleLogo} alt="Apple" className="w-6 h-6" />
                        <span>Continue with Apple</span>
                    </button>

                    <button className="btnLogin cursor-pointer" type="button">
                        <img src={microsoftLogo} alt="Microsoft" className="w-6 h-6" />
                        <span>Continue with Microsoft</span>
                    </button>
                </form>
            </main>

            {/* FOOTER */}
            <footer className="p-4 text-center">
                <small>Chat AI &copy; 2025</small>
            </footer>

            {showPopup && (
                <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-2 rounded-lg shadow-lg">
                    {popupMessage}
                </div>
            )}
        </div>
    );
};

export default Login;