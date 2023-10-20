import { getSession } from "@/lib/nextauth";
import Link from "next/link";
import SignInButton from "./SignInButton";
import SignOutButton from "./SignOutButton";
import UserNavMenu from "./UserNavMenu";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = async () => {
	const session = await getSession();
	// console.log(session?.user);
	// if (session?.user) {
	// 	return <pre>{ JSON.stringify(session.user, null, 2) }</pre>;
	// }
	// else{}
	return <div className="fixed inset-x-0 5 top-0 bg-background z-10 h-fit border-b border-zinc-300 py-2">
		<div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
			<Link href={ '/' } className="flex items-center gap-2">
				<p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-3 py-1 text-xl font-bold transition-all md:block hover:-translate-y-[2px] dark:border-white">
					Quizify
				</p>
			</Link>
			<div className="flex items-center gap-2">
				<ThemeToggle />
				<div className="flex items-center">
					{ session?.user ?
						(
							<UserNavMenu
								user={ session.user }
							/>
						)
						:
						(<SignInButton
							text="Sign In"
						/>)
					}
				</div>
			</div>
		</div>
	</div>;
};

export default Navbar;
