import  supabase  from "../../library/supabaseclient.js"

const createMessage = async (sender, content, conversation_id) => {
    const { data, error } = await supabase
        .from("messages")
        .insert({
            conversation_id: conversation_id,
            created_at: new Date(),
            sender: sender,
            content: content,
        });

    if (error) {
        console.error("Error creating message:", error);
        return [];
    }
    return data;
}

export default createMessage;



