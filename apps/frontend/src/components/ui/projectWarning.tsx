import { useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export function ProjectWarning() {
    const { toast } = useToast();

    useEffect(() => {
        toast({
            variant: "destructive",
            title: "This website is a term project exercise for CS 3733 Software Engineering (Prof. Wong) and is not to be confused with the actual Brigham and Women's Hospital website.",
            //description: "There was a problem with your request.",
            duration: 0,
        });
    }, [toast]);

    return null; // Since we're displaying the toast directly, we don't need to return anything
}

// import { Button } from "@/components/ui/button";
// import { ToastAction } from "@/components/ui/toast";
// import { useToast } from "@/components/ui/use-toast";
//
// export default function ProjectWarning() {
//     const { toast } = useToast();
//
//     return (
//         <div>
//             toast({
//             variant: "destructive",
//             title: "Uh oh! Something went wrong.",
//             description: "There was a problem with your request.",
//             action: <ToastAction altText="Try again">Try again</ToastAction>,
//             });
//         </div>
//     );
// }







