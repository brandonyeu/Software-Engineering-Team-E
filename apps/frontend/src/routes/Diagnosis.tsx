import React, {useState, useEffect, useRef, useCallback} from "react";

interface Props {
    userResponse: string;
    botResponse: {
        purpose: string;
        message: string;
        options?: string[];
        sender: string;
    };
    sendUserResponse: string;
    optionClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

interface DiagnosisInfo {
    purpose?: string;
    message: string;
    options?: string[];
    sender: string;
}

const Chats: React.FC<Props> = (props) => {
    const [messages, setMessages] = useState<DiagnosisInfo[]>([]);
    const dummyRef = useRef<HTMLDivElement>(null);
    const bodyRef = useRef<HTMLDivElement>(null);

    const addInitialMessage = useCallback(() => {
        setMessages([
            {
                purpose: "intro",
                message:
                    "Hi there. You are now talking to a Diagnosis Bot that will help with picking the right medicine just for you! What is your name?",
                sender: "bot",
            },
        ]);
    }, []);

    const addUserMessage = useCallback((userMessage: typeof props.userResponse) => {
        setMessages((currentMessages) => [
            ...currentMessages,
            { message: userMessage, sender: "user" },
        ]);
    }, [props]);

    const addBotResponse = useCallback((botResponse: typeof props.botResponse) => {
        setMessages((currentMessages) => [
            ...currentMessages,
            botResponse,
        ]);
    }, [props]);

    useEffect(() => {
        if (messages.length === 0) {
            addInitialMessage();
        }
    }, [messages.length, addInitialMessage]);

    useEffect(() => {
        if (props.sendUserResponse) {
            addUserMessage(props.sendUserResponse);
        }
    }, [props.sendUserResponse, addUserMessage]);

    useEffect(() => {
        if (props.botResponse) {
            setTimeout(() => {
                addBotResponse(props.botResponse);
            }, 1000);
        }
    }, [props.botResponse, addBotResponse]);

    useEffect(() => {
        if (dummyRef && dummyRef.current && bodyRef && bodyRef.current) {
            bodyRef.current.scrollTo({
                top: dummyRef.current.offsetTop,
                behavior: "smooth",
            });
        }
    }, [messages]);

    return (
        <div ref={bodyRef}>
            {messages.map((chat) => (
                <div key={chat.message}>
                    <div>
                        <p>{chat.message}</p>
                    </div>
                    {chat.options ? (
                        <div>
                            <div>
                                <i className="far fa-hand-pointer"></i>
                            </div>
                            {chat.options.map((option) => (
                                <p
                                    onClick={(e) => props.optionClick(e)}
                                    data-id={option}
                                    key={option}
                                >
                                    {option}
                                </p>
                            ))}
                        </div>
                    ) : null}
                    <div ref={dummyRef}></div>
                </div>
            ))}
        </div>
    );
};

export default Chats;
