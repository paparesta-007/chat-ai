import supabase from "../../library/supabaseclient.js"

const getAllMessages = async (conversationId) => {
    const {data,error} = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true })
        .eq("conversation_id", conversationId);

    if (error) {
        console.error("Error fetching messages:", error);
        return [];
    }
    return data;
}
export default getAllMessages;