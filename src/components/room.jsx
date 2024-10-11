import React from 'react'
import { useParams } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
const RoomPage= () => {
    const{roomId} = useParams();
    const myMeeting = async (element) =>{
        const appID=545897811;
        const serverSecret="1316b86ea22e429b4a13c8e2e5562327";
        const kitToken =  ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomId,  Date.now().toString(), "User 1");
        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'copy Link',
                    url: `http://loacalhost:5173/room/${roomId}`,
                }
            ],
            scenario: {
                mode:ZegoUIKitPrebuilt.OneONoneCall,
            }
        });
    };
  return (
    <div>
    <div ref={myMeeting}/>
    </div>
  )
}

export default RoomPage
