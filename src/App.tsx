import { useEffect, useRef, useState } from "react";
import YouTube, {
  YouTubeEvent,
  YouTubePlayer,
  YouTubeProps,
} from "react-youtube";

function App() {
  const [time, setTime] = useState<Date>(new Date());
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dialog, setDialog] = useState<boolean>(false);
  const [play, setPlay] = useState<boolean>(false);
  const [YTPlayer, setYTPlayer] = useState<YouTubePlayer>();

  useEffect(() => {
    setDialog(true);
    setInterval(() => {
      setTime(new Date());
    }, 10);
  }, []);

  const makeYTPlayer = (e: YouTubeEvent<any>) => {
    setYTPlayer(e.target);
  };

  const opts: YouTubeProps["opts"] = {
    width: "100%",
    height: "100%",
    playerVars: {
      controls: 0,
    },
  };

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center flex-col">
        <YouTube
          videoId="M2cckDmNLMI"
          onReady={makeYTPlayer}
          opts={opts}
          className="w-screen h-screen"
        />
        <span
          className={
            "countdown font-mono sm:text-8xl text-5xl absolute " +
            (play ? "text-white" : "")
          }
        >
          {/* @ts-ignore */}
          <span style={{ "--value": time.getHours() }}></span>:
          {/* @ts-ignore */}
          <span style={{ "--value": time.getMinutes() }}></span>:
          {/* @ts-ignore */}
          <span style={{ "--value": time.getSeconds() }}></span>
        </span>
      </div>

      <input
        type="checkbox"
        id="my-modal"
        className="modal-toggle"
        checked={dialog}
        readOnly
      />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">音が出ます</h3>
          <p className="py-4">いいえを押すとただのカウントダウンになります</p>
          <div className="modal-action">
            <label
              htmlFor="my-modal"
              className="btn"
              onClick={() => {
                setDialog(false);
                setTimeout(() => {
                  videoRef.current?.play();
                  YTPlayer?.playVideo();
                }, new Date("2022-12-31T20:34:30").getTime() - new Date().getTime() - 129000);
                setPlay(true);
              }}
            >
              はい
            </label>
            <label
              htmlFor="my-modal"
              className="btn"
              onClick={() => setDialog(false)}
            >
              いいえ
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
