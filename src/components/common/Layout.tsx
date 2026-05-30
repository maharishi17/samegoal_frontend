import type { ReactNode } from "react";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { TooltipProvider } from "../ui/tooltip";
import { AppSidebar } from "./AppSidebar";
import ThemeButton from "./ThemeButton";

export function Layout({ children }: { children: ReactNode }) {
	return (
		<TooltipProvider>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset>
					<header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b px-4">
						<SidebarTrigger />
						<ThemeButton />
					</header>
					<main className="flex-1 p-4">{children}</main>
				</SidebarInset>
			</SidebarProvider>
		</TooltipProvider>
	);
}
