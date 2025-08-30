import Leftbar from "./Leftbar/Leftbar";
import { useNavigate } from "react-router";
function ChatPage() {

    const navigate = useNavigate();


    return (
        <div className="flex">
            <Leftbar />

        </div>
    );
}

export default ChatPage;
