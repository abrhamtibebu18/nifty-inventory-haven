
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bell, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "New Product Added",
      message: "UISP airMAX NanoStation 5AC Loco has been added to inventory",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "2",
      title: "Low Stock Alert",
      message: "Fiber Patch Cable 100m is running low on stock",
      time: "5 hours ago",
      read: false,
    },
    {
      id: "3",
      title: "Transfer Request",
      message: "New transfer request from Ayat Tafo Condominium",
      time: "1 day ago",
      read: true,
    },
    {
      id: "4",
      title: "Device Request Approved",
      message: "Your device request for Ethernet Cable Cat6 has been approved",
      time: "2 days ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-background px-6 border-b">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-safety-yellow">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      
      <div className="flex items-center gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="end">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-medium">Notifications</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={markAllAsRead}
                className="text-xs"
              >
                Mark all as read
              </Button>
            </div>
            <div className="max-h-80 overflow-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  No notifications
                </div>
              ) : (
                notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-4 border-b last:border-0 ${notification.read ? '' : 'bg-muted/50'}`}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium text-sm">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <p className="text-sm mt-1">{notification.message}</p>
                  </div>
                ))
              )}
            </div>
            <div className="p-2 border-t text-center">
              <Link to="/notifications" className="text-xs text-safety-yellow hover:underline">
                View all notifications
              </Link>
            </div>
          </PopoverContent>
        </Popover>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 pr-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-safety-yellow text-black font-medium">AT</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-sm">
                <span className="font-medium">Abraham Tibebu</span>
                <span className="text-xs text-muted-foreground">abraham.tibebu@websprix.com</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/login" className="w-full">Logout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
