import { User } from "next-auth";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";


type UserAvatarProps = {
  user: Pick<User, 'name' | 'image'>;
};

const UserAvatar = ({ user }: UserAvatarProps) => {
  return (
    <Avatar>
      { user.image ? (
        <Image
          fill
          src={ user.image }
          alt={ `${user.name} Profile Picture` }
        />
      )
        :
        (
          <AvatarFallback>
            <div></div>
          </AvatarFallback>
        )
      }
    </Avatar>
  );
};

export default UserAvatar;;