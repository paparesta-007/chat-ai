import Leftbar from "./Leftbar/Leftbar";
import { useNavigate } from "react-router";
import supabase from "../library/supabaseclient.js";
function ChatPage() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        console.log("Logout");
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Logout error:", error.message);
        } else {
            navigate("/login");
        }
    };

    return (
        <div className="flex">
            <Leftbar />
            <div className="flex-1 p-4">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default ChatPage;
