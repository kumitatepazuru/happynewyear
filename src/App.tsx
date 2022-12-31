import { useEffect, useRef, useState } from "react";

function App() {
  const [time, setTime] = useState<Date>(new Date());
  const videoRef = useRef<HTMLVideoElement>(null);
  const [dialog, setDialog] = useState<boolean>(false);
  const [play, setPlay] = useState<boolean>(false);

  useEffect(() => {
    setDialog(true);
    setInterval(() => {
      setTime(new Date());
    }, 10);
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center flex-col">
        {play && <video src="https://storage.cloud.google.com/inudev-hotdog/%E7%B1%B3%E6%B4%A5%E7%8E%84%E5%B8%AB%20Kenshi%20Yonezu%20-%20KICKBACK%20%5BM2cckDmNLMI%5D.webm" ref={videoRef} playsInline />}
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
                }, new Date("2022-12-31T20:10:30").getTime() - new Date().getTime() - 127500);
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
