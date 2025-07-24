import { MessageSquare, Users } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';


export const useNavigation = () => {
    const pathname = usePathname();


    const paths = useMemo(() => [
        {
            name: "Conversations",
            href: "/User-landing/messaging/conversations",
            icon: <MessageSquare/>,
            active: pathname.startsWith("/User-landing/messaging/conversations")
        },
           {
            name: "Friends",
            href: "/User-landing/messaging/friends",
            icon: <Users/>,
            active: pathname === "/User-landing/messaging/friends"
            
        },
    ], 
    [pathname]);

    return paths;
};