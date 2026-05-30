import { Link } from "@tanstack/react-router";
import { BookOpen, GraduationCap } from "lucide-react";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "../ui/sidebar";

const menuItems = [
	{ title: "College", to: "/college", icon: GraduationCap },
	{ title: "Courses", to: "/course", icon: BookOpen },
] as const;

export function AppSidebar() {
	return (
		<Sidebar>
			<SidebarHeader>
				<div className="px-2 py-1 text-lg font-semibold">SameGoal</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Menu</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{menuItems.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild tooltip={item.title}>
										<Link
											to={item.to}
											activeOptions={{ exact: item.to === "/college" }}
											activeProps={{ "data-active": true }}
										>
											<item.icon />
											<span>{item.title}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
