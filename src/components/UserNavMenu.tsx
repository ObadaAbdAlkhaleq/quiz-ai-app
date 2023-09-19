'use client';
import { User } from "next-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

import UserAvatar from "./UserAvatar";
import Link from "next/link";

type UserNavMenuProps = {
  user: Pick<User, 'name' | 'email' | 'image'>;
};

const UserNavMenu = ({ user }: UserNavMenuProps) => {
  const { name, email, image } = user;
  // console.log(name, email, image);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={ {
          name: name || null,
          image: image || null
        } } />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="p-2"
        align="end"
      >
        <div className="flex items-center justify-start gap-2 p-2"></div>
        <div className="flex flex-col space-y-1 gap-2 leading-none">
          { name && <p className="font-medium">{ name }</p> }
          { email && <p className="w-[200px] truncate text-sm text-zinc-700">{ email }</p> }
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem >
          <Link href={ '/' }>Meow</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={ (e) => {
            e.preventDefault();
            signOut().catch(console.error);
          } }
          className="text-red-600 cursor-pointer"
        >
          Sign Out
          <LogOut className="w-4 h-4 ml-2" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNavMenu;