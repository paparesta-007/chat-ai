export class Message {
    sender: string = "";

    content: string = "";
    conversation_id: string = "";
    id: string = "";
    created_at: string = "";
}

export type Style = {
    theme: string;
    fontFamily: string;
}

export type Conversation = {
    id: string;
    title: string;
    created_at: string;
    favourite: boolean;
}

export type Preferences = {
    style: Style[];
}
export interface ButtonOption {
    type: string;
    Icon: React.ReactNode;
    text: string;
    Kbd: string;
    onClick?: () => void; // opzionale
}
