import  supabase  from "../library/supabaseclient.js"

const createConversation = async (uuid, title) => {
    const { data, error } = await supabase
        .from("conversations")
        .insert({
            user_id: uuid,
            title: title,
            created_at: new Date(),
            updated_at: new Date(),
        });

    if (error) {
        console.error("Error fetching conversations:", error);
        return [];
    }
    return data;
}

export default createConversation;



