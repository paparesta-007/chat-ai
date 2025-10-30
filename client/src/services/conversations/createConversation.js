import supabase from "../../library/supabaseclient.js"

const createConversation = async (uuid, title) => {
    const { data, error } = await supabase
        .from("conversations")
        .insert({
            user_id: uuid,
            title: title,
            created_at: new Date(),
            updated_at: new Date(),
        })
        .select(); // ← ritorna l’oggetto appena creato con id

    if (error) {
        console.error("Error creating conversation:", error);
        return [];
    }
    return data; // data sarà un array [{ id: ..., title: ... }]
}

export default createConversation;
