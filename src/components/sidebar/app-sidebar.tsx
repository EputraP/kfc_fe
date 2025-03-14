import { Calendar, Home, Inbox, LogOut, Search, Settings, User } from "lucide-react"
import { logout } from "@/app/(auth)/action";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Users",
    url: "/dashboard/users",
    icon: Inbox,
  },
  {
    title: "My Profile",
    url: "/dashboard/myprofile",
    icon: User,
  },
  {
    title: "Logout",
    url: "#",
    icon: LogOut,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>User Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    {item.title === "Logout" ? (
                      <a className="cursor-pointer " onClick={logout}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    ) : (
                      <a className="cursor-pointer " href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    )
                    }
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
