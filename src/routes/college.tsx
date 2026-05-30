import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/college")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>College</div>;
}
