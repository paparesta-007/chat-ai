import supabase from "../../library/supabaseclient.js"

const deleteConversation = async (uuid) => {
    const { dataM , errorM  } = await supabase
        .from("messages")
        .delete()
        .eq("conversation_id", uuid);
    const { data, error } = await supabase
        .from("conversations")
        .delete()
        .eq("id", uuid)
        .select();


    if (error) {
        console.error("Error deleting conversation:", error);
        return [];
    }
    return data;
}

export default deleteConversation;
