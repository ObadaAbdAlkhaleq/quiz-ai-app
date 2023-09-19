import { SessionProvider } from "next-auth/react";

type Props = {
	children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
	return (
		<div className="">
			<SessionProvider>

			</SessionProvider>
		</div>
	);
};

export default Providers;