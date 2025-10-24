import supabase from "../../library/supabaseclient.js"
const getSingleProvider = async (providerName, user_id) => {
    const { data, error, status } = await supabase
        .from('api_providers')
        .select('*')
        .eq('user_id', user_id)
        .eq('providerName', providerName)
        .single(); 

    if (error) {
        console.error('Error fetching provider', { status, error });
        return null;
    }
        return data; 
    }
export default getSingleProvider;