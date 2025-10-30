import supabase from "../../library/supabaseclient.js"
const editSingleProvider = async (providerName, newApiKey, user_id) => {
    const now = new Date();
    const DataAdesso = now.toISOString();
    const { data: updatedData, error: updateError } = await supabase
        .from('api_providers')
        .update({ apiKey: newApiKey, updated_at: DataAdesso })
        .eq('user_id', user_id)
        .eq('providerName', providerName)
        .select()
        .maybeSingle();

    if (updateError) {
        console.error('Error updating provider', { status: updateError.status, error: updateError });
        return null;
    }

    return updatedData;
}
export default editSingleProvider;