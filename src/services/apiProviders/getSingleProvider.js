import supabase from "../../library/supabaseclient.js"
const getSingleProvider = async (providerName, user_id) => {
    const { data, error, status } = await supabase
        .from('api_providers')
        .select('*')
        .eq('user_id', user_id)
        .eq('providerName', providerName)
        .single(); // usa .single() se ti aspetti una singola riga

    if (error) {
        // se status = 406 o altro, log completo
        console.error('Error fetching provider', { status, error });
        return null;
    }
    return data; // se usi .single() ricevi l'oggetto; altrimenti array
}
export default getSingleProvider;