'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

interface Settings {
    imageRecognition?: boolean,
    ttsSetting?: boolean,
    theme?: string,
    fontSize?: string,
    ttsSpeed?: string
}

export async function updateSettings(settings: Settings) {
    const cookieStore = cookies();
    const supabase = createServerComponentClient({cookies : () => cookieStore});
    const {data: {session}} = await supabase.auth.getSession();
    const user = session?.user;

    if(!user) {
        console.error("User not authrnticated!");
        return;
    }

    // Check if a record with the user ID exists in the database
    const existingSettings = await supabase
        .from('settings')
        .select()
        .eq('userid', user.id)
        .single();

    if (existingSettings && existingSettings.status === 200) {
        // If a record exists, update the existing record
        const { data: updatedData, error: updateError } = await supabase
            .from('settings')
            .update({
                theme: settings.theme,
                fontsize: settings.fontSize,
                imagerecognition: settings.imageRecognition,
                texttospeech: settings.ttsSetting,
                ttsspeed: settings.ttsSpeed
            })
            .eq('userid', user.id);

        if (updateError) {
            console.error("Error updating settings:", updateError);
            return;
        }
    } else {
        // If no record exists, insert a new record
        const { data: newData, error: insertError } = await supabase
            .from('settings')
            .insert({
                userid: user.id,
                theme: settings.theme,
                fontsize: settings.fontSize,
                imagerecognition: settings.imageRecognition,
                texttospeech: settings.ttsSetting,
                ttsspeed: settings.ttsSpeed
            });
            
        if (insertError) {
            console.error("Error inserting settings:", insertError);
            return;
        }
    }


    revalidatePath('/myAccount');
    return('Successfully updated settings!');
}
