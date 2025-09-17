import  supabase  from "../../library/supabaseclient.js"

const getAllConversations = async (uuid) => {
    const { data, error } = await supabase
        .from("conversations")
        .select("*")
        .order("created_at", { ascending: false })
        .eq("user_id", uuid);

    if (error) {
        console.error("Error fetching conversations:", error);
        return [];
    }
    return data;
}

export default getAllConversations;



