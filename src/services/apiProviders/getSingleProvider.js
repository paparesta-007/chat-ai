import supabase from "../../library/supabaseclient.js";

const getSingleProvider = async (providerName, user_id) => {
    const { data, error, status } = await supabase
        .from('api_providers')
        .select('*')
        .eq('user_id', user_id)
        .eq('providerName', providerName)
        .maybeSingle(); 

    if (error) {
        console.error('Error fetching single provider', { status, error });
        return null;
    }

    return data; // data sarà null se non trovato
}

export default getSingleProvider;
