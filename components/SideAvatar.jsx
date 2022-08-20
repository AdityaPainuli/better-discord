import Image from "next/image";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { channelState } from "../slices/channelSlice";
import { selectChannel } from "../slices/channelSlice";
const SideAvatar = ({ index, friend }) => {
  const currentChannel = useSelector(channelState);
  const dispatch = useDispatch();
  return (
    <div
      key={index}
      id={index}
      className={`channel-box ${
        currentChannel === friend?.FriendEmail && "active-channel"
      } `}
      onClick={() => dispatch(selectChannel(friend.FriendEmail))}
    >
      <Image
        width={50}
        height={50}
        src={`https://avatars.dicebear.com/api/avataaars/${friend.FriendEmail}.svg`}
      />
    </div>
  );
};

export default SideAvatar;
