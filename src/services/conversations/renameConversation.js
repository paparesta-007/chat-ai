import supabase from "../../library/supabaseclient.js"

const renameConversation = async (uuid, title) => {
    const { data, error } = await supabase
        .from("conversations")
        .update({ title: title })
        .eq("id", uuid)


    if (error) {
        console.error("Error renaming conversation:", error);
        return [];
    }
    return data; // data sarà un array [{ id: ..., title: ... }]
}

export default renameConversation;
