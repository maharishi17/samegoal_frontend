import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme-provider";
import { Button } from "../ui/button";

export default function ThemeButton() {
	const { theme, setTheme } = useTheme();
	return (
		<Button
			size="icon"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
		>
			{theme === "dark" ? <Moon /> : <Sun />}
		</Button>
	);
}
