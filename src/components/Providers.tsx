'use client';
import { SessionProvider } from "next-auth/react";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
type Props = {
	children: React.ReactNode;
};

const queryClient = new QueryClient();

const Providers = ({ children }: Props) => {
	return (
		<QueryClientProvider client={ queryClient }>
			<SessionProvider>
				{ children }
			</SessionProvider>
		</QueryClientProvider>
	);
};

export default Providers;